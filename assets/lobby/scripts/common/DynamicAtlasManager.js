
(function () {
    cc.DynamicAtlasManager = cc.Class({
        "extends": cc.Component,
        properties: {
            skeletons: [sp.Skeleton],
        },

        onLoad: function () {
            this.skeletons.forEach(function (skeleton) {
                cc.dynamicAtlasManager.insertSpriteFrame(skeleton);
            });
        },
    });
}).call(this);