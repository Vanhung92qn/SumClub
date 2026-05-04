
cc.Class({
    extends: cc.Component,
    properties: {
        messageLabel: cc.Label,
        // LabelVersion: cc.Label,
        manifestUrl: {
            default: null,
            type: cc.Asset,
        },
        retryButtonNode: cc.Node,
        updateProgressBar: cc.ProgressBar,
        // star: cc.Node,
        _am: null,
        _updating: false,
        _canRetry: false,
        _storagePath: "",
    },

    onLoad: function () {
        this.isLoadScene = false;
        this.isLoadConfig = false;
        this.initOneSign();
        // cc.sys.isBrowser ? this.loadAssets() : (this.initHotUpdate(), this.checkUpdate());
        this.loadAssets();
    },

    initOneSign: function () {
        this.checkPlugin() && (
            sdkbox.PluginOneSignal.init(),
            sdkbox.PluginOneSignal.setListener({
                onSendTag: function (t, e, i) { },
                onGetTags: function (t) { },
                onIdsAvailable: function (t, e) { },
                onPostNotification: function (t, e) { },
                onNotification: function (t, e, i) { }
            })
        );
    },

    checkPlugin: function () {
        if (typeof sdkbox === 'undefined') {
            console.log('sdkbox is undefined');
            return false;
        }
        if (typeof sdkbox.PluginOneSignal === 'undefined') {
            console.log('sdkbox.PluginOneSignal is undefined');
            return false;
        }
        return true;
    },

    loadAssets: function () {
        this.updateProgress(0);
        this.messageLabel.string = "Đang tải dữ liệu...";
        var self = this;
        setTimeout(function () {
            self.loadLobbyBundle();
        }, 100);
    },

    // ─────────────────────────────────────────────────────
    //  BƯỚC 1: Load lobby bundle trước khi load scene
    // ─────────────────────────────────────────────────────
    loadLobbyBundle: function () {
        var self = this;

        // Kiểm tra cache (tránh load lại nếu đã có)
        var existingBundle = cc.assetManager.getBundle('lobby');
        if (existingBundle) {
            console.log('[Splash] Lobby bundle already in cache.');
            self.loadScene();
            return;
        }

        self.messageLabel.string = "Đang tải dữ liệu...";
        console.log('[Splash] Loading lobby bundle...');

        cc.assetManager.loadBundle('lobby', function (err, bundle) {
            if (err) {
                console.error('[Splash] FAILED to load lobby bundle:', err);
                self.messageLabel.string = "⚠ Lỗi tải dữ liệu!\nVui lòng thử lại.";
                if (self.retryButtonNode) self.retryButtonNode.active = true;
                return;
            }
            console.log('[Splash] Lobby bundle loaded OK.');
            self.loadScene();
        });
    },

    // ─────────────────────────────────────────────────────
    //  BƯỚC 2: Preload + Load MainGame scene (qua bundle reference)
    // ─────────────────────────────────────────────────────
    loadScene: function () {
        var self = this;
        var lobby = cc.assetManager.getBundle('lobby');
        if (!lobby) {
            console.error('[Splash] lobby bundle missing at loadScene()');
            return;
        }

        self.messageLabel.string = "Đang tải màn hình chính...";

        lobby.preloadScene("MainGame", self.onProgress.bind(self), function (err) {
            if (err) {
                console.error('[Splash] preloadScene error:', err);
                return;
            }
            lobby.loadScene("MainGame", function (err2, scene) {
                if (err2) {
                    console.error('[Splash] loadScene error:', err2);
                    return;
                }
                cc.director.runScene(scene);
            });
        });
    },

    onProgress: function (completedCount, totalCount) {
        var phantram = ((completedCount / totalCount) * 100) >> 0;
        this.messageLabel.string = "Đang tải dữ liệu " + phantram + "%";
        this.updateProgress(phantram);
    },

    onLoaded: function () {
        // [DEPRECATED] thay bằng callback nội tuyến trong loadScene().
        // Giữ stub để không break reference cũ nếu có nơi gọi.
    },

    onDestroy: function () {
        if (this._updateListener) {
            this._am.setEventCallback(null);
            this._updateListener = null;
        }
    },

    // ─────────────────────────────────────────────────────
    //  HOT UPDATE (Native build — giữ nguyên logic cũ)
    // ─────────────────────────────────────────────────────
    initHotUpdate: function () {
        this.updateProgress(0);
        this._storagePath = (jsb.fileUtils ? jsb.fileUtils.getWritablePath() : "/") + "remote-assets";
        this._am = new jsb.AssetsManager("", this._storagePath, this.versionCompareHandle);
        this._am.setVerifyCallback(function (t, e) { return true; }.bind(this));
        if (cc.sys.os === cc.sys.OS_ANDROID) this._am.setMaxConcurrentTask(2);
    },

    checkUpdate: function () {
        if (this._updating) {
            this.messageLabel.string = "Đang kiểm tra phiên bản ...";
            return;
        }
        if (this._am.getState() === jsb.AssetsManager.State.UNINITED) {
            this._am.loadLocalManifest(this.manifestUrl.nativeUrl);
        }
        this._am.setEventCallback(this.checkCb.bind(this));
        this._am.checkUpdate();
        this._updating = true;
    },

    hotUpdate: function () {
        if (this._am && !this._updating) {
            this._am.setEventCallback(this.updateCb.bind(this));
            if (this._am.getState() === jsb.AssetsManager.State.UNINITED) {
                this._am.loadLocalManifest(this.manifestUrl.nativeUrl);
            }
            this._failCount = 0;
            this._am.update();
            this._updating = true;
        }
    },

    retry: function () {
        if (!this._updating && this._canRetry) {
            this.retryButtonNode.active = false;
            this._canRetry = false;
            this.messageLabel.string = "Thử lại ...";
            this._am.downloadFailedAssets();
        }
    },

    checkCb: function (t) {
        var e = false, i = false;
        switch (t.getEventCode()) {
            case jsb.EventAssetsManager.ERROR_NO_LOCAL_MANIFEST:
                this.messageLabel.string = "Không tìm thấy Hot Update ...";
                break;
            case jsb.EventAssetsManager.ERROR_DOWNLOAD_MANIFEST:
            case jsb.EventAssetsManager.ERROR_PARSE_MANIFEST:
                this.messageLabel.string = "Tải manifest thất bại ...";
                break;
            case jsb.EventAssetsManager.ALREADY_UP_TO_DATE:
                this.updateProgress(100);
                this.messageLabel.string = "Phiên bản mới nhất ...";
                e = true;
                break;
            case jsb.EventAssetsManager.NEW_VERSION_FOUND:
                this.messageLabel.string = "Tìm thấy phiên bản mới...";
                this.updateProgress(0);
                i = true;
                break;
            default:
                return;
        }
        this._am.setEventCallback(null);
        this._checkListener = null;
        this._updating = false;
        if (i) this.hotUpdate();
        if (e) this.loadLobbyBundle(); // ← Sau HotUpdate cũng phải load lobby bundle
    },

    updateCb: function (event) {
        var needRestart = false, failed = false;
        switch (event.getEventCode()) {
            case jsb.EventAssetsManager.ERROR_NO_LOCAL_MANIFEST:
                this.retryButtonNode.active = true;
                failed = true;
                break;
            case jsb.EventAssetsManager.UPDATE_PROGRESSION:
                var pct = (event.getPercent() * 100) >> 0;
                this.updateProgress(pct);
                this.messageLabel.string = pct + "%";
                break;
            case jsb.EventAssetsManager.ERROR_DOWNLOAD_MANIFEST:
            case jsb.EventAssetsManager.ERROR_PARSE_MANIFEST:
                this.retryButtonNode.active = true;
                failed = true;
                break;
            case jsb.EventAssetsManager.UPDATE_FINISHED:
                this.messageLabel.string = "Cập nhật hoàn tất!";
                needRestart = true;
                break;
            case jsb.EventAssetsManager.UPDATE_FAILED:
                this.retryButtonNode.active = true;
                this._updating = false;
                this._canRetry = true;
                break;
            case jsb.EventAssetsManager.ERROR_UPDATING:
            case jsb.EventAssetsManager.ERROR_DECOMPRESS:
                this.messageLabel.string = event.getMessage();
                break;
        }
        if (failed) {
            this._am.setEventCallback(null);
            this._updateListener = null;
            this._updating = false;
        }
        if (needRestart) {
            this._am.setEventCallback(null);
            this._updateListener = null;
            var searchPaths = jsb.fileUtils.getSearchPaths();
            var newPaths = this._am.getLocalManifest().getSearchPaths();
            Array.prototype.unshift.apply(searchPaths, newPaths);
            cc.sys.localStorage.setItem('HotUpdateSearchPaths', JSON.stringify(searchPaths));
            jsb.fileUtils.setSearchPaths(searchPaths);
            cc.audioEngine.stopAll();
            cc.game.restart();
        }
    },

    onRetryClick: function () {
        this.retry();
        cc.sys.isBrowser ? this.loadLobbyBundle() : (this.initHotUpdate(), this.checkUpdate());
    },

    versionCompareHandle: function (t, e) {
        var i = t.split("."), o = e.split(".");
        for (var n = 0; n < i.length; ++n) {
            var s = parseInt(i[n]), a = parseInt(o[n] || 0);
            if (s !== a) return s - a;
        }
        return o.length > i.length ? -1 : 0;
    },

    updateProgress: function (progress) {
        this.updateProgressBar.progress = progress / 100;
       // if (this.star) this.star.position = cc.v2(progress, 0);
    },
});
