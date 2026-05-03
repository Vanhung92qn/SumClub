/**
 * Created by Nofear on 3/15/2019.
 */

(function () {
    cc.CAssets = cc.Class({
        "extends": cc.Component,
        properties: {
            //sprite 52 la bai
            sfCards: [cc.SpriteFrame],
            //card úp
            sfCardFold: cc.SpriteFrame,

            //chip tu 1K, 5K, 10K, 50K, 100K, 500K, 1M
            sfChips: [cc.SpriteFrame],

            //avatar mac dinh
            sfAvatarDef: cc.SpriteFrame,

            //sprite nut back
            sfBacks: [cc.SpriteFrame],

            //font thang / thua
            bmfWin: cc.BitmapFont,
            bmfLose: cc.BitmapFont,
        },

        onLoad: function () {
            //set controller
        },
    });
}).call(this);
