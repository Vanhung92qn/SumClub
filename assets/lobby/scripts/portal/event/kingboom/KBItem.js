/**
 * Created by Nofear on 3/15/2019.
 */


(function () {
    cc.KBItem = cc.Class({
        "extends": cc.Component,
        properties: {
            // sprite: cc.Sprite,
            lbNo: cc.Label,
            lbTime: cc.Label,
            lbSID: cc.Label,
            lbNickName: cc.Label,
            lbBom: cc.Label,
            lbPrize: cc.Label,
        },

        updateItem: function(item, itemID) {
            // this.sprite.enabled = itemID % 2 !== 0;

            this.lbNo.string = itemID + 1;

            if (this.lbSID)
                this.lbSID.string = cc.Config.getInstance().getServiceNameNoFormat(item.ServiceID);
            this.lbNickName.string = item.Username;

            this.lbTime.string = cc.Tool.getInstance().convertUTCTime2(item.FinishTime);
            this.lbBom.string = cc.Tool.getInstance().formatNumber(item.TotalBoom);
            this.lbPrize.string = cc.Tool.getInstance().formatNumber(item.PrizeValue);

            this.item = item;
            this.itemID = itemID;
        },
    });
}).call(this);
