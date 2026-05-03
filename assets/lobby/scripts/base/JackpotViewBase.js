/**
 * Created by Nofear on 6/7/2017.
 */

(function () {
    cc.JackpotViewBase = cc.Class({
        "extends": cc.Component,
        properties: {
            lbiJackpot: cc.LabelIncrement
        },

        updateJackpot: function (amount) {
            this.lbiJackpot.tweenValueto(amount);
        },
    });
}).call(this);
