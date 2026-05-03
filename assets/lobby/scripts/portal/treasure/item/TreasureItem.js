/**
 * Created by Nofear on 3/15/2019.
 */

(function () {
    cc.TreasureItem = cc.Class({
        "extends": cc.Component,
        properties: {
            sprite: cc.Sprite,
            label: cc.Label,
        },

        onLoad: function () {
            this.treasureImage = cc.TreasureController.getInstance().getTreasureImage();
        },

        playFx: function (itemType, amount) {

            if (this.treasureImage === undefined) {
                this.treasureImage = cc.TreasureController.getInstance().getTreasureImage();
            }

            if (this.animation === undefined) {
                this.animation = this.node.getComponent(cc.Animation);
            }

            switch (itemType) {
                case cc.TreasureItemType.CARROT:
                    this.sprite.spriteFrame = this.treasureImage.sfItems[0];
                    this.label.string = '+' + cc.Tool.getInstance().formatNumber(amount);
                    break;
                case cc.TreasureItemType.COIN:
                    this.sprite.spriteFrame = this.treasureImage.sfItems[1];
                    this.label.string = '+' + cc.Tool.getInstance().formatNumber(amount);
                    break;
                case cc.TreasureItemType.CHEST:
                    this.sprite.spriteFrame = this.treasureImage.sfItems[2];
                    this.label.string = '';
                    break;
                case cc.TreasureItemType.GOLDEN_CHEST:
                    this.sprite.spriteFrame = this.treasureImage.sfItems[3];
                    this.label.string = '';
                    break;
            }

            this.animation.play('collectItem');

            var self = this;
            setTimeout(function () {
                 cc.TreasureItemController.getInstance().putToPool(self.node);
            }, 1500);
        },
    });
}).call(this);
