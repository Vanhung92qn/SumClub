
(function () {
    cc.FixZIndex = cc.Class({
        "extends": cc.Component,
        properties: {
            zIndex: 1,
        },

        onLoad: function () {
            this.node.zIndex = this.zIndex;
        },
    });
}).call(this);