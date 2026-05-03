/**
 * Created by Nofear on 3/15/2019.
 */

(function () {
    cc.TreasureItemDemo = cc.Class({
        "extends": cc.Component,
        properties: {
            sprite: cc.Sprite,
        },

        onLoad: function () {
            this.treasureImage = cc.TreasureController.getInstance().getTreasureImage();
        },

        playFx: function (itemType, amount) {

            if (this.treasureImage === undefined) {
                this.treasureImage = cc.TreasureController.getInstance().getTreasureImage();
            }

            // if (this.animation === undefined) {
            //     this.animation = this.node.getComponent(cc.Animation);
            // }

            switch (itemType) {
                case cc.TreasureItemType.CARROT:
                    this.sprite.spriteFrame = this.treasureImage.sfItems[0];
                    break;
                case cc.TreasureItemType.COIN:
                    this.sprite.spriteFrame = this.treasureImage.sfItems[1];
                    break;
                case cc.TreasureItemType.CHEST:
                    this.sprite.spriteFrame = this.treasureImage.sfItems[2];
                    break;
                case cc.TreasureItemType.GOLDEN_CHEST:
                    this.sprite.spriteFrame = this.treasureImage.sfItems[3];
                    break;
            }

            // this.animation.play('demoItem');
        },
    });
}).call(this);
