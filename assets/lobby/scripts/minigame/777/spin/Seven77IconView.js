/**
 * Created by Nofear on 6/7/2017.
 */

(function () {
    cc.Seven77IconView = cc.Class({
        "extends": cc.Component,
        properties: {
            skeletonDataIcons: [sp.SkeletonData],
            spriteIcons: [cc.SpriteFrame]
        },

        onLoad: function () {
            cc.Seven77SpinController.getInstance().setSeven77IconView(this);
        }
    });
}).call(this);
