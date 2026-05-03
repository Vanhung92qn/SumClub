/**
 * Created by Nofear on 3/15/2019.
 */


(function () {
    cc.ChatRoomItem = cc.Class({
        "extends": cc.Component,
        properties: {
            lbSID: cc.Label,
            lbName: cc.Label,
            lbMessage: cc.Label,
            spriteVIP: cc.Sprite,
        },

        onLoad: function () {
            this.gameAssets = cc.LobbyController.getInstance().getGameAssets();
        },

        updateItem: function(item, itemID) {
            this.lbSID.string = ""; // cc.Config.getInstance().getServiceNameNoFormat(item[2])
            this.lbName.string = item[0] + '';
            this.lbMessage.string = ': ' + item[1];

            //RH + XOC XOC + BACCARAT
            if (item.length === 6) {
                var rank = item[5];
            } else {
                rank = item[3];
            }
            if (this.gameAssets === undefined) {
                this.gameAssets = cc.LobbyController.getInstance().getGameAssets();
            }
            if (this.spriteVIP !== null && rank >= cc.Config.getInstance().getMinVipShowChat()) {
                this.spriteVIP.spriteFrame =  this.gameAssets.chatVIPIcons[rank - 1];
                this.spriteVIP.node.active = true;
            } else if (this.spriteVIP !== null) {
                this.spriteVIP.spriteFrame = null;
                this.spriteVIP.node.active = false;
            }

            this.item = item;
            this.itemID = itemID;
        },
    });
}).call(this);
