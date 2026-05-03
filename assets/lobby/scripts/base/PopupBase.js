
(function () {
    cc.PopupBase = cc.Class({
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
                self.closeFinished();
            }, this, 1, 0, delay, false);
        },

        closeFinished: function () {

        },
    });
}).call(this);
