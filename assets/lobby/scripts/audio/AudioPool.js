/**
 * Created by Nofear on 6/8/2017.
 */
(function () {
    cc.AudioPool = cc.Class({
        "extends": cc.Component,
        properties: {

        },

        onLoad: function () {
            cc.AudioController.getInstance().setAudioPool(this);
        },
    });

}).call(this);
