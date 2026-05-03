/**
 * Created by Nofear on 3/14/2019.
 */

var netConfig = require('NetConfig');

(function () {
    cc.LoginOTPView = cc.Class({
        "extends": cc.Component,
        properties: {
            nodeOTP: cc.Node,
            editBoxCode: cc.EditBox,
            animation: cc.Animation,

            btnGetOTPs: [cc.Button],
            lbBtnGetOTPs: [cc.Label],

           // lbError: cc.Label,

            //menu otp
            nodeTeleSafes: [cc.Node],

            animationMenuOTP: cc.Animation,
            lbOTPType: cc.Label,

            //custom
            lbOTPFee: cc.Label,
        },

        // use this for initialization
        onLoad: function () {
            cc.LoginController.getInstance().setOTPView(this);
            this.isTimer = false;
            this.timer = 0;
            this.timePerGetOTP = 120;
            this.updateInterval = 1;
            this.updateTimer = 0;

            this.otpType = cc.OTPType.TELE_GRAM;

            this.lbOTPFee.string = '(Phí 1.000 ' + cc.Config.getInstance().currency() + ' / 1 lần)';
        },

        onEnable: function () {
           // this.lbError.string = '';
            this.editBoxCode.string = '';
            this.timer = parseInt(cc.Tool.getInstance().getItem("@TimeGetOTPLoginOTP"));
            this.processTimeOTPButton();

            //#KingViet
            if (cc.Config.getInstance().getDomainVK().includes(netConfig.HOST)) {
                this.nodeTeleSafes.forEach(function (nodeTeleSafe) {
                    nodeTeleSafe.active = false;
                });
                this.otpType = cc.OTPType.TELE_SAFE;
                this.lbOTPType.string = 'App OTP';
            } else {
                var loginResponse = cc.LoginController.getInstance().getLoginResponse();
                if (loginResponse !== undefined && loginResponse.PhoneSafeNo === null) {
                    this.nodeTeleSafes.forEach(function (nodeTeleSafe) {
                        nodeTeleSafe.active = false;
                    });
                    this.otpType = cc.OTPType.TELE_GRAM;
                }
            }
        },

        onDisable: function () {
            cc.Tool.getInstance().setItem("@TimeGetOTPLoginOTP", Math.round(this.timer));
        },

        onDestroy: function () {
            cc.Tool.getInstance().setItem("@TimeGetOTPLoginOTP", Math.round(this.timer));
        },

        update: function (dt) {
            if (this.isTimer) {
                this.timer -= dt;
                this.updateTimer += dt;

                if (this.updateTimer < this.updateInterval) return; // we don't need to do the math every frame
                this.updateTimer = 0;
                this.processTimeOTPButton();
            }
        },

        activeTimeOTPButton: function () {
            this.isTimer = true;
            this.updateTimer = 1;
            this.timer = this.timePerGetOTP;
        },

        processTimeOTPButton: function () {
            if (this.timer <= 0) {
                this.isTimer = false;
                this.btnGetOTPs.forEach(function (btnGetOTP) {
                    btnGetOTP.interactable = true;
                });
                this.lbBtnGetOTPs.forEach(function (lbBtnGetOTP) {
                    lbBtnGetOTP.string = 'LẤY OTP';
                });
            } else {
                this.isTimer = true;
                var timeBtn = this.timer;
                this.btnGetOTPs.forEach(function (btnGetOTP) {
                    btnGetOTP.interactable = false;
                });
                this.lbBtnGetOTPs.forEach(function (lbBtnGetOTP) {
                    lbBtnGetOTP.string = Math.round(timeBtn);
                });
            }
        },

        showOTP: function (enable) {
            this.nodeOTP.active = enable;
            if (enable) {
                this.animation.play('openPopup');
            } else {
                //cc.LoginController.getInstance().stayOnTop(true);
            }
        },

        backClicked: function () {
            this.animation.play('closePopup');
            var self = this;
            var delay = 0.2;
            cc.director.getScheduler().schedule(function () {
                self.animation.stop();
                self.showOTP(false);
            }, this, 1, 0, delay, false);
        },

        //login
        onLoginOTPResponse: function (response) {
            if (response.Token) {
                cc.ServerConnector.getInstance().setToken(response.Token);
            }

            cc.LoginController.getInstance().setUserId(response.AccountInfo.AccountID);
            cc.LoginController.getInstance().setNickname(response.AccountInfo.AccountName);
            cc.LoginController.getInstance().setLoginResponse(response.AccountInfo);
            cc.LoginController.getInstance().setNextVPResponse(response.NextVIP);
            cc.LobbyController.getInstance().loginSuccess();
            cc.LobbyController.getInstance().destroyLoginView();
        },

        onLoginOTPResponseError: function (response) {
           // this.lbError.string = response.Message;
		    cc.PopupController.getInstance().showMessage(response.Message);
        },

        //getOTP
        onGetOTPResponse: function (response) {
            if (response.Message) {
                cc.PopupController.getInstance().showMessage(response.Message);
            } else {
                cc.PopupController.getInstance().showMessage('Lấy OTP thành công');
            }
        },

        onGetOTPResponseError: function (response) {
           // this.lbError.string = response.Message;
		    cc.PopupController.getInstance().showMessage(response.Message);
        },

        onGetLoginOTPResponse: function (response) {
            if (response.Message) {
                cc.PopupController.getInstance().showMessage(response.Message);
            } else {
                cc.PopupController.getInstance().showMessage('Lấy OTP thành công');
            }
        },

        onGetLoginOTPResponseError: function (response) {
			 cc.PopupController.getInstance().showMessage(response.Message);
           // this.lbError.string = response.Message;
        },

        selectOTPEvent: function (event, data) {
            this.otpType = "";
            if(data.toString() === 'App OTP'){
                this.otpType = cc.OTPType.TELE_SAFE;
            }else if(data.toString() === 'OTP TELE'){
                this.otpType = cc.OTPType.TELE_GRAM;
            }else{
                this.otpType = cc.OTPType.SMS;
            }
            this.lbOTPType.string = data.toString();
            this.animationMenuOTP.play('hideDropdownMenu');
        },

        openMenuOTPClicked: function () {
            this.animationMenuOTP.play('showDropdownMenu');
        },

        hideMenuOTPClicked: function () {
            this.animationMenuOTP.play('hideDropdownMenu');
        },

        loginOTPClicked: function () {
           // this.lbError.string = '';
            this.otp = this.editBoxCode.string;

            // if (this.otp === '') {
            //    // this.lbError.string = 'Vui lòng nhập mã OTP';
			//     cc.PopupController.getInstance().showMessage('Vui lòng nhập mã OTP');
            //     return;
            // }

            var loginOTPCommand = new cc.LoginOTPCommand;
            loginOTPCommand.execute(this, this.otpType);
        },

        getOTPClicked: function () {
            this.activeTimeOTPButton();


            var getLoginOTPCommand = new cc.GetLoginOTPCommand;
            getLoginOTPCommand.execute(this, this.otpType);

            /*
            var getOTPCommand = new cc.GetOTPCommand;
            getOTPCommand.execute(this);*/
        },
    });
}).call(this);
