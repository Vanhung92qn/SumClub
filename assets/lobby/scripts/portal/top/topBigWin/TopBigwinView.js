/**
 * Created by Nofear on 3/15/2019.
 */

(function () {
    cc.TopBigWinView = cc.Class({
        "extends": cc.Component,
        properties: {
            topBigWinListView: cc.TopBigWinListView,
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
            this.topBigWinListView.resetList();
        },

        getInfo: function () {

            var getUserBigWinInfoCommand = new cc.GetUserBigWinInfoCommand;
            getUserBigWinInfoCommand.execute(this, -1);
        },

        onGetUserBigWinInfoResponse: function (response) {
            this.topBigWinListView.resetList();
            this.topBigWinListView.initialize(response);
        },
    });
}).call(this);
