/**
 * Created by Nofear on 6/21/2017.
 */

(function () {
    var LocationController;

    LocationController = (function () {
        var instance;

        function LocationController() {
        }

        instance = void 0;

        LocationController.getInstance = function () {
            if (instance === void 0) {
                instance = this;
            }

            return instance.prototype;
        };

        LocationController.prototype.init = function () {

            try {
                if (cc.sys.isNative) {
                    if (cc.sys.os === cc.sys.OS_IOS) {
                        this.isInit = jsb.reflection.callStaticMethod("NativeOcClass", "getLocation");
                    } else {
                        jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "getLocation", "()V");
                        this.isInit = true;
                    }
                    console.log('LocationController init');
                } else {
                    let geolocation = navigator.geolocation;
                    if (geolocation) {
                        // Có hỗ trợ geolocation
                        let options = {
                            enableHighAccuracy: true,
                            timeout: 30000,
                            maximumAge: 0
                        };
                        geolocation.getCurrentPosition(this.onGeoSuccess, this.onGeoError, options);
                        console.log('getGeolocation');
                    } else {
                        // Không hỗ trợ geolocation
                        console.log('getGeolocation not support');
                        this.canGetLocation = false;
                    }
                    this.isInit = true;
                }
            } catch (e) {
                console.log('LocationController error');
                this.isInit = false;
            }


            return this.isInit;
        };

        LocationController.prototype.askEnableLocationService = function () {
            if (cc.sys.isNative) {
                this.canGetLocation = null;
                if (cc.sys.os === cc.sys.OS_IOS) {
                    var locationStatus = jsb.reflection.callStaticMethod("NativeOcClass", "askEnableLocationService");
                    switch (locationStatus) {
                        case cc.LocationStatus.AuthorizationStatusNotDetermined:
                        case cc.LocationStatus.AuthorizationStatusRestricted:
                        case cc.LocationStatus.AuthorizationStatusDenied:
                        case cc.LocationStatus.LocationServicesDisabled:
                            this.canGetLocation = false;
                            break;
                        case cc.LocationStatus.AuthorizationStatusAuthorizedAlways:
                        case cc.LocationStatus.AuthorizationStatusAuthorizedWhenInUse:
                            this.canGetLocation = true;
                            break;
                        default:
                            this.canGetLocation = false;
                    }
                } else {
                    this.canGetLocation = jsb.reflection.callStaticMethod("org/cocos2dx/javascript/GPSTracker", "canGetLocation", "()Z");
                }
                console.log('askEnableLocationService: ', this.canGetLocation);
            }

            return this.canGetLocation;
        };

        LocationController.prototype.getIsInit = function () {
            return this.isInit;
        };

        LocationController.prototype.setCanGetLocation = function (canGetLocation) {
            this.canGetLocation = canGetLocation;
        };

        LocationController.prototype.setGeoErrorCode = function (geoErrorCode) {
            this.geoErrorCode = geoErrorCode;
        };

        LocationController.prototype.getGeoErrorCode = function () {
            return this.geoErrorCode;
        };

        LocationController.prototype.getLatitude = function () {
            if (cc.sys.isNative) {
                this.latitude = null;
                if (cc.sys.os === cc.sys.OS_IOS) {
                    this.latitude = jsb.reflection.callStaticMethod("NativeOcClass", "getLatitude");
                } else {
                    this.latitude = jsb.reflection.callStaticMethod("org/cocos2dx/javascript/GPSTracker", "GetLatitude", "()F");
                }
                console.log('latitude: ' + this.latitude);
            }
            cc.ServerConnector.getInstance().setLatitude(this.latitude);
            return this.latitude;
        };

        LocationController.prototype.getLongitude = function () {
            if (cc.sys.isNative) {
                this.longitude = null;
                if (cc.sys.os === cc.sys.OS_IOS) {
                    this.longitude = jsb.reflection.callStaticMethod("NativeOcClass", "getLongitude");
                } else {
                    this.longitude = jsb.reflection.callStaticMethod("org/cocos2dx/javascript/GPSTracker", "GetLongitude", "()F");
                }
                console.log('longitude: ' + this.longitude);
            }
            cc.ServerConnector.getInstance().setLongitude(this.longitude);
            return this.longitude;
        };

        LocationController.prototype.openSettings = function () {
            if (cc.sys.isNative) {
                if (cc.sys.os === cc.sys.OS_IOS) {
                    jsb.reflection.callStaticMethod("NativeOcClass", "openSettings");
                } else {
                    jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "openSettings", "()V");
                }
                console.log('openSettings');
            } else {
                this.init();
            }
        };

        LocationController.prototype.getLocation = function () {
            if (cc.sys.isNative && cc.sys.os === cc.sys.OS_ANDROID) {
                jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "getLocation", "()V");
            }
        };

        LocationController.prototype.onGeoSuccess = function (position) {
            console.log('onGeoSuccess latitude: ', position.coords.latitude);
            console.log('onGeoSuccess longitude', position.coords.longitude);
            cc.ServerConnector.getInstance().setLatitude(position.coords.latitude);
            cc.ServerConnector.getInstance().setLongitude(position.coords.longitude);




            // cc.ServerConnector.getInstance().setLatitude(20.9734554290771);
            // cc.ServerConnector.getInstance().setLongitude(105.8341598);

            cc.LocationController.getInstance().setCanGetLocation(true);
        };

        LocationController.prototype.onGeoError = function (error) {
            let detailError;

            if(error.code === error.PERMISSION_DENIED) {
                detailError = "User denied the request for Geolocation.";
            }
            else if(error.code === error.POSITION_UNAVAILABLE) {
                detailError = "Location information is unavailable.";
            }
            else if(error.code === error.TIMEOUT) {
                detailError = "The request to get user location timed out."
            }
            else if(error.code === error.UNKNOWN_ERROR) {
                detailError = "An unknown error occurred."
            }

            cc.LocationController.getInstance().setGeoErrorCode(error.code);

            console.log('onGeoError: ', detailError);
            cc.LocationController.getInstance().setCanGetLocation(false);
        };

        return LocationController;

    })();

    cc.LocationController = LocationController;

}).call(this);

