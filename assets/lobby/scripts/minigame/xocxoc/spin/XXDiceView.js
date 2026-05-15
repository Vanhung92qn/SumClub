/**
 * XXDiceView - chua 6 spriteFrame mat dice 1..6.
 * Gan tren 1 node trong scene/prefab (vd node "diceFrames" an di).
 * XXSpinColumView se lay sfDices qua XXSpinController.getSFDices().
 */
(function () {
    cc.XXDiceView = cc.Class({
        "extends": cc.Component,
        properties: {
            sfDices: [cc.SpriteFrame],
        },

        onLoad: function () {
            cc.XXSpinController.getInstance().setXXDiceView(this);
        }
    });
}).call(this);
