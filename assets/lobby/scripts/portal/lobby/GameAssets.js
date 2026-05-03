/**
 * Created by Nofear on 6/7/2017.
 */

(function () {
    cc.GameAssets = cc.Class({
        "extends": cc.Component,
        properties: {
            icons: [cc.SpriteFrame],
            chatVIPIcons: [cc.SpriteFrame],
            avatarDef: cc.SpriteFrame,
            sfNations: [cc.SpriteFrame]
        },

        onLoad: function () {
            cc.LobbyController.getInstance().setGameAssets(this);
        }
    });
}).call(this);
