/**
 * Created by Nofear on 3/15/2019.
 */


(function () {
    cc.EventTopVPDayItem2 = cc.Class({
        "extends": cc.Component,
        properties: {
            lbNo: cc.Label,
            lbNickName: cc.Label,
            lbVP: cc.Label,
            lbReward: cc.Label,
            lbPrizeValue: cc.Label,
            spritePrize: cc.Sprite,
        },

        updateItem: function(item, itemID) {

            if (this.eventImage === undefined) {
                this.eventImage = cc.EventTopVpController.getInstance().getEventImage();
            }
            
            this.lbNo.string = "#" + (itemID + 1);

            this.lbNickName.string = item.DisplayName;

            this.lbVP.string = item.VPStr;
            if (this.lbReward)
                this.lbReward.string = item.PrizeName;
            this.lbPrizeValue.string = cc.Tool.getInstance().formatNumber(item.PrizeValue);

            var color = cc.Color.WHITE;
            if (itemID === 0) {
                color.fromHEX("#ff5a5a");
            } else if (itemID === 1) {
                color.fromHEX("#00db62");
            } else  if (itemID === 2) {
                color.fromHEX("#77b1ff");
            }
            if (item.Position === 1) {
                this.spritePrize.node.active = true;
                this.spritePrize.spriteFrame = this.eventImage.sfPrizes[5];
            } else
                this.spritePrize.node.active = false;
            
            this.lbNo.node.color = color;
            this.lbNickName.node.color = color;
            this.lbVP.node.color = color;
            this.lbReward.node.color = color;
            this.lbPrizeValue.node.color = color;
            // ff5a5a, 00db62, 77b1ff
            
            this.item = item;
            this.itemID = itemID;
        },
    });
}).call(this);
