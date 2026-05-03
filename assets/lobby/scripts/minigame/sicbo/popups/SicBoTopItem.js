/**
 * Created by Nofear on 3/15/2019.
 */


(function () {
    cc.SicBoTopItem = cc.Class({
        "extends": cc.Component,
        properties: {
            nodeBG: cc.Node,
            lbRank: cc.Label,
            lbNickName: cc.Label,
            lbTotalWin: cc.Label,
            rankSprite1: cc.Sprite,
            rankSprite2: cc.Sprite,
            rankSprite3: cc.Sprite,
            fontBold: cc.Font,
			fontName: cc.Font,
        },

        updateItem: function (item, itemID) {
            this.nodeBG.active = itemID % 2 !== 0;
            var color = cc.Color.WHITE;
            if (itemID < 3) {
                this.lbRank.node.active = false;
                this.lbNickName.font = this.fontName;
                this.lbTotalWin.font = this.fontBold;
                if (itemID == 0) {
                    this.rankSprite1.node.active = true;
                    this.rankSprite2.node.active = false;
                    this.rankSprite3.node.active = false;
                } else if (itemID == 1) {
                    this.rankSprite1.node.active = false;
                    this.rankSprite2.node.active = true;
                    this.rankSprite3.node.active = false;
                } else {
                    this.rankSprite1.node.active = false;
                    this.rankSprite2.node.active = false;
                    this.rankSprite3.node.active = true;
                }
            } else {
                this.lbRank.string = itemID + 1;
                this.lbRank.node.active = true;
                this.rankSprite1.node.active = false;
                this.rankSprite2.node.active = false;
                this.rankSprite3.node.active = false;
            }
            this.lbNickName.string = item.DisplayName;
            this.lbTotalWin.string = cc.Tool.getInstance().formatNumberK(item.Award);

            this.item = item;
            this.itemID = itemID;
        },
    });
}).call(this);