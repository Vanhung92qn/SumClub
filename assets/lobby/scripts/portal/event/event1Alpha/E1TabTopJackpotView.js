/**
 * Created by Welcome on 4/18/2019.
 */

(function () {
    cc.E1TabTopJackpotView = cc.Class({
        "extends": cc.TabEventView,
        properties: {
            eventListView: cc.EventTopJackpotListView,
            lbReward: cc.Label,
        },

        onDisable: function () {
            this.eventListView.resetList();
        },

        getTopEvent: function () {
            var getEventWinJackpotGiftcodeInfoCommand = new cc.GetEventWinJackpotGiftcodeInfoCommand;
            getEventWinJackpotGiftcodeInfoCommand.execute(this);
        },

        onGetTopEventResponse: function (response) {
            var list = response.LstWin;

            this.lbReward.string = cc.Tool.getInstance().formatNumber(response.GiftcodeValue);

            this.eventListView.resetList();
            if (list !== null && list.length > 0) {
                this.eventListView.initialize(list);
            }
        },
    });
}).call(this);
