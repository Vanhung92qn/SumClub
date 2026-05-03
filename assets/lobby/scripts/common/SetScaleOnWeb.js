/**
 * Created by Nofear on 7/14/2017.
 */

(function () {
    cc.SetScaleOnWeb = cc.Class({
        "extends": cc.Component,
        properties: {
            nodeScales: [cc.Node],
            webScale: 0.9,
        },

        onLoad: function () {
            if (!cc.sys.isNative) {
                var self = this;
                this.nodeScales.forEach(function (nodeScale) {
                    nodeScale.scale = self.webScale;
                })
            }
        },
    });

}).call(this);