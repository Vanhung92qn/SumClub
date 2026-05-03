/**
 * Created by Welcome on 4/18/2019.
 */

(function () {
    cc.X2View = cc.Class({
        "extends": cc.Component,
        properties: {

        },

        onLoad: function () {
            this.node.zIndex =  cc.NoteDepth.POPUP_PORTAL;
            this.animation = this.node.getComponent(cc.Animation);
        },

        onEnable: function () {
            this.animation.play('openPopup');
        },

        cardClicked: function () {
            cc.LobbyController.getInstance().createShopView(cc.ShopTab.TOPUP);
            cc.LobbyController.getInstance().destroyX2PopupView();
        },

        momoClicked: function () {
            cc.LobbyController.getInstance().createShopView(cc.ShopTab.MOMO);
            cc.LobbyController.getInstance().destroyX2PopupView();
        },

        bankClicked: function () {
            cc.LobbyController.getInstance().createShopView(cc.ShopTab.BANK);
            cc.LobbyController.getInstance().destroyX2PopupView();
        },

        agencyClicked: function () {
            cc.LobbyController.getInstance().createShopView(cc.ShopTab.AGENCY);
            cc.LobbyController.getInstance().destroyX2PopupView();
        },

        helpClicked: function () {
            cc.LobbyController.getInstance().createX2RewardView(cc.X2Tab.RULES);
            cc.LobbyController.getInstance().destroyX2PopupView();
        },

        openEventClicked: function (event, index) {
            if (index) {
                if (cc.LoginController.getInstance().checkLogin()) {
                    cc.Tool.getInstance().setItem('@startTabEvent', index.toString());
                    cc.LobbyController.getInstance().createEventViewTopVP();
                    cc.DDNA.getInstance().uiInteraction(cc.DDNAUILocation.PORTAL, 'EVENT_TOP_VP', cc.DDNAUIType.BUTTON);
                    this.closeFinished();
                }
            }
        },

        closeFinished: function () {
            //this.showRegister(false);
            this.animation.play('closePopup');
            var self = this;
            var delay = 0.3;
            cc.director.getScheduler().schedule(function () {
                self.animation.stop();
                cc.LobbyController.getInstance().destroyX2PopupView();
            }, this, 1, 0, delay, false);
        },
    });
}).call(this);
