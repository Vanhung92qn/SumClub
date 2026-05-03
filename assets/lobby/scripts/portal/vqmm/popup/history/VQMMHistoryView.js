/**
 * Created by Nofear on 3/15/2019.
 */

(function () {
    cc.VQMMHistoryView = cc.Class({
        "extends": cc.PopupBase,
        properties: {
            vqmmHistoryListView: cc.VQMMHistoryListView,
        },

        onEnable: function () {
            var self = this;
            var delay = 0.2;
            cc.director.getScheduler().schedule(function () {
                self.getList();
            }, this, 1, 0, delay, false);

            this.animation.play('openPopup');
        },

        getList: function () {
            var vqmmGetHistoryCommand = new cc.VQMMGetHistoryCommand;
            vqmmGetHistoryCommand.execute(this);
        },

        onVQMMGetHistoryResponse: function (response) {
            var list = response;

            if (list !== null && list.length > 0) {
                this.vqmmHistoryListView.resetList();
                this.vqmmHistoryListView.initialize(list);
            }
        },

        closeClicked: function () {
            this.vqmmHistoryListView.resetList();
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
