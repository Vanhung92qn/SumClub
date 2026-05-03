/**
 * Created by Welcome on 4/18/2019.
 */

(function () {
    cc.EventImage = cc.Class({
        "extends": cc.Component,
        properties: {
            sfPrizes: [cc.SpriteFrame],
            sfCoins: [cc.SpriteFrame],
            sfNos: [cc.SpriteFrame],
        },

        onLoad: function () {
            cc.EventTopVpController.getInstance().setEventImage(this);
        },

    });
}).call(this);
