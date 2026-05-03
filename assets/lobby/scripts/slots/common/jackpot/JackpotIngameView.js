/**
 * Created by Nofear on 1/14/2019.
 */

(function () {
    cc.JackpotIngameView = cc.Class({
        "extends": cc.Component,
        properties: {
            lbiJackpot: cc.LabelIncrement,
        },

        onLoad: function () {
            cc.JackpotController.getInstance().setJackpotInGameView(this);
        },

        onDestroy: function () {
            cc.JackpotController.getInstance().setJackpotInGameView(null);
        },

        updateJackpotInGame: function (jackpot) {
            this.lbiJackpot.tweenValueto(jackpot);
        }
    });
}).call(this);
