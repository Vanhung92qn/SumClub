/**
 * Created by Nofear on 3/15/2019.
 */


(function () {
    cc.TopJackpotItem = cc.Class({
        "extends": cc.Component,
        properties: {
            spriteLogo: cc.Sprite,
            spriteIcon: cc.Sprite,
            lbSID: cc.Label,
            lbNickName: cc.Label,
            lbValue: cc.LabelIncrement,
        },

        onLoad: function () {
           
        },

        updateItem: function(item, index, total) {
            this.gameId = item.GameID;
            // this.lbSID.string = cc.Config.getInstance().getServiceNameNoFormat(item.ServiceID);
            // this.lbNickName.string = item.Username;
            // this.lbValue.tweenValue(0, item.PrizeValue);

            this.lbNickName.string = cc.Config.getInstance().getGameName(item.GameID);

            this.lbValue.tweenValue(0, item.JackpotFund);

            this.spriteIcon.spriteFrame = cc.TopController.getInstance().getIcon(item.GameID);
            this.spriteLogo.node.active = index < total - 1;
        },

        openGameClicked: function () {
            if (cc.LoginController.getInstance().checkLogin()) {
                cc.LobbyController.getInstance().joinGame(this.gameId);
                cc.DDNA.getInstance().uiInteraction(cc.DDNAUILocation.PORTAL, cc.DDNA.getInstance().getGameById(this.gameId), cc.DDNAUIType.TOP);
            }
        },
    });
}).call(this);
