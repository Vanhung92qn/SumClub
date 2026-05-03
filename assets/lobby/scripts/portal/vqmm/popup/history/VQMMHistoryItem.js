/**
 * Created by Nofear on 3/15/2019.
 */


(function () {
    cc.VQMMHistoryItem = cc.Class({
        "extends": cc.Component,
        properties: {
            // sprite: cc.Sprite,

            lbTime: cc.Label,
            lbBigPrize: cc.Label,
            lbSmallPrize: cc.Label,
        },

        updateItem: function(item, itemID) {
            // this.sprite.enabled = itemID % 2 !== 0;

            this.lbTime.string = cc.Tool.getInstance().convertUTCTime(item.CreatedTime);
            this.lbBigPrize.string = cc.Tool.getInstance().formatNumber(item.PrizeValue);
            this.lbSmallPrize.string = item.FreeSpinName;

            this.item = item;
            this.itemID = itemID;
        },
    });
}).call(this);
