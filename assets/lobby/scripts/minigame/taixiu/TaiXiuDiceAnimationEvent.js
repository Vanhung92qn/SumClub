/**
 * Dat cuoc
 */

(function () {
    cc.TaiXiuDiceAnimationEvent = cc.Class({
        "extends": cc.Component,
        properties: {

        },

        diceAnimFinish: function () {
            cc.TaiXiuController.getInstance().diceAnimFinish();
        },
    });
}).call(this);
