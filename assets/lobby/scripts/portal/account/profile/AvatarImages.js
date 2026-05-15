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
            var n = this.avatarSpriteFrames ? this.avatarSpriteFrames.length : 0;
            if (n <= 0) return null;
            var i = (typeof id === 'number' && id > 0) ? id : 1;
            return this.avatarSpriteFrames[(i - 1) % n];
        },
    });
}).call(this);
