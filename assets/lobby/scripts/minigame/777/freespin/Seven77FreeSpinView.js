/**
 * Created by Nofear on 6/7/2017.
 */

(function () {
    cc.Seven77FreeSpinView = cc.Class({
        "extends": cc.FreeSpinViewBase,
        properties: {
        },

        onLoad: function () {
            cc.Seven77FreeSpinController.getInstance().setSeven77FreeSpinView(this);
        },
    });
}).call(this);
