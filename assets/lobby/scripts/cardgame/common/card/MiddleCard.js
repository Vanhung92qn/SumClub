/**
 * Created by Nofear on 3/15/2019.
 */

(function () {
    cc.MiddleCard = cc.Class({
        "extends": cc.Component,
        properties: {
            middleCardItems: [cc.MiddleCardItem],
        },

        onLoad: function () {
            this.delayOpen = 300;
            this.middleCardItems.forEach(function (middleCardItem) {
                middleCardItem.init();
            });
            this.hideAllCard();

            // TEST
            // var self = this;
            // setTimeout(function(){
            //     self.openThreeCard([10, 20, 30]);
            // }, 3000);
            // setTimeout(function(){
            //     self.openNumberFourCard(3, 4);
            // }, 5000);
            // setTimeout(function(){
            //     self.openNumberFiveCard(4, 8);
            // }, 6000);
        },

        //mo bai
        openCard: function (index, cardID) {
            //active la bai
            this.middleCardItems[index].node.active = true;
            //gan la bai + lật bài
            this.middleCardItems[index].openCard(cardID);
            cc.AudioController.getInstance().playSound(cc.AudioTypes.DRAW_CARD);

        },

        //mo bai
        forceOpenCard: function (index, cardID) {
            //active la bai
            this.middleCardItems[index].node.active = true;
            //gan la bai + lật bài
            this.middleCardItems[index].forceOpenCard(cardID);
            cc.AudioController.getInstance().playSound(cc.AudioTypes.DRAW_CARD);
        },

        //mo ba la bai dau tien
        openThreeCard: function (cards) {
            var self = this;

            //mo lan luot 3 la bai cach nhau 1 khoang delay
            self.openCard(0, cards[0].OrdinalValue);
            setTimeout(function(){
                self.openCard(1, cards[1].OrdinalValue);
            }, this.delayOpen);
            setTimeout(function(){
                self.openCard(2, cards[2].OrdinalValue);
            }, this.delayOpen * 2);

        },

        forceOpenThreeCard: function (cards) {
            this.forceOpenCard(0, cards[0].OrdinalValue);
            this.forceOpenCard(1, cards[1].OrdinalValue);
            this.forceOpenCard(2, cards[2].OrdinalValue);
        },

        //mo la bai thu 4
        openNumberFourCard: function (card) {
            this.openCard(3, card.OrdinalValue);
        },

        forceOpenNumberFourCard: function (card) {
            this.forceOpenCard(3, card.OrdinalValue);
        },

        //mo la bai thu 5
        openNumberFiveCard: function (card) {
            this.openCard(4, card.OrdinalValue);
        },

        forceOpenNumberFiveCard: function (card) {
            this.forceOpenCard(4, card.OrdinalValue);
        },

        showHighLight: function (cardValues) {
            var index = 0;

            //bat het black len
            // this.middleCardItems.forEach(function (middleCardItem) {
            //     middleCardItem.activeBlack(true);
            // });

            //neu co bai highlight thi tat black + bat highlight
            this.middleCardItems.forEach(function (middleCardItem) {
                cardValues.forEach(function (cardValue) {
                    if (cardValue === middleCardItem.cardID) {
                        middleCardItem.activeHighLight(true);
                        // middleCardItem.activeBlack(false);
                    }
                });
            })
        },

        //an tat ca cac la bai
        hideAllCard: function () {
            this.middleCardItems.forEach(function (middleCardItem) {
                middleCardItem.node.active = false;
                middleCardItem.activeHighLight(false);
                // middleCardItem.activeBlack(false);
            })
        },
    });
}).call(this);
