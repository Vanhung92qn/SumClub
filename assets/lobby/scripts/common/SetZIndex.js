
(function () {
    cc.SetZIndex = cc.Class({
        "extends": cc.Component,
        properties: {
        },

        onLoad: function () {
            var self = this;
            this.node.on('touchstart', function () {
                self.node.zIndex = cc.Config.getInstance().getZINDEX();
            }, this.node);
        },
    });
}).call(this);