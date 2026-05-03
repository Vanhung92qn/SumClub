/**
 * Created by BeChicken on 6/22/2019.
 * Vsersion 1.0
 */
(function () {
    cc.DragonTigerShowCard = cc.Class({
        extends: cc.Component,
        properties: {
            animationCard: cc.Animation,
        },
        onLoad: function () {
            cc.DragonTigerController.getInstance().dragonTigerShowCard = this;
        },
        playAnimation: function (type) {
            if (type == cc.DragonTigerBetSide.RONG) {
                this.animationCard.play('card-rong');
            } else if (type == cc.DragonTigerBetSide.HO) {
                this.animationCard.play('card-ho');
            } else {
                this.animationCard.play('card-hoa');
            }
        },
        playAnimationCoin: function() {
            this.animationCard.play('coin');
        },
        stopAnimation: function () {
            this.animationCard.stop();
        }
    })
}).call(this);