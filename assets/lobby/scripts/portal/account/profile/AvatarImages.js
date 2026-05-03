/**
 * Created by Nofear on 3/15/2019.
 */


(function () {
    cc.AvatarImages = cc.Class({
        "extends": cc.Component,
        properties: {
            avatarSpriteFrames: [cc.SpriteFrame],
        },

        onLoad: function () {
            cc.AccountController.getInstance().setAvatarImages(this);
        },

        getAvatarImage: function(id) {
            return this.avatarSpriteFrames[id - 1];
        },
    });
}).call(this);
