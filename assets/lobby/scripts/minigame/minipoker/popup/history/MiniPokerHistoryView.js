/**
 * Created by Nofear on 3/15/2019.
 */
//var miniPokerHistoryData = require('MiniPokerHistoryData');

(function () {
    cc.MiniPokerHistoryView = cc.Class({
        "extends": cc.PopupBase,
        properties: {
            miniPokerHistoryListView: cc.MiniPokerHistoryListView,
        },

        onLoad: function () {
            this.animation = this.node.getComponent(cc.Animation);
            this.node.zIndex = cc.NoteDepth.POPUP_TAIXIU;
        },

        onEnable: function () {
            var self = this;
            var delay = 0.2;
            cc.director.getScheduler().schedule(function () {
                self.getHistory();
            }, this, 1, 0, delay, false);

            this.animation.play('openPopup');
        },

        getHistory: function () {
            var mpGetHistoryCommand = new cc.MPGetHistoryCommand;
            mpGetHistoryCommand.execute(this);
        },

        onMPGetHistoryResponse: function (response) {
            var list = response;
            //var list = miniPokerHistoryData;
            if (list !== null && list.length > 0) {
                this.miniPokerHistoryListView.resetList();
                this.miniPokerHistoryListView.initialize(list);
            }
        },

        closeClicked: function () {
            this.miniPokerHistoryListView.resetList();
            this.animation.play('closePopup');
            var self = this;
            var delay = 0.12;
            cc.director.getScheduler().schedule(function () {
                self.animation.stop();
                cc.MiniPokerController.getInstance().destroyHistoryView();
            }, this, 1, 0, delay, false);
        },
    });
}).call(this);
