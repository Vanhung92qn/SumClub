/**
 * Created by Nofear on 3/15/2019.
 */


(function () {
    cc.EventTopVPItem = cc.Class({
        "extends": cc.Component,
        properties: {
            sprite: cc.Sprite,
            lbNo: cc.Label,
            lbNickName: cc.Label,
            lbVP: cc.Label,
            lbPrize: cc.Label,
        },

        updateItem: function(item, itemID) {
            this.sprite.enabled = itemID % 2 !== 0;

            this.lbNo.string = itemID + 1;
            this.lbNickName.string = item.NickName;

            this.lbVP.string = cc.Tool.getInstance().formatNumber(item.Q1);
            this.lbPrize.string = cc.Tool.getInstance().formatNumber(item.PrizeValue);

            this.item = item;
            this.itemID = itemID;
        },
    });
}).call(this);
