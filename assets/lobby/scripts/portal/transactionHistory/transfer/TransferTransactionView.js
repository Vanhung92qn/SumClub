/**
 * Created by Nofear on 3/15/2019.
 */
// var transferTransactionListData = require('TransferTransactionListData');

(function () {
    cc.TransferTransactionView = cc.Class({
        "extends": cc.Component,
        properties: {
            transferTransactionListView: cc.TransferTransactionListView,
        },

        onLoad: function () {
            this.getTransferTransactionList();
        },

        getTransferTransactionList: function () {
            var transferHistoryCommand = new cc.TransferHistoryCommand;
            transferHistoryCommand.execute(this);
        },

        onTransferHistoryResponse: function (response) {
            var list = response.List;
            //list = transferTransactionListData;
            if (list !== null && list.length > 0) {
                this.transferTransactionListView.resetList();
                this.transferTransactionListView.initialize(list);
            }
        }
    });
}).call(this);
