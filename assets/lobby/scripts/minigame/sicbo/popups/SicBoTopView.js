/**
 * Created by Nofear on 3/15/2019.
 */

(function () {
    cc.SicBoTopView = cc.Class({
        "extends": cc.PopupBase,
        properties: {
			//nodeMain: cc.Node,
            sicBoTopListView: cc.SicBoTopListView,
        },

        onLoad: function () {
            this.animation = this.node.getComponent(cc.Animation);
            this.node.zIndex = cc.NoteDepth.POPUP_SICBO;
        },

        onEnable: function () {
            var self = this;
            var delay = 0.2;
            cc.director.getScheduler().schedule(function () {
                self.getTopSessionWinners();
            }, this, 1, 0, delay, false);
			// this.nodeMain.scaleX = 0.7;
			// this.nodeMain.scaleY = 0.7;
            this.animation.play('openPopup');
        },

        getTopSessionWinners: function () {
            var sbGetBigWinnersCommand = new cc.SBGetBigWinnersCommand;
            sbGetBigWinnersCommand.execute(this);
        },

        onSBGetBigWinnersResponse: function (response) {
            var list = response;
            //var list = slotsHistoryListData;
            if (list !== null && list.length > 0) {
                this.sicBoTopListView.resetList();
                this.sicBoTopListView.initialize(list);
            }
        },

        closeClicked: function () {
            this.sicBoTopListView.resetList();
            this.animation.play('closePopup');
            var self = this;
            var delay = 0.12;
            cc.director.getScheduler().schedule(function () {
                self.animation.stop();
                cc.SicBoController.getInstance().destroyTopView();
            }, this, 1, 0, delay, false);
        },
    });
}).call(this);
