/**
 * Created by Welcome on 4/18/2019.
 */

(function () {
    cc.EventRuleView = cc.Class({
        "extends": cc.Component,
        properties: {
            spriteCoins: [cc.Sprite],
        },

        onLoad: function () {
            if (this.eventImage === undefined) {
                this.eventImage = cc.EventController.getInstance().getEventImage();
            }

            var self = this;
            this.spriteCoins.forEach(function (spriteCoin) {
                spriteCoin.spriteFrame = self.eventImage.sfCoins[cc.Config.getInstance().getIndexIcon(cc.Config.getInstance().getServiceId())];
            });
        },

    });
}).call(this);
