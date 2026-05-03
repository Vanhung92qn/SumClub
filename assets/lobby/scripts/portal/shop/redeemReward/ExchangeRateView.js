/**
 * Created by Nofear on 3/15/2019.
 */


(function () {
    cc.ExchangeRateView = cc.Class({
        "extends": cc.Component,
        properties: {
            listExchangeRateItem: [cc.ExchangeRateItem],
            toggleChooseValue: cc.ToggleChooseValue,
        },

        onLoad: function () {
            this.listCards = [];
            this.maxLengthListItem = this.listExchangeRateItem.length;
            this.getListCard();
        },

        init: function (controller) {
            this.controller = controller;
            this.redeemRewardView = controller.getComponent(cc.RedeemRewardView);
            this.redeemRewardView.setLBCardType(cc.CardType.VIETTEL);
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
            this.listExchangeRateItem.forEach(function (exchangeRateItem) {
                exchangeRateItem.node.active = false;
            });

            if (this.listCards.length > 0) {
                var self = this;
                var index = 0;
                this.listCards.forEach(function (card) {
                    //the nap còn active
                    if (card.ExchangeStatus && card.OperatorCode.includes(cardOperatorCode)) {
                        if (index < self.maxLengthListItem) {
                            self.listExchangeRateItem[index].updateItem(card);
                            self.listExchangeRateItem[index].node.active = true;

                            self.toggleChooseValue.initializeToggleChooseValue(
                                self.controller,
                                "RedeemRewardView",
                                "selectCardValueEvent",
                                card.ID,
                                cc.Tool.getInstance().formatNumber(card.CardValue)
                            );
                            if (index === 0) {
                                self.redeemRewardView.setLBCardValue(card.ID);
                            }
                            index++;
                        }
                    }
                });

            } else {
                //this.getListCard();
            }
        },

        onGetListCardResponse: function (response) {
            this.listCards = response.list;
            this.updateList(cc.CardOperatorCode.VIETTEL);
        },
    });
}).call(this);
