/**
 * Created by Nofear on 3/15/2019.
 */

(function () {
    cc.PlayerCard = cc.Class({
        "extends": cc.Component,
        properties: {
            nodeCard: cc.Node,
            spriteCards: [cc.Sprite],
            nodeHighLights: [cc.Node],
            nodeBlacks: [cc.Node],

            cBet: cc.CBet,
        },

        init: function () {
            var self = this;
            this.cBet.init();

            this.nodeHighlights = [];
            this.spriteCards.forEach(function (spriteCard) {
                self.nodeHighlights.push(spriteCard.node.children[0]);
            });

            this.animationCard = this.nodeCard.getComponent(cc.Animation);
            this.countCard = this.spriteCards.length; //dem so la bai

            this.resetCard();
            this.hideCard();
        },

        resetCard: function () {
            this.nodeCard.scale = 1;
            this.spriteCards.forEach(function (spriteCard) {
                spriteCard.node.rotation = 0;
            });
        },

        //hien thi bai sau khi chia
        showCard: function () {
            this.nodeCard.active = true;
            this.animationCard.play('slideCard');

            //reset lai cho chac
            this.spriteCards.forEach(function (spriteCard) {
                spriteCard.spriteFrame = cc.PKController.getInstance().getAssets().sfCardFold;
            });
        },

        //lat bai
        flipCard: function (cardIds, isOwner) {
            this.cardIds = cardIds;
            this.nodeCard.active = true;

            //gan gia tri bai
            for (var i = 0; i < this.countCard; i++) {
                this.spriteCards[i].spriteFrame = cc.PKController.getInstance().getAssets().sfCards[cardIds[i]];
            }

            if (isOwner) {
                this.animationCard.playAdditive("slideCard");
                this.animationCard.playAdditive("flipCardOwner");
            } else {
                this.animationCard.playAdditive('flipCard');
            }
        },

        showHighLight: function (cardIds, cardValues) {
            for (var i = 0; i < this.countCard; i++) {
                if (cardIds[i] === cardValues[0]) {
                    this.nodeHighlights[i].active = true;
                    // this.nodeBlacks[i].active = false;
                } else if (cardIds[i] === cardValues[1]) {
                    this.nodeHighlights[i].active = true;
                    // this.nodeBlacks[i].active = false;
                } else {
                    // this.nodeBlacks[i].active = true;
                    this.nodeHighlights[i].active = false;
                }
            }
        },

        //an bai
        hideCard: function () {
            this.nodeCard.active = false;

            //reset lai card
            for (var i = 0; i < this.countCard; i++) {
                this.spriteCards[i].spriteFrame = cc.PKController.getInstance().getAssets().sfCardFold;
                this.nodeHighlights[i].active = false;
                // this.nodeBlacks[i].active = false;
            }

        },


    });
}).call(this);
