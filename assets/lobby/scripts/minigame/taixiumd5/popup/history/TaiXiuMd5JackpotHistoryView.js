/**
 * Created by Nofear on 3/15/2019.
 */

cc.TaiXiuMd5JackpotHistoryView = cc.Class({
    "extends": cc.PopupBase,
    properties: {
        listItems: cc.Node,
        lblPage: cc.Label,
        lblPercentTai: cc.Label,
        lblPercentXiu: cc.Label,
        btnNext: cc.Button,
        btnPrev: cc.Button,
    },

    onLoad: function () {
        this.animation = this.node.getComponent(cc.Animation);
        this.node.zIndex = cc.NoteDepth.POPUP_TAIXIU_MD5;
        this.listItems.children.forEach(function (e) {
            e.active = false;
        });
        this.maxItems = 2;
        this.btnNext.node.active = false;
        this.btnPrev.node.active = false;
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
        var TXGetHistoryJackpotCommand = new cc.TXGetHistoryJackpotCommand;
        TXGetHistoryJackpotCommand.execute(this);
    },

    onTXGetHistoryResponse: function (response) {
        // this.list = response;
        console.log(response);
        // response = {
        //     percentTai: 51,
        //     percentXiu: 49,
        //     list: [
        //         {
        //             session: 12312,
        //             time: "2000-20-20 20:30",
        //             result: "Tài",
        //             userCount: 50,
        //             jackpot: 200000,
        //             vinhDanh: [
        //                 { nickname: "Nickname1", coin: 1000000 },
        //                 { nickname: "Nickname2", coin: 1000000 },
        //                 { nickname: "Nickname3", coin: 1000000 },
        //                 { nickname: "Nickname4", coin: 1000000 },
        //                 { nickname: "Nickname5", coin: 1000000 },
        //                 { nickname: "Nickname6", coin: 1000000 },
        //                 { nickname: "Nickname7", coin: 1000000 },
        //                 { nickname: "Nickname8", coin: 1000000 },
        //                 { nickname: "Nickname9", coin: 1000000 },
        //                 { nickname: "Nickname10", coin: 1000000 },
        //                 { nickname: "Nickname11", coin: 1000000 },
        //                 { nickname: "Nickname12", coin: 1000000 },
        //                 { nickname: "Nickname13", coin: 1000000 },
        //                 { nickname: "Nickname14", coin: 1000000 },
        //                 { nickname: "Nickname15", coin: 1000000 },
        //                 { nickname: "Nickname16", coin: 1000000 },
        //                 { nickname: "Nickname17", coin: 1000000 },
        //                 { nickname: "Nickname18", coin: 1000000 },
        //                 { nickname: "Nickname19", coin: 1000000 },
        //                 { nickname: "Nickname20", coin: 1000000 }
        //             ]
        //         },
        //         {
        //             session: 12313,
        //             time: "2000-20-20 20:30",
        //             result: "Xỉu",
        //             userCount: 50,
        //             jackpot: 200000,
        //             vinhDanh: [
        //                 { nickname: "Nickname1", coin: 1000000 },
        //                 { nickname: "Nickname2", coin: 1000000 },
        //                 { nickname: "Nickname3", coin: 1000000 },
        //                 { nickname: "Nickname4", coin: 1000000 },
        //                 { nickname: "Nickname5", coin: 1000000 },
        //                 { nickname: "Nickname6", coin: 1000000 },
        //                 { nickname: "Nickname7", coin: 1000000 },
        //                 { nickname: "Nickname8", coin: 1000000 },
        //                 { nickname: "Nickname9", coin: 1000000 },
        //                 { nickname: "Nickname10", coin: 1000000 },
        //                 { nickname: "Nickname11", coin: 1000000 },
        //                 { nickname: "Nickname12", coin: 1000000 },
        //                 { nickname: "Nickname13", coin: 1000000 },
        //                 { nickname: "Nickname14", coin: 1000000 },
        //                 { nickname: "Nickname15", coin: 1000000 },
        //                 { nickname: "Nickname16", coin: 1000000 },
        //                 { nickname: "Nickname17", coin: 1000000 },
        //                 { nickname: "Nickname18", coin: 1000000 },
        //                 { nickname: "Nickname19", coin: 1000000 },
        //                 { nickname: "Nickname20", coin: 1000000 }
        //             ]
        //         },
        //         {
        //             session: 12314,
        //             time: "2000-20-20 20:30",
        //             percentTai: 51,
        //             percentXiu: 49,
        //             result: "Tài",
        //             userCount: 50,
        //             jackpot: 200000,
        //             vinhDanh: [
        //                 { nickname: "Nickname1", coin: 1000000 },
        //                 { nickname: "Nickname2", coin: 1000000 },
        //                 { nickname: "Nickname3", coin: 1000000 },
        //                 { nickname: "Nickname4", coin: 1000000 },
        //                 { nickname: "Nickname5", coin: 1000000 },
        //                 { nickname: "Nickname6", coin: 1000000 },
        //                 { nickname: "Nickname7", coin: 1000000 },
        //                 { nickname: "Nickname8", coin: 1000000 },
        //                 { nickname: "Nickname9", coin: 1000000 },
        //                 { nickname: "Nickname10", coin: 1000000 },
        //                 { nickname: "Nickname11", coin: 1000000 },
        //                 { nickname: "Nickname12", coin: 1000000 },
        //                 { nickname: "Nickname13", coin: 1000000 },
        //                 { nickname: "Nickname14", coin: 1000000 },
        //                 { nickname: "Nickname15", coin: 1000000 },
        //                 { nickname: "Nickname16", coin: 1000000 },
        //                 { nickname: "Nickname17", coin: 1000000 },
        //                 { nickname: "Nickname18", coin: 1000000 },
        //                 { nickname: "Nickname19", coin: 1000000 },
        //                 { nickname: "Nickname20", coin: 1000000 }
        //             ]
        //         },
        //         {
        //             session: 12315,
        //             time: "2000-20-20 20:30",
        //             percentTai: 51,
        //             percentXiu: 49,
        //             result: "Tài",
        //             userCount: 50,
        //             jackpot: 200000,
        //             vinhDanh: [
        //                 { nickname: "Nickname1", coin: 1000000 },
        //                 { nickname: "Nickname2", coin: 1000000 },
        //                 { nickname: "Nickname3", coin: 1000000 },
        //                 { nickname: "Nickname4", coin: 1000000 },
        //                 { nickname: "Nickname5", coin: 1000000 },
        //                 { nickname: "Nickname6", coin: 1000000 },
        //                 { nickname: "Nickname7", coin: 1000000 },
        //                 { nickname: "Nickname8", coin: 1000000 },
        //                 { nickname: "Nickname9", coin: 1000000 },
        //                 { nickname: "Nickname10", coin: 1000000 },
        //                 { nickname: "Nickname11", coin: 1000000 },
        //                 { nickname: "Nickname12", coin: 1000000 },
        //                 { nickname: "Nickname13", coin: 1000000 },
        //                 { nickname: "Nickname14", coin: 1000000 },
        //                 { nickname: "Nickname15", coin: 1000000 },
        //                 { nickname: "Nickname16", coin: 1000000 },
        //                 { nickname: "Nickname17", coin: 1000000 },
        //                 { nickname: "Nickname18", coin: 1000000 },
        //                 { nickname: "Nickname19", coin: 1000000 },
        //                 { nickname: "Nickname20", coin: 1000000 }
        //             ]
        //         },
        //         {
        //             session: 12316,
        //             time: "2000-20-20 20:30",
        //             percentTai: 51,
        //             percentXiu: 49,
        //             result: "Tài",
        //             userCount: 50,
        //             jackpot: 200000,
        //             vinhDanh: [
        //                 { nickname: "Nickname1", coin: 1000000 },
        //                 { nickname: "Nickname2", coin: 1000000 },
        //                 { nickname: "Nickname3", coin: 1000000 },
        //                 { nickname: "Nickname4", coin: 1000000 },
        //                 { nickname: "Nickname5", coin: 1000000 },
        //                 { nickname: "Nickname6", coin: 1000000 },
        //                 { nickname: "Nickname7", coin: 1000000 },
        //                 { nickname: "Nickname8", coin: 1000000 },
        //                 { nickname: "Nickname9", coin: 1000000 },
        //                 { nickname: "Nickname10", coin: 1000000 },
        //                 { nickname: "Nickname11", coin: 1000000 },
        //                 { nickname: "Nickname12", coin: 1000000 },
        //                 { nickname: "Nickname13", coin: 1000000 },
        //                 { nickname: "Nickname14", coin: 1000000 },
        //                 { nickname: "Nickname15", coin: 1000000 },
        //                 { nickname: "Nickname16", coin: 1000000 },
        //                 { nickname: "Nickname17", coin: 1000000 },
        //                 { nickname: "Nickname18", coin: 1000000 },
        //                 { nickname: "Nickname19", coin: 1000000 },
        //                 { nickname: "Nickname20", coin: 1000000 }
        //             ]
        //         }
        //     ]
        // };

        this.list = response.list;
        this.lblPercentTai.string = `${response.percentTai}` + "%";
        this.lblPercentXiu.string = `${response.percentXiu}` + "%";
        //var list = slotsHistoryListData;
        if (this.list !== null && this.list.length > 0) {
            this.page = 0;
            this.btnNext.node.active = true;
            this.updatePage();
        }
    },

    closeClicked: function () {
        this.animation.play('closePopup');
        var self = this;
        var delay = 0.12;
        cc.director.getScheduler().schedule(function () {
            self.animation.stop();
            cc.TaiXiuMd5MainController.getInstance().destroyJackpotHistoryView();
        }, this, 1, 0, delay, false);
    },

    onClickNextPage: function () {
        if (!this.list) return;
        var maxPage = Math.ceil(this.list.length / this.listItems.children.length);
        if (this.page < maxPage - 1) {
            this.page++;
            this.updatePage();
            this.btnPrev.node.active = true;
            this.btnNext.node.active = this.page < maxPage - 1;
        }
    },

    onClickPrevPage: function () {
        if (!this.list) return;
        if (this.page > 0) {
            this.page--;
            this.updatePage();
            this.btnNext.node.active = true;
            this.btnPrev.node.active = this.page > 0;
        }
    },

    updatePage: function () {
        this.lblPage.string = `Trang ${this.page + 1}`;
        for (var i = 0; i < this.listItems.children.length; i++) {
            var itemData = this.list[this.page * this.maxItems + i];

            var node = this.listItems.children[i];
            if (itemData) {
                node.active = true;
                var a = node.getComponent(cc.TaiXiuMd5JackpotHistoryItem);
                a.updateItem(itemData, i);
            } else {
                node.active = false;
            }
        }
    },
});
