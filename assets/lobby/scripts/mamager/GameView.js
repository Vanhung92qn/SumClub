/**
 * Created by Nofear on 6/7/2017.
 */
var netConfig = require('NetConfig');

(function () {
    cc.GameView = cc.Class({
        "extends": cc.Component,
        properties: {
            lobbyView: cc.LobbyView,
            popupView: cc.PopupView,
        },

        onLoad: function () {

            //set lat long mac dinh
            cc.ServerConnector.getInstance().setLatitude(0);
            cc.ServerConnector.getInstance().setLongitude(0);
            cc.LocationController.getInstance().init();
            if (cc.sys.isNative && cc.sys.os === cc.sys.OS_IOS) {
                if (cc.sys.platform === cc.sys.IPAD) {
                    cc.game.setFrameRate(30);
                } else {
                    var w = cc.view.getFrameSize().width;                    
                    switch (w) {
                        case 1136:
                            console.log("iPhone 5 or 5S or 5C");
                            cc.game.setFrameRate(30);
                            break;
                        case 1334:
                            console.log("iPhone 6/6S/7/8");
                            cc.game.setFrameRate(30);
                            break;
                        case 1920:
                        case 2208:
                            console.log("iPhone 6+/6S+/7+/8+");
                            cc.game.setFrameRate(30);
                            break;
                        case 2436:
                            console.log("iPhone X, XS");
                            cc.game.setFrameRate(60);
                            break;
                        case 2688:
                            console.log("iPhone XS Max");
                            cc.game.setFrameRate(60);
                            break;
                        case 1792:
                            console.log("iPhone XR");
                            cc.game.setFrameRate(30);
                            break;
                        default:
                            console.log("Unknown");
                            cc.game.setFrameRate(30);
                            break;
                    }
                }
            } else {
                cc.game.setFrameRate(60);
            }
			let isIOS14Device = cc.sys.os === cc.sys.OS_IOS && cc.sys.isBrowser && cc.sys.isMobile && /iPhone OS 14/.test(window.navigator.userAgent);
				if (isIOS14Device) {
					cc.MeshBuffer.prototype.checkAndSwitchBuffer = function (vertexCount) {
					if (this.vertexOffset + vertexCount > 65535) {
						this.uploadData();
						this._batcher._flush();
					}
				};     
					cc.MeshBuffer.prototype.forwardIndiceStartToOffset = function () {
						this.uploadData();
						this.switchBuffer();
					}  
				}
            if (cc.sys.isNative) {
                if (cc.Device) {
                    cc.Device.setKeepScreenOn(true);
                } else if ( jsb.Device) {
                    jsb.Device.setKeepScreenOn(true);
                } else {
                    // console.log('cc.Device undefined');
                }
            } else {
                // this.getGeolocation();
            }

            //setup popupView
            cc.PopupController.getInstance().setPopupView(this.popupView);
            cc.PopupController.getInstance().init();
            //reset timer OTP khi khoi dong lai
            cc.Tool.getInstance().setItem("@TimeGetOTP", 0);
            cc.Tool.getInstance().setItem("@TimeGetOTPUpdateUsername", 0);
            cc.Tool.getInstance().setItem("@TimeGetOTPChangePass", 0);
            cc.Tool.getInstance().setItem("@TimeGetOTPSecurity", 0);
            cc.Tool.getInstance().setItem("@TimeGetOTPForgotPass", 0);
            cc.Tool.getInstance().setItem("@TimeGetOTPLoginOTP", 0);
            cc.Tool.getInstance().setItem("@TimeGetOTPSafe", 0);
            cc.Tool.getInstance().setItem("@TimeGetOTPTransfer", 0);
            cc.Tool.getInstance().setItem("@TimeGetOTPRedeem", 0);
            cc.Tool.getInstance().setItem("@TimeGetOTPTeleSafe", 0);
            cc.Tool.getInstance().setItem("@TimeGetOTPPopupOTP", 0);

            cc.Tool.getInstance().setItem('@GC', '');

            //set game View
            cc.GameController.getInstance().setGameView(this);

            //set lobbyView
            cc.LobbyController.getInstance().setLobbyView(this.lobbyView);

            // //tao man loginView -> bo? -> ko tao tu dau
            // this.lobbyView.createLoginView();

            //Check Sound
            if (cc.Tool.getInstance().getItem("@Sound") === null) {
                cc.Tool.getInstance().setItem("@Sound", true);
            }

            if (cc.Tool.getInstance().getItem("@Music") === null) {
                cc.Tool.getInstance().setItem("@Music", true);
            }

            //tao deviceId
            if (cc.Tool.getInstance().getItem("@DeviceId") === null) {
                var deviceId = cc.Tool.getInstance().generateUUID();
                cc.Tool.getInstance().setItem("@DeviceId", deviceId);
            } else {
                deviceId = cc.Tool.getInstance().getItem("@DeviceId");
            }

            //get last token
            if (cc.Tool.getInstance().getItem("@atn") !== null) {
                cc.ServerConnector.getInstance().setToken(cc.Tool.getInstance().getItem("@atn"));
            }

            //neu ko phai native -> kiem tra xem co token ko (truong hop Login FB)
            if (!cc.sys.isNative) {
                var token = cc.Tool.getInstance().getParameterByName('access_token', null);
                if (token !== null) {
                    //neu co token thi set luon
                    cc.ServerConnector.getInstance().setToken(token);
                    //cat duoi
                    window.history.replaceState("", "", '/');
                }

                //window.history.pushState("", "", '?');
                //window.history.replaceState("", "", '/');
            }

            //set deviceId
            cc.ServerConnector.getInstance().setDeviceId(deviceId);

            this.lastTimeReconnect = (new Date()).getTime();

            this.tryLogin();

            var self = this;

            //Event triggered when game back to foreground Please note that this event is not 100% guaranteed to be fired.
            cc.game.on(cc.game.EVENT_SHOW, function () {
               cc.NotifyController.getInstance().getNotify();

                if (cc.Config.getInstance().getDomainVK().includes(netConfig.HOST)) {
                    if (cc.sys.isNative) {
                        if (cc.PopupController.getInstance().isShowPopupRequireEnableLocation()) {
                            cc.PopupController.getInstance().showBusy();
                            cc.LocationController.getInstance().getLocation();

                            setTimeout(function () {
                                cc.LocationController.getInstance().getLocation();
                                cc.PopupController.getInstance().hideBusy();

                                //tat popup setting location neu dang hien
                                cc.PopupController.getInstance().closePopupRequireEnableLocation();
                            }, 2000);
                        }
                    }
                }

               //EVENT SAN KHO BAU
               //  if (!cc.Config.getInstance().getDomainVK().includes(netConfig.HOST)) {
               //      cc.TreasureController.getInstance().sendRequestOnHub(cc.MethodHubName.TREASURE_GET_CARROT_USER_INFO);
               //  }

            });
            /*
           var self = this;
           window.onfocus = function () {

           };*/                    
        },

        getLocationOnMobile: function () {
            setTimeout(function () {
                if (cc.PopupController.getInstance().isShowPopupRequireEnableLocation()) {
                    cc.PopupController.getInstance().getLocation();
                }
            }, 5000);
        },

        getGeolocation: function () {
            let geolocation = navigator.geolocation;
            if (geolocation) {
                // Có hỗ trợ geolocation
                let options = {
                    enableHighAccuracy: true,
                    timeout: 30000,
                    maximumAge: 0
                };
                geolocation.getCurrentPosition(this.onGeoSuccess, this.onGeoError, options);
                // console.log('getGeolocation');
            } else {
                // Không hỗ trợ geolocation
                // console.log('getGeolocation not support');
            }

        },

        onGeoSuccess: function(position) {
            console.log('onGeoSuccess latitude: ', position.coords.latitude);
            console.log('onGeoSuccess longitude', position.coords.longitude);
            cc.ServerConnector.getInstance().setLatitude(position.coords.latitude);
            cc.ServerConnector.getInstance().setLongitude(position.coords.longitude);
        },

        onGeoError: function(error) {
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

            console.log('onGeoError: ', detailError);
        },

        onDestroy: function () {
            this.unscheduleAllCallbacks();
        },

        tryLogin: function () {
            if (!cc.sys.isNative) {
                cc.PopupController.getInstance().showBusy();
                //try login
                var getAccountInfoCommand = new cc.GetAccountInfoCommand;
                getAccountInfoCommand.execute(this);
            }
        },

        portalNegotiate: function () {
            cc.PopupController.getInstance().showBusy();
            var portalNegotiateCommand = new cc.PortalNegotiateCommand;
            portalNegotiateCommand.execute(this);
        },

        //Response
        onGetAccountInfoResponse: function (response) {
            cc.LoginController.getInstance().setLoginResponse(response.AccountInfo);
            cc.LoginController.getInstance().setNickname(response.AccountInfo.AccountName);
            cc.LoginController.getInstance().setUserId(response.AccountInfo.AccountID);
            cc.LoginController.getInstance().setNextVPResponse(response.NextVIP);
            cc.LoginController.getInstance().setTopVPResponse(response.TopVP);

            if (response.AccountInfo.AccountName === null) {
                //tao man loginView
                this.lobbyView.createLoginView();
                cc.LoginController.getInstance().showNickname(true);
                //cc.LoginController.getInstance().showOTP(true);
            } else {
                cc.LobbyController.getInstance().loginSuccess();
            }
        },


        onPortalNegotiateResponse: function (response) {
            this.connectionToken = response.ConnectionToken;
            this.portalHub = new cc.Hub;
            this.portalHub.connect(this, cc.HubName.PortalHub, response.ConnectionToken);
        },

        sendRequestOnHub: function (method) {
            switch (method) {
                case cc.MethodHubName.ENTER_LOBBY:
                    this.portalHub.enterLobby();
                    break;
                case cc.MethodHubName.PING_PONG:
                    this.portalHub.pingPong();
                    break;
            }
        },

        reconnect: function () {
            this.lastTimeReconnect = (new Date()).getTime();
            this.portalHub.connect(this, cc.HubName.PortalHub, this.connectionToken, true);
        },

        onHubClose: function (obj) {
            //reconnect            
            if ((new Date()).getTime() - this.lastTimeReconnect >= netConfig.RECONNECT_TIME * 1000) {
                this.reconnect();
            } else {
                cc.director.getScheduler().schedule(this.reconnect, this, netConfig.RECONNECT_TIME, 0, 0, false);
            }
        },

        onHubError: function () {        
            //reconnect
            // if ((new Date()).getTime() - this.lastTimeReconnect >= netConfig.RECONNECT_TIME * 1000) {
            //     this.reconnect();
            // } else {
            //     cc.director.getScheduler().schedule(this.reconnect, this, netConfig.RECONNECT_TIME, 0, 0, false);
            // }
        },

        onHubOpen: function (obj) {
            cc.HubController.getInstance().setPortalHub(this.portalHub);

            this.sendRequestOnHub(cc.MethodHubName.ENTER_LOBBY);
            cc.PopupController.getInstance().hideBusy();

        },

        onHubMessage: function (response) {

            if (response.M !== undefined && response.M.length > 0) {
                var m = (response.M)[0];
                switch (m.M) {
                    //vao Phong
                    case cc.MethodHubOnName.TOPUP_CARD:
                        // var data = m.A[0];
                        //﻿A: [0, "Nạp thẻ thất bại", 1, 0]}
                        //﻿balance, msg, ServiceID, Status
                        if (m.A[3] === 1) {
                            //thanh cong
                            cc.PopupController.getInstance().showMessage(m.A[1]);
                        } else if (m.A[3] === 0) {
                            // nap that bai
                            cc.PopupController.getInstance().showMessage(m.A[1]);
                        }

                        cc.LobbyController.getInstance().refreshAccountInfo();
                        break;

                   // case cc.MethodHubOnName.EFFECT_JACKPOT_ALL:
                       // cc.LobbyController.getInstance().showFxWinJackpot(m.A[0]);

                        cc.LobbyJackpotController.getInstance().getXJackpot();
                        break;
                }
            } else {
                //PING PONG
                if (response.I) {
                    this.portalHub.pingPongResponse(response.I);
                }
            }
        },
    });
}).call(this);
