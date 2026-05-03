/**
 * Created by Nofear on 3/15/2019.
 */

(function () {
    cc.CTopView = cc.Class({
        "extends": cc.Component,
        properties: {
            listView: cc.CTopListView,
        },

        onEnable: function () {
            this.getInfo();

            // var self = this;
            // var delay = 0.2;
            // cc.director.getScheduler().schedule(function () {
            //     self.getInfo();
            // }, this, 1, 0, delay, false);
        },

        onDisable: function () {
            this.listView.resetList();
        },

        getInfo: function () {
            var pokerGetTopWinCommand = new cc.PokerGetTopWinCommand;
            pokerGetTopWinCommand.execute(this, -1);
        },

        onPokerGetTopWinResponse: function (response) {
            if (this.listView) {
                this.listView.resetList();
                this.listView.initialize(response);
                this.listView.scrollView.scrollToTop();
            }
        },
    });
}).call(this);
