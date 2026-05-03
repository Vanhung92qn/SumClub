/**
 * Created by Nofear on 3/15/2019.
 */


(function () {
    cc.TaiXiuSessionDetailItem = cc.Class({
        "extends": cc.Component,
        properties: {
            lbTime: cc.Label,
            //lbSID: cc.Label,
            lbNickName: cc.Label,
            lbBet: cc.Label,
            lbRefund: cc.Label,
        },

        updateItem: function(item, itemID) {
            this.lbTime.string = cc.Tool.getInstance().convertUTCTime2(item.CreateTime);
           // this.lbSID.string = cc.Config.getInstance().getServiceNameNoFormat(item.ServiceID);
            this.lbNickName.string = item.UserName;

            this.lbBet.string = cc.Tool.getInstance().formatNumberK(item.Bet);
            this.lbRefund.string = cc.Tool.getInstance().formatNumberK(item.Refund);

            this.item = item;
            this.itemID = itemID;
        },
    });
}).call(this);
