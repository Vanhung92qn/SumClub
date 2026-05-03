/**
 * Created by Nofear on 6/7/2017.
 */

var netConfig = require('NetConfig');

(function () {
    cc.LoginView = cc.Class({
        "extends": cc.Component,
        properties: {
            nodeLogin: cc.Node,
            nodeButtonLoginFB: cc.Node,
            // nodeLoginOTP: cc.Node,

            editBoxUsername: cc.EditBox,
            editBoxPassword: cc.EditBox,
            toggleRememberPass: cc.Toggle,

            //node PlaceHolder phu
            // nodeUsernamePlaceHolder: cc.Node,
            // nodePasswordPlaceHolder: cc.Node,
            // nodeCaptchaPlaceHolder: cc.Node,

          //  lbError: cc.Label,

            //bat captcha khi login sai nhieu lan
            nodeCaptcha: cc.Node,
            editBoxCaptcha: cc.EditBox,
            imageUrlCaptcha: cc.ImageUrl,

            //hien tren ban web
            nodeClose: cc.Node,
        },

        onLoad: function () {
            cc.LoginController.getInstance().setLoginView(this);
            this.nodeCaptcha.active = false;
            this.node.zIndex =  cc.NoteDepth.LOGIN_VIEW;
            //this.nodeClose.active = !cc.sys.isNative;
            this.animation = this.node.getComponent(cc.Animation);

            // if (cc.Config.getInstance().checkFDomain() && this.nodeButtonLoginFB) {
            //     this.nodeButtonLoginFB.active = false;
            // }

        },

        onEnable: function () {
           // this.lbError.string = '';
            var tool = cc.Tool.getInstance();
            if (tool.getItem('@rememberPassword') !== null) {
                if (tool.getItem('@rememberPassword') === 'true') {
                    this.editBoxUsername.string = tool.getItem('@username').toString();
                    this.editBoxPassword.string = tool.getItem('@password').toString();
                    this.toggleRememberPass.isChecked = false;
                } else {
                    this.toggleRememberPass.isChecked = false;
                }
            } else {
                this.toggleRememberPass.isChecked = false;
            }

            // this.checkShowPlaceholder();

            // cc.PopupController.getInstance().showBusy();
            // //try login
            // var getAccountInfoCommand = new cc.GetAccountInfoCommand;
            // getAccountInfoCommand.execute(this);

            this.animation.play('openPopup');
        },

        //Dang test du ly scroll window game
        adjustEditBoxPosition: function (editBox) {
            // console.log('loginView adjustEditBoxPosition ');
            var worldPos = editBox.node.convertToWorldSpace(cc.v2(0,0));
            var windowHeight = cc.visibleRect.height;
            var windowWidth = cc.visibleRect.width;
            var factor = 0.5;

            // console.log('loginView adjustEditBoxPosition windowHeight: ' + windowHeight);
            // console.log('loginView adjustEditBoxPosition windowWidth: ' + windowWidth);
            if(windowWidth > windowHeight) {
                factor = 0.7;
            }

            // console.log('loginView adjustEditBoxPosition window.scrollY: ' + window.scrollY);
            // console.log('loginView adjustEditBoxPosition factor: ' + factor);
            // console.log('loginView adjustEditBoxPosition worldPos.y: ' + worldPos.y);
            // console.log('loginView adjustEditBoxPosition windowHeight * factor: ' + windowHeight * factor);

            var SCROLLY = 999;
            setTimeout(function() {
                if(window.scrollY < SCROLLY && worldPos.y < windowHeight * factor) {
                    var scrollOffset = windowHeight * factor - worldPos.y - window.scrollY;
                    if (scrollOffset < 35) scrollOffset = 35;
                    if (scrollOffset > 320) scrollOffset = 320;
                    window.scrollTo(scrollOffset, scrollOffset);
                    // console.log('loginView adjustEditBoxPosition window scrollOffset: ' + scrollOffset);
                }
            }, 1);
        },

        stayOnTop: function (enable) {
            return;
            this.editBoxUsername.stayOnTop = enable;
            this.editBoxPassword.stayOnTop = enable;
            this.editBoxCaptcha.stayOnTop = enable;
        },

        showCaptcha: function() {
            this.nodeCaptcha.active = true;
            this.getCaptcha();
        },

        getCaptcha: function () {
            var getCaptchaCommand = new cc.GetCaptchaCommand;
            getCaptchaCommand.execute(this);
        },

        showLogin: function (enable) {
            this.nodeLogin.active = enable;
        },

        callLogin: function () {
           // this.lbError.string = '';
            this.username = this.editBoxUsername.string;
            this.password = this.editBoxPassword.string;

            if (this.username === '') {
				cc.PopupController.getInstance().showMessage('Vui lòng nhập tên tài khoản');
                //this.lbError.string = 'Vui lòng nhập tên tài khoản';
                return;
            }

            if (this.password === '') {
				cc.PopupController.getInstance().showMessage('Vui lòng nhập mật khẩu');
              //  this.lbError.string = 'Vui lòng nhập mật khẩu';
                return;
            }

            if (this.nodeCaptcha.active) {
                this.captcha = this.editBoxCaptcha.string;
                if (this.captcha === '') {
					cc.PopupController.getInstance().showMessage('Vui lòng nhập mã xác nhận');
                  //  this.lbError.string = 'Vui lòng nhập mã xác nhận';
                    return;
                }
            }

            cc.Tool.getInstance().setItem('@rememberPassword', this.toggleRememberPass.isChecked);
            if (this.toggleRememberPass.isChecked) {
                cc.Tool.getInstance().setItem('@username', this.username);
                cc.Tool.getInstance().setItem('@password', this.password);
            }
            cc.Tool.getInstance().setItem('@isLanding', false);

            cc.LoginController.getInstance().setUsername(this.username);
            cc.LoginController.getInstance().setPassword(this.password);

            cc.PopupController.getInstance().showBusy();

            var loginCommand = new cc.LoginCommand;
            loginCommand.execute(this);
        },

        editBoxUsernameBegin: function () {
            //this.nodeUsernamePlaceHolder.active = false;
            //if (cc.sys.isNative) {
            //    this.adjustEditBoxPosition(this.editBoxUsername);
            //}
        },

        editBoxUsernameDidEnd: function () {
            // this.nodeUsernamePlaceHolder.active = this.editBoxUsername.string === '';
        },

        editBoxPasswordBegin: function () {
            // this.nodePasswordPlaceHolder.active = false;
            //if (cc.sys.isNative) {
            //    this.adjustEditBoxPosition(this.editBoxPassword);
            //}
        },

        editBoxPasswordDidEnd: function () {
            // this.nodePasswordPlaceHolder.active = this.editBoxPassword.string === '';
        },


        editBoxPasswordDidGo: function () {
            this.callLogin();
        },

        editBoxCaptchaBegin: function () {
            //this.nodeCaptchaPlaceHolder.active = false;
        },

        editBoxCaptchaDidEnd: function () {
            //this.nodeCaptchaPlaceHolder.active = this.editBoxPassword.string === '';
        },

        checkShowPlaceholder: function () {
            // this.nodeUsernamePlaceHolder.active = this.editBoxUsername.string === '';
            // this.nodePasswordPlaceHolder.active = this.editBoxPassword.string === '';
            // this.nodeCaptchaPlaceHolder.active = this.editBoxCaptcha.string === '';
        },

        //Response
        onGetAccountInfoResponse: function (response) {
            cc.LoginController.getInstance().setLoginResponse(response.AccountInfo);
            cc.LoginController.getInstance().setNextVPResponse(response.NextVIP);
            cc.LoginController.getInstance().setNickname(response.AccountInfo.AccountName);
            cc.LoginController.getInstance().setUserId(response.AccountInfo.AccountID);
            cc.LoginController.getInstance().setTopVPResponse(response.TopVP);

            if (response.AccountInfo.AccountName === null) {
                cc.LoginController.getInstance().showNickname(true);
            } else if (response.AccountInfo.AuthenType === 1) {
                //KO lam gi ca -> bat nhap username + password de login

                //Cho qua luon ko hien OTP de test
                //cc.LobbyController.getInstance().loginSuccess();
                //cc.LobbyController.getInstance().destroyLoginView();
            } else {
                cc.LobbyController.getInstance().loginSuccess();
                cc.LobbyController.getInstance().destroyLoginView();
            }
        },

        onGetCaptchaResponse: function (response) {
            this.imageUrlCaptcha.get('data:image/png;base64,' + cc.Tool.getInstance().removeStr(response[1], '\r\n'));
        },

        onLoginResponse: function (response) {

            if (response.Token) {
                cc.ServerConnector.getInstance().setToken(response.Token);
            }
            cc.LoginController.getInstance().setLoginResponse(response.AccountInfo);
            cc.LoginController.getInstance().setNextVPResponse(response.NextVIP);
            cc.LoginController.getInstance().setNickname(response.AccountInfo.AccountName);
            cc.LoginController.getInstance().setUserId(response.AccountInfo.AccountID);
            cc.LoginController.getInstance().setTopVPResponse(response.TopVP);

            if (response.AccountInfo.AccountName === null) {
                cc.LoginController.getInstance().showNickname(true);
            } else if (response.AccountInfo.AuthenType === 1) {
                cc.LoginController.getInstance().showOTP(true);
                // this.nodeLoginOTP.active = true;

                //Cho qua luon ko hien OTP de
                //cc.LobbyController.getInstance().loginSuccess();
                //cc.LobbyController.getInstance().destroyLoginView();
            } else {
                // cc.LobbyController.getInstance().loginSuccess();
                var getAccountInfoCommand = new cc.GetAccountInfoCommand;
                getAccountInfoCommand.execute(this);
                cc.LobbyController.getInstance().destroyLoginView();
            }
        },

        onLoginResponseError: function (response) {
            if (response.ResponseCode === cc.LoginError.REQUIRE_CAPTCHA) {
				cc.PopupController.getInstance().showMessage(response.Message);
                //this.lbError.string = response.Message;
                this.showCaptcha();
            } else if (response.ResponseCode === cc.LoginError.REQUIRE_OTP) {
                cc.LoginController.getInstance().showOTP(true);
                // this.nodeLoginOTP.active = true;
            } else {
               // this.lbError.string = response.Message;
			   cc.PopupController.getInstance().showMessage(response.Message);
            }
        },

        //Click
        loginClicked: function () {
            this.callLogin();
        },

        loginFacebookClicked: function () {
            if (!cc.sys.isNative) {
                // if (netConfig.HOST === 'bigbom.site') {
                //
                // }
                // console.log('https://' + window.location.hostname);
                window.location.replace(netConfig.FB_LOGIN_URL + '?refer=' + cc.Tool.getInstance().getHref());
            } else {
                //cc.FacebookController.getInstance().loginFacebookMobile(this);
            }
        },

        registerClicked: function () {
            this.showLogin(false);
            cc.LoginController.getInstance().showRegister(true);
        },

        forgotPassClicked: function () {
            this.showLogin(false);
            cc.LoginController.getInstance().showForgotPass(true);
        },

        refreshCaptchaClicked: function () {
            this.getCaptcha();
        },

        closeClicked: function () {
            //this.showRegister(false);
            this.animation.play('closePopup');
            var self = this;
            var delay = 0.12;
            cc.director.getScheduler().schedule(function () {
                self.animation.stop();
                cc.LobbyController.getInstance().destroyLoginView();
            }, this, 1, 0, delay, false);
        },

    });
}).call(this);
