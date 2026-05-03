/**
 * Popup lich su Jackpot Sicbo - hien thi top phien co nguoi no hu.
 * Ported from TaiXiuSicboJackpotHistoryView.
 */

cc.SicBoJackpotHistoryView = cc.Class({
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
        this.node.zIndex = cc.NoteDepth.POPUP_SICBO;
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
        var cmd = new cc.SBGetHistoryJackpotCommand;
        cmd.execute(this);
    },

    onSBGetHistoryJackpotResponse: function (response) {
        if (!response) return;
        this.list = response.list;
        this.lblPercentTai.string = `${response.percentTai}` + "%";
        this.lblPercentXiu.string = `${response.percentXiu}` + "%";
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
            cc.SicBoController.getInstance().destroyJackpotHistoryView();
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
                var a = node.getComponent(cc.SicBoJackpotHistoryItem);
                a.updateItem(itemData, i);
            } else {
                node.active = false;
            }
        }
    },
});
