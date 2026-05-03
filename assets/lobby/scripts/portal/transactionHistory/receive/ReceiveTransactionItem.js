/**
 * Created by Nofear on 3/15/2019.
 */


(function () {
    cc.ReceiveTransactionItem = cc.Class({
        "extends": cc.Component,
        properties: {
            lbTime: cc.Label,
            lbTransferPerson: cc.Label, //nguoi chuyen
            lbValue: cc.Label,
            lbBalance: cc.Label,
            lbDesc: cc.Label,
        },

        onLoad: function () {
            // this.sprite = this.node.getComponent(cc.Sprite);
            this.lbValue.node.color = cc.Color.GREEN;
            this.lbBalance.node.color = cc.Color.YELLOW;
        },

        updateItem: function(item, itemID) {
            // this.sprite.enabled = itemID % 2 === 0;
            this.lbTime.string = cc.Tool.getInstance().convertUTCTime(item.CreatedDate);
            this.lbTransferPerson.string = item.PartnerName ? item.PartnerName : '';

            if (item.Amount >= 0) {
                this.lbValue.string = '+' + cc.Tool.getInstance().formatNumber(item.Amount);
                this.lbValue.node.color = cc.Color.GREEN;
            } else {
                this.lbValue.string = cc.Tool.getInstance().formatNumber(item.Amount);
                this.lbValue.node.color = cc.Color.RED;
            }

            this.lbBalance.string = cc.Tool.getInstance().formatNumber(item.RemainBalance);
            this.lbDesc.string = item.Description;

            this.item = item;
            this.itemID = itemID;
        },
    });
}).call(this);
