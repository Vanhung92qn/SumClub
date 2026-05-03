/**
 * Created by Nofear on 3/15/2019.
 */

(function () {
    cc.BacaratTopView = cc.Class({
        "extends": cc.PopupBase,
        properties: {
            topListView: cc.BacaratTopListView,
        },

        onLoad: function () {
            this.animation = this.node.getComponent(cc.Animation);
        },

        onEnable: function () {
            let self = this;
            let delay = 0.2;
            cc.director.getScheduler().schedule(function () {
                self.getTopSessionWinners();
            }, this, 1, 0, delay, false);

            this.animation.play('openPopup');
        },

        getTopSessionWinners: function () {
            let getBigWinnersCommand = new cc.BacaratWinnerCommand;
            getBigWinnersCommand.execute(this);
        },

        onGetBigWinnerResponse: function (response) {
            var list = response;
            //var list = slotsHistoryListData;
            if (list !== null && list.length > 0) {
                this.topListView.resetList();
                this.topListView.initialize(list);
            }
        },

        closeClicked: function () {
            this.topListView.resetList();
            this.animation.play('closePopup');
            var self = this;
            var delay = 0.12;
            cc.director.getScheduler().schedule(function () {
                self.animation.stop();
                cc.BacaratPopupController.getInstance().destroyTopView();
            }, this, 1, 0, delay, false);
        },
    });
}).call(this);
