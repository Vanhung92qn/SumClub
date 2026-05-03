/**
 * Created by Nofear on 3/19/2019.
 */


(function () {
    cc.ToggleSetValue = cc.Class({
        "extends": cc.Component,
        properties: {
            lbActive: cc.Label,
            lbDeActive: cc.Label,
        },

        setValue: function (value) {
            this.lbActive.string = value;
            this.lbDeActive.string = value;
        },

        update: function (dt) {
            //console.log(this.node.position);
        }


    });
}).call(this);