/**
 * Created by Nofear on 3/15/2019.
 */


(function () {
    cc.TreasureImage = cc.Class({
        "extends": cc.Component,
        properties: {
            sfVQMMs: [cc.SpriteFrame],
            sfMushrooms: [cc.SpriteFrame],
            sfMultis: [cc.SpriteFrame],
            sfBGBoosts: [cc.SpriteFrame],
            sfChests: [cc.SpriteFrame],

            sfPacks: [cc.SpriteFrame],
            sfPackDisables: [cc.SpriteFrame],

            sfGifts: [cc.SpriteFrame],
            sfItems: [cc.SpriteFrame],

            sfRanks: [cc.SpriteFrame],

            sfWeapons: [cc.SpriteFrame],

            sfBoss: [cc.SpriteFrame],
        },

        onLoad: function() {
            cc.TreasureController.getInstance().setTreasureImage(this);
        },

    });
}).call(this);
