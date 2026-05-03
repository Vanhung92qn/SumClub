/**
 * Created by Nofear on 6/7/2017.
 */

(function () {
    cc.TQJackpotView = cc.Class({
        "extends": cc.JackpotViewBase,
        properties: {
        },

        onEnable: function () {
            cc.TQJackpotController.getInstance().setTQJackpotView(this);
        },
    });
}).call(this);
