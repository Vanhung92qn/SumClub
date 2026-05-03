/**
 * Created by Nofear on 3/15/2019.
 */


(function () {
    cc.EventTopVPWeekItem = cc.Class({
        "extends": cc.Component,
        properties: {
            sprite: cc.Sprite,
            lbNo: cc.Label,
            lbSID: cc.Label,
            lbNickName: cc.Label,
            lbVP: cc.Label,
            lbReward: cc.Label,
        },

        updateItem: function(item, itemID) {
            this.sprite.enabled = itemID % 2 !== 0;

            this.lbNo.string = itemID + 1;

            this.lbSID.string = cc.Config.getInstance().getServiceNameNoFormat(item.ServiceID);
            this.lbNickName.string = item.NickName;

            this.lbVP.string = cc.Tool.getInstance().formatNumber(item.QP);
            if (this.lbReward)
                this.lbReward.string = cc.Tool.getInstance().formatNumber(item.PrizeValue);

            this.item = item;
            this.itemID = itemID;
        },
    });
}).call(this);
