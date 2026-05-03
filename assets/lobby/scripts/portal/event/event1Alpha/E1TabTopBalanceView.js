/**
 * Created by Welcome on 4/18/2019.
 */

(function () {
    cc.E1TabTopBalanceView = cc.Class({
        "extends": cc.TabEventView,
        properties: {
            eventListView: cc.EventTopBalanceListView,
            lbReward: cc.Label,
        },

        onDisable: function () {
            this.eventListView.resetList();
        },

        getTopEvent: function () {
            var getEventTopBalanceInfoCommand = new cc.GetEventTopBalanceInfoCommand;
            getEventTopBalanceInfoCommand.execute(this);
        },

        onGetTopEventResponse: function (response) {
            var list = response.LstTopBalance;

            this.lbReward.string = cc.Tool.getInstance().formatNumber(response.RewardValue);

            this.eventListView.resetList();
            if (list !== null && list.length > 0) {
                this.eventListView.initialize(list);
            }
        },
    });
}).call(this);
