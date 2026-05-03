/**
 * Created by Nofear on 6/7/2017.
 */

(function () {
    cc.NotifyEvent = cc.Class({
        "extends": cc.Component,
        properties: {

        },

        getNotify: function () {
            cc.NotifyController.getInstance().getNotify();
        },
    });
}).call(this);
