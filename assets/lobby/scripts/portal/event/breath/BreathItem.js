/**
 * Created by Nofear on 3/15/2019.
 */


(function () {
    cc.BreathItem = cc.Class({
        "extends": cc.Component,
        properties: {
            // sprite: cc.Sprite,
            lbTime: cc.Label,
            lbGame: cc.Label,
            lbJackpot: cc.Label,
            lbSID: cc.Label,
            lbNickName: cc.Label,
            lbValue: cc.Label,
            lbPrize: cc.Label,
        },

        updateItem: function(item, itemID) {
            // this.sprite.enabled = itemID % 2 !== 0;

            this.lbTime.string = cc.Tool.getInstance().convertUTCTime3(item.EndDate);
            this.lbGame.string = cc.Config.getInstance().getGameName(item.GameID);
            this.lbJackpot.string = cc.Tool.getInstance().formatNumber(item.JackpotValue);

            if (this.lbSID)
                this.lbSID.string = cc.Config.getInstance().getServiceNameNoFormat(item.ServiceID);
            this.lbNickName.string = item.Username;

            this.lbValue.string = cc.Tool.getInstance().formatNumber(item.TotalBetValue);
            this.lbPrize.string = cc.Tool.getInstance().formatNumber(item.AwardValue);

            this.item = item;
            this.itemID = itemID;
        },
    });
}).call(this);
