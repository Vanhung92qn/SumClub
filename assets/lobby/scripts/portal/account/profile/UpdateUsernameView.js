/**
 * Created by Nofear on 3/15/2019.
 */

var netConfig = require('NetConfig');

(function () {
    cc.UpdateUsernameView = cc.Class({
        "extends": cc.Component,
        properties: {
            profileView: cc.ProfileView,

            editBoxUsername: cc.EditBox,
            editBoxNewPassword: cc.EditBox,
            editBoxRePassword: cc.EditBox,
            editBoxOTP: cc.EditBox,

            btnGetOTPs: [cc.Button],
            lbBtnGetOTPs: [cc.Label],

            lbError: cc.Label,

            //menu otp
            nodeTeleSafes: [cc.Node],

            animationMenuOTP: cc.Animation,
            lbOTPType: cc.Label,
        },

        onLoad: function () {
            this.isTimer = false;
            this.timer = 0;
            this.timePerGetOTP = 120;
            this.updateInterval = 1;
            this.updateTimer = 0;
            this.otpType = cc.OTPType.TELE_SAFE;
        },

        onEnable: function () {
            this.lbError.string = '';
            this.timer = parseInt(cc.Tool.getInstance().getItem("@TimeGetOTPUpdateUsername"));
            this.processTimeOTPButton();

            var loginResponse = cc.LoginController.getInstance().getLoginResponse();

            //#KingViet
            if (cc.Config.getInstance().getDomainVK().includes(netConfig.HOST)) {
                this.nodeTeleSafes.forEach(function (nodeTeleSafe) {
                    nodeTeleSafe.active = false;
                });
                this.otpType = cc.OTPType.TELE_SAFE;
                this.lbOTPType.string = 'App OTP';
            } else {
                if (loginResponse.PhoneSafeNo === null) {
                    this.nodeTeleSafes.forEach(function (nodeTeleSafe) {
                        nodeTeleSafe.active = false;
                    });
                    this.otpType = cc.OTPType.SMS;
                    this.lbOTPType.string = 'SMS';
                }
            }
        },

        onDisable: function () {
            cc.Tool.getInstance().setItem("@TimeGetOTPUpdateUsername", Math.round(this.timer));
        },

        onDestroy: function () {
            cc.Tool.getInstance().setItem("@TimeGetOTPUpdateUsername", Math.round(this.timer));
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

        //Response
        onGetOTPResponse: function (response) {
            if (response.Message) {
                cc.PopupController.getInstance().showMessage(response.Message);
            } else {
                cc.PopupController.getInstance().showMessage('Lấy OTP thành công');
            }
        },

        onGetOTPResponseError: function (response) {
            cc.PopupController.getInstance().showMessageError(response.Message, response.ResponseCode);
        },

        //update FB Info thanh cong
        onChangeFBInfoResponse: function (response) {
            cc.PopupController.getInstance().showMessage(response.Message, response.ResponseCode);

            var loginResponse = cc.LoginController.getInstance().getLoginResponse();
            loginResponse.IsUpdatedFB = true;
            cc.LoginController.getInstance().setLoginResponse(loginResponse);

            this.profileView.nodeBtnUpdateUsername.active = false;
            this.profileView.nodeBtnChangePass.active = true;
            this.profileView.nodeInfo.active = true;
            this.profileView.nodeUpdateUsername.active = false;

        },

        onChangeFBInfoResponseError: function (response) {
            cc.PopupController.getInstance().showMessageError(response.Message, response.ResponseCode);
        },

        selectOTPEvent: function(event, data) {
            this.otpType = data.toString() === 'App OTP' ? cc.OTPType.TELE_SAFE : cc.OTPType.SMS;
            this.lbOTPType.string = data.toString();
            this.animationMenuOTP.play('hideDropdownMenu');
        },

        openMenuOTPClicked: function () {
            this.animationMenuOTP.play('showDropdownMenu');
        },

        hideMenuOTPClicked: function () {
            this.animationMenuOTP.play('hideDropdownMenu');
        },

        updateFBInfoClicked: function () {
            this.lbError.string = '';

            this.username = this.editBoxUsername.string;
            this.newPass = this.editBoxNewPassword.string;
            this.rePassword = this.editBoxRePassword.string;
            this.otp = this.editBoxOTP.string;

            if (this.username === '') {
                this.lbError.string = 'Vui lòng nhập tên đăng nhập';
                return;
            }

            if (this.newPass === '') {
                this.lbError.string = 'Vui lòng nhập mật khẩu';
                return;
            }

            if (this.rePassword === '') {
                this.lbError.string = 'Vui lòng nhập lại mật khẩu';
                return;
            }

            if (this.rePassword !== this.newPass) {
                this.lbError.string = 'Nhập lại mật khẩu không khớp';
                return;
            }

            // if (this.otp === '') {
            //     this.lbError.string = 'Vui lòng nhập mã OTP';
            //     return;
            // }

            var changeFBInfoCommand = new cc.ChangeFBInfoCommand;
            changeFBInfoCommand.execute(this);
        },

        getOTPClicked: function () {
            this.activeTimeOTPButton();

            var getOTPCommand = new cc.GetOTPCommand;
            getOTPCommand.execute(this, '', this.otpType);
        },
    });
}).call(this);
