/**
 * Created by Nofear on 3/14/2019.
 */


(function () {
    cc.Seven77TopView = cc.Class({
        "extends": cc.Component,
        properties: {
            btnJackpot: cc.Button,
            btnBigWin: cc.Button,
            nodeJackpot: cc.Node,
            nodeBigWin: cc.Node,

            seven77BigWinView: cc.Seven77TopBigWinView,
            seven77JackpotView: cc.Seven77TopJackpotView,
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
            this.seven77BigWinView.seven77BigWinListView.resetList();
            this.seven77JackpotView.seven77JackpotListView.resetList();
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
