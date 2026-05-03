/**
 * Created by Nofear on 6/7/2017.
 */

(function () {
    cc.NotifyItem = cc.Class({
        "extends": cc.Component,
        properties: {
            lbSID: cc.Label,
            lbNickName: cc.Label,
            lbType: cc.Label,
            lbAmount: cc.Label,
            lbGame: cc.Label,
        },

        setItem: function (user, lastText) {
            var state = user.IsJackpot ? 'nổ hũ' : 'thắng lớn';
            var gameName = cc.Config.getInstance().getGameName(user.GameID);

            //this.lbSID.string = cc.Config.getInstance().getServiceNameNoFormat(user.ServiceID);
            this.lbSID.active = false;
            this.lbNickName.string = user.AccountName;
            this.lbType.string = state;
            this.lbAmount.string = cc.Tool.getInstance().formatNumber(user.PrizeValue);
            this.lbGame.string = gameName + lastText;
        },
    });
}).call(this);
