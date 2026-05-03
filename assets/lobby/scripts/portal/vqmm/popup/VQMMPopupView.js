/**
 * Created by Nofear on 6/7/2017.
 */

(function () {
    cc.VQMMPopupView = cc.Class({
        "extends": cc.PopupViewBase,
        properties: {
            prefabCaptcha: cc.Prefab,
        },

        onLoad: function () {
            cc.VQMMPopupController.getInstance().setVQMMPopupView(this);
        },

        createCaptchaView: function () {
            this.createView(this.prefabCaptcha);
        },
    });
}).call(this);
