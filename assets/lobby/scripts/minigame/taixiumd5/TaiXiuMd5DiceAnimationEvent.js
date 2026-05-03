/**
 * Dat cuoc
 */

(function () {
    cc.TaiXiuMd5DiceAnimationEvent = cc.Class({
        "extends": cc.Component,
        properties: {

        },

        diceAnimFinish: function () {
            cc.TaiXiuMd5Controller.getInstance().diceAnimFinish();
        },
    });
}).call(this);
