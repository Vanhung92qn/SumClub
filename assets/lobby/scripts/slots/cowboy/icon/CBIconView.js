/**
 * Created by Nofear on 6/7/2017.
 */

(function () {
    cc.CBIconView = cc.Class({
        "extends": cc.Component,
        properties: {
            icons: [cc.SpriteFrame],
            skeletonDataIcons: [sp.SkeletonData],
        },

        onLoad: function () {
            cc.SpinController.getInstance().setIconView(this);
        },
    });
}).call(this);
