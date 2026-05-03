/**
 * Created by Nofear on 3/15/2019.
 */


(function () {
    cc.TreasureTopCarrotItem = cc.Class({
        "extends": cc.Component,
        properties: {
            sprite: cc.Sprite,
            lbNo: cc.Label,
            lbSID: cc.Label,
            lbNickName: cc.Label,
            lbCarrot: cc.Label,
            lbTreasure: cc.Label,
            lbPrize: cc.Label,
            nodePrize: cc.Node,
            sfRanks: [cc.SpriteFrame]
        },

        onLoad: function () {
            // this.treasureImage = cc.TreasureController.getInstance().getTreasureImage();
        },

        updateItem: function(item, itemID) {
            // if (this.treasureImage === undefined) {
            //     this.treasureImage = cc.TreasureController.getInstance().getTreasureImage();
            // }
            //

            //Ko xep hang
            if (itemID === -1) {
                this.sprite.node.active = false;
                this.lbNo.node.active = true;
                this.lbNo.string = '?';
            }
            //TOP 3
            else if (itemID < 3) {
                this.sprite.node.active = true;
                this.lbNo.node.active = false;
                this.sprite.spriteFrame = this.sfRanks[itemID];

                if (itemID === 0 && item.TreasureID === 12) {
                    this.lbPrize.node.active = false;
                    this.nodePrize.active = true;
                }
            } else {
                this.sprite.node.active = false;
                this.lbNo.node.active = true;
                this.lbNo.string = itemID + 1;
            }

            this.lbSID.string = cc.Config.getInstance().getServiceNameNoFormat(item.ServiceID);
            this.lbNickName.string = item.DisplayName;

            this.lbCarrot.string = cc.Tool.getInstance().formatNumber(item.TotalCarrotValue);
            this.lbTreasure.string = cc.Tool.getInstance().formatNumber(item.TreasureID);

            this.lbPrize.string = cc.Tool.getInstance().formatNumber(item.TotalPrizeValue);

            this.item = item;
            this.itemID = itemID;
        },
    });
}).call(this);
