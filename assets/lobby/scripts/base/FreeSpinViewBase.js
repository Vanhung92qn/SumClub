/**
 * Created by Nofear on 6/7/2017.
 */

(function () {
    cc.FreeSpinViewBase = cc.Class({
        "extends": cc.Component,
        properties: {
            lbFreeSpin: cc.Label,
        },

        showFreeSpin: function (amount) {
            this.lbFreeSpin.string = 'QUAY MIỄN PHÍ: ' + amount;
            this.lbFreeSpin.node.parent.active = true;
        },

        hideFreeSpin: function () {
            this.lbFreeSpin.node.parent.active = false;
        }
    });
}).call(this);
