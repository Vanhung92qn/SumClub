/**
 * Created by Nofear on 3/15/2019.
 */

// var receiveTransactionListData = require('ReceiveTransactionListData');

(function () {
    cc.ReceiveTransactionView = cc.Class({
        "extends": cc.Component,
        properties: {
            receiveTransactionListView: cc.ReceiveTransactionListView,
        },

        onLoad: function () {
            this.getReceiveTransactionList();
        },

        getReceiveTransactionList: function () {
            var receiveHistoryCommand = new cc.ReceiveHistoryCommand;
            receiveHistoryCommand.execute(this);
        },

        onReceiveHistoryResponse: function (response) {
            var list = response.List;
            //list = receiveTransactionListData;
            if (list !== null && list.length > 0) {
                this.receiveTransactionListView.resetList();
                this.receiveTransactionListView.initialize(list);
            }
        }
    });
}).call(this);
