/**
 * Created by Nofear on 3/15/2019.
 */

(function () {
    cc.DragonTigerHistoryView = cc.Class({
        "extends": cc.PopupBase,
        properties: {
            dragonTigerHistoryListView: cc.DragonTigerHistoryListView,
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
            var dragonTigerGetHistoryCommand = new cc.DragonTigerGetHistoryCommand;
            dragonTigerGetHistoryCommand.execute(this);
        },

        onDragonTigerGetHistoryResponse: function (response) {
            var list = response;
            //var list = slotsHistoryListData;
            if (list !== null && list.length > 0) {
                this.dragonTigerHistoryListView.resetList();
                this.dragonTigerHistoryListView.initialize(list);
            }
        },

        closeClicked: function () {
            this.dragonTigerHistoryListView.resetList();
            this.animation.play('closePopup');
            var self = this;
            var delay = 0.12;
            cc.director.getScheduler().schedule(function () {
                self.animation.stop();
                cc.DragonTigerPopupController.getInstance().destroyHistoryView();
            }, this, 1, 0, delay, false);
        },
    });
}).call(this);
