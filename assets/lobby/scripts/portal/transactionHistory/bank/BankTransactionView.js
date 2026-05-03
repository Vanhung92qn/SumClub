/**
 * Created by Nofear on 3/15/2019.
 */

// var bankTransactionListData = require('BankTransactionListData');

(function () {
  cc.TopupTransactionView = cc.Class({
    extends: cc.Component,
    properties: {
      bankTransactionListView: cc.BankTransactionListView,
      nodePageNext: cc.Node,
      nodePagePrevious: cc.Node,
      nodeLBPage: cc.Label,
    },

    onLoad: function () {
      this.start = 0;
      this.end = 6;
      this.index = 1;
      this.getBankTransactionList();
      this.nodePageNext.active = false;
      this.nodePagePrevious.active = false;
    },

    getBankTransactionList: function () {
      var bankHistoryCommand = new cc.BankHistoryCommand();
      bankHistoryCommand.execute(this);
    },

    onBankHistoryResponse: function (response) {
      var list = response.List;
      // var list = bankTransactionListData;
      if (list !== null && list.length > 0) {
        this.datas = list;
        this.nodePagePrevious.active = false;
        if (this.datas.length > 6) {
          this.nodePageNext.active = true;
        }
        this.bankTransactionListView.resetList();
        this.bankTransactionListView.initialize(
          this.datas,
          this.start,
          this.end
        );
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
      this.bankTransactionListView.resetList();
      this.bankTransactionListView.initialize(this.datas, this.start, this.end);
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
      this.bankTransactionListView.resetList();
      this.bankTransactionListView.initialize(this.datas, this.start, this.end);
    },
  });
}.call(this));
