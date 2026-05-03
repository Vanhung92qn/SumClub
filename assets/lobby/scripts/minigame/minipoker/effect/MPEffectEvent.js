/**
 * Created by Nofear on 6/7/2017.
 */

(function () {
    cc.MPEffectEvent = cc.Class({
        "extends": cc.Component,
        properties: {

        },

        finishEvent: function () {
            cc.MPEffectController.getInstance().stopEffect();
        },
    });
}).call(this);
