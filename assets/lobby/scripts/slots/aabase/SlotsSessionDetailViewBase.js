/**
 * Created by Nofear on 3/15/2019.
 */


(function () {
    cc.SlotsSessionDetailViewBase = cc.Class({
        "extends": cc.Component,
        properties: {
            lbSessionID: cc.Label,
            lbTotalBet: cc.Label,
            lbTotalWin: cc.Label,
        },

        onLoad: function () {
            this.animation = this.node.getComponent(cc.Animation);
        },

        onEnable: function() {
            //"11,5,11,3,5,8,9,3,7,4,9,7,6,10,9"
            /*
            var self = this;
            var delay = 0.2;
            cc.director.getScheduler().schedule(function () {
                self.showDetail();
            }, this, 1, 0, delay, false);*/

            this.showDetail();
            this.animation.play('openPopup');
        },

        showDetail: function() {

        },

        backClicked: function () {
            this.animation.play('closePopup');
            var self = this;
            var delay = 0.12;
            cc.director.getScheduler().schedule(function () {
                self.animation.stop();
                self.node.destroy();
            }, this, 1, 0, delay, false);
        },
    });
}).call(this);
