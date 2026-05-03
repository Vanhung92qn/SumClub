/**
 * Created by Nofear on 3/15/2019.
 */

(function () {
    cc.TaiXiuMd5TopView = cc.Class({
        "extends": cc.PopupBase,
        properties: {
            TaiXiuMd5TopListView: cc.TaiXiuMd5TopListView,
        },

        onLoad: function () {
            this.animation = this.node.getComponent(cc.Animation);
            this.node.zIndex = cc.NoteDepth.POPUP_TAIXIU_MD5;
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
            var txmd5GetBigWinnersCommand = new cc.TXMD5GetBigWinnersCommand;
            txmd5GetBigWinnersCommand.execute(this);
        },

        onTXGetBigWinnersResponse: function (response) {
            var list = response;
            //var list = slotsHistoryListData;
            if (list !== null && list.length > 0) {
                this.TaiXiuMd5TopListView.resetList();
                this.TaiXiuMd5TopListView.initialize(list);
            }
        },

        closeClicked: function () {
            this.TaiXiuMd5TopListView.resetList();
            this.animation.play('closePopup');
            var self = this;
            var delay = 0.12;
            cc.director.getScheduler().schedule(function () {
                self.animation.stop();
                cc.TaiXiuMd5MainController.getInstance().destroyTopView();
            }, this, 1, 0, delay, false);
        },
    });
}).call(this);
