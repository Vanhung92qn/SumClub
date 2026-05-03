/**
 * Created by Nofear on 3/19/2019.
 */

(function () {
    cc.TopupRateView = cc.Class({
        "extends": cc.Component,
        properties: {
            listTopupRateItem: [cc.TopupRateItem],
            toggleChooseValue: cc.ToggleChooseValue,
            scrollView: cc.ScrollView,
        },

        onLoad: function () {
            this.listCards = [];
            this.maxLengthListItem = this.listTopupRateItem.length;
            this.getListCard();
        },

        init: function (controller) {
            this.controller = controller;
            this.topupView = controller.getComponent(cc.TopupView);
            this.topupView.setLBCardType(cc.CardType.VIETTEL);
        },

        getCardFromID: function (ID) {
            var cardReturn = null;
            this.listCards.forEach(function (card) {
                if (card.ID === ID) {
                    cardReturn = card;
                }
            });
            return cardReturn;
        },

        getListCard: function () {
            var getListCardCommand = new cc.GetListCardCommand;
            getListCardCommand.execute(this);
        },

        updateList: function (cardOperatorCode) {
            this.toggleChooseValue.resetListChooseValue();
            this.listTopupRateItem.forEach(function (topupRateItem) {
                topupRateItem.node.active = false;
            });

            if (this.listCards.length > 0) {
                var self = this;
                var index = 0;

                //cho scale = 1 -> de fix loi list
                cc.TopupController.getInstance().restoreScale();
                var posY = -35;// Vi tri dau tien cua Item -> fix bug
                var spaceTopBot = 10 + 15; //Tong khoang cach top va bot
                var space = 50; //chieu cao 1 item

                //Tinhs so card available
                this.listCards.forEach(function (card) {
                    //the nap còn active
                    if (card.Status && card.OperatorCode.includes(cardOperatorCode)) {
                        if (index < self.maxLengthListItem) {
                            index++;
                        }
                    }
                });

                var height = index * space + spaceTopBot; // chieu cac cua layout
                //set chieu cao cua layout
                // this.toggleChooseValue.node.height = height;

                index = 0;

                this.listCards.forEach(function (card) {
                    //the nap còn active
                    if (card.Status && card.OperatorCode.includes(cardOperatorCode)) {
                        if (index < self.maxLengthListItem) {
                            self.listTopupRateItem[index].node.active = true;
                            self.listTopupRateItem[index].updateItem(card, self.promotionRate);
                            self.toggleChooseValue.initializeToggleChooseValue(
                                self.controller,
                                "TopupView",
                                "selectCardValueEvent",
                                card.ID,
                                cc.Tool.getInstance().formatNumber(card.CardValue),
                                posY
                            );
                            if (index === 0) {
                                self.topupView.setLBCardValue(card.ID);
                            }
                            index++;

                            //Moi phan tu cac nhau 50 (do ko dung layout de fix bug)
                            posY -= 50;
                        }
                    }
                });

                //sau khi setup xong moi reset scale -> de fix loi list
                cc.TopupController.getInstance().resetScale();
                //this.scrollView.scrollToTop();
                // this.toggleChooseValue.node.y = 0;

            } else {
                //this.getListCard();
            }
        },

        onGetListCardResponse: function (response) {
            this.listCards = response.list;
            this.promotionRate = response.PromotionRate;
            this.updateList(cc.CardOperatorCode.VIETTEL);
        },
    });
}).call(this);
