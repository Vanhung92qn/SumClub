
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
        this._bootT0 = Date.now();
        this._bundleStats = {};
        this._bootLog('SCENE_ONLOAD', { ua: navigator.userAgent, online: navigator.onLine });
        this._installNetTap();
        this.initOneSign();
        // cc.sys.isBrowser ? this.loadAssets() : (this.initHotUpdate(), this.checkUpdate());
        this.loadAssets();
    },

    // ═══════════════════════════════════════════════════════════════
    //  BOOT LOG  (chi co tac dung tu khi onLoad chay → MainGame visible)
    //  Doc: F12 → Console → filter "[BOOT]"
    //  Lay tat ca log: copy(window.__BOOT_LOG__)  → paste cho ai can audit
    // ═══════════════════════════════════════════════════════════════
    _bootLog: function (tag, data) {
        var t = Date.now() - (this._bootT0 || Date.now());
        var line = { t: t + 'ms', tag: tag };
        if (data) {
            for (var k in data) line[k] = data[k];
        }
        if (typeof window !== 'undefined') {
            window.__BOOT_LOG__ = window.__BOOT_LOG__ || [];
            window.__BOOT_LOG__.push(line);
        }
        console.log('[BOOT]', JSON.stringify(line));
    },

    // Hook cc.assetManager.downloader.downloadFile de log moi HTTP request
    _installNetTap: function () {
        var self = this;
        if (!cc.assetManager || !cc.assetManager.downloader || self._netTapInstalled) return;
        self._netTapInstalled = true;
        var dl = cc.assetManager.downloader;
        var origDownloadFile = dl.downloadFile;
        if (typeof origDownloadFile !== 'function') return;
        dl.downloadFile = function (url, options, onProgress, onComplete) {
            var t0 = Date.now();
            var wrapped = function (err, content) {
                var dt = Date.now() - t0;
                // chi log url ngan + size
                var size = 0;
                if (content) {
                    if (content.byteLength) size = content.byteLength;
                    else if (content.length) size = content.length;
                }
                self._bootLog('NET', { url: String(url).split('/').slice(-3).join('/'), dt: dt + 'ms', size: size, err: err ? String(err).slice(0, 80) : 0 });
                if (onComplete) onComplete(err, content);
            };
            return origDownloadFile.call(dl, url, options, onProgress, wrapped);
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
        self._bootLog('LOAD_ASSETS_START');
        setTimeout(function () {
            self.loadLobbyBundle();
        }, 100);
    },

    // ─────────────────────────────────────────────────────
    //  BƯỚC 1: Load song song common + prefabs + lobby
    //  → Tránh lazy round-trip khi MainGame ref asset trong common/prefabs
    // ─────────────────────────────────────────────────────
    loadLobbyBundle: function () {
        var self = this;
        var bundleNames = ['common', 'prefabs', 'lobby'];
        var loaded = 0;
        var failed = false;
        var batchT0 = Date.now();

        self.messageLabel.string = "Đang tải dữ liệu...";
        self._bootLog('BUNDLE_BATCH_START', { bundles: bundleNames.join(',') });

        bundleNames.forEach(function (name) {
            if (cc.assetManager.getBundle(name)) {
                loaded++;
                self._bootLog('BUNDLE_CACHED', { name: name });
                if (loaded === bundleNames.length && !failed) self.loadScene();
                return;
            }
            var t0 = Date.now();
            self._bootLog('BUNDLE_LOAD_BEGIN', { name: name });
            cc.assetManager.loadBundle(name, function (err) {
                if (failed) return;
                if (err) {
                    failed = true;
                    self._bootLog('BUNDLE_LOAD_FAIL', { name: name, dt: (Date.now() - t0) + 'ms', err: String(err).slice(0, 120) });
                    self.messageLabel.string = "⚠ Lỗi tải dữ liệu!\nVui lòng thử lại.";
                    if (self.retryButtonNode) self.retryButtonNode.active = true;
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
                    self.loadScene();
                }
            });
        });
    },

    // ─────────────────────────────────────────────────────
    //  BƯỚC 2: Preload + Load MainGame scene (qua bundle reference)
    // ─────────────────────────────────────────────────────
    loadScene: function () {
        var self = this;
        var lobby = cc.assetManager.getBundle('lobby');
        if (!lobby) {
            self._bootLog('LOAD_SCENE_NO_BUNDLE');
            return;
        }

        self.messageLabel.string = "Đang tải màn hình chính...";
        self._bootLog('PRELOAD_SCENE_BEGIN', { scene: 'MainGame' });
        var preloadT0 = Date.now();
        var lastLogged = -1;

        lobby.preloadScene("MainGame", function (completed, total) {
            // log moi 10% de tranh spam
            var pct = total ? Math.floor((completed / total) * 10) * 10 : 0;
            if (pct !== lastLogged) {
                lastLogged = pct;
                self._bootLog('PRELOAD_PROGRESS', { pct: pct + '%', completed: completed, total: total });
            }
            self.onProgress(completed, total);
        }, function (err) {
            if (err) {
                self._bootLog('PRELOAD_FAIL', { err: String(err).slice(0, 120), dt: (Date.now() - preloadT0) + 'ms' });
                return;
            }
            self._bootLog('PRELOAD_DONE', { dt: (Date.now() - preloadT0) + 'ms' });
            var loadT0 = Date.now();
            lobby.loadScene("MainGame", function (err2, scene) {
                if (err2) {
                    self._bootLog('LOAD_SCENE_FAIL', { err: String(err2).slice(0, 120), dt: (Date.now() - loadT0) + 'ms' });
                    return;
                }
                self._bootLog('LOAD_SCENE_DONE', { dt: (Date.now() - loadT0) + 'ms' });
                cc.director.runScene(scene);
                self._bootLog('RUN_SCENE_DONE', { totalSinceOnLoad: (Date.now() - self._bootT0) + 'ms' });
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
