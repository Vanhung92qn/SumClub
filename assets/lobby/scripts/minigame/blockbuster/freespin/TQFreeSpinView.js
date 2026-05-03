/**
 * Created by Nofear on 6/7/2017.
 */

(function () {
    cc.TQFreeSpinView = cc.Class({
        "extends": cc.FreeSpinViewBase,
        properties: {
        },

        onLoad: function () {
            cc.TQFreeSpinController.getInstance().setTQFreeSpinView(this);
        },
    });
}).call(this);
