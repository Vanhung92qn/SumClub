/**
 * Created by Nofear on 3/15/2019.
 */

(function () {
    cc.TaiXiuHistoryView = cc.Class({
        "extends": cc.PopupBase,
        properties: {
            taiXiuHistoryListView: cc.TaiXiuHistoryListView,
            nodePageNext: cc.Node,
            nodePagePrevious: cc.Node,
            nodeLBPage: cc.Label,
        },

        onLoad: function () {
            this.start = 0;
            this.end = 6;
            this.index = 1;
            this.datas = [];
            this.animation = this.node.getComponent(cc.Animation);
            this.node.zIndex = cc.NoteDepth.POPUP_TAIXIU;
            this.nodePagePrevious.active = false;
            this.nodePageNext.active = false;
        },

        onEnable: function () {
            var self = this;
            var delay = 0.2;
            cc.director.getScheduler().schedule(function () {
                self.getTopSessionWinners();
            }, this, 1, 0, delay, false);

            this.animation.play('openPopup');
        },

        getTopSessionWinners: function () {
            var txGetHistoryCommand = new cc.TXGetHistoryCommand;
            txGetHistoryCommand.execute(this);
        },

        onTXGetHistoryResponse: function (response) {
            var list = response;
            //var list = slotsHistoryListData;
            if (list !== null && list.length > 0) {
                this.datas = list;
                this.nodePagePrevious.active = false;
                if (this.datas.length > 6) {
                    this.nodePageNext.active = true;
                }

                this.taiXiuHistoryListView.resetList();
                this.taiXiuHistoryListView.initialize(this.datas, this.start, this.end);
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
            this.taiXiuHistoryListView.resetList();
            this.taiXiuHistoryListView.initialize(this.datas, this.start, this.end);
        },

        pagePreviousClicked: function () {
            this.start -= 6;
            this.end -= 6;
            this.index--;
            if (this.start <= 0) {
                this.start = 0;
                this.nodePagePrevious.active = false;
            }
            if (this.end <= 0) {
                this.end = 0;
            }
            if (this.index <= 1) {
                this.index = 1;
            }
            this.nodeLBPage.string = "Trang: " + this.index;
            this.nodePageNext.active = true;
            this.taiXiuHistoryListView.resetList();
            this.taiXiuHistoryListView.initialize(this.datas, this.start, this.end);
        },

        closeClicked: function () {
            this.taiXiuHistoryListView.resetList();
            this.animation.play('closePopup');
            var self = this;
            var delay = 0.12;
            cc.director.getScheduler().schedule(function () {
                self.animation.stop();
                cc.TaiXiuMainController.getInstance().destroyHistoryView();
            }, this, 1, 0, delay, false);
        },
    });
}).call(this);
