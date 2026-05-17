/**
 * Created by Nofear on 6/7/2017.
 */

(function () {
    cc.Seven77Image = cc.Class({
        "extends": cc.Component,
        properties: {
            sfChips: [cc.SpriteFrame],

            // UI moi: moi button co on/off rieng, index theo roomId-1
            // [0]=100, [1]=1000, [2]=5000, [3]=10000
            sfChipsOn: [cc.SpriteFrame],
            sfChipsOff: [cc.SpriteFrame],

            sfFastSpins: [cc.SpriteFrame],
            sfAutoSpins: [cc.SpriteFrame],
            sfSpins: [cc.SpriteFrame],
        },
    });
}).call(this);
