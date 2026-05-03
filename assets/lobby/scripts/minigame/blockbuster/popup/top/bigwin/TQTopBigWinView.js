/**
 * Created by Nofear on 3/15/2019.
 */

(function () {
    cc.TQTopBigWinView = cc.Class({
        "extends": cc.Component,
        properties: {
            tqTopBigWinListView: cc.TQTopBigWinListView,
        },

        onEnable: function () {
            var self = this;
            var delay = 0.2;
            cc.director.getScheduler().schedule(function () {
                self.getList();
            }, this, 1, 0, delay, false);
        },

        getList: function () {
            var tqGetTopCommand = new cc.TQGetTopCommand;
            tqGetTopCommand.execute(this, cc.BigWinnerType.BIG_WIN);
        },

        onTQGetTopResponse: function (response) {
            var list = response;
            if (list !== null && list.length > 0) {
                this.tqTopBigWinListView.resetList();
                this.tqTopBigWinListView.initialize(list);
            }
        }
    });
}).call(this);
