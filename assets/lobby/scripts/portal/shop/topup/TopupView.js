/**
 * Created by Nofear on 3/15/2019.
 */


(function () {
    cc.TopupView = cc.Class({
        "extends": cc.Component,
        properties: {
            topupRateView: cc.TopupRateView,

            lbCardType: cc.Label,
            lbCardValue: cc.Label,
           // loaithe: cc.Label,
            animationMenuCardType: cc.Animation,
            animationMenuCardValue: cc.Animation,

            editBoxPINCard: cc.EditBox,
            editBoxSeriCard: cc.EditBox,
            editBoxCaptcha: cc.EditBox,

            nodeCardHides: [cc.Node],
          
            btnViettel: cc.Button,
            btnMobifone: cc.Button,
            btnVina: cc.Button,
            btnZing: cc.Button,
            btnVCoin: cc.Button,

            imageUrlCaptcha: cc.ImageUrl,

            btnConfirm: cc.Button,
            lbConfirms: [cc.Label],
            audioEnter: cc.AudioSource,
        },

        onLoad: function () {
            this.animOpenName = 'showDropdownMenu';
            this.animCloseName = 'hideDropdownMenu';

            this.topupRateView.init(this.node);
            cc.TopupController.getInstance().setTopupView(this);


            // if (cc.Config.getInstance().getServiceId() === cc.ServiceId.BLOCK_BUSTER_2) {
            //     this.nodeCardHides.forEach(function (nodeCardHide) {
            //         nodeCardHide.active = false;
            //     });
            // } else {
            //     this.nodeCardHides.forEach(function (nodeCardHide) {
            //         nodeCardHide.active = true;
            //     });
            // }

            // this.nodeCardHides.forEach(function (nodeCardHide) {
            //     nodeCardHide.active = true;
            // });
        },

        onEnable: function () {
            this.animationMenuCardValue.node.scaleY = 0;
            this.animationMenuCardType.node.scaleY = 0;
            this.getCaptcha();
            this.resetInput();

            //3s click confirm 1 lan
            this.isTimerConfirm = false;
            this.timerConfirm = 0;
            this.timePerConfirm = 3;
            this.processTimeConfirm();

            cc.ShopController.getInstance().getTotalCardBonus();
        },

        update: function (dt) {
            if (this.isTimerConfirm) {
                this.timerConfirm -= dt;

                this.processTimeConfirm();
            }
        },

        refreshListCard: function () {
            this.topupRateView.getListCard();
        },

        activeTimeConfirm: function () {
            this.isTimerConfirm = true;
            this.timerConfirm = this.timePerConfirm;
        },

        processTimeConfirm: function () {
            if (this.timerConfirm <= 0) {
                this.isTimerConfirm = false;
                this.btnConfirm.interactable = true;

                this.lbConfirms.forEach(function (lbConfirm) {
                    lbConfirm.string = 'Nạp Thẻ';
                });
            } else {
                var self = this;
                var time = Math.round(self.timerConfirm);
                this.isTimerConfirm = true;
                this.btnConfirm.interactable = false;
                this.lbConfirms.forEach(function (lbConfirm) {
                    lbConfirm.string = time;
                });
            }
        },

        resetScale: function () {
            this.animationMenuCardValue.node.scaleY = 0;
            this.animationMenuCardValue.node.opacity = 255;
        },

        restoreScale: function () {
            this.animationMenuCardValue.node.scaleY = 1;
            this.animationMenuCardValue.node.opacity = 0;
        },

        resetInput: function () {
            if (this.editBoxPINCard) {
                this.editBoxPINCard.string = '';
                this.editBoxSeriCard.string = '';
                this.editBoxCaptcha.string = '';
            }
        },

        getCaptcha: function () {
            var getCaptchaCommand = new cc.GetCaptchaCommand;
            getCaptchaCommand.execute(this);
        },

        setLBCardType: function (value) {
            this.lbCardType.string = value;
        },

        setLBCardValue: function (ID) {
            this.cardSelect = this.topupRateView.getCardFromID(ID);
            this.lbCardValue.string = this.lbCardType.string +' '+cc.Tool.getInstance().formatNumber(this.cardSelect.CardValue);
        },

        selectCard: function (cardType) {
            this.btnViettel.interactable = true;
            this.btnMobifone.interactable = true;
            this.btnVina.interactable = true;
            // this.btnZing.interactable = true;
            // this.btnVCoin.interactable = true;
            switch (cardType) {
                case cc.CardType.VIETTEL:
                    this.topupRateView.updateList(cc.CardOperatorCode.VIETTEL);
                    this.btnViettel.interactable = false;
					
                    break;
                case cc.CardType.MOBIFONE:
                    this.topupRateView.updateList(cc.CardOperatorCode.MOBIFONE);
                    this.btnMobifone.interactable = false;
					
                    break;
                case cc.CardType.VINAPHONE:
                    this.topupRateView.updateList(cc.CardOperatorCode.VINAPHONE);
                    this.btnVina.interactable = false;
					
                    break;
                // case cc.CardType.ZING:
                //     this.topupRateView.updateList(cc.CardOperatorCode.ZING);
                //     this.btnZing.interactable = false;
                //     break;
                // case cc.CardType.VCOIN:
                //     this.topupRateView.updateList(cc.CardOperatorCode.VCOIN);
                //     this.btnVCoin.interactable = false;
                //     break;
            }
        },

        onGetCaptchaResponse: function (response) {
            if (this.imageUrlCaptcha)
                this.imageUrlCaptcha.get('data:image/png;base64,' + cc.Tool.getInstance().removeStr(response[1], '\r\n'));
        },

        onChargeCardResponse: function (response) {
            if (response.Message)
                cc.PopupController.getInstance().showMessage(response.Message);
            else if (response.Description)
                cc.PopupController.getInstance().showMessage(response.Description);
            else
                cc.PopupController.getInstance().showMessage('Nạp thành công');

            cc.LobbyController.getInstance().refreshAccountInfo();
            cc.ShopController.getInstance().getTotalCardBonus();
            this.getCaptcha();
            this.resetInput();
        },

        onChargeCardResponseError: function (response) {
            if (response.Description)
                cc.PopupController.getInstance().showMessageError(response.Description);
            else
                cc.PopupController.getInstance().showMessageError(response.Message, response.ResponseCode);

            this.getCaptcha();
            //nap that bai thi reset captcha
            this.editBoxCaptcha.string = '';
        },

        openMenuCardTypeClicked: function () {
            this.animationMenuCardType.play(this.animOpenName);
        },

        openMenuCardValueClicked: function () {
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
            this.setLBCardType(data.toString());
            this.animationMenuCardType.play(this.animCloseName);
        },

        selectCardValueEvent: function(event, data) {
            this.setLBCardValue(parseInt(data.toString()));
            this.animationMenuCardValue.play(this.animCloseName);
        },

        chooseCardTypeClicked: function (event, data) {
            this.selectCard(data.toString());
            this.setLBCardType(data.toString());
			this.lbCardValue.string = "Chọn Mệnh Giá Thẻ";
			
        },

        chooseCardValueClicked: function (event, data) {
        },
        
        refreshCaptchaClicked: function () {
            this.getCaptcha();
        },
        
        topupClicked: function () {
            this.audioEnter.loop = false;
            this.audioEnter.play();
            if (this.cardSelect === undefined) {
                cc.PopupController.getInstance().showMessage('Vui lòng chọn mệnh giá.');
                return;
            }

            this.pin = this.editBoxPINCard.string;
            this.serial = this.editBoxSeriCard.string;
            this.captcha = this.editBoxCaptcha.string;
            this.cardType = this.cardSelect.OperatorCode;
            this.cardCode = this.cardSelect.CardCode;

            if (this.pin === '') {
                cc.PopupController.getInstance().showMessage('Vui lòng nhập mã thẻ.');
                return;
            }

            if (this.serial === '') {
                cc.PopupController.getInstance().showMessage('Vui lòng nhập seri thẻ.');
                return;
            }

            if (this.captcha === '') {
                cc.PopupController.getInstance().showMessage('Vui lòng nhập mã xác nhận.');
                return;
            }

            var chargeCardCommand = new cc.ChargeCardCommand;
            chargeCardCommand.execute(this);
            this.activeTimeConfirm();
        }

    });
}).call(this);
