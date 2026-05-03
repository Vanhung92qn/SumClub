/**
 * Created by Nofear on 3/15/2019.
 */

(function () {
    cc.XXAssets = cc.Class({
        "extends": cc.Component,
        properties: {
            sfChips: [cc.SpriteFrame],
            sfNans: [cc.SpriteFrame],
            sfAvatarDef: cc.SpriteFrame,

            sfBacks: [cc.SpriteFrame],

            sfDots: [cc.SpriteFrame],

            //font
            bmfWin: cc.BitmapFont,
            bmfLose: cc.BitmapFont,
        },

        onLoad: function () {
            cc.XXController.getInstance().setXXAssets(this);
        },

        getWinFont: function () {
            return this.bmfWin;
        },

        getLoseFont: function () {
            return this.bmfLose;
        },

        getChips: function () {
            return this.sfChips;
        },

        getNans: function () {
            return this.sfNans;
        },

        getAvatarDef: function () {
            return this.sfAvatarDef;
        },
    });
}).call(this);
