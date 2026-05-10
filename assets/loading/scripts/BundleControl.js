/**
 * BundleControl.js
 * ─────────────────────────────────────────────────────────────────
 * Wrapper cho cc.assetManager.loadBundle, ho tro CDN remote bundle:
 *
 *   - Local mode (ASSET_CDN_URL rong): fallback cc.assetManager.loadBundle(name, cb)
 *     → engine fetch theo relative URL, behavior nhu cu.
 *
 *   - CDN mode (ASSET_CDN_URL = 'https://res.bay789x.me/'):
 *     1. Fetch AssetBundleVersion.json mot lan duy nhat (cached in-memory)
 *        → map { bundleName: { hash, url? } }
 *     2. loadBundle(fullUrl, { version: hash }, cb) → engine fetch tu CDN
 *        kem cache-bust theo hash → URL co hash → cache 1 nam an toan.
 *
 * Cach kich hoat CDN mode:
 *   Sua NetConfig.js: ASSET_CDN_URL = 'https://res.bay789x.me/'
 *
 * Cach build + deploy:
 *   1. Build web-mobile.
 *   2. Run Generate-AssetBundleVersion.ps1 -> tao file JSON.
 *   3. Run Deploy-ToCDN.ps1 -> copy assets + JSON len CDN.
 *   4. F5 user → loadBundle se goi CDN.
 *
 * Pattern port tu ClientSunWin/assets/Loading/script/loading/BundleControl.js
 * voi cai tien:
 *   - In-flight dedup (nhieu loadBundle song song chi fetch version map 1 lan).
 *   - Fallback an toan khi fetch version map fail / bundle khong co trong map.
 *   - Cache-bust ?t= cho AssetBundleVersion.json (browser KHONG cache stale).
 * ─────────────────────────────────────────────────────────────────
 */
var netConfig = require('NetConfig');

(function () {
    var BundleControl;

    BundleControl = (function () {
        var instance;

        function BundleControl() {
            this._versionMap = null;       // cached AssetBundleVersion.json (object)
            this._fetchInflight = null;    // [callback, ...] khi dang fetch
            this._fetchFailed = false;     // sau 1 lan fail → fallback local cho moi load sau
        }

        instance = void 0;

        BundleControl.getInstance = function () {
            if (instance === void 0) instance = new BundleControl();
            return instance;
        };

        // ─────────────────────────────────────────────────────
        //  PUBLIC: loadBundle wrapper
        //  bundleName: string (vd 'lobby', 'taixiu')
        //  callback: function(err, bundle)
        // ─────────────────────────────────────────────────────
        BundleControl.prototype.loadBundle = function (bundleName, callback) {
            var self = this;
            var cdnUrl = netConfig.ASSET_CDN_URL;

            // Local mode hoac da fail truoc do → dung relative URL
            if (!cdnUrl || self._fetchFailed) {
                cc.assetManager.loadBundle(bundleName, callback);
                return;
            }

            self._ensureVersionMap(function (err, versionMap) {
                if (err) {
                    console.warn('[BundleControl] Version map fail, fallback local:', err);
                    self._fetchFailed = true;
                    cc.assetManager.loadBundle(bundleName, callback);
                    return;
                }

                var info = versionMap[bundleName];
                if (!info || !info.hash) {
                    console.warn('[BundleControl] Bundle "' + bundleName + '" khong co trong version map, fallback local');
                    cc.assetManager.loadBundle(bundleName, callback);
                    return;
                }

                // URL CDN: dung "url" trong info neu co, hoac construct mac dinh
                var url = info.url || (cdnUrl + 'assets/' + bundleName);

                cc.assetManager.loadBundle(url, { version: info.hash }, function (e, b) {
                    if (e) {
                        console.warn('[BundleControl] CDN load fail bundle "' + bundleName + '", fallback local:', e);
                        cc.assetManager.loadBundle(bundleName, callback);
                        return;
                    }
                    callback && callback(null, b);
                });
            });
        };

        // ─────────────────────────────────────────────────────
        //  PUBLIC: clear cache version map (force re-fetch lan toi)
        //  Goi sau khi user logout/refresh de dam bao asset moi nhat.
        // ─────────────────────────────────────────────────────
        BundleControl.prototype.invalidateVersionMap = function () {
            this._versionMap = null;
            this._fetchFailed = false;
        };

        // ─────────────────────────────────────────────────────
        //  PRIVATE: fetch + cache AssetBundleVersion.json
        //  Multiple loadBundle goi song song chi fetch 1 lan duy nhat.
        // ─────────────────────────────────────────────────────
        BundleControl.prototype._ensureVersionMap = function (callback) {
            var self = this;

            if (self._versionMap) {
                callback(null, self._versionMap);
                return;
            }

            if (self._fetchInflight) {
                self._fetchInflight.push(callback);
                return;
            }

            self._fetchInflight = [callback];

            var url = netConfig.ASSET_CDN_URL + 'AssetBundleVersion.json?t=' + Date.now();
            var xhr = new XMLHttpRequest();
            xhr.timeout = 5000;

            xhr.onload = function () {
                var pending = self._fetchInflight;
                self._fetchInflight = null;

                if (xhr.status >= 200 && xhr.status < 300) {
                    try {
                        self._versionMap = JSON.parse(xhr.responseText);
                        pending.forEach(function (cb) { cb(null, self._versionMap); });
                    } catch (e) {
                        pending.forEach(function (cb) { cb(e, null); });
                    }
                } else {
                    var err = new Error('HTTP ' + xhr.status);
                    pending.forEach(function (cb) { cb(err, null); });
                }
            };
            xhr.onerror = function () {
                var pending = self._fetchInflight;
                self._fetchInflight = null;
                pending.forEach(function (cb) { cb(new Error('Network error'), null); });
            };
            xhr.ontimeout = function () {
                var pending = self._fetchInflight;
                self._fetchInflight = null;
                pending.forEach(function (cb) { cb(new Error('Timeout'), null); });
            };

            xhr.open('GET', url, true);
            xhr.send();
        };

        return BundleControl;
    })();

    cc.BundleControl = BundleControl;
}).call(this);
