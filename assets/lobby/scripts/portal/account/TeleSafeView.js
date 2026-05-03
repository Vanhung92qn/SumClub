/**
 * Created by Nofear on 3/15/2019.
 */

var netConfig = require('NetConfig');

(function () {
    cc.TeleSafeView = cc.Class({
        "extends": cc.Component,
        properties: {
            nodeGroupNoTeleSafe: cc.Node,
            editBoxTeleSafe: cc.EditBox,
            editBoxOTP: cc.EditBox,
            btnGetOTPs: [cc.Button],
            lbBtnGetOTPs: [cc.Label],


            //group hien khi da lien ket TeleSafe
            nodeGroupHaveTeleSafe: cc.Node,
            //group Huy TeleSafe
            nodeGroupDeActive: cc.Node,
            //confirm Huy TeleSafe
            nodeGroupConfirmDeActive: cc.Node,

            lbTeleId: cc.Label,

            //editboxOTP khi confirm huy BM Login
            editBoxOTPDeActive: cc.EditBox,

            //#KingViet
            nodeRuleKV: cc.Node,
            nodeRule: cc.Node,
            nodeKM10K: cc.Node,
        },

        onLoad: function () {
            this.isTimer = false;
            this.timer = 0;
            this.timePerGetOTP = 120;
            this.updateInterval = 1;
            this.updateTimer = 0;
            this.animation = this.node.getComponent(cc.Animation);
        },

        onEnable: function () {
            //#KingViet
            if (cc.Config.getInstance().getDomainVK().includes(netConfig.HOST)) {
                this.editBoxTeleSafe.placeholder = 'Tên đăng nhập App OTP';
                this.nodeRuleKV.active = true;
                this.nodeRule.active = false;

                if (cc.AccountController.getInstance().getAppSafeSatus()) {
                    this.nodeKM10K.active = true;
                }
            } else {
                this.editBoxTeleSafe.placeholder = 'Số điện thoại App OTP';
                this.nodeRuleKV.active = false;
                this.nodeRule.active = true;
            }

            this.init();
            this.animation.play('openPopup');
        },

        onDisable: function () {
            cc.Tool.getInstance().setItem("@TimeGetOTPTeleSafe", Math.round(this.timer));
        },

        onDestroy: function () {
            cc.Tool.getInstance().setItem("@TimeGetOTPTeleSafe", Math.round(this.timer));
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

        init: function () {
            this.timer = parseInt(cc.Tool.getInstance().getItem("@TimeGetOTPSecurity"));
            this.processTimeOTPButton();

            var loginResponse = cc.LoginController.getInstance().getLoginResponse();

            //#KingViet
            if (cc.Config.getInstance().getDomainVK().includes(netConfig.HOST)) {
                if (loginResponse.UserNameSafeNo === null) {
                    this.nodeGroupNoTeleSafe.active = true;
                    this.nodeGroupHaveTeleSafe.active = false;
                } else {
                    var phoneNum = loginResponse.UserNameSafeNo.substring(loginResponse.UserNameSafeNo.length - 3);
                    this.lbTeleId.string = 'Tài khoản App OTP: *******' + phoneNum;
                    this.nodeGroupNoTeleSafe.active = false;
                    this.nodeGroupHaveTeleSafe.active = true;

                    this.nodeGroupDeActive.active = true;
                    this.nodeGroupConfirmDeActive.active = false;
                }
            } else {
                if (loginResponse.PhoneSafeNo === null) {
                    this.nodeGroupNoTeleSafe.active = true;
                    this.nodeGroupHaveTeleSafe.active = false;
                } else {
                    var phoneNum = loginResponse.PhoneSafeNo.substring(loginResponse.PhoneSafeNo.length - 3);
                    this.lbTeleId.string = 'Tài khoản App OTP: *******' + phoneNum;
                    this.nodeGroupNoTeleSafe.active = false;
                    this.nodeGroupHaveTeleSafe.active = true;

                    this.nodeGroupDeActive.active = true;
                    this.nodeGroupConfirmDeActive.active = false;
                }
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

        onGetOTPResponse: function (response) {
            this.activeTimeOTPButton();

            if (response.Message) {
                cc.PopupController.getInstance().showMessage(response.Message);
            } else {
                cc.PopupController.getInstance().showMessage('Lấy OTP thành công');
            }
        },

        onGetOTPResponseError: function (response) {
            cc.PopupController.getInstance().showMessageError(response.Message, response.ResponseCode);
        },

        onOtpSafeLinkAccountResponse: function (response) {
            cc.PopupController.getInstance().showMessage(response.Message);

            this.loginResponse = cc.LoginController.getInstance().getLoginResponse();

            //#KingViet
            if (cc.Config.getInstance().getDomainVK().includes(netConfig.HOST)) {
                this.loginResponse.UserNameSafeNo = this.teleSafe;
                cc.LoginController.getInstance().setLoginResponse(this.loginResponse);
            } else {
                this.loginResponse.PhoneSafeNo = this.teleSafe;
                cc.LoginController.getInstance().setLoginResponse(this.loginResponse);
            }

            this.init();

            cc.DDNA.getInstance().updatePhoneSafeNo(this.teleSafe);

            //#KingViet
            if (cc.Config.getInstance().getDomainVK().includes(netConfig.HOST)) {
                cc.AccountController.getInstance().setAppSafeSatus(false);
                this.nodeKM10K.active = false;
            }
        },

        onOtpSafeLinkAccountResponseError: function (response) {
            cc.PopupController.getInstance().showMessageError(response.Message, response.ResponseCode);
        },

        onOtpSafeDisLinkAccountResponse: function (response) {
            cc.PopupController.getInstance().showMessage(response.Message);

            this.loginResponse = cc.LoginController.getInstance().getLoginResponse();

            //#KingViet
            if (cc.Config.getInstance().getDomainVK().includes(netConfig.HOST)) {
                this.loginResponse.UserNameSafeNo = null;
            } else {
                this.loginResponse.PhoneSafeNo = null;
            }

            cc.LoginController.getInstance().setLoginResponse(this.loginResponse);

            this.init();

            cc.DDNA.getInstance().updatePhoneSafeNo('null');
        },

        getOTPClicked: function () {
            //this.btnGetOTP.interactable = false;
            this.teleSafe = this.editBoxTeleSafe.string;
            if (this.teleSafe === '') {
                cc.PopupController.getInstance().showMessage('Vui lòng nhập tài khoản App OTP');
                return;
            }

            var getOTPCommand = new cc.GetOTPCommand;
            getOTPCommand.execute(this, this.teleSafe, cc.OTPType.TELE_SAFE);
        },

        updateTeleSafeClicked: function () {
            this.otp = this.editBoxOTP.string;
            this.teleSafe = this.editBoxTeleSafe.string;

            if (this.teleSafe === '') {
                cc.PopupController.getInstance().showMessage('Vui lòng nhập tài khoản App OTP');
                return;
            }

            // if (this.otp === '') {
            //     cc.PopupController.getInstance().showMessage('Vui lòng nhập mã OTP');
            //     return;
            // }

            var otpSafeLinkAccountCommand = new cc.OtpSafeLinkAccountCommand;
            otpSafeLinkAccountCommand.execute(this, this.teleSafe, this.otp);
        },

        deleteTeleSafeClicked: function () {
            this.nodeGroupDeActive.active = false;
            this.nodeGroupConfirmDeActive.active = true;
        },

        backDeleteTeleSafeClicked: function () {
            this.nodeGroupDeActive.active = true;
            this.nodeGroupConfirmDeActive.active = false;
        },

        getOTPDeleteTeleSafeClicked: function () {
            this.activeTimeOTPButton();

            var getOTPCommand = new cc.GetOTPCommand;
            getOTPCommand.execute(this, '', cc.OTPType.TELE_SAFE);
        },

        confirmDeleteTeleSafeClicked: function () {
            this.otp = this.editBoxOTPDeActive.string;

            // if (this.otp === '') {
            //     cc.PopupController.getInstance().showMessage('Vui lòng nhập mã OTP');
            //     return;
            // }

            var otpSafeDisLinkAccountCommand = new cc.OtpSafeDisLinkAccountCommand;
            otpSafeDisLinkAccountCommand.execute(this, this.otp);
        },

        helpClicked: function () {
            cc.LobbyController.getInstance().createAppSafeHelpView();
        },

         //Click
         backClicked: function () {
            //this.showRegister(false);
            this.animation.play('closePopup');
            var self = this;
            var delay = 0.12;
            cc.director.getScheduler().schedule(function () {
                self.animation.stop();
                self.node.active = false;
            }, this, 1, 0, delay, false);
        },
    });
}).call(this);
