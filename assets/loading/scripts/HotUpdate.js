
var netConfig = require('NetConfig');
(function () {
    cc.HotUpdate = cc.Class({
        "extends": cc.Component,
        properties: {
            loadingView: cc.LoadingView,
            manifestUrl: {
                type: cc.Asset,
                default: null
            },
            _updating: false,
            _canRetry: false,
            _storagePath: ''
        },

        init: function () {
            // Hot update is only available in Native build
            if (!cc.sys.isNative) {
                return;
            }

            this._storagePath = ((jsb.fileUtils ? jsb.fileUtils.getWritablePath() : '/') + 'remote-assets');
            console.log('HOT UPDATE: Storage path for remote asset : ' + this._storagePath);

            // Setup your own version compare handler, versionA and B is versions in string
            // if the return value greater than 0, versionA is greater than B,
            // if the return value equals 0, versionA equals to B,
            // if the return value smaller than 0, versionA is smaller than B.
            this.versionCompareHandle = function (versionA, versionB) {
                console.log("HOT UPDATE: JS Custom Version Compare: version A is " + versionA + ', version B is ' + versionB);
                var vA = versionA.split('.');
                var vB = versionB.split('.');
                for (var i = 0; i < vA.length; ++i) {
                    var a = parseInt(vA[i]);
                    var b = parseInt(vB[i] || 0);
                    if (a === b) {
                        continue;
                    }
                    else {
                        return a - b;
                    }
                }
                if (vB.length > vA.length) {
                    return -1;
                }
                else {
                    return 0;
                }
            };

            console.log('HotUpdate jsb.AssetsManager: ', netConfig.IS_APPSTORE);
            if (netConfig.IS_APPSTORE) {
                console.log('HotUpdate jsb.AssetsManager manifestRemoteUrl');
                this.manifestRemoteUrl = netConfig.HOTS_U;
                this._am = new jsb.AssetsManager('', this._storagePath, this.versionCompareHandle, this.manifestRemoteUrl);
            } else {
                this._am = new jsb.AssetsManager('', this._storagePath, this.versionCompareHandle);
            }

            this._am.setVerifyCallback(function (path, asset) {

                var compressed = asset.compressed;
                var expectedMD5 = asset.md5;
                var relativePath = asset.path;

                var size = asset.size;
                if (compressed) {
                    console.log('HOT UPDATE: Verification passed : ' + relativePath);
                    return true;
                }
                else {
                    console.log('HOT UPDATE: Verification passed : ' + relativePath + ' (' + expectedMD5 + ')');
                    return true;
                }
            });

            console.log('HOT UPDATE: Hot update is ready, please check or directly update.');

            if (cc.sys.os === cc.sys.OS_ANDROID) {
                //fix loi 1 so may android
                this._am.setMaxConcurrentTask(2);
                console.log('HOT UPDATE: ANDROID Max concurrent tasks count have been limited to 2');
            }

            //reset progressUI

            this.checkUpdate();
        },

        onDestroy: function () {
            if (this._updateListener) {
                this._am.setEventCallback(null);
                this._updateListener = null;
            }
        },

        checkUpdate: function () {
            console.log('HOT UPDATE: start checkUpdate...');

            this.loadingView.activeProgressHotUpdate(true);

            if (this._updating) {
                console.log('HOT UPDATE: Checking or updating ...');
                return;
            }
            if (this._am.getState() === jsb.AssetsManager.State.UNINITED) {
                // Resolve md5 url
                var url = this.manifestUrl.nativeUrl;
                if (cc.loader.md5Pipe) {
                    url = cc.loader.md5Pipe.transformURL(url);
                }

                console.log('HotUpdate checkUpdate: ', netConfig.IS_APPSTORE);

                if (netConfig.IS_APPSTORE) {
                    console.log('HOT UPDATE: loadLocalManifest manifestRemoteUrl: ', this.manifestRemoteUrl);
                    this._am.loadLocalManifest(url, this.manifestRemoteUrl);
                } else {
                    this._am.loadLocalManifest(url);
                }
            } else {
                console.log('HotUpdate checkUpdate state =! UNINITED');
            }

            if (!this._am.getLocalManifest() || !this._am.getLocalManifest().isLoaded()) {
                console.log('HOT UPDATE: Failed to load local manifest ...');
                return;
            }
            this._am.setEventCallback(this.checkCb.bind(this));

            if (netConfig.IS_APPSTORE) {
                this._am.checkUpdate(this.manifestRemoteUrl);
            } else {
                this._am.checkUpdate();
            }

            this._updating = true;
        },

        hotUpdate: function () {
            if (this._am && !this._updating) {
                this._am.setEventCallback(this.updateCb.bind(this));

                if (this._am.getState() === jsb.AssetsManager.State.UNINITED) {
                    // Resolve md5 url
                    var url = this.manifestUrl.nativeUrl;
                    if (cc.loader.md5Pipe) {
                        url = cc.loader.md5Pipe.transformURL(url);
                    }

                    if (netConfig.IS_APPSTORE) {
                        console.log('HOT UPDATE: loadLocalManifest manifestRemoteUrl: ', this.manifestRemoteUrl);
                        this._am.loadLocalManifest(url, this.manifestRemoteUrl);
                    } else {
                        this._am.loadLocalManifest(url);
                    }
                }

                this._failCount = 0;

                if (netConfig.IS_APPSTORE) {
                    this._am.update(this.manifestRemoteUrl);
                } else {
                    this._am.update();
                }

                this._updating = true;
            }
        },

        //callback
        checkCb: function (event) {


            console.log('HOT UPDATE getEventCode: ' + event.getEventCode());
            switch (event.getEventCode())
            {
                case jsb.EventAssetsManager.ERROR_NO_LOCAL_MANIFEST:
                    console.log("HOT UPDATE: No local manifest file found, hot update skipped.");
                    //vao game luon
                    //this.loadingView.loadSceneGame();
                    break;
                case jsb.EventAssetsManager.ERROR_DOWNLOAD_MANIFEST:
                case jsb.EventAssetsManager.ERROR_PARSE_MANIFEST:
                    console.log("HOT UPDATE: Fail to download manifest file, hot update skipped.");

                    //Bat lai retry UI
                    this.loadingView.lbMessage.string = 'Quá trình tải thông tin cập nhật không thành công.\nVui lòng thử lại!';
                    this.loadingView.nodeButtonTryCheckVersion.active = true;
                    //vao game luon
                    //this.loadingView.loadSceneGame();
                    break;
                case jsb.EventAssetsManager.ALREADY_UP_TO_DATE:
                    console.log("HOT UPDATE: Already up to date with the latest remote version.");
                    //vao game luon
                    this.loadingView.loadSceneGame();
                    break;
                case jsb.EventAssetsManager.NEW_VERSION_FOUND:
                    console.log("HOT UPDATE: New version found, please try to update.");
                    break;
                default:
                    //vao game luon
                    //this.loadingView.loadSceneGame();
                    return;
            }

            if (event.getEventCode() === jsb.EventAssetsManager.NEW_VERSION_FOUND) {
                this._am.setEventCallback(null);
                this._checkListener = null;
                this._updating = false;

                console.log("HOT UPDATE: call hotUpdate.");

                //tien hanh cap nhat
                this.hotUpdate();
                //bat UI progress Hot Update
                this.loadingView.activeProgressHotUpdate(true);
            } else {
                this._am.setEventCallback(null);
                this._checkListener = null;
                this._updating = false;
            }
        },

        //callback
        updateCb: function (event) {
            var needRestart = false;
            var failed = false;
            switch (event.getEventCode())
            {
                case jsb.EventAssetsManager.ERROR_NO_LOCAL_MANIFEST:
                    console.log("HOT UPDATE: No local manifest file found, hot update skipped.");
                    failed = true;
                    break;
                case jsb.EventAssetsManager.UPDATE_PROGRESSION:

                    console.log('HOT UPDATE byteProgress: ' + event.getPercent());
                    console.log('HOT UPDATE fileProgress: ' + event.getPercentByFile());
                    console.log('HOT UPDATE fileLabel: ' + event.getDownloadedFiles() + ' / ' + event.getTotalFiles());
                    console.log('HOT UPDATE byteLabel: ' + event.getDownloadedBytes() + ' / ' + event.getTotalBytes());

                    //update progress UI
                    this.loadingView.setProgressHotUpdate(event.getPercentByFile());

                    var msg = event.getMessage();
                    if (msg) {
                        console.log('HOT UPDATE: ' + msg);
                    }
                    break;
                case jsb.EventAssetsManager.ERROR_DOWNLOAD_MANIFEST:
                case jsb.EventAssetsManager.ERROR_PARSE_MANIFEST:
                    console.log("HOT UPDATE: Fail to download manifest file, hot update skipped.");
                    failed = true;
                    break;
                case jsb.EventAssetsManager.ALREADY_UP_TO_DATE:
                    console.log("HOT UPDATE: Already up to date with the latest remote version.");
                    failed = true;
                    break;
                case jsb.EventAssetsManager.UPDATE_FINISHED:
                    console.log("HOT UPDATE: Update finished. " + event.getMessage());
                    needRestart = true;
                    break;
                case jsb.EventAssetsManager.UPDATE_FAILED:
                    console.log("HOT UPDATE: Update failed. " + event.getMessage());

                    //Bat lai retry UI
                    this.loadingView.lbMessage.string = 'Cập nhật thất bại. Vui lòng thử lại!';
                    this.loadingView.nodeButtonTry.active = true;

                    this._updating = false;
                    this._canRetry = true;
                    break;
                case jsb.EventAssetsManager.ERROR_UPDATING:
                    console.log('HOT UPDATE: Asset update error: ' + event.getAssetId() + ', ' + event.getMessage());
                    break;
                case jsb.EventAssetsManager.ERROR_DECOMPRESS:
                    console.log('HOT UPDATE: Asset update error: ' + event.getMessage());
                    break;
                default:
                    break;
            }

            if (failed) {
                this._am.setEventCallback(null);
                this._updateListener = null;
                this._updating = false;

                this.loadingView.lbMessage.string = 'Cập nhật thất bại. Vui lòng thử lại sau';
            }

            if (needRestart) {
                this._am.setEventCallback(null);
                this._updateListener = null;
                // Prepend the manifest's search path
                var searchPaths = jsb.fileUtils.getSearchPaths();
                var newPaths = this._am.getLocalManifest().getSearchPaths();

                console.log('HOT UPDATE: newPaths: ' + JSON.stringify(newPaths));

                Array.prototype.unshift.apply(searchPaths, newPaths);

                cc.sys.localStorage.setItem('HotUpdateSearchPaths', JSON.stringify(searchPaths));
                jsb.fileUtils.setSearchPaths(searchPaths);

                cc.audioEngine.stopAll();
                cc.game.restart();
            }
        },

        retryCheckVersionClicked: function () {
            this.loadingView.nodeButtonTryCheckVersion.active = false;
           this.checkUpdate();
        },

        retryClicked: function () {
            if (!this._updating && this._canRetry) {
                this._canRetry = false;

                console.log('HOT UPDATE: Retry failed Assets...');
                this.loadingView.activeProgressHotUpdate(true);
                this._am.downloadFailedAssets();

            }
        },
    });
}).call(this);
