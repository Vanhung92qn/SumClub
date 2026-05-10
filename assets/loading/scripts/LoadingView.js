
var netConfig = require('NetConfig');
(function () {
    cc.LoadingView = cc.Class({
        "extends": cc.Component,
        properties: {
            skeLogo: sp.Skeleton,

            hotUpdate: cc.HotUpdate,
            progressBar: cc.ProgressBar,
            lbProgress: cc.Label,
            lbMessage: cc.Label,

            nodeButtonTry: cc.Node,
            nodeButtonTryCheckVersion: cc.Node,
        },

        onLoad: function () {
            this._bootT0 = Date.now();
            this._installNetTap();
            this._bootLog('SCENE_ONLOAD', { ua: navigator.userAgent, online: navigator.onLine });
            // cc.debug.setDisplayStats(true);
            if (cc.sys.isNative) {
                if (cc.Device) {
                    cc.Device.setKeepScreenOn(true);
                } else if (jsb.Device) {
                    jsb.Device.setKeepScreenOn(true);
                }
            }

            this.sceneName = 'MainGame';

            // Fix bug iOS 14
            const isIOS14Device = cc.sys.os === cc.sys.OS_IOS && cc.sys.isBrowser && cc.sys.isMobile && /iPhone OS 14/.test(window.navigator.userAgent);
            if (isIOS14Device) {
                cc.MeshBuffer.prototype.checkAndSwitchBuffer = function (vertexCount) {
                    if (this.vertexOffset + vertexCount > 65535) { this.uploadData(); this._batcher._flush(); }
                };
                cc.MeshBuffer.prototype.forwardIndiceStartToOffset = function () {
                    this.uploadData(); this.switchBuffer();
                };
            }

            // Ko phai ban native -> ko init hotUpdate -> vao game luon
            if (!cc.sys.isNative) {
                this.loadSceneGame();
            } else {
                if (netConfig.IS_APPSTORE) {
                    var getConfigCommand = new cc.GetConfigCommand;
                    getConfigCommand.execute(this);
                } else {
                    this.hotUpdate.init();
                }
            }
        },

        onGetConfigResponse: function (response) {
            netConfig.HOTS_U = response.host;
            console.log('Loading onGetConfigResponse host: ', response.host);
            this.hotUpdate.init();
        },

        activeProgressHotUpdate: function (enable) {
            this.lbMessage.node.active = enable;
            this.nodeButtonTry.active = false;
            this.nodeButtonTryCheckVersion.active = false;
            if (enable) {
                this.lbMessage.string = 'Đang cập nhật phiên bản mới...';
            }
        },

        setProgressHotUpdate: function (progress) {
            if (progress) {
                this.progressBar.progress = progress;
                this.lbProgress.string = Math.round(progress * 100) + '%';
            } else {
                this.progressBar.progress = 0;
                this.lbProgress.string = '0%';
            }
        },

        // ═══════════════════════════════════════════════════════════════
        //  BOOT LOG (LoadingView path)
        //  F12 → Console → filter "[BOOT]"
        //  copy(window.__BOOT_LOG__)  → paste cho audit
        // ═══════════════════════════════════════════════════════════════
        _bootLog: function (tag, data) {
            var t = Date.now() - (this._bootT0 || Date.now());
            var line = { t: t + 'ms', tag: tag, src: 'LV' };
            if (data) for (var k in data) line[k] = data[k];
            if (typeof window !== 'undefined') {
                window.__BOOT_LOG__ = window.__BOOT_LOG__ || [];
                window.__BOOT_LOG__.push(line);
            }
            console.log('[BOOT]', JSON.stringify(line));
        },

        // Hook XHR + Image fetch o DOM level → bat MOI HTTP request Cocos thuc su lam.
        _installNetTap: function () {
            var self = this;
            if (typeof window === 'undefined' || window.__BOOT_NET_TAP__) return;
            window.__BOOT_NET_TAP__ = true;

            // Hook XMLHttpRequest
            try {
                var XO = XMLHttpRequest.prototype.open;
                var XS = XMLHttpRequest.prototype.send;
                XMLHttpRequest.prototype.open = function (method, url) {
                    this.__bootUrl = String(url);
                    this.__bootT0 = Date.now();
                    return XO.apply(this, arguments);
                };
                XMLHttpRequest.prototype.send = function () {
                    var xhr = this;
                    xhr.addEventListener('loadend', function () {
                        var size = 0;
                        try {
                            if (xhr.response && xhr.response.byteLength) size = xhr.response.byteLength;
                            else if (xhr.responseText) size = xhr.responseText.length;
                            else size = parseInt(xhr.getResponseHeader('content-length') || 0, 10);
                        } catch (e) {}
                        self._bootLog('NET_XHR', {
                            url: String(xhr.__bootUrl || '').split('/').slice(-3).join('/'),
                            dt: (Date.now() - xhr.__bootT0) + 'ms',
                            size: size,
                            status: xhr.status
                        });
                    });
                    return XS.apply(this, arguments);
                };
            } catch (e) {}

            // Hook Image.src (Cocos load texture qua <img>)
            try {
                var imgT0Map = new WeakMap();
                var ImagePrototype = Image.prototype;
                var srcDesc = Object.getOwnPropertyDescriptor(ImagePrototype, 'src') ||
                              Object.getOwnPropertyDescriptor(HTMLImageElement.prototype, 'src');
                if (srcDesc && srcDesc.set) {
                    var origSet = srcDesc.set;
                    Object.defineProperty(HTMLImageElement.prototype, 'src', {
                        configurable: true,
                        enumerable: true,
                        get: srcDesc.get,
                        set: function (v) {
                            var t0 = Date.now();
                            imgT0Map.set(this, t0);
                            this.__bootImgUrl = String(v);
                            var img = this;
                            this.addEventListener('load', function _onLoad() {
                                img.removeEventListener('load', _onLoad);
                                self._bootLog('NET_IMG', {
                                    url: String(img.__bootImgUrl).split('/').slice(-3).join('/'),
                                    dt: (Date.now() - t0) + 'ms',
                                    w: img.naturalWidth,
                                    h: img.naturalHeight
                                });
                            });
                            origSet.call(this, v);
                        }
                    });
                }
            } catch (e) {}

            self._bootLog('NET_TAP_INSTALLED');
        },

        _bundleStat: function (name) {
            var b = cc.assetManager.getBundle(name);
            if (!b) return { exists: 0 };
            var stat = { exists: 1, name: b.name };
            try {
                var cfg = b.config || b._config;
                if (cfg) {
                    var paths = cfg.paths;
                    stat.paths = paths ? Object.keys(paths.map || paths).length : 0;
                    if (cfg.uuids) stat.uuids = cfg.uuids.length || Object.keys(cfg.uuids).length;
                }
            } catch (e) {}
            return stat;
        },

        // ─────────────────────────────────────────────────────
        //  LOAD SCENE GAME — Điểm thay đổi chính cho Bundle
        // ─────────────────────────────────────────────────────
        loadSceneGame: function () {
            var self = this;
            self._bootLog('LOAD_SCENE_GAME_BEGIN');

            // Đọc token từ URL (Web)
            if (cc.sys.isBrowser) {
                var navigated = new URLSearchParams(window.location.search);
                if (navigated && navigated.get('tk')) {
                    var token = navigated.get('tk');
                    cc.ServerConnector.getInstance().setToken(token);
                    var refCode = navigated.get('refcode');
                    cc.Tool.getInstance().setItem("@refcode", refCode === null ? "" : refCode);
                }
            }

            self.activeProgressHotUpdate(false);
            self.progressBar.progress = 0;
            self.lbProgress.string = '0%';
            self.lbMessage.node.active = true;
            self.lbMessage.string = 'Đang tải dữ liệu...';

            // ── BƯỚC 1: Load song song common + prefabs + lobby
            //  → Tránh lazy round-trip khi MainGame ref asset trong common/prefabs
            var bundleNames = ['common', 'prefabs', 'lobby'];
            var loaded = 0;
            var failed = false;
            var batchT0 = Date.now();

            self._bootLog('BUNDLE_BATCH_START', { bundles: bundleNames.join(',') });

            bundleNames.forEach(function (name) {
                if (cc.assetManager.getBundle(name)) {
                    loaded++;
                    self._bootLog('BUNDLE_CACHED', { name: name });
                    if (loaded === bundleNames.length && !failed) self._onLobbyBundleReady();
                    return;
                }
                var t0 = Date.now();
                self._bootLog('BUNDLE_LOAD_BEGIN', { name: name });
                cc.assetManager.loadBundle(name, function (err) {
                    if (failed) return;
                    if (err) {
                        failed = true;
                        self._bootLog('BUNDLE_LOAD_FAIL', { name: name, dt: (Date.now() - t0) + 'ms', err: String(err).slice(0, 120) });
                        self.lbMessage.string = '⚠ Lỗi tải dữ liệu!\nVui lòng khởi động lại ứng dụng.';
                        self.nodeButtonTry.active = true;
                        return;
                    }
                    loaded++;
                    self._bootLog('BUNDLE_LOAD_OK', {
                        name: name,
                        dt: (Date.now() - t0) + 'ms',
                        progress: loaded + '/' + bundleNames.length,
                        stat: self._bundleStat(name)
                    });
                    if (loaded === bundleNames.length) {
                        self._bootLog('BUNDLE_BATCH_DONE', { dt: (Date.now() - batchT0) + 'ms' });
                        self._onLobbyBundleReady();
                    }
                });
            });
        },

        // Gọi sau khi lobby bundle đã sẵn sàng → preload + load MainGame scene qua bundle
        _onLobbyBundleReady: function () {
            var self = this;
            var lobby = cc.assetManager.getBundle('lobby');
            if (!lobby) {
                self._bootLog('LOAD_SCENE_NO_BUNDLE');
                return;
            }

            // 10% dành cho việc load bundle, 90% còn lại cho scene preload
            self.progressBar.progress = 0.10;
            self.lbProgress.string = '10%';
            self.lbMessage.string = 'Đang tải màn hình chính...';

            // Bo preloadScene (double work voi loadScene). Pattern SunWin:
            //  bundle.loadScene(name, progress, onLoaded) → cc.director.runScene
            self._bootLog('LOAD_SCENE_BEGIN', { scene: self.sceneName });
            var loadT0 = Date.now();
            var lastPct = -1;

            lobby.loadScene(
                self.sceneName,
                function (completedCount, totalCount) {
                    var sceneProgress = totalCount ? completedCount / totalCount : 0;
                    var pct10 = Math.floor(sceneProgress * 10) * 10;
                    if (pct10 !== lastPct) {
                        lastPct = pct10;
                        self._bootLog('SCENE_PROGRESS', { pct: pct10 + '%', completed: completedCount, total: totalCount });
                    }
                    var totalProgress = 0.10 + (0.90 * sceneProgress);
                    var pctVisible = Math.round(totalProgress * 100);
                    if (self.progressBar) {
                        self.progressBar.progress = totalProgress;
                        self.lbProgress.string = pctVisible + '%';
                    }
                },
                function (err, scene) {
                    if (err) {
                        self._bootLog('LOAD_SCENE_FAIL', { err: String(err).slice(0, 120), dt: (Date.now() - loadT0) + 'ms' });
                        return;
                    }
                    self._bootLog('LOAD_SCENE_DONE', { dt: (Date.now() - loadT0) + 'ms' });
                    cc.director.runScene(scene);
                    self._bootLog('RUN_SCENE_DONE', { totalSinceOnLoad: (Date.now() - self._bootT0) + 'ms' });
                }
            );
        },

        // ─────────────────────────────────────────────────────
        //  NÚT RETRY (Hot Update thất bại)
        // ─────────────────────────────────────────────────────
        retryClicked: function () {
            this.nodeButtonTry.active = false;
            this.loadSceneGame();
        },
    });
}).call(this);
