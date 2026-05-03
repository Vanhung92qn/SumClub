/**
 * Created by Nofear on 6/7/2017.
 */

(function () {
    cc.MPPrizeView = cc.Class({
        "extends": cc.Component,
        properties: {
            sfPrizes: [cc.SpriteFrame],
        },

        onLoad: function () {
            cc.MPSpinController.getInstance().setMPPrizeView(this);
        }
    });
}).call(this);
