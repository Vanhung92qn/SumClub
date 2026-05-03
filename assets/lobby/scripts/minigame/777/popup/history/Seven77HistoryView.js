/**
 * Created by Nofear on 3/15/2019.
 */

(function () {
    cc.Seven77HistoryView = cc.Class({
        "extends": cc.Component,
        properties: {
            seven77HistoryListView: cc.Seven77HistoryListView,
        },

        onLoad: function () {
            this.animation = this.node.getComponent(cc.Animation);
        },

        onEnable: function () {
            var self = this;
            var delay = 0.2;
            cc.director.getScheduler().schedule(function () {
                self.getHistoryList();
            }, this, 1, 0, delay, false);

            this.animation.play('openPopup');

        },

        getHistoryList: function () {
            var seven77GetHistoryCommand = new cc.Seven77GetHistoryCommand;
            seven77GetHistoryCommand.execute(this);
        },

        onSeven77GetHistoryResponse: function (response) {
            var list = response;
            if (list !== null && list.length > 0) {
                this.seven77HistoryListView.resetList();
                this.seven77HistoryListView.initialize(list);
            }
        },

        backClicked: function () {
            this.seven77HistoryListView.resetList();
            this.animation.play('closePopup');
            var self = this;
            var delay = 0.12;
            cc.director.getScheduler().schedule(function () {
                self.animation.stop();
                self.node.destroy();
            }, this, 1, 0, delay, false);
        },
    });
}).call(this);
