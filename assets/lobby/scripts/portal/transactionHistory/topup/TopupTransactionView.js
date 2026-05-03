/**
 * Created by Nofear on 3/15/2019.
 */

// var topupTransactionListData = require('TopupTransactionListData');

(function () {
    cc.TopupTransactionView = cc.Class({
        "extends": cc.Component,
        properties: {
            topupTransactionListView: cc.TopupTransactionListView,        
        },

        onLoad: function () {
            this.getTopupTransactionList();
        },

        getTopupTransactionList: function () {
            var topupHistoryCommand = new cc.TopupHistoryCommand;
            topupHistoryCommand.execute(this);
        },

        onTopupHistoryResponse: function (response) {
            var list = response.List;
            //list = topupTransactionListData;
            if (list !== null && list.length > 0) {
                this.topupTransactionListView.resetList();
                this.topupTransactionListView.initialize(list);
            }
        },

        openKhieuNai: function () {
            cc.sys.openURL(cc.Config.getInstance().groupFB());
            cc.DDNA.getInstance().uiInteraction(cc.DDNAUILocation.PORTAL, 'FB_GROUP', cc.DDNAUIType.BUTTON);
        }
    });
}).call(this);
