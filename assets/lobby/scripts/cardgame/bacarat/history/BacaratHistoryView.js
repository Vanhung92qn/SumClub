/**
 * Created by Nofear on 3/15/2019.
 */

(function () {
    cc.BacaratHistoryView = cc.Class({
        "extends": cc.PopupBase,
        properties: {
            historyListView: cc.BacaratHistoryListView,
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
            var getHistoryCommand = new cc.BacaratHistoryCommand;
            getHistoryCommand.execute(this);
        },

        onGetHistoryResponse: function (response) {
            var list = response;
            //var list = slotsHistoryListData;
            if (list !== null && list.length > 0) {
                this.historyListView.resetList();
                this.historyListView.initialize(list);
            }
        },

        closeClicked: function () {
            this.historyListView.resetList();
            this.animation.play('closePopup');
            var self = this;
            var delay = 0.12;
            cc.director.getScheduler().schedule(function () {
                self.animation.stop();
                cc.BacaratPopupController.getInstance().destroyHistoryView();
            }, this, 1, 0, delay, false);
        },
    });
}).call(this);
