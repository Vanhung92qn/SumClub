/**
 * Created by Nofear on 3/15/2019.
 */


(function () {
    cc.TransferTransactionItem = cc.Class({
        "extends": cc.Component,
        properties: {
            lbTime: cc.Label,
            lbReceiver: cc.Label, //nguoi nhan
            lbValue: cc.Label, //gia tri
            lbBalance: cc.Label, //so du
            lbDesc: cc.Label, //mo ta
        },

        onLoad: function () {
            // this.sprite = this.node.getComponent(cc.Sprite);
            this.lbValue.node.color = cc.Color.RED;
            this.lbBalance.node.color = cc.Color.YELLOW;
        },

        updateItem: function(item, itemID) {
            // this.sprite.enabled = itemID % 2 === 0;
            this.lbTime.string = cc.Tool.getInstance().convertUTCTime(item.CreatedDate); //UpdateDate
            this.lbReceiver.string = item.PartnerName;

            if (item.Amount >= 0) {
                this.lbValue.string = '+' + cc.Tool.getInstance().formatNumber(item.Amount);
                this.lbValue.node.color = cc.Color.GREEN;
            } else {
                this.lbValue.string = cc.Tool.getInstance().formatNumber(item.Amount);
                this.lbValue.node.color = cc.Color.RED;
            }

            this.lbBalance.string = cc.Tool.getInstance().formatNumber(item.RemainBalance); //OrgBalance
            this.lbDesc.string = item.Description;

            this.item = item;
            this.itemID = itemID;
        },
    });
}).call(this);
