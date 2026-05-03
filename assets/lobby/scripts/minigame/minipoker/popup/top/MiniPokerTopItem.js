/**
 * Created by Nofear on 3/15/2019.
 */


(function () {
    cc.MiniPokerTopItem = cc.Class({
        "extends": cc.Component,
        properties: {
            // sprite: cc.Sprite,

            lbTime: cc.Label,
            lbSID: cc.Label,
            lbNickName: cc.Label,
            lbBet: cc.Label,
            lbWin: cc.Label,
            lbDesc: cc.Label,
        },

        updateItem: function(item, itemID) {
            // this.sprite.enabled = itemID % 2 !== 0;

            this.lbTime.string = cc.Tool.getInstance().convertUTCTime(item.CreatedDate);
            this.lbSID.string = cc.Config.getInstance().getServiceNameNoFormat(item.ServiceID);
            this.lbNickName.string = item.Username;
            this.lbBet.string = cc.Tool.getInstance().formatNumber(item.BetValue);
            this.lbWin.string = cc.Tool.getInstance().formatNumber(item.PrizeValue);
            this.lbDesc.string = item.IsJackpot ? cc.MiniPokerTopType.JACKPOT : cc.MiniPokerTopType.BIG_WIN;

            this.item = item;
            this.itemID = itemID;
        },
    });
}).call(this);
