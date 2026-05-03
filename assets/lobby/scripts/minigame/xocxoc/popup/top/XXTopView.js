/**
 * Created by Nofear on 3/15/2019.
 */

(function () {
    cc.XXTopView = cc.Class({
        "extends": cc.PopupBase,
        properties: {
            XXTopListView: cc.XXTopListView,
        },

        onLoad: function () {
            this.animation = this.node.getComponent(cc.Animation);
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
            var XXGetBigWinnersCommand = new cc.XXGetBigWinnerCommand;
            XXGetBigWinnersCommand.execute(this);
        },

        onXXGetBigWinnerResponse: function (response) {
            var list = response;
            //var list = slotsHistoryListData;
            if (list !== null && list.length > 0) {
                this.XXTopListView.resetList();
                this.XXTopListView.initialize(list);
            }
        },

        closeClicked: function () {
            this.XXTopListView.resetList();
            this.animation.play('closePopup');
            var self = this;
            var delay = 0.12;
            cc.director.getScheduler().schedule(function () {
                self.animation.stop();
                cc.XXPopupController.getInstance().destroyTopView();
            }, this, 1, 0, delay, false);
        },
    });
}).call(this);
