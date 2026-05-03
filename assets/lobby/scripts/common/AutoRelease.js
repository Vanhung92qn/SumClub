(function () {
    cc.AutoRelease = cc.Class({
        "extends": cc.Component,
        properties: {
            textures: {
                type: cc.SpriteFrame, // use 'type:' to define an array of Texture2D objects
                default: []
            },
        },

        onLoad: function () {
            this.textures.forEach(function (texture) {
                cc.loader.setAutoRelease(texture, false);
            })
        },

    });

}).call(this);
