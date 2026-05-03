/**
 * Created by Nofear on 6/7/2017.
 */

(function () {
    cc.MPJackpotView = cc.Class({
        "extends": cc.JackpotViewBase,
        properties: {
        },

        onEnable: function () {
            cc.MPJackpotController.getInstance().setMPJackpotView(this);
        },

        setJackpot: function () {

        }
    });
}).call(this);
