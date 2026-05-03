/**
 * Created by Nofear on 3/14/2019.
 */


(function () {
    cc.HelpView = cc.Class({
        "extends": cc.Component,
        properties: {

        },

        onLoad: function () {
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
                cc.MainController.getInstance().destroyHelpView();
            }, this, 1, 0, delay, false);
        },
    });
}).call(this);
