
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

        _installNetTap: function () {
            var self = this;
            if (!cc.assetManager || !cc.assetManager.downloader || self._netTapInstalled) return;
            self._netTapInstalled = true;
            var dl = cc.assetManager.downloader;
            var orig = dl.downloadFile;
            if (typeof orig !== 'function') return;
            dl.downloadFile = function (url, options, onProgress, onComplete) {
                var t0 = Date.now();
                var wrapped = function (err, content) {
                    var dt = Date.now() - t0;
                    var size = 0;
                    if (content) {
                        if (content.byteLength) size = content.byteLength;
                        else if (content.length) size = content.length;
                    }
                    self._bootLog('NET', { url: String(url).split('/').slice(-3).join('/'), dt: dt + 'ms', size: size, err: err ? String(err).slice(0, 80) : 0 });
                    if (onComplete) onComplete(err, content);
                };
                return orig.call(dl, url, options, onProgress, wrapped);
            };
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

            self._bootLog('PRELOAD_SCENE_BEGIN', { scene: self.sceneName });
            var preloadT0 = Date.now();
            var lastPct = -1;

            lobby.preloadScene(
                self.sceneName,
                function (completedCount, totalCount) {
                    var sceneProgress = completedCount / totalCount;
                    var pct10 = totalCount ? Math.floor(sceneProgress * 10) * 10 : 0;
                    if (pct10 !== lastPct) {
                        lastPct = pct10;
                        self._bootLog('PRELOAD_PROGRESS', { pct: pct10 + '%', completed: completedCount, total: totalCount });
                    }
                    var totalProgress = 0.10 + (0.90 * sceneProgress);
                    var pctVisible = Math.round(totalProgress * 100);
                    if (self.progressBar) {
                        self.progressBar.progress = totalProgress;
                        self.lbProgress.string = pctVisible + '%';
                    }
                },
                function (err) {
                    if (err) {
                        self._bootLog('PRELOAD_FAIL', { err: String(err).slice(0, 120), dt: (Date.now() - preloadT0) + 'ms' });
                        return;
                    }
                    self._bootLog('PRELOAD_DONE', { dt: (Date.now() - preloadT0) + 'ms' });
                    var loadT0 = Date.now();
                    lobby.loadScene(self.sceneName, function (err2, scene) {
                        if (err2) {
                            self._bootLog('LOAD_SCENE_FAIL', { err: String(err2).slice(0, 120), dt: (Date.now() - loadT0) + 'ms' });
                            return;
                        }
                        self._bootLog('LOAD_SCENE_DONE', { dt: (Date.now() - loadT0) + 'ms' });
                        cc.director.runScene(scene);
                        self._bootLog('RUN_SCENE_DONE', { totalSinceOnLoad: (Date.now() - self._bootT0) + 'ms' });
                    });
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
