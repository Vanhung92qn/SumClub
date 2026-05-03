

(function () {
    cc.TaiXiuMd5AnimationEvent = cc.Class({
        "extends": cc.Component,
        properties: {
        },


        lightOnEvent: function () {
            cc.TaiXiuMd5Controller.getInstance().lightOnEvent();
        },
    });
}).call(this);
