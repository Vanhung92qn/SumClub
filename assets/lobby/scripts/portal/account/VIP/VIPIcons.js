/**
 * Created by Nofear on 3/15/2019.
 */


(function () {
    cc.VIPIcons = cc.Class({
        "extends": cc.Component,
        properties: {
            iconSpriteFrames: [cc.SpriteFrame],
            sfCard: cc.SpriteFrame,
            sfEmergency: cc.SpriteFrame,
            sfTreasure: cc.SpriteFrame,
            sfBgs: [cc.SpriteFrame],
        },

        onLoad: function () {
            cc.AccountController.getInstance().setVIPIcons(this);
        },

        getIcon: function(rankId) {
            return this.iconSpriteFrames[rankId - 1];
        },
    });
}).call(this);
