/**
 * Created by Nofear on 3/15/2019.
 */

(function () {
    cc.BCAssets = cc.Class({
        "extends": cc.Component,
        properties: {
            sfAvatarDef: cc.SpriteFrame,
            sfBacks: [cc.SpriteFrame],
            //font
            bmfWin: cc.BitmapFont,
            bmfLose: cc.BitmapFont,

            sfBiens: [cc.SpriteFrame]

        },

        onLoad: function () {
            cc.BCController.getInstance().setBCAssets(this);
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

        getBiens: function () {
            return this.sfBiens;
        },

        getAvatarDef: function () {
            return this.sfAvatarDef;
        },
    });
}).call(this);
