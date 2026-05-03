/**
 * Created by Nofear on 3/15/2019.
 */


(function () {
    cc.TreasureTopView = cc.Class({
        "extends": cc.Component,
        properties: {
            treasureTopCarrotListView: cc.TreasureTopCarrotListView,
            ownerItem: cc.TreasureTopCarrotItem,
        },

        onLoad: function() {
            this.node.zIndex = cc.NoteDepth.POPUP_PORTAL;
            this.animation = this.node.getComponent(cc.Animation);
        },

        onEnable: function () {
            this.animation.play('openPopup');

            var self = this;
            var delay = 0.2;
            cc.director.getScheduler().schedule(function () {
                self.getTopCarrot();
            }, this, 1, 0, delay, false);
        },

        onDisable: function () {
            this.treasureTopCarrotListView.resetList();
        },

        getTopCarrot: function () {
            var treasureGetCarrotUserHonorCommand = new cc.TreasureGetCarrotUserHonorCommand;
            treasureGetCarrotUserHonorCommand.execute(this);
        },

        onTreasureGetCarrotUserHonorResponse: function (response) {
            this.treasureTopCarrotListView.resetList();

            var list = response.List;
            var length = list.length;

            if (response.CarrotUserHonorInfo) {
                var data = {
                    DisplayName: cc.LoginController.getInstance().getNickname(),
                    ServiceID: cc.Config.getInstance().getServiceId(),
                    TreasureID: response.CarrotUserHonorInfo.TreasureID,
                    TotalPrizeValue: response.CarrotUserHonorInfo.TotalPrizeValue,
                    TotalCarrotValue: response.CarrotUserHonorInfo.TotalCarrotValue,
                };

                var itemID = -1;
                //tim vi tri xep hang
                for (var i = 0; i < length; i++) {
                    if (list[i].UserID === cc.LoginController.getInstance().getUserId()) {
                        itemID = i;
                        break;
                    }
                }

                //update thong tin owner
                this.ownerItem.updateItem(data, itemID);
            }

            if (length === 0) return;


            // if (response.PrizeValue  && response.PrizeValue > 0) {
            //     this.lbReward.string = cc.Tool.getInstance().formatNumber(response.PrizeValue);
            // }
            //
            // if (response.TotalCarrotValue  && response.TotalCarrotValue > 0) {
            //     this.lbCarrot.string = response.TotalCarrotValue;
            // }
            //
            // if (response.TreasureID  && response.TreasureID > 0) {
            //     this.lbTreasure.string = response.TreasureID;
            // }

            this.treasureTopCarrotListView.initialize(list);
        },

        closeClicked: function () {
            //this.showRegister(false);
            this.animation.play('closePopup');
            var self = this;
            var delay = 0.12;
            cc.director.getScheduler().schedule(function () {
                self.animation.stop();
                cc.LobbyController.getInstance().destroyTreasureTopView();
            }, this, 1, 0, delay, false);
        },

    });
}).call(this);
