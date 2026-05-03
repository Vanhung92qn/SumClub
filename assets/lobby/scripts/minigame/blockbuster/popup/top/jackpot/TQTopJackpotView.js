/**
 * Created by Nofear on 3/15/2019.
 */

(function () {
    cc.TQTopJackpotView = cc.Class({
        "extends": cc.Component,
        properties: {
            tqTopJackpotListView: cc.TQTopJackpotListView,
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
            tqGetTopCommand.execute(this, cc.BigWinnerType.JACKPOT);
        },

        onTQGetTopResponse: function (response) {
            var list = response;
            if (list !== null && list.length > 0) {
                this.tqTopJackpotListView.resetList();
                this.tqTopJackpotListView.initialize(list);
            }
        }
    });
}).call(this);
