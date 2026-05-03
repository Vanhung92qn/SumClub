/**
 * Created by Nofear on 3/15/2019.
 */

(function () {
    cc.TaiXiuSieuTocTopView = cc.Class({
        "extends": cc.PopupBase,
        properties: {
            taiXiuTopListView: cc.TaiXiuSieuTocTopListView,
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
            var txGetBigWinnersCommand = new cc.TXGetBigWinnersCommand;
            txGetBigWinnersCommand.executeSieuToc(this);
        },

        onTXGetBigWinnersResponse: function (response) {
            var list = response;
            //var list = slotsHistoryListData;
            if (list !== null && list.length > 0) {
                this.taiXiuTopListView.resetList();
                this.taiXiuTopListView.initialize(list);
            }
        },

        closeClicked: function () {
            this.taiXiuTopListView.resetList();
            this.animation.play('closePopup');
            var self = this;
            var delay = 0.12;
            cc.director.getScheduler().schedule(function () {
                self.animation.stop();
                cc.TaiXiuSieuTocMainController.getInstance().destroyTopView();
            }, this, 1, 0, delay, false);
        },
    });
}).call(this);
