/**
 * Created by Nofear on 3/15/2019.
 */


(function () {
    cc.TransactionItem = cc.Class({
        "extends": cc.Component,
        properties: {
            lbTime: cc.Label, //THoi gian
            lbValue: cc.Label, //Gia tri
            lbBalance: cc.Label, //So du
            lbDesc: cc.Label, //Mo ta
        },

        onLoad: function () {
            this.sprite = this.node.getComponent(cc.Sprite);
            this.lbBalance.node.color = cc.Color.YELLOW;
        },

        updateItem: function(item, itemID) {
            this.sprite.enabled = itemID % 2 === 0;
            this.lbTime.string = cc.Tool.getInstance().convertUTCTime(item.CreateDate);
            this.lbBalance.string = cc.Tool.getInstance().formatNumber(item.PosBalance);
            this.lbDesc.string = item.Description;

            if (item.Amount >= 0) {
                this.lbValue.string = '+' + cc.Tool.getInstance().formatNumber(item.Amount);
                this.lbValue.node.color = cc.Color.GREEN;
            } else {
                this.lbValue.string = cc.Tool.getInstance().formatNumber(item.Amount);
                this.lbValue.node.color = cc.Color.RED;
            }

            this.item = item;
            this.itemID = itemID;
        },
    });
}).call(this);
