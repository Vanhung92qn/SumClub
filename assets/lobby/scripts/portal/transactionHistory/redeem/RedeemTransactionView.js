/**
 * Created by Nofear on 3/15/2019.
 */
// var redeemTransactionListData = require('RedeemTransactionListData');

(function () {
    cc.RedeemTransactionView = cc.Class({
        "extends": cc.Component,
        properties: {
            redeemTransactionListView: cc.RedeemTransactionListView,

            //custom
            lbTitleRedeemCol: cc.Label,
        },

        onLoad: function () {
            this.lbTitleRedeemCol.string = cc.Config.getInstance().currency() + ' Đổi';

            cc.HistoryController.getInstance().setRedeemTransactionView(this);
            this.getRedeemTransactionList();
        },

        getRedeemTransactionList: function () {
            var redeemHistoryCommand = new cc.RedeemHistoryCommand;
            redeemHistoryCommand.execute(this);
        },

        refreshRedeemTransactionList: function () {
            this.getRedeemTransactionList();
        },

        onRedeemHistoryResponse: function (response) {
            var list = response.List;
            //list = redeemTransactionListData;
            if (list !== null && list.length > 0) {
                this.redeemTransactionListView.resetList();
                this.redeemTransactionListView.initialize(list);
            }
        }
    });
}).call(this);
