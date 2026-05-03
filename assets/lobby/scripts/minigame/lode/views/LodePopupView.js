(function () {
    cc.LodePopupView = cc.Class({
        "extends": cc.PopupViewBase,
        onLoad: function () {
            cc.LodePopupController.getInstance().setPopupView(this);
        },
       
    });
}).call(this);