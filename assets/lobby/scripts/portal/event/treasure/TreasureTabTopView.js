/**
 * Created by Welcome on 4/18/2019.
 */


(function () {
    cc.TreasureTabTopView = cc.Class({
        "extends": cc.TabEventView,
        properties: {
            treasureTopCarrotListView: cc.TreasureTopCarrotListView,

            //phan thuong hien tai cua user
            lbReward: cc.Label,
            lbCarrot: cc.Label,
            lbTreasure: cc.Label,
        },

        onLoad: function () {
            this.isShowSelectBox = false;
        },

        onEnable: function () {
            //luu ben banner click
            var startTab = cc.Tool.getInstance().getItem('@startSubTabEvent');
            if (startTab === 'RULE') {
                this.btnRule.interactable = false;
                this.btnTop.interactable = true;

                this.nodeRule.active = true;
                this.nodeTop.active = false;
            } else {
                this.btnRule.interactable = true;
                this.btnTop.interactable = false;

                this.nodeRule.active = false;
                this.nodeTop.active = true;
            }

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
            if ( cc.EventController.getInstance().showEventBusy()) {
                var treasureGetCarrotUserHonorCommand = new cc.TreasureGetCarrotUserHonorCommand;
                treasureGetCarrotUserHonorCommand.execute(this);
            }
        },

        onTreasureGetCarrotUserHonorResponse: function (response) {
            cc.EventController.getInstance().hideEventBusy();

            this.treasureTopCarrotListView.resetList();

            if (response.List.length === 0) return;

            var list = response.List;

            if (response.PrizeValue  && response.PrizeValue > 0) {
                this.lbReward.string = cc.Tool.getInstance().formatNumber(response.PrizeValue);
            }

            if (response.TotalCarrotValue  && response.TotalCarrotValue > 0) {
                this.lbCarrot.string = response.TotalCarrotValue;
            }

            if (response.TreasureID  && response.TreasureID > 0) {
                this.lbTreasure.string = response.TreasureID;
            }

            this.treasureTopCarrotListView.initialize(list);
        },
    });
}).call(this);
