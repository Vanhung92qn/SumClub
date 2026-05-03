/**
 * Created by Nofear on 3/15/2019.
 */

(function () {
    cc.MiniPokerTopView = cc.Class({
        "extends": cc.PopupBase,
        properties: {
            miniPokerTopListView: cc.MiniPokerTopListView,
        },

        onLoad: function () {
            this.animation = this.node.getComponent(cc.Animation);
            this.node.zIndex = cc.NoteDepth.POPUP_TAIXIU;
        },

        onEnable: function () {
            var self = this;
            var delay = 0.2;
            cc.director.getScheduler().schedule(function () {
                self.getTop();
            }, this, 1, 0, delay, false);

            this.animation.play('openPopup');
        },

        getTop: function () {
            var mpGetTopCommand = new cc.MPGetTopCommand;
            mpGetTopCommand.execute(this);
        },

        onMPGetTopResponse: function (response) {
            var list = response;
            //var list = slotsHistoryListData;
            if (list !== null && list.length > 0) {
                this.miniPokerTopListView.resetList();
                this.miniPokerTopListView.initialize(list);
            }
        },

        closeClicked: function () {
            this.miniPokerTopListView.resetList();
            this.animation.play('closePopup');
            var self = this;
            var delay = 0.12;
            cc.director.getScheduler().schedule(function () {
                self.animation.stop();
                cc.MiniPokerController.getInstance().destroyTopView();
            }, this, 1, 0, delay, false);
        },
    });
}).call(this);
