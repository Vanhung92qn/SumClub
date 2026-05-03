/**
 * Created by Nofear on 7/14/2017.
 */

(function () {
    cc.ImageUrl = cc.Class({
        "extends": cc.Component,
        properties: {
            url: '',
        },

        onEnable: function () {
            if(this.url !== null && this.url !== ''){
                this.get(this.url)
            }
        },

        get: function(url) {
            /*
            cc.textureCache.addImageAsync(this.url, function (texture) {
                this.node.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(texture);
            }, this);*/

            var self = this;
            cc.loader.load({url: url, type: 'png', width: 256, height: 256 }, function (err, tex) {
                if (self.node !== null) {
                    self.node.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(tex);
                }
            });
        }
    });

}).call(this);