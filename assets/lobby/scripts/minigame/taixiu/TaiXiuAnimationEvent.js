

(function () {
    cc.TaiXiuAnimationEvent = cc.Class({
        "extends": cc.Component,
        properties: {
        },


        lightOnEvent: function () {
            cc.TaiXiuController.getInstance().lightOnEvent();
        },
    });
}).call(this);
