/**
 * Created by Nofear on 6/7/2017.
 */

(function () {
    cc.CarrotDailyBonusImages = cc.Class({
        "extends": cc.Component,
        properties: {
            sfCarrots: [cc.SpriteFrame],
            sfBgDailyBonus: [cc.SpriteFrame],
            sfBGVPs: [cc.SpriteFrame],
        },
        
        onLoad: function () {
            cc.CarrotDailyBonusController.getInstance().setCarrotDailyBonusImage(this);
        }
    });
}).call(this);
