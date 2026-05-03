/**
 * Created by Nofear on 3/15/2019.
 */


(function () {
    cc.GameTransactionItem = cc.Class({
        "extends": cc.Component,
        properties: {
            lbPhien: cc.Label, //Phien
            lbTime: cc.Label, //Thoi gian
            lbGame: cc.Label,  //Dich vu
            lbValue: cc.Label, //Gia tri
            lbBalance: cc.Label, //So du
            lbDesc: cc.Label, //Mo ta
        },

        onLoad: function () {
            // this.sprite = this.node.getComponent(cc.Sprite);
            //this.lbBalance.node.color = cc.Color.YELLOW;
        },

        updateItem: function(item, itemID) {
            // this.sprite.enabled = itemID % 2 === 0;
            this.lbTime.string = cc.Tool.getInstance().convertUTCTime(item.PlayTime);

            this.lbGame.string = cc.Config.getInstance().getGameName(item.GameType);

            var val = item.PrizeValue - (item.BetValue - item.RefundValue);
            if (val > 0) {
                this.lbValue.string = '+' + cc.Tool.getInstance().formatNumber(val);
                this.lbValue.node.color = cc.Color.GREEN;
            } else if (val === 0) {
                this.lbValue.string = cc.Tool.getInstance().formatNumber(val);
                this.lbValue.node.color = cc.Color.GREEN;
            } else {
                this.lbValue.string = cc.Tool.getInstance().formatNumber(val);
                this.lbValue.node.color = cc.Color.RED;
            }
            this.lbBalance.string = cc.Tool.getInstance().formatNumber(item.Balance);
            this.lbDesc.string = item.Description;
            this.lbPhien.string = '#' + item.SpinID;

            this.item = item;
            this.itemID = itemID;
        },
    });
}).call(this);
