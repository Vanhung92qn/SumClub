/**
 * Created by Nofear on 6/7/2017.
 */

(function () {
    cc.MPCardView = cc.Class({
        "extends": cc.Component,
        properties: {
            sfCards: [cc.SpriteFrame],
        },

        onLoad: function () {
            cc.MPSpinController.getInstance().setMPCardView(this);
        }
    });
}).call(this);
