/**
 * Created by Nofear on 3/15/2019.
 */


(function () {
    cc.EventTopVPItem2 = cc.Class({
        "extends": cc.Component,
        properties: {
            spritePrize: cc.Sprite,
            spriteNo: cc.Sprite,
            lbNo: cc.Label,
            lbNickName: cc.Label,
            lbVP: cc.Label,
            lbPrize: cc.Label,
            lbPrizeValue: cc.Label,
        },

        updateItem: function(item, itemID) {
            

            this.lbNickName.string = item.DisplayName;

            if (this.eventImage === undefined) {
                this.eventImage = cc.EventTopVpController.getInstance().getEventImage();
            }

            if (item.Position > 3) {
                this.lbPrize.string = item.PrizeName; 
                this.lbPrizeValue.string = cc.Tool.getInstance().formatNumber(item.PrizeValue);
                this.spriteNo.node.active = false;
                this.lbNo.node.active = true;
                this.lbNo.string = itemID + 1;
                this.lbVP.string = item.VPStr;
                if (item.Position > 5) {
                    this.spritePrize.node.active = false;
                } else {
                    this.spritePrize.node.active = true;
                    this.spritePrize.spriteFrame = this.eventImage.sfPrizes[itemID];
                }

            } else {
                this.spriteNo.node.active = true;
                this.lbNo.node.active = false;
                this.spriteNo.spriteFrame = this.eventImage.sfNos[itemID];
                this.lbVP.string = "***";

                this.spritePrize.node.active = true;
                this.spritePrize.spriteFrame = this.eventImage.sfPrizes[itemID];
                this.lbPrize.string = item.PrizeName;
                this.lbPrizeValue.string = cc.Tool.getInstance().formatNumber(item.PrizeValue);
            }

            this.item = item;
            this.itemID = itemID;
        },
    });
}).call(this);
