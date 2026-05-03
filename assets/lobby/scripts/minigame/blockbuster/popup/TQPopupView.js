/**
 * Created by Nofear on 6/7/2017.
 */

(function () {
    cc.TQPopupView = cc.Class({
        "extends": cc.PopupViewBase,
        properties: {

        },

        onLoad: function () {
            cc.TQPopupController.getInstance().setTQPopupView(this);
        },
    });
}).call(this);
