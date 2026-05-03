/**
 * Created by Nofear on 3/15/2019.
 */

(function () {
    cc.DragonTigerTopView = cc.Class({
        "extends": cc.PopupBase,
        properties: {
            dragonTigerTopListView: cc.DragonTigerTopListView,
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
            var dragonTigerGetBigWinnersCommand = new cc.DragonTigerGetBigWinnerCommand;
            dragonTigerGetBigWinnersCommand.execute(this);
        },

        onDragonTigerGetBigWinnerResponse: function (response) {
            var list = response;
            //var list = slotsHistoryListData;
            if (list !== null && list.length > 0) {
                this.dragonTigerTopListView.resetList();
                this.dragonTigerTopListView.initialize(list);
            }
        },

        closeClicked: function () {
            this.dragonTigerTopListView.resetList();
            this.animation.play('closePopup');
            var self = this;
            var delay = 0.12;
            cc.director.getScheduler().schedule(function () {
                self.animation.stop();
                cc.DragonTigerPopupController.getInstance().destroyTopView();
            }, this, 1, 0, delay, false);
        },
    });
}).call(this);
