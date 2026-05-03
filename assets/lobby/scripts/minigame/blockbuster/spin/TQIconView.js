/**
 * Created by Nofear on 6/7/2017.
 */

(function () {
    cc.TQIconView = cc.Class({
        "extends": cc.Component,
        properties: {
            skeletonDataIcons: [sp.SkeletonData],
            sfIcons: [cc.SpriteFrame],
        },

        onLoad: function () {
            cc.TQSpinController.getInstance().setTQIconView(this);
        }
    });
}).call(this);
