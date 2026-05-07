/**
 * BundleLoader.js
 * ─────────────────────────────────────────────────────────────────
 * Quản lý toàn bộ vòng đời của Asset Bundles trong S86CLUB.
 * Đặt file này tại: assets/lobby/scripts/common/BundleLoader.js
 *
 * CÁCH DÙNG:
 *   // Mở một game:
 *   cc.BundleLoader.getInstance().loadGame(cc.GameId.TAI_XIU, callback);
 *
 *   // Đóng một game (giải phóng RAM):
 *   cc.BundleLoader.getInstance().releaseGame(cc.GameId.TAI_XIU);
 *
 *   // Preload ngầm (không chờ kết quả):
 *   cc.BundleLoader.getInstance().preloadGame(cc.GameId.XOCXOC);
 * ─────────────────────────────────────────────────────────────────
 */
(function () {

    var BundleLoader;

    BundleLoader = (function () {
        var instance;

        function BundleLoader() {
            // Map: bundleName → cc.AssetBundle reference
            this._bundles = {};
            
            // ═══════════════════════════════════════════════════════════════
            // 🧠 BUNDLE CACHE SYSTEM (Production-Ready Memory Management)
            // ═══════════════════════════════════════════════════════════════
            this._lastUsed = {};           // bundleName → timestamp(ms) khi được dùng lần cuối
            this._idleThreshold = 120000;  // 120s không dùng → auto release (2 phút)
            this._gcInterval = 30000;      // Check GC mỗi 30s
            this._gcScheduled = false;     // Flag để tránh schedule nhiều lần
            
            // Bắt đầu auto GC cycle
            this._startAutoGC();
        }

        instance = void 0;

        BundleLoader.getInstance = function () {
            if (instance === void 0) {
                instance = new BundleLoader();
            }
            return instance;
        };

        // ─────────────────────────────────────────────────────
        //  PUBLIC: Load game bundle theo GameId
        //  callback(err, bundle)
        //  Log timing (?gamelog=1 hoac ?bootlog=1):
        //   [GAME] BEGIN <label> bundle=<n> deps=<arr>
        //   [GAME] DEPS_DONE <label> +Xms
        //   [GAME] BUNDLE_DONE <label> +Xms (cache=hit/miss)
        // ─────────────────────────────────────────────────────
        BundleLoader.prototype.loadGame = function (gameId, callback) {
            var config = cc.GameBundleConfig.getByGameId(gameId);
            if (!config) {
                var errMsg = '[BundleLoader] Không tìm thấy config cho gameId: ' + gameId;
                console.error(errMsg);
                callback && callback(new Error(errMsg), null);
                return;
            }

            var self = this;
            var label = config.label;
            var bundleName = config.bundleName;
            var deps = config.deps || [];
            var t0 = Date.now();
            var logEnabled = self._isGameLogEnabled();
            var cacheHit = !!cc.assetManager.getBundle(bundleName);

            if (logEnabled) {
                console.log('[GAME] BEGIN', label, 'bundle=' + bundleName, 'deps=' + JSON.stringify(deps), 'cache=' + (cacheHit ? 'HIT' : 'MISS'));
                if (typeof window !== 'undefined') {
                    window.__GAME_LOG__ = window.__GAME_LOG__ || [];
                    window.__GAME_LOG__.push({ t: 0, tag: 'BEGIN', game: label, bundle: bundleName, deps: deps, cache: cacheHit ? 'HIT' : 'MISS' });
                }
            }

            var onAllDone = function (err, bundle) {
                var dt = Date.now() - t0;
                if (logEnabled) {
                    console.log('[GAME] BUNDLE_DONE', label, '+' + dt + 'ms', err ? 'ERR' : 'OK');
                    if (typeof window !== 'undefined') {
                        window.__GAME_LOG__.push({ t: dt, tag: err ? 'BUNDLE_FAIL' : 'BUNDLE_DONE', game: label, err: err ? String(err).slice(0, 120) : 0 });
                    }
                }
                callback && callback(err, bundle);
            };

            if (deps.length > 0) {
                this._loadBundlesSequential(deps, function (err) {
                    if (err) { onAllDone(err, null); return; }
                    if (logEnabled) {
                        var dtDeps = Date.now() - t0;
                        console.log('[GAME] DEPS_DONE', label, '+' + dtDeps + 'ms');
                        if (typeof window !== 'undefined') {
                            window.__GAME_LOG__.push({ t: dtDeps, tag: 'DEPS_DONE', game: label, deps: deps });
                        }
                    }
                    self._loadSingleBundle(bundleName, onAllDone);
                });
            } else {
                this._loadSingleBundle(bundleName, onAllDone);
            }
        };

        // Bat log khi co ?gamelog=1, ?bootlog=1, hoac localStorage tuong ung
        BundleLoader.prototype._isGameLogEnabled = function () {
            if (typeof window === 'undefined') return false;
            try {
                var p = new URLSearchParams(window.location.search);
                if (p.get('gamelog') === '1' || p.get('bootlog') === '1') return true;
            } catch (e) {}
            try {
                var ls = window.localStorage;
                if (ls && (ls.getItem('gamelog') === '1' || ls.getItem('bootlog') === '1')) return true;
            } catch (e) {}
            return false;
        };

        // ─────────────────────────────────────────────────────
        //  PUBLIC: Load bundle theo tên trực tiếp
        //  callback(err, bundle)
        // ─────────────────────────────────────────────────────
        BundleLoader.prototype.loadBundle = function (bundleName, callback) {
            this._loadSingleBundle(bundleName, callback);
        };

        // ─────────────────────────────────────────────────────
        //  PUBLIC: Giải phóng bundle khi thoát game
        // ─────────────────────────────────────────────────────
        BundleLoader.prototype.releaseGame = function (gameId) {
            var config = cc.GameBundleConfig.getByGameId(gameId);
            if (!config) {
                console.warn('[BundleLoader] releaseGame: Không tìm thấy config cho gameId: ' + gameId);
                return;
            }
            this._releaseSingleBundle(config.bundleName);
            // Không release dependency bundle (slots_core/cardgame_core) vì có thể game khác đang dùng
        };

        // ─────────────────────────────────────────────────────
        //  PUBLIC: Preload bundle ngầm, không block luồng chính
        // ─────────────────────────────────────────────────────
        BundleLoader.prototype.preloadGame = function (gameId) {
            var config = cc.GameBundleConfig.getByGameId(gameId);
            if (!config) return;
            if (cc.assetManager.getBundle(config.bundleName)) return; // Đã có rồi

            console.log('[BundleLoader] Preloading: ' + config.bundleName);
            cc.assetManager.loadBundle(config.bundleName, function (err, bundle) {
                if (err) {
                    console.warn('[BundleLoader] Preload thất bại: ' + config.bundleName, err);
                    return;
                }
                this._bundles[config.bundleName] = bundle;
                this._markUsed(config.bundleName);  // ✅ Mark as used khi preload
                console.log('[BundleLoader] Preload xong: ' + config.bundleName);
            }.bind(this));
        };

        // ─────────────────────────────────────────────────────
        //  PUBLIC: Lấy bundle reference đã load (hoặc null)
        // ─────────────────────────────────────────────────────
        BundleLoader.prototype.getBundle = function (bundleName) {
            var bundle = cc.assetManager.getBundle(bundleName);
            if (bundle) {
                this._markUsed(bundleName);  // ✅ Mark as used khi getBundle
            }
            return bundle || null;
        };

        // ─────────────────────────────────────────────────────
        //  PUBLIC: Kiểm tra bundle đã load chưa
        // ─────────────────────────────────────────────────────
        BundleLoader.prototype.isLoaded = function (bundleName) {
            return !!cc.assetManager.getBundle(bundleName);
        };

        // ═══════════════════════════════════════════════════════════════
        // 🧠 BUNDLE CACHE SYSTEM - Production Memory Management
        // ═══════════════════════════════════════════════════════════════

        /**
         * Mark bundle as "recently used" - gọi mỗi khi bundle được access
         */
        BundleLoader.prototype._markUsed = function (bundleName) {
            this._lastUsed[bundleName] = Date.now();
        };

        /**
         * Bắt đầu auto GC cycle - tự động dọn dẹp bundle idle
         * ⚠️ BundleLoader là plain JS object (không phải cc.Component)
         *    → KHÔNG dùng cc.Scheduler (cần uuid/instanceId)
         *    → Dùng setInterval() của browser/jsb
         */
        BundleLoader.prototype._startAutoGC = function () {
            if (this._gcScheduled) return;
            
            var self = this;
            this._gcScheduled = true;
            
            // Dùng setInterval thay vì cc.Scheduler
            this._gcTimer = setInterval(function () {
                self.gcIdleBundles();
            }, self._gcInterval);
            
            console.log('[BundleLoader] Auto GC started - check every ' + (this._gcInterval/1000) + 's, release after ' + (this._idleThreshold/1000) + 's idle');
        };

        /**
         * Dừng auto GC (gọi khi app đóng hoặc scene destroy)
         */
        BundleLoader.prototype.stopAutoGC = function () {
            if (this._gcTimer) {
                clearInterval(this._gcTimer);
                this._gcTimer = null;
                this._gcScheduled = false;
                console.log('[BundleLoader] Auto GC stopped');
            }
        };

        /**
         * Garbage collect idle bundles - giải phóng bundle không dùng lâu
         * 🎯 Đây là CORE của memory management trong game production
         */
        BundleLoader.prototype.gcIdleBundles = function () {
            var now = Date.now();
            var releasedCount = 0;
            
            for (var bundleName in this._lastUsed) {
                if (!this._lastUsed.hasOwnProperty(bundleName)) continue;
                
                // Kiểm tra bundle có thật sự tồn tại không
                var bundle = cc.assetManager.getBundle(bundleName);
                if (!bundle) {
                    delete this._lastUsed[bundleName];
                    continue;
                }
                
                // Nếu idle quá lâu → release
                var idleTime = now - this._lastUsed[bundleName];
                if (idleTime > this._idleThreshold) {
                    console.log('[BundleLoader] GC: Releasing idle bundle "' + bundleName + '" (idle: ' + Math.round(idleTime/1000) + 's)');
                    this._releaseSingleBundle(bundleName);
                    delete this._lastUsed[bundleName];
                    releasedCount++;
                }
            }
            
            if (releasedCount > 0) {
                console.log('[BundleLoader] GC: Released ' + releasedCount + ' idle bundles');
            }
        };

        /**
         * Cấu hình thời gian idle threshold (ms)
         */
        BundleLoader.prototype.setIdleThreshold = function (milliseconds) {
            this._idleThreshold = milliseconds;
            console.log('[BundleLoader] Idle threshold set to ' + (milliseconds/1000) + 's');
        };

        /**
         * Force GC ngay lập tức (debug/testing)
         */
        BundleLoader.prototype.forceGC = function () {
            console.log('[BundleLoader] Force GC triggered');
            this.gcIdleBundles();
        };

        /**
         * Thống kê bundle cache (debug)
         */
        BundleLoader.prototype.getCacheStats = function () {
            var now = Date.now();
            var stats = {
                totalBundles: 0,
                activeBundles: [],
                idleTimes: {}
            };
            
            for (var bundleName in this._lastUsed) {
                if (!this._lastUsed.hasOwnProperty(bundleName)) continue;
                if (!cc.assetManager.getBundle(bundleName)) continue;
                
                stats.totalBundles++;
                stats.activeBundles.push(bundleName);
                stats.idleTimes[bundleName] = Math.round((now - this._lastUsed[bundleName]) / 1000);
            }
            
            return stats;
        };

        // ─────────────────────────────────────────────────────
        //  PRIVATE: Load một bundle, có cache check
        // ─────────────────────────────────────────────────────
        BundleLoader.prototype._loadSingleBundle = function (bundleName, callback) {
            // Kiểm tra cache
            var cached = cc.assetManager.getBundle(bundleName);
            if (cached) {
                this._markUsed(bundleName);  // ✅ Mark as used khi cache hit
                console.log('[BundleLoader] Cache hit: ' + bundleName);
                callback && callback(null, cached);
                return;
            }

            console.log('[BundleLoader] Loading bundle: ' + bundleName + '...');
            cc.PopupController.getInstance().showBusy();

            cc.assetManager.loadBundle(bundleName, function (err, bundle) {
                cc.PopupController.getInstance().hideBusy();

                if (err) {
                    console.error('[BundleLoader] FAILED: ' + bundleName, err);
                    callback && callback(err, null);
                    return;
                }

                this._bundles[bundleName] = bundle;
                this._markUsed(bundleName);  // ✅ Mark as used
                console.log('[BundleLoader] Loaded OK: ' + bundleName);
                callback && callback(null, bundle);
            }.bind(this));
        };

        // ─────────────────────────────────────────────────────
        //  PRIVATE: Load một danh sách bundles tuần tự (deps)
        // ─────────────────────────────────────────────────────
        BundleLoader.prototype._loadBundlesSequential = function (bundleNames, callback) {
            var self = this;
            var index = 0;

            function loadNext() {
                if (index >= bundleNames.length) {
                    callback && callback(null);
                    return;
                }
                var name = bundleNames[index++];
                self._loadSingleBundle(name, function (err) {
                    if (err) { callback && callback(err); return; }
                    loadNext();
                });
            }

            loadNext();
        };

        // ─────────────────────────────────────────────────────
        //  PRIVATE: Release một bundle
        // ─────────────────────────────────────────────────────
        BundleLoader.prototype._releaseSingleBundle = function (bundleName) {
            var bundle = cc.assetManager.getBundle(bundleName);
            if (bundle) {
                cc.assetManager.removeBundle(bundle);
                delete this._bundles[bundleName];
                console.log('[BundleLoader] Released: ' + bundleName);
            }
        };

        return BundleLoader;

    })();

    cc.BundleLoader = BundleLoader;

}).call(this);
