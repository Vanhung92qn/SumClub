/**
 * Item trong list dat cuoc cua mot phien (SicBoSessionDetailView).
 * Ported from TaiXiuSicboSessionDetailItem.
 */

(function () {
    cc.SicBoSessionDetailItem = cc.Class({
        "extends": cc.Component,
        properties: {
            lbTime: cc.Label,
            lbNickName: cc.Label,
            lbBet: cc.Label,
            lbRefund: cc.Label,
        },

        updateItem: function (item, itemID) {
            this.lbTime.string = cc.Tool.getInstance().convertUTCTime2(item.CreateTime);
            this.lbNickName.string = item.UserName;
            this.lbBet.string = cc.Tool.getInstance().formatNumberKTX(item.Bet);
            this.lbRefund.string = cc.Tool.getInstance().formatNumberKTX(item.Refund);

            this.item = item;
            this.itemID = itemID;
        },
    });
}).call(this);
