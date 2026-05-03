/**
 * Created by Nofear on 6/7/2017.
 */

(function () {
    cc.THIconView = cc.Class({
        "extends": cc.Component,
        properties: {
            skeletonDataIcons: [sp.SkeletonData],
            bgRooms: [cc.SpriteFrame],
        },

        onLoad: function () {
            cc.SpinController.getInstance().setIconView(this);
        }
    });
}).call(this);
