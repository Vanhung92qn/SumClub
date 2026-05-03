/**
 * Created by Nofear on 6/7/2017.
 */

(function () {
    cc.GNIconView = cc.Class({
        "extends": cc.Component,
        properties: {
            // nodeIconFxs: [cc.Node],
            // nodeIconMGFxs: [cc.Node],
            icons: [cc.SpriteFrame],
            fsIcons: [cc.SpriteFrame],
            skeletonDataIcons: [sp.SkeletonData],
            skeletonDataIconsFs: [sp.SkeletonData],
        },

        onLoad: function () {
            cc.SpinController.getInstance().setIconView(this);
        },
    });
}).call(this);
