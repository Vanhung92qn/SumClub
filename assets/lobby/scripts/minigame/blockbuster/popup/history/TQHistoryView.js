/**
 * Created by Nofear on 3/15/2019.
 */

(function () {
    cc.TQHistoryView = cc.Class({
        "extends": cc.Component,
        properties: {
            tqHistoryListView: cc.TQHistoryListView,
        },

        onLoad: function () {
            this.animation = this.node.getComponent(cc.Animation);
        },

        onEnable: function () {
            var self = this;
            var delay = 0.2;
            cc.director.getScheduler().schedule(function () {
                self.getHistoryList();
            }, this, 1, 0, delay, false);

            this.animation.play('openPopup');

        },

        getHistoryList: function () {
            var tqGetHistoryCommand = new cc.TQGetHistoryCommand;
            tqGetHistoryCommand.execute(this);
        },

        onTQGetHistoryResponse: function (response) {
            var list = response;
            if (list !== null && list.length > 0) {
                this.tqHistoryListView.resetList();
                this.tqHistoryListView.initialize(list);
            }
        },

        backClicked: function () {
            this.tqHistoryListView.resetList();
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
