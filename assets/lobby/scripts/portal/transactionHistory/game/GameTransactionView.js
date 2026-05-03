/**
 * Created by Nofear on 3/15/2019.
 */

//var gameTransactionListData = require('GameTransactionListData');

(function () {
    cc.GameTransactionView = cc.Class({
        "extends": cc.Component,
        properties: {
            gameTransactionListView: cc.GameTransactionListView,
            toggleChooseValue: cc.ToggleChooseValue, //tao list dropdown menu
            lbDateSelected: cc.Label,

            animationMenuDate: cc.Animation,
            nodePageNext: cc.Node,
            nodePagePrevious: cc.Node,
            nodeLBPage: cc.Label,
        },

        onLoad: function () {
            this.start = 0;
            this.end = 6;
            this.index = 1;
            //set ngay chon mac dinh
            this.lbDateSelected.string = cc.Tool.getInstance().getLocalDateNow();
            this.createDropDownMenu();
            this.getGameTransactionList();
            this.nodePageNext.active = false;
            this.nodePagePrevious.active = false;
        },

        onEnable: function () {
            this.animationMenuDate.node.scaleY = 0;
            this.animationMenuDate.node.children[0].width = 0;
            this.animationMenuDate.node.children[0].height = 0;
        },

        getGameTransactionList: function () {
            var gameHistoryCommand = new cc.GameHistoryCommand;
            gameHistoryCommand.execute(this);
        },

        onGameHistoryResponse: function (response) {
            var list = response.list;
            //list = gameTransactionListData;

            if (list !== null && list.length > 0) {
                this.datas = list;
                this.nodePagePrevious.active = false;
                if (this.datas.length > 6) {
                    this.nodePageNext.active = true;
                }
                else{
                    this.nodePageNext.active = false;
                }
                this.gameTransactionListView.resetList();
                this.gameTransactionListView.initialize(this.datas, this.start, this.end);
            }
        },
        pageNextClicked: function () {
            this.start = this.end;
            this.end += 6;
            this.index++;
            this.nodeLBPage.string = "Trang: " + this.index;
            if (this.end > this.datas.length - 1) {
                this.nodePageNext.active = false;
            }

            this.nodePagePrevious.active = true;
            this.gameTransactionListView.resetList();
            this.gameTransactionListView.initialize(this.datas, this.start, this.end);
        },

        pagePreviousClicked: function () {
            this.start -= 6;
            this.end -= 6;
            this.index--;
            if (this.start <= 0) {
                this.start = 0;
                this.nodePagePrevious.active = false;
            }
            if (this.ennd <= 0) {
                this.end = 0;
            }
            if (this.index <= 1) {
                this.index = 1;
            }
            this.nodeLBPage.string = "Trang: " + this.index;
            this.nodePageNext.active = true;
            this.gameTransactionListView.resetList();
            this.gameTransactionListView.initialize(this.datas, this.start, this.end);
        },
        //Tao list menu dropdown 7 ngay
        createDropDownMenu: function () {
            for (var i = 0; i < 7; i++) {
                this.toggleChooseValue.initializeToggleChooseValue(
                    this,
                    "GameTransactionView",
                    "selectDateValueEvent",
                    cc.Tool.getInstance().getLocalDateNow(i),
                    cc.Tool.getInstance().getLocalDateNow(i),
                );
            }
        },

        selectDateValueEvent: function (event, data) {
            this.lbDateSelected.string = data.toString();
            this.animationMenuDate.play('hideDropdownMenu');
            this.getGameTransactionList();
        },

        openMenuDateClicked: function () {
            this.animationMenuDate.play('showDropdownMenu');
        },

        hideMenuDateClicked: function () {
            this.animationMenuDate.play('hideDropdownMenu');
            console.log('hideMenuDateClicked');
        },
    });
}).call(this);
