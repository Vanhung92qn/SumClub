/**
 * Created by Nofear on 3/15/2019.
 */


(function () {
    cc.TreasureRuleView = cc.Class({
        "extends": cc.Component,
        properties: {

        },

        onLoad: function() {
            this.node.zIndex = cc.NoteDepth.POPUP_PORTAL;
            this.animation = this.node.getComponent(cc.Animation);
        },

        onEnable: function () {
            this.animation.play('openPopup');
        },

        closeClicked: function () {
            //this.showRegister(false);
            this.animation.play('closePopup');
            var self = this;
            var delay = 0.12;
            cc.director.getScheduler().schedule(function () {
                self.animation.stop();
                cc.LobbyController.getInstance().destroyTreasureRuleView();
            }, this, 1, 0, delay, false);
        },

    });
}).call(this);
