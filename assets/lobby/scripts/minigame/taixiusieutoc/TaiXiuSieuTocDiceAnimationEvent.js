/**
 * Dat cuoc
 */

(function () {
    cc.TaiXiuSieuTocDiceAnimationEvent = cc.Class({
        "extends": cc.Component,
        properties: {

        },

        diceAnimFinish: function () {
            cc.TaiXiuSieuTocController.getInstance().diceAnimFinish();
        },
    });
}).call(this);
