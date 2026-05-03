/**
 * Created by Nofear on 3/14/2019.
 */


(function () {
    cc.SlotsLeaderboardView = cc.Class({
        "extends": cc.Component,
        properties: {
            btnJackpot: cc.Button,
            btnBigWin: cc.Button,
            nodeJackpot: cc.Node,
            nodeBigWin: cc.Node,

            bigWinView: cc.SlotsLBBigWinView,
            jackpotView: cc.SlotsLBJackpotView,
        },

        onLoad: function () {
            this.animation = this.node.getComponent(cc.Animation);
        },

        onEnable: function () {
            this.animation.play('openPopup');
            this.btnBigWin.interactable = true;
            this.btnJackpot.interactable = false;

            this.nodeJackpot.active = true;
            this.nodeBigWin.active = false;
        },

        bigWinTabClicked: function () {
            this.btnBigWin.interactable = false;
            this.btnJackpot.interactable = true;

            this.nodeJackpot.active = false;
            this.nodeBigWin.active = true;
        },

        jackpotTabClicked: function () {
            this.btnBigWin.interactable = true;
            this.btnJackpot.interactable = false;

            this.nodeJackpot.active = true;
            this.nodeBigWin.active = false;
        },

        backClicked: function () {
            this.bigWinView.slotsLBBigWinListView.resetList();
            this.jackpotView.slotsLBJackpotListView.resetList();
            this.animation.play('closePopup');
            var self = this;
            var delay = 0.15;
            cc.director.getScheduler().schedule(function () {
                self.animation.stop();
                self.node.destroy();
            }, this, 1, 0, delay, false);
        },
    });
}).call(this);
