/**
 * Created by Nofear on 3/15/2019.
 */

var netConfig = require('NetConfig');

(function () {
    cc.ChangePassView = cc.Class({
        "extends": cc.Component,
        properties: {
            editBoxOldPassword: cc.EditBox,
            editBoxNewPassword: cc.EditBox,
            editBoxRePassword: cc.EditBox,
            editBoxCaptcha: cc.EditBox,
           // editBoxOTP: cc.EditBox,

            imageUrlCaptcha: cc.ImageUrl,

        //    btnGetOTPs: [cc.Button],
           // lbBtnGetOTPs: [cc.Label],

           // lbError: cc.Label,

            //menu otp
          //  nodeTeleSafes: [cc.Node],

           // animationMenuOTP: cc.Animation,
            //lbOTPType: cc.Label,
        },

        onLoad: function () {
            this.isTimer = false;
            this.timer = 0;
            this.updateInterval = 1;
            this.updateTimer = 0;
          
			 this.animation = this.node.getComponent(cc.Animation);
        },

        onEnable: function () {
            this.animation.play('openPopup');
            this.getCaptcha();
           // this.timer = parseInt(cc.Tool.getInstance().getItem("@TimeGetOTPChangePass"));
          //  this.processTimeOTPButton();

            var loginResponse = cc.LoginController.getInstance().getLoginResponse();

        },

        onDisable: function () {
            cc.Tool.getInstance().setItem("@TimeGetOTPChangePass", Math.round(this.timer));
        },

        onDestroy: function () {
            cc.Tool.getInstance().setItem("@TimeGetOTPChangePass", Math.round(this.timer));
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

        getCaptcha: function () {
            var getCaptchaCommand = new cc.GetCaptchaCommand;
            getCaptchaCommand.execute(this);
        },

        //Response
     
       

        onGetCaptchaResponse: function (response) {
            this.imageUrlCaptcha.get('data:image/png;base64,' + cc.Tool.getInstance().removeStr(response[1], '\r\n'));
        },

        onChangePasswordResponse: function (response) {
            cc.PopupController.getInstance().showMessage(response.Message, response.ResponseCode);
            this.getCaptcha();
        },

        onChangePasswordResponseError: function (response) {
            //this.lbError.string = response.Message;
			cc.PopupController.getInstance().showMessage(response.Message, response.ResponseCode);
            this.getCaptcha();
        },

      

      
       

        changePasswordClicked: function () {
            

            this.oldPass = this.editBoxOldPassword.string;
            this.newPass = this.editBoxNewPassword.string;
            this.rePassword = this.editBoxRePassword.string;
            this.captcha = this.editBoxCaptcha.string;
          

            if (this.oldPass === '') {
               cc.PopupController.getInstance().showMessage('Vui lòng nhập mật khẩu cũ');
                return;
            }

            if (this.newPass === '') {
               cc.PopupController.getInstance().showMessage('Vui lòng nhập mật khẩu mới');
                return;
            }

            if (this.rePassword === '') {
                cc.PopupController.getInstance().showMessage('Vui lòng nhập lại mật khẩu mới');
                return;
            }

            if (this.rePassword !== this.newPass) {
                cc.PopupController.getInstance().showMessage('Nhập lại mật khẩu không khớp');
                return;
            }

            if (this.captcha === '') {
                 cc.PopupController.getInstance().showMessage('Vui lòng nhập mã xác nhận');
                return;
            }

          

            var changePasswordCommand = new cc.ChangePasswordCommand;
            changePasswordCommand.execute(this);
        },

 

        refreshCaptchaClicked: function () {
            this.getCaptcha();
        },
    });
}).call(this);
