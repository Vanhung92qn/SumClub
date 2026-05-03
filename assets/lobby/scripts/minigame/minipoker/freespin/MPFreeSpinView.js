/**
 * Created by Nofear on 6/7/2017.
 */

(function () {
    cc.MPFreeSpinView = cc.Class({
        "extends": cc.FreeSpinViewBase,
        properties: {
        },

        onLoad: function () {
            cc.MPFreeSpinController.getInstance().setMPFreeSpinView(this);
        },
    });
}).call(this);
