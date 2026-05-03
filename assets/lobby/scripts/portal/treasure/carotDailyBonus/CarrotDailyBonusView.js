/**
 * Created by Nofear on 3/15/2019.
 */


(function () {
    cc.CarrotDailyBonusView = cc.Class({
        "extends": cc.Component,
        properties: {
            // itemTemplate: cc.Node,
            nodeParent: cc.Node,
        },

        onLoad: function() {
            this.node.zIndex = cc.NoteDepth.POPUP_PORTAL;
            this.animation = this.node.getComponent(cc.Animation);
            this.items = this.nodeParent.children;

            cc.CarrotDailyBonusController.getInstance().setCarrotDailyBonusView(this);
        },

        onEnable: function () {
            this.animation.play('openPopup');

            this.refreshDailyBonus();
        },

        refreshDailyBonus: function () {
            var treasureGetCarrotNameKnownCommand = new cc.TreasureGetCarrotNameKnownCommand;
            treasureGetCarrotNameKnownCommand.execute(this);
        },

        onTreasureGetCarrotNameKnownResponse: function (response) {
            cc.TreasureController.getInstance().setIsDailyBonus(response.IsInDay); //TRUE = da nhan

            for (var i = 0; i < 7; i++) {
                this.items[i].getComponent(cc.CarrotDailyBonusItem).updateItem(response.List[i]);
            }
        },

        createDailyBonusItem: function (item) {
            var item = cc.instantiate(this.itemTemplate);
            this.nodeParent.addChild(item);
        },

        closeClicked: function () {
            //this.showRegister(false);
            this.animation.play('closePopup');
            var self = this;
            var delay = 0.12;
            cc.director.getScheduler().schedule(function () {
                self.animation.stop();
                cc.LobbyController.getInstance().destroyCarrotDailyBonusView();
            }, this, 1, 0, delay, false);
        },

    });
}).call(this);
