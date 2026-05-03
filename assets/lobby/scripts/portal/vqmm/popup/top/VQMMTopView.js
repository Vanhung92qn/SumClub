/**
 * Created by Nofear on 3/15/2019.
 */

(function () {
    cc.VQMMTopView = cc.Class({
        "extends": cc.PopupBase,
        properties: {
            vqmmTopListView: cc.VQMMTopListView,
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
            var vqmmGetTopCommand = new cc.VQMMGetTopCommand;
            vqmmGetTopCommand.execute(this);
        },

        onVQMMGetTopResponse: function (response) {
            var list = response;

            if (list !== null && list.length > 0) {
                this.vqmmTopListView.resetList();
                this.vqmmTopListView.initialize(list);
            }
        },

        closeClicked: function () {
            this.vqmmTopListView.resetList();
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
