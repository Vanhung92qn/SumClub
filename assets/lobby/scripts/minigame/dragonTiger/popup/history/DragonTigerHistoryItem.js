/**
 * Created by Nofear on 3/15/2019.
 */


(function () {
    cc.DragonTigerHistoryItem = cc.Class({
        "extends": cc.Component,
        properties: {
            // sprite: cc.Sprite,

            lbSession: cc.Label,
            lbTime: cc.Label,
            lbSide: cc.Label,
            lbResult: cc.Label,
            lbBet: cc.Label,
            lbRefund: cc.Label,
            lbWin: cc.Label,
        },

        updateItem: function(item, itemID) {
            // this.sprite.enabled = itemID % 2 !== 0;
            this.lbSession.string = '#' + item.SessionID;
            this.lbTime.string = cc.Tool.getInstance().convertUTCTime(item.CreateTime);
            let betSide = "";
            switch(item.BetSide) {
                case cc.DragonTigerBetSide.RONG:
                    betSide = "RỒNG";
                    break;
                case cc.DragonTigerBetSide.HOA:
                    betSide = "HÒA";
                    break;
                case cc.DragonTigerBetSide.HO:
                    betSide = "HỔ";
                    break;
            }
            this.lbSide.string = betSide;

            let result = "";
            switch(item.Result) {
                case cc.DragonTigerBetSide.RONG:
                    result = "RỒNG";
                    break;
                case cc.DragonTigerBetSide.HOA:
                    result = "HÒA";
                    break;
                case cc.DragonTigerBetSide.HO:
                    result = "HỔ";
                    break;
                default:
                    result = "";
                    break;
            }
            this.lbBet.string = cc.Tool.getInstance().formatNumber(item.Bet);
            this.lbResult.string = result;
            this.lbRefund.string = cc.Tool.getInstance().formatNumber(item.Refund);
            this.lbWin.string = cc.Tool.getInstance().formatNumber(item.Award);

            this.item = item;
            this.itemID = itemID;
        },
    });
}).call(this);
