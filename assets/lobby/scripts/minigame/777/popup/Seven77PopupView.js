/**
 * Created by Nofear on 6/7/2017.
 */

(function () {
    cc.Seven77PopupView = cc.Class({
        "extends": cc.PopupViewBase,
        properties: {

        },

        onLoad: function () {
            cc.Seven77PopupController.getInstance().setSeven77PopupView(this);
        },
    });
}).call(this);
