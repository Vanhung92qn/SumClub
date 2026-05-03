/**
 * Created by Nofear on 3/14/2019.
 */

var netConfig = require('NetConfig');

(function () {
    cc.ForgotPassView = cc.Class({
        "extends": cc.Component,
        properties: {
            nodeForgotPass: cc.Node,

            editBoxUsername: cc.EditBox,
            editBoxPhoneNumber: cc.EditBox,
            editBoxOTP: cc.EditBox,
            editBoxPassword: cc.EditBox,
            editBoxRePassword: cc.EditBox,
            editBoxCode: cc.EditBox,

            animation: cc.Animation,
            imageUrlCaptcha: cc.ImageUrl,

            btnGetOTPs: [cc.Button],
            lbBtnGetOTPs: [cc.Label],

           // lbError: cc.Label,

            //menu otp
            nodeTeleSafes: [cc.Node],

            animationMenuOTP: cc.Animation,
            lbOTPType: cc.Label,
        },

        // use this for initialization
        onLoad: function () {
            this.isTimer = false;
            this.timer = 0;
            this.timePerGetOTP = 120;
            this.updateInterval = 1;
            this.updateTimer = 0;
            cc.LoginController.getInstance().setForgotPassView(this);

            this.otpType = cc.OTPType.TELE_GRAM;
            this.lbOTPType.string = 'OTP TELE';


            //#KingViet
            if (cc.Config.getInstance().getDomainVK().includes(netConfig.HOST)) {
                this.nodeTeleSafes.forEach(function (nodeTeleSafe) {
                    nodeTeleSafe.active = false;
                });
                this.otpType = cc.OTPType.TELE_SAFE;
                this.lbOTPType.string = 'App OTP';
            } else {

            }
        },

        onEnable: function () {
           // this.lbError.string = '';
            this.timer = parseInt(cc.Tool.getInstance().getItem("@TimeGetOTPForgotPass"));
            this.processTimeOTPButton();
        },

        onDisable: function () {
            cc.Tool.getInstance().setItem("@TimeGetOTPForgotPass", Math.round(this.timer));
        },

        onDestroy: function () {
            cc.Tool.getInstance().setItem("@TimeGetOTPForgotPass", Math.round(this.timer));
        },

        resetInput: function () {
            this.editBoxUsername.string = '';
            this.editBoxPhoneNumber.string = '';
            this.editBoxOTP.string = '';
            this.editBoxPassword.string = '';
            this.editBoxRePassword.string = '';
            this.editBoxCode.string = '';
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

        getCaptcha: function () {
            var getCaptchaCommand = new cc.GetCaptchaCommand;
            getCaptchaCommand.execute(this);
        },

        showForgotPass: function (enable) {
            this.nodeForgotPass.active = enable;
            if (enable) {
                this.resetInput();
                this.getCaptcha();
                this.animation.play('openPopup');
            }
        },

        //Response
        onGetCaptchaResponse: function (response) {
            this.imageUrlCaptcha.get('data:image/png;base64,' + cc.Tool.getInstance().removeStr(response[1], '\r\n'));
        },

        onGetOTPForgotPasswordResponse: function (response) {
            if (response.Message) {
                cc.PopupController.getInstance().showMessage(response.Message);
            } else {
                cc.PopupController.getInstance().showMessage('Lấy OTP thành công');
            }
        },

        onForgotPasswordResponse: function (response) {
            cc.PopupController.getInstance().showMessage(response.Message);
            this.closeForgotPass();
        },

        onForgotPasswordResponseError: function (response) {
			cc.PopupController.getInstance().showMessage(response.Message);
           // this.lbError.string = response.Message;
        },

        closeForgotPass: function () {
            this.animation.play('closePopup');
            cc.LoginController.getInstance().showLogin(true);
            var self = this;
            var delay = 0.12;
            cc.director.getScheduler().schedule(function () {
                self.animation.stop();
                self.showForgotPass(false);
            }, this, 1, 0, delay, false);
        },

        selectOTPEvent: function(event, data) {
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

        backClicked: function () {
           this.closeForgotPass();
        },
        
        changePasswordClicked: function () {
           // this.lbError.string = '';

            this.username = this.editBoxUsername.string;
            this.phoneNumber = this.editBoxPhoneNumber.string;
            this.otp = this.editBoxOTP.string;
            this.password = this.editBoxPassword.string;
            this.rePassword = this.editBoxRePassword.string;
            this.captcha = this.editBoxCode.string;

            if (this.username === '') {
               // this.lbError.string = 'Vui lòng nhập tên tài khoản';
			   cc.PopupController.getInstance().showMessage('Vui lòng nhập tên tài khoản');
                return;
            }

            if (this.phoneNumber === '') {
                //#KingViet
                if (cc.Config.getInstance().getDomainVK().includes(netConfig.HOST)) {
					 cc.PopupController.getInstance().showMessage('Vui lòng nhập tài khoản App OTP');
                    //this.lbError.string = 'Vui lòng nhập tài khoản App OTP';
                } else {
                    //this.lbError.string = 'Vui lòng nhập số điện thoại';
					cc.PopupController.getInstance().showMessage('Vui lòng nhập số điện thoại');
                }
                return;
            }

            // if (this.otp === '') {
            //    // this.lbError.string = 'Vui lòng nhập mã OTP';
			//    cc.PopupController.getInstance().showMessage('Vui lòng nhập mã OTP');
            //     return;
            // }

            if (this.password === '') {
               // this.lbError.string = 'Vui lòng nhập mật khẩu';
			   cc.PopupController.getInstance().showMessage('Vui lòng nhập mật khẩu');
                return;
            }

            if (this.rePassword && this.password === '') {
                //this.lbError.string = 'Nhập lại mật khẩu không khớp';
				cc.PopupController.getInstance().showMessage('Nhập lại mật khẩu không khớp');
                return;
            }

            if (this.captcha === '') {
                //this.lbError.string = 'Vui lòng nhập mã xác nhận';
				cc.PopupController.getInstance().showMessage('Vui lòng nhập mã xác nhận');
                return;
            }

            var forgotPasswordCommand = new cc.ForgotPasswordCommand;
            forgotPasswordCommand.execute(this);
        },

        getOTPClicked: function () {
            this.username = this.editBoxUsername.string;
            this.phoneNumber = this.editBoxPhoneNumber.string;

            if (this.username === '') {
              //  this.lbError.string = 'Vui lòng nhập tên tài khoản';
			  cc.PopupController.getInstance().showMessage('Vui lòng nhập tên tài khoản');
                return;
            }

            if (this.phoneNumber === '') {
             //   this.lbError.string = 'Vui lòng nhập số điện thoại';
			 cc.PopupController.getInstance().showMessage('Vui lòng nhập số điện thoại');
                return;
            }

            this.activeTimeOTPButton();

            var getOTPForgotPasswordCommand = new cc.GetOTPForgotPasswordCommand;
            getOTPForgotPasswordCommand.execute(this, this.otpType);
        },

        refreshCaptchaClicked: function () {
            this.getCaptcha();
        },
    });
}).call(this);
