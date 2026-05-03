/**
 * Created by Nofear on 6/7/2017.
 */

(function () {
    cc.MiniPokerPopupView = cc.Class({
        "extends": cc.PopupViewBase,
        properties: {

        },

        onLoad: function () {
            cc.MiniPokerController.getInstance().setMiniPokerPopupView(this);
        },

    });
}).call(this);
