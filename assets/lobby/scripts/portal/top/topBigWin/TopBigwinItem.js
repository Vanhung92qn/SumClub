/**
 * Created by Nofear on 3/15/2019.
 */


(function () {
    cc.TopBigWinItem = cc.Class({
        "extends": cc.Component,
        properties: {
            spriteLogo: cc.Sprite,
            lbSID: cc.Label,
            lbNickName: cc.Label,
            lbValue: cc.LabelIncrement,
        },

        onLoad: function () {
            if (this.spriteLogo)
                this.spriteLogo.spriteFrame = cc.LobbyController.getInstance().getGameAssets().icons[cc.Config.getInstance().getIndexIcon(cc.Config.getInstance().getServiceId())];
        },

        updateItem: function(item) {
            this.lbSID.string = cc.Config.getInstance().getServiceNameNoFormat(item.ServiceID);
            this.lbNickName.string = item.GameAccountName;
            this.lbValue.tweenValue(0, item.Balance);
        },
    });
}).call(this);
