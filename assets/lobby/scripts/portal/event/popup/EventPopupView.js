/**
 * Created by Nofear on 3/19/2019.
 */

(function () {
    cc.EventPopupView = cc.Class({
        "extends": cc.Component,
        properties: {

        },

        onLoad: function () {
            this.node.zIndex =  cc.NoteDepth.POPUP_GIFTCODE;
            this.animation = this.node.getComponent(cc.Animation);
        },

        onEnable: function () {
            this.animation.play('openPopup');
        },

        closeClicked: function () {
            this.animation.play('closePopup');
            var self = this;
            var delay = 0.12;
            cc.director.getScheduler().schedule(function () {
                self.animation.stop();
                self.node.destroy();
            }, this, 1, 0, delay, false);
        },

        linkAppSafeClicked: function () {
            cc.LobbyController.getInstance().createAccountView(cc.AccountTab.SAFE_PLUS);
            this.node.destroy();
        },

        openInboxClicked: function () {
            cc.LobbyController.getInstance().createAccountView(cc.AccountTab.INBOX);
            this.node.destroy();
        },
    });
}).call(this);
