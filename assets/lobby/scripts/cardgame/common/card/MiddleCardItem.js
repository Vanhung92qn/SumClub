/**
 * Created by Nofear on 3/15/2019.
 */

(function () {
    cc.MiddleCardItem = cc.Class({
        "extends": cc.Component,
        properties: {

        },

        init: function () {
            this.spriteCard = this.node.getComponent(cc.Sprite);
            this.animationCard = this.node.getComponent(cc.Animation);
            this.nodeHighlight = this.node.children[0];
            this.nodeBlack = this.node.children[1];
        },

        activeHighLight: function (enabled) {
            this.nodeHighlight.active = enabled;
        },

        activeBlack: function (enabled) {
            this.nodeBlack.active = enabled;
        },

        forceOpenCard: function (cardID) {
            this.cardID = cardID;
            this.spriteCard.spriteFrame = cc.PKController.getInstance().getAssets().sfCards[cardID];
        },

        openCard: function (cardID) {
            this.cardID = cardID;
            this.spriteCard.spriteFrame = cc.PKController.getInstance().getAssets().sfCards[cardID];
            this.animationCard.play('mCardOpen');
        }

    });
}).call(this);
