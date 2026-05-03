/**
 * Created by Nofear on 3/15/2019.
 */

(function () {
    cc.XXHistoryView = cc.Class({
        "extends": cc.PopupBase,
        properties: {
            XXHistoryListView: cc.XXHistoryListView,
        },

        onLoad: function () {
            this.animation = this.node.getComponent(cc.Animation);
            this.node.zIndex = cc.NoteDepth.POPUP_TAIXIU;
        },

        onEnable: function () {
            var self = this;
            var delay = 0.2;
            cc.director.getScheduler().schedule(function () {
                self.getTopSessionWinners();
            }, this, 1, 0, delay, false);

            this.animation.play('openPopup');
        },

        getTopSessionWinners: function () {
            var XXGetHistoryCommand = new cc.XXGetHistoryCommand;
            XXGetHistoryCommand.execute(this);
        },

        onXXGetHistoryResponse: function (response) {
            var list = response;
            //var list = slotsHistoryListData;
            if (list !== null && list.length > 0) {
                this.XXHistoryListView.resetList();
                this.XXHistoryListView.initialize(list);
            }
        },

        closeClicked: function () {
            this.XXHistoryListView.resetList();
            this.animation.play('closePopup');
            var self = this;
            var delay = 0.12;
            cc.director.getScheduler().schedule(function () {
                self.animation.stop();
                cc.XXPopupController.getInstance().destroyHistoryView();
            }, this, 1, 0, delay, false);
        },
    });
}).call(this);
