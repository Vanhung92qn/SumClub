/**
 * Created by Nofear on 7/14/2017.
 */

(function () {
    cc.SetIconCoinByServiceId = cc.Class({
        "extends": cc.Component,
        properties: {
            spriteChips: [cc.Sprite],
            sfChips: [cc.SpriteFrame],
        },

        onEnable: function () {
            var self = this;
            this.spriteChips.forEach(function (spriteChip) {
                spriteChip.spriteFrame = self.sfChips[cc.Config.getInstance().getServiceId() - 1]
            });
        },
    });

}).call(this);