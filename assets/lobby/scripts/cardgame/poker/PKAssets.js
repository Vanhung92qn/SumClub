/**
 * Created by Nofear on 3/15/2019.
 */

(function () {
    cc.PKAssets = cc.Class({
        "extends": cc.CAssets,
        properties: {
            //player la dealer
            sfDealer: cc.SpriteFrame,
            //player la small bet
            sfSmall: cc.SpriteFrame,
            //player la big bet
            sfBig: cc.SpriteFrame,
        },

        onLoad: function () {
            //set controller
            cc.PKController.getInstance().setPKAssets(this);
        },
    });
}).call(this);
