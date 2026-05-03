
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

        // ─────────────────────────────────────────────────────
        //  LOAD SCENE GAME — Điểm thay đổi chính cho Bundle
        // ─────────────────────────────────────────────────────
        loadSceneGame: function () {
            var self = this;

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

            // ── BƯỚC 1: Kiểm tra bundle lobby đã load chưa (tránh load lại)
            var existingBundle = cc.assetManager.getBundle('lobby');
            if (existingBundle) {
                console.log('[LoadingView] Lobby bundle already cached, skip reload.');
                self._onLobbyBundleReady();
                return;
            }

            // ── BƯỚC 2: Load bundle lobby
            console.log('[LoadingView] Loading lobby bundle...');
            cc.assetManager.loadBundle('lobby', function (err, bundle) {
                if (err) {
                    console.error('[LoadingView] FAILED to load lobby bundle:', err);
                    self.lbMessage.string = '⚠ Lỗi tải dữ liệu!\nVui lòng khởi động lại ứng dụng.';
                    self.nodeButtonTry.active = true;
                    return;
                }
                console.log('[LoadingView] Lobby bundle loaded successfully.');
                self._onLobbyBundleReady();
            });
        },

        // Gọi sau khi lobby bundle đã sẵn sàng → preload + load MainGame scene
        _onLobbyBundleReady: function () {
            var self = this;

            // 10% dành cho việc load bundle, 90% còn lại cho scene preload
            self.progressBar.progress = 0.10;
            self.lbProgress.string = '10%';
            self.lbMessage.string = 'Đang tải màn hình chính...';

            cc.director.preloadScene(
                self.sceneName,
                function (completedCount, totalCount) {
                    // Map 0→100% thành 10→100% trên thanh progress
                    var sceneProgress = completedCount / totalCount;
                    var totalProgress = 0.10 + (0.90 * sceneProgress);
                    var pct = Math.round(totalProgress * 100);

                    if (self.progressBar) {
                        self.progressBar.progress = totalProgress;
                        self.lbProgress.string = pct + '%';
                    }
                },
                function (err) {
                    if (err) {
                        console.error('[LoadingView] preloadScene error:', err);
                    }
                }
            );

            cc.director.loadScene(self.sceneName);
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
