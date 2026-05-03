/**
 * Created by Nofear on 6/7/2017.
 */

(function () {
    cc.Seven77JackpotView = cc.Class({
        "extends": cc.JackpotViewBase,
        properties: {
        },

        onEnable: function () {
            cc.Seven77JackpotController.getInstance().setSeven77JackpotView(this);
        },
    });
}).call(this);
