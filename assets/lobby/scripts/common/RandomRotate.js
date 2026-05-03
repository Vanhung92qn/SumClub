/**
 * Created by Nofear on 9/12/2017.
 */

(function () {
    cc.RandomRotate = cc.Class({
        "extends": cc.Component,
        properties: {
            min: -5,
            max: 5,
        },

        onLoad: function () {
            var rot = Math.floor((Math.random() * 11) - 5);
            this.node.rotation = rot;
        },

    });
}).call(this);