var netConfig = require('NetConfig');
import Configs from "../shootFish/common/Configs";

(function () {
    var ServerConnector;

    const Debug = false;

    ServerConnector = (function () {
        var instance;

        function ServerConnector() {
        }

        instance = void 0;

        ServerConnector.getInstance = function () {
            if (instance === void 0) {
                instance = this;
            }
            return instance.prototype;
        };

        //GET
        ServerConnector.prototype.sendRequest = function (subdomain, url, callback) {
            var e, request;
            try {
                var host = netConfig.HOST;

                // var sendDate = (new Date()).getTime();

                if (subdomain === cc.SubdomainName.DRAGON_TIGER || subdomain === cc.SubdomainName.XOC_XOC || subdomain === cc.SubdomainName.CHAT
                    || subdomain === cc.SubdomainName.THREE_CARDS || subdomain === cc.SubdomainName.TEXAS_POKER
                    || subdomain === cc.SubdomainName.TLMN || subdomain === cc.SubdomainName.TLMN_SOLO
                    || subdomain === cc.SubdomainName.MAU_BINH || subdomain === cc.SubdomainName.BACCARAT
                    || subdomain === cc.SubdomainName.TREASURE || subdomain === cc.SubdomainName.BAUCUA
                    || subdomain === cc.SubdomainName.LODE || subdomain === cc.SubdomainName.VIETLOT
                    || subdomain === cc.SubdomainName.TREASURE || subdomain === cc.SubdomainName.BAUCUA ) {
                    if (host === 'ibom2.cc' || host === 'ibom3.cc') {
                        host = 'bay789x.me';
                    }
                }

                request = cc.loader.getXMLHttpRequest();
                var urlRequest = 'https://' + subdomain + host + '/' + url;

                if (Debug) {
                    console.log('sendRequest');
                    console.log(urlRequest);
                }

                if (cc.ServerConnector.getInstance().getToken()) {
                    if (urlRequest.includes("?")) {
                        urlRequest += ('&access_token=' + encodeURIComponent(cc.ServerConnector.getInstance().getToken()));
                    } else {
                        urlRequest += ('?access_token=' + encodeURIComponent(cc.ServerConnector.getInstance().getToken()));
                    }
                }

                request.timeout = 60000;
                request.open(cc.RequestType.GET, urlRequest); //+ '?' + Math.random()
                request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');

                if (!cc.sys.isNative)
                    request.withCredentials = true;
                else if (cc.ServerConnector.getInstance().getCookie()) {
                    request.credentials = true;
                    request.setRequestHeader('cookie', cc.ServerConnector.getInstance().getCookie());
                }
                request.onreadystatechange = function () {
                    if (request.readyState === 4 && request.status === 200) {
                        if (Debug) {
                            console.log('sendRequest responseText: ');
                            console.log(request.responseText);
                        }

                        // //moi them -> sau nay sua parse JSON o day luon
                        // var obj = JSON.parse(request.responseText);

                        // var receiveDate = (new Date()).getTime();
                        // cc.DDNA.getInstance().logAPI(subdomain, url, receiveDate - sendDate);

                        return callback(request.responseText);
                    }
                };
                return request.send();
            } catch (error) {
                e = error;
                return console.log('Caught Exception: ' + e.message);
            }
        };

        //POST
        ServerConnector.prototype.sendRequestPOST = function (subdomain, url, params, callback, isSetCookie) {
            var e, request;
            try {
                var host = netConfig.HOST;
                if (subdomain === cc.SubdomainName.TREASURE) {
                    if (host === 'ibom2.cc' || host === 'ibom3.cc') {
                        host = 'bay789x.me';
                    }
                }

                request = cc.loader.getXMLHttpRequest();
                var urlRequest = 'https://' + subdomain + host + '/' + url;

                // var sendDate = (new Date()).getTime();

                if (Debug) {
                    console.log('sendRequestPOST');
                    console.log(urlRequest);
                    console.log('sendRequestPOST params: ');
                    console.log(params);
                }

                if (cc.ServerConnector.getInstance().getToken()) {
                    if (urlRequest.includes("?")) {
                        urlRequest += ('&access_token=' + encodeURIComponent(cc.ServerConnector.getInstance().getToken()));
                    } else {
                        urlRequest += ('?access_token=' + encodeURIComponent(cc.ServerConnector.getInstance().getToken()));
                    }
                }

                request.timeout = 60000;
                request.open(cc.RequestType.POST, urlRequest);
                request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');

                if (!cc.sys.isNative)
                    request.withCredentials = true;
                else if (cc.ServerConnector.getInstance().getCookie()) {
                    request.setRequestHeader('cookie', cc.ServerConnector.getInstance().getCookie());
                }

                request.onreadystatechange = function () {
                    if (request.readyState === 4 && request.status === 200) {
                        if (cc.sys.isNative) {
                            // console.log(request.getResponseHeader('Set-Cookie'));
                            // if (request.getResponseHeader('Set-Cookie')) {
                            //     var cookies = request.getResponseHeader('Set-Cookie').split(';');
                            //     var cookie = '';
                            //     var cookieName = cc.HubName.CookieName;
                            //     for (var i = 0; i < cookies.length; i++)
                            //     {
                            //         var temp = cookies[i];
                            //         if (temp.indexOf(cookieName) >= 0) {
                            //             cookie = temp;
                            //             break;
                            //         }
                            //     }
                            //     cookie = cookie.substring(temp.indexOf(cookieName), cookie.length);
                            //     console.log('Set-Cookie:' + cookie);
                            //     cc.ServerConnector.getInstance().setCookie(cookie);
                            // }
                        }
                        if (Debug) {
                            console.log('sendRequestPOST responseText');
                            console.log(request.responseText);
                        }

                        //moi them -> sau nay sua parse JSON o day luon
                        var obj = JSON.parse(request.responseText);
                        if (obj.ResponseCode === -1001) {
                            cc.PopupController.getInstance().showPopupRequireLogin(cc.HubError.ERROR_1001_NOT_AUTHENTICATE);
                        }
                        // var receiveDate = (new Date()).getTime();
                        // cc.DDNA.getInstance().logAPI(subdomain, url, receiveDate - sendDate);

                        return callback(request.responseText);
                    }
                };
                return request.send(params);
            } catch (error) {
                e = error;
                return console.log('Caught Exception: ' + e.message);
            }
        };

        ServerConnector.prototype.getToken = function () {
            return this.token;
        };

        ServerConnector.prototype.setToken = function (token) {
            if (token === null) {
                cc.Tool.getInstance().setItem("@atn", null);
            } else {
                cc.Tool.getInstance().setItem("@atn", token);
            }
            if (Configs && Configs.Login) {
                Configs.Login.Token = token;
            }
            return this.token = token;
        };

        ServerConnector.prototype.setLatitude = function (latitude) {
            return this.latitude = latitude;
        };

        ServerConnector.prototype.getLatitude = function () {
            return this.latitude;
        };

        ServerConnector.prototype.setLongitude = function (longitude) {
            return this.longitude = longitude;
        };

        ServerConnector.prototype.getLongitude = function () {
            return this.longitude;
        };

        ServerConnector.prototype.setCookie = function (cookie) {
            return this.cookie = cookie;
        };

        ServerConnector.prototype.getCookie = function () {
            return this.cookie;
        };

        ServerConnector.prototype.setCookie = function (cookie) {
            return this.cookie = cookie;
        };

        ServerConnector.prototype.getDeviceId = function () {
            return this.deviceId;
        };

        ServerConnector.prototype.setDeviceId = function (deviceId) {
            return this.deviceId = deviceId;
        };

        ServerConnector.prototype.getCaptchaPrivateKey = function () {
            return this.captchaPrivateKey;
        };

        ServerConnector.prototype.setCaptchaPrivateKey = function (captchaPrivateKey) {
            return this.captchaPrivateKey = captchaPrivateKey;
        };

        return ServerConnector;

    })();

    cc.ServerConnector = ServerConnector;

}).call(this);
