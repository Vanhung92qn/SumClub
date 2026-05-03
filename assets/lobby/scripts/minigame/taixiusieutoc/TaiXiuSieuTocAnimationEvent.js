

(function () {
    cc.TaiXiuSieuTocAnimationEvent = cc.Class({
        "extends": cc.Component,
        properties: {
        },


        lightOnEvent: function () {
            cc.TaiXiuSieuTocController.getInstance().lightOnEvent();
        },
    });
}).call(this);
