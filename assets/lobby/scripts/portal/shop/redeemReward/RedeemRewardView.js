/**
 * Created by Nofear on 3/15/2019.
 */

var netConfig = require('NetConfig');

(function () {
    cc.RedeemRewardView = cc.Class({
        "extends": cc.Component,
        properties: {
            exchangeRateView: cc.ExchangeRateView,

            lbCardType: cc.Label,
            lbCardValue: cc.Label,

            animationMenuCardType: cc.Animation,
            animationMenuCardValue: cc.Animation,

            editBoxOTP: cc.EditBox,

            btnViettel: cc.Button,
            btnMobifone: cc.Button,
            btnVina: cc.Button,

            btnGetOTPs: [cc.Button],
            lbBtnGetOTPs: [cc.Label],

            btnConfirm: cc.Button,

            //menu otp
            nodeTeleSafes: [cc.Node],

            animationMenuOTP: cc.Animation,
            lbOTPType: cc.Label,

            //custom
            lbTimer: cc.Label,
            lbOTPFee: cc.Label,
        },

        onLoad: function () {
            this.animOpenName = 'showDropdownMenu';
            this.animCloseName = 'hideDropdownMenu';

            this.exchangeRateView.init(this.node);

            this.isTimer = false;
            this.timer = 0;
            this.timePerGetOTP = 120;
            this.updateInterval = 1;
            this.updateTimer = 0;

            this.otpType = cc.OTPType.TELE_GRAM;
        
            this.lbOTPFee.string = 'Lưu ý: Phí lấy OTP là 1.000 ' + cc.Config.getInstance().currency();
        },

        onEnable: function () {
            this.animationMenuCardType.node.scaleY = 0;
            this.animationMenuCardValue.node.scaleY = 0;

            this.timer = parseInt(cc.Tool.getInstance().getItem("@TimeGetOTPRedeem"));
            this.processTimeOTPButton();
            this.editBoxOTP.string = '';

            //3s click confirm 1 lan
            this.isTimerConfirm = false;
            this.timerConfirm = 0;
            this.timePerConfirm = 3;
            this.processTimeConfirm();

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
                    this.otpType = cc.OTPType.TELE_GRAM;
                    this.lbOTPType.string = 'Telegram';
                }
            }
        },

        onDisable: function () {
            cc.Tool.getInstance().setItem("@TimeGetOTPRedeem", Math.round(this.timer));
        },

        onDestroy: function () {
            cc.Tool.getInstance().setItem("@TimeGetOTPRedeem", Math.round(this.timer));
        },


        update: function (dt) {
            if (this.isTimer) {
                this.timer -= dt;
                this.updateTimer += dt;

                if (this.updateTimer < this.updateInterval) return; // we don't need to do the math every frame
                this.updateTimer = 0;
                this.processTimeOTPButton();
            }

            if (this.isTimerConfirm) {
                this.timerConfirm -= dt;

                this.processTimeConfirm();
            }
        },

        setLBCardType: function (value) {
            this.lbCardType.string = value;
        },

        setLBCardValue: function (ID) {
            this.cardSelect = this.exchangeRateView.getCardFromID(ID);
            this.lbCardValue.string = cc.Tool.getInstance().formatNumber(this.cardSelect.CardValue);
        },

        selectCard: function (cardType) {
            this.btnViettel.interactable = true;
            this.btnMobifone.interactable = true;
            this.btnVina.interactable = true;
            switch (cardType) {
                case cc.CardType.VIETTEL:
                    this.exchangeRateView.updateList(cc.CardOperatorCode.VIETTEL);
                    this.btnViettel.interactable = false;
                    break;
                case cc.CardType.MOBIFONE:
                    this.exchangeRateView.updateList(cc.CardOperatorCode.MOBIFONE);
                    this.btnMobifone.interactable = false;
                    break;
                case cc.CardType.VINAPHONE:
                    this.exchangeRateView.updateList(cc.CardOperatorCode.VINAPHONE);
                    this.btnVina.interactable = false;
                    break;
            }
        },

        activeTimeOTPButton: function () {
            this.isTimer = true;
            this.updateTimer = 1;
            this.timer = this.timePerGetOTP;
        },

        activeTimeConfirm: function () {
            this.isTimerConfirm = true;
            this.timerConfirm = this.timePerConfirm;
        },

        processTimeConfirm: function () {
            if (this.timerConfirm <= 0) {
                this.isTimerConfirm = false;
                this.btnConfirm.interactable = true;

                this.lbTimer.string = "";
            } else {
                var self = this;
                var time = Math.round(self.timerConfirm);
                this.isTimerConfirm = true;
                this.btnConfirm.interactable = false;
                this.lbTimer.string = time;
            }
        },

        processTimeOTPButton: function () {
            if (this.timer <= 0) {
                this.isTimer = false;
                this.btnGetOTPs.forEach(function (btnGetOTP) {
                    btnGetOTP.interactable = true;
                });
                this.lbBtnGetOTPs.forEach(function (lbBtnGetOTP) {
                    lbBtnGetOTP.string = 'Lấy OTP';
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
            if (response.Message) {
                cc.PopupController.getInstance().showMessage(response.Message);
            } else {
                cc.PopupController.getInstance().showMessage('Lấy OTP thành công');
            }
        },

        onRedeemCardResponse: function (response) {
            cc.LobbyController.getInstance().refreshAccountInfo();
            cc.PopupController.getInstance().showMessage(response.Message);
            if (this.editBoxOTP)
                this.editBoxOTP.string = '';
        },

        onRedeemCardResponseError: function (response) {
            if (response.Description)
                cc.PopupController.getInstance().showMessageError(response.Description);
            else
                cc.PopupController.getInstance().showMessageError(response.Message, response.ResponseCode);

            //this.editBoxOTP.string = '';
        },

        onGetOTPResponseError: function (response) {
            cc.PopupController.getInstance().showMessageError(response.Message, response.ResponseCode);
        },

        selectOTPEvent: function(event, data) {
            this.otpType = "";
            if(data.toString() === 'App OTP'){
                this.otpType = cc.OTPType.TELE_SAFE;
            }else if(data.toString() === 'Telegram'){
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

        openMenuCardTypeClicked: function () {
            // console.log('openMenuCardTypeClicked');
            this.animationMenuCardType.play(this.animOpenName);
        },

        openMenuCardValueClicked: function () {
            // console.log('openMenuCardValueClicked');
            this.animationMenuCardValue.play(this.animOpenName);
        },

        hideMenuCardTypeClicked: function () {
            this.animationMenuCardType.play(this.animCloseName);
        },

        hideMenuCardValueClicked: function () {
            this.animationMenuCardValue.play(this.animCloseName);
        },

        selectCardTypeEvent: function(event, data) {
            this.selectCard(data.toString());
            this.animationMenuCardType.play(this.animCloseName);
            this.setLBCardType(data.toString());
        },

        selectCardValueEvent: function(event, data) {
            this.setLBCardValue(parseInt(data.toString()));
            this.animationMenuCardValue.play(this.animCloseName);
        },

        chooseCardTypeClicked: function (event, data) {
            this.selectCard(data.toString());
            this.setLBCardType(data.toString());
        },

        chooseCardValueClicked: function (event, data) {
        },

        getOTPClicked: function () {
            var getOTPCommand = new cc.GetOTPCommand;
            getOTPCommand.execute(this, '', this.otpType);
            this.activeTimeOTPButton();
        },

        redeemClicked: function () {
            this.otp = this.editBoxOTP.string;
            this.cardType = this.cardSelect.OperatorCode;
            this.cardCode = this.cardSelect.CardCode;

            // if (this.otp === '') {
            //     cc.PopupController.getInstance().showMessage('Vui lòng nhập mã OTP');
            //     return;
            // }

            var redeemCardCommand = new cc.RedeemCardCommand;
            redeemCardCommand.execute(this);
            this.activeTimeConfirm();
        }
    });
}).call(this);
