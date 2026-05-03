(function () {
    cc.LodeHistoryView = cc.Class({
        "extends": cc.PopupBase,
        properties: {
            historyListView: cc.LodeHistoryListView,
        },

        onLoad: function () {
            this.animation = this.node.getComponent(cc.Animation);
            this.node.zIndex = cc.NoteDepth.POPUP_TAIXIU;
            this.node.parent = cc.find('Canvas');
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
            var getHistoryCommand = new cc.LodeHistoryCommand;
            getHistoryCommand.execute(this);
        },

        onGetHistoryResponse: function (response) {
            var list = response;
            //var list = slotsHistoryListData;
            try {
                this.historyListView.resetList();
            }catch(e) {

            }
            if (list !== null && list.length > 0) {
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
                cc.LodePopupController.getInstance().destroyHistoryView();
                this.node.removeFromParent();
            }, this, 1, 0, delay, false);
        },
    });
}).call(this);
