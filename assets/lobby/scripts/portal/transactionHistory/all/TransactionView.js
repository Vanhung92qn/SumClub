/**
 * Created by Nofear on 3/15/2019.
 */

//var transactionListData = require('TransactionListData');

(function () {
    cc.TransactionView = cc.Class({
        "extends": cc.Component,
        properties: {
            transactionListView: cc.TransactionListView,
            toggleChooseValue: cc.ToggleChooseValue, //tao list dropdown menu
            lbDateSelected: cc.Label,

            animationMenuDate: cc.Animation,
        },

        onLoad: function () {
            //set ngay chon mac dinh
            this.lbDateSelected.string = cc.Tool.getInstance().getLocalDateNow();
            this.createDropDownMenu();

            this.getTransactionList();
        },

        onEnable: function () {
            this.animationMenuDate.node.scaleY = 0;
            this.animationMenuDate.node.children[0].width = 0;
            this.animationMenuDate.node.children[0].height = 0;
        },

        getTransactionList: function () {
            var allHistoryCommand = new cc.AllHistoryCommand;
            allHistoryCommand.execute(this);
        },

        onAllHistoryResponse: function (response) {
            var list = response.list;
            //list = transactionListData;

            this.transactionListView.resetList();
            if (list !== null && list.length > 0) {
                this.transactionListView.initialize(list);
            }
        },

        //Tao list menu dropdown 7 ngay
        createDropDownMenu: function () {
            for (var i = 0; i < 7; i++) {
                this.toggleChooseValue.initializeToggleChooseValue(
                    this,
                    "TransactionView",
                    "selectDateValueEvent",
                    cc.Tool.getInstance().getLocalDateNow(i),
                    cc.Tool.getInstance().getLocalDateNow(i),
                );
            }
        },

        selectDateValueEvent: function (event, data) {
            this.lbDateSelected.string = data.toString();
            this.animationMenuDate.play('hideDropdownMenu');
            this.getTransactionList();
        },

        openMenuDateClicked: function () {
            this.animationMenuDate.play('showDropdownMenu');
        },

        hideMenuDateClicked: function () {
            this.animationMenuDate.play('hideDropdownMenu');
        },

    });
}).call(this);
