/**
 * Created by Nofear on 3/15/2019.
 */


(function () {
    cc.TaiXiuMd5TopItem = cc.Class({
        "extends": cc.Component,
        properties: {
            // nodeBG: cc.Node,

            lbRank: cc.Label,
            //lbSID: cc.Label,
            lbNickName: cc.Label,
            lbTotalWin: cc.Label,
            rankSprite1: sp.Skeleton,
            rankSprite2: sp.Skeleton,
            rankSprite3: cc.Sprite,
            fontRegurlar: cc.Font,
            fontBold: cc.Font,
			fontName: cc.Font,
        },

        updateItem: function (item, itemID) {
            // this.nodeBG.active = itemID % 2 !== 0;
            var color = cc.Color.WHITE;
            if (itemID < 3) {
                this.lbRank.node.active = false;
                this.lbNickName.font = this.fontName;
                this.lbTotalWin.font = this.fontBold;
                if (itemID == 0) {
                    this.rankSprite1.node.active = true;
                    this.rankSprite2.node.active = false;
                    this.rankSprite3.node.active = false;
                    this.lbNickName.node.color = color.fromHEX("#CC0000");
                    //this.lbTotalWin.node.color = color.fromHEX("#EA21E4");
                } else if (itemID == 1) {
                    this.rankSprite1.node.active = false;
                    this.rankSprite2.node.active = true;
                    this.rankSprite3.node.active = false;
                    this.lbNickName.node.color = color.fromHEX("#FFCC00");
                    //this.lbTotalWin.node.color = color.fromHEX("#27C7F4");
                } else {
                    this.rankSprite1.node.active = false;
                    this.rankSprite2.node.active = false;
                    this.rankSprite3.node.active = true;
                    this.lbNickName.node.color = color.fromHEX("#00CC34");
                    //this.lbTotalWin.node.color = color.fromHEX("#FFB73D");
                }
            } else {
                this.lbNickName.node.color = color.fromHEX("#008DFF");
                this.lbTotalWin.node.color = color.fromHEX("#FFFFFF");
                this.lbNickName.font = this.fontName;
                this.lbTotalWin.font = this.fontRegurlar;
                this.lbRank.string = itemID + 1;
                this.lbRank.node.active = true;
                this.rankSprite1.node.active = false;
                this.rankSprite2.node.active = false;
                this.rankSprite3.node.active = false;
            }
            //this.lbSID.string = cc.Config.getInstance().getServiceNameNoFormat(item.ServiceID);
            this.lbNickName.string = item.UserName;
            this.lbTotalWin.string = cc.Tool.getInstance().formatNumber(item.Award);

            this.item = item;
            this.itemID = itemID;
        },
    });
}).call(this);