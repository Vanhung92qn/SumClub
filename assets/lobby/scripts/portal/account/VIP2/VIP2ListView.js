/**
 * Created by Nofear on 3/15/2019.
 */


(function () {
    cc.VIP2ListView = cc.Class({
        "extends": cc.Component,
        properties: {
            itemVIP: cc.Prefab,
            itemVIPLoan: cc.Prefab,
            itemVIPPrize: cc.Prefab,
            itemVIPCard: cc.Prefab,

            scrollView: cc.ScrollView,

            nodeParentVip: cc.Node,
            nodeParentCard: cc.Node,
            nodeParentLoan: cc.Node,

            //active
            nodeParentVipProgress: cc.Node,
            nodeParentCardProgress: cc.Node,
            nodeParentLoanProgress: cc.Node,

            //active
            nodeParentVipActive: cc.Node,
            nodeParentCardActive: cc.Node,
            nodeParentLoanActive: cc.Node,
        },

        onLoad: function () {
            if (this.scrollView === null) return;
            this.indexActive = 0;
            this.indexProgres = 0;
            this.index = 0;
        },

        updateAllIndex: function () {
            this.indexActive = 0;
            this.indexProgres = 0;
            this.index = 0;
            // ============ ACTIVE ============
            //VIP
             var children = this.nodeParentVipActive.children;
            // for (var i = 0; i < children.length; i++) {
            //     children[i].getComponent(cc.VIP2Item).updateIndex(this.indexActive);
            //     this.indexActive++;
            // }

            //CARD
            children = this.nodeParentCardActive.children;
            for (var i = 0; i < children.length; i++) {
                children[i].getComponent(cc.VIPCardItem).updateIndex(this.indexActive);
                this.indexActive++;
            }

            //LOAN
            children = this.nodeParentLoanActive.children;
            for (var i = 0; i < children.length; i++) {
                var item = children[i].getComponent(cc.VIPPrizeItem);
                if (item) {
                    item.updateIndex(this.indexActive);
                    this.indexActive++;
                } else {
                    item = children[i].getComponent(cc.VIPLoanItem);
                    item.updateIndex(this.indexActive);
                    this.indexActive++;
                }
            }

            // // ============ PROGRESS ============
            // this.indexProgres = this.indexActive;
            //
            // //VIP
            // var children = this.nodeParentVipProgress.children;
            // for (var i = 0; i < children.length; i++) {
            //     children[i].getComponent(cc.VIP2Item).updateIndex(this.indexProgres);
            //     this.indexProgres++;
            // }
            //
            // //LOAN
            // children = this.nodeParentLoanProgress.children;
            // for (var i = 0; i < children.length; i++) {
            //     var item = children[i].getComponent(cc.VIPPrizeItem);
            //     if (item) {
            //         item.updateIndex(this.indexProgres);
            //         this.indexProgres++;
            //     } else {
            //         item = children[i].getComponent(cc.VIPLoanItem);
            //         item.updateIndex(this.indexProgres);
            //         this.indexProgres++;
            //     }
            // }
            //
            // //CARD
            // children = this.nodeParentCardProgress.children;
            // for (var i = 0; i < children.length; i++) {
            //     children[i].getComponent(cc.VIPCardItem).updateIndex(this.indexProgres);
            //     this.indexProgres++;
            // }
            //
            // // ============ NORMAL ============
            // this.index = this.indexProgres;
            //
            // //VIP
            // children = this.nodeParentVip.children;
            // for (var i = 0; i < children.length; i++) {
            //     var item = children[i].getComponent(cc.VIP2Item);
            //     item.updateIndex(this.index);
            //     this.index++;
            // }
            //
            // //LOAN
            // children = this.nodeParentLoan.children;
            // for (var i = 0; i < children.length; i++) {
            //     var item = children[i].getComponent(cc.VIPPrizeItem);
            //     if (item) {
            //         item.updateIndex(this.index);
            //         this.index++;
            //     } else {
            //         item = children[i].getComponent(cc.VIPLoanItem);
            //         item.updateIndex(this.index);
            //         this.index++;
            //     }
            // }
            //
            // //CARD
            // children = this.nodeParentCard.children;
            // for (var i = 0; i < children.length; i++) {
            //     children[i].getComponent(cc.VIPCardItem).updateIndex(this.index);
            //     this.index++;
            // }
        },

        initializeVip: function (messages, currentVP) {
            var countMessage = messages.length;

            for (var i = 1; i < countMessage; ++i) {
                //bo qua rank dau tien
                var item = cc.instantiate(this.itemVIP);
                this.nodeParentVipActive.addChild(item);
                item.getComponent(cc.VIP2Item).updateItem(messages[i], currentVP);

                // //da nhan roi + hoac chua nhan duoc -> disable button
                // if (messages[i].RedeemStatus === cc.VIPRedeemStatus.RECEIVED || messages[i].RankID === 5) {
                //     this.nodeParentVip.addChild(item);
                //     item.getComponent(cc.VIP2Item).updateItem(messages[i], currentVP);
                // } else if (currentVP < messages[i].VipPoint) {
                //     //dang tich luy -> sap duoc nhan
                //     this.nodeParentVipProgress.addChild(item);
                //     item.getComponent(cc.VIP2Item).updateItem(messages[i], currentVP);
                // } else {
                //     this.nodeParentVipActive.addChild(item);
                //     item.getComponent(cc.VIP2Item).updateItem(messages[i], currentVP);
                // }
            }

            this.updateAllIndex();
        },

        resetListVip: function () {
            if (this.scrollView === null) return;

            this.scrollView.stopAutoScroll();

            var children = this.nodeParentVipActive.children;
            for (var i = children.length - 1; i >= 0; i--) {
                this.nodeParentVipActive.removeChild(children[i]);
            }

            // children = this.nodeParentVip.children;
            // for (var i = children.length - 1; i >= 0; i--) {
            //     this.nodeParentVip.removeChild(children[i]);
            // }
            //
            // children = this.nodeParentVipProgress.children;
            // for (var i = children.length - 1; i >= 0; i--) {
            //     this.nodeParentVipProgress.removeChild(children[i]);
            // }
        },

        initializeCard: function (info) {
            var currentCard = info.CurrentCard;
            var cardReceived = info.CardReceived;
            var cardNotYetReceived = info.CardNotYetReceived;

            if (cardNotYetReceived && cardNotYetReceived.length > 0) {
                var countMessage = cardNotYetReceived.length;
                for (var i = 0; i < countMessage; ++i) {
                    var item = cc.instantiate(this.itemVIPCard);
                    this.nodeParentCardActive.addChild(item);
                    item.getComponent(cc.VIPCardItem).updateItem(cardNotYetReceived[i], cc.VIPCardStatus.NOT_YET_RECEIVED_TIME);
                }
            }

            if (currentCard) {
                var item = cc.instantiate(this.itemVIPCard);
                this.nodeParentCardActive.addChild(item); //nodeParentCardProgress
                item.getComponent(cc.VIPCardItem).updateItem(currentCard, cc.VIPCardStatus.VALID_NOT_RECEIVED);
            }

            if (cardReceived && cardReceived.length > 0) {
                countMessage = cardReceived.length;
                for (var i = 0; i < countMessage; ++i) {
                    var item = cc.instantiate(this.itemVIPCard);
                    this.nodeParentCardActive.addChild(item); //nodeParentCard
                    item.getComponent(cc.VIPCardItem).updateItem(cardReceived[i], cc.VIPCardStatus.RECEIVED);
                }
            }

            this.updateAllIndex();
        },

        resetListCard: function () {
            if (this.scrollView === null) return;

            this.scrollView.stopAutoScroll();

            var children = this.nodeParentCardActive.children;
            for (var i = children.length - 1; i >= 0; i--) {
                this.nodeParentCardActive.removeChild(children[i]);
            }

            // children = this.nodeParentCard.children;
            // for (var i = children.length - 1; i >= 0; i--) {
            //     this.nodeParentCard.removeChild(children[i]);
            // }
            //
            // children = this.nodeParentCardProgress.children;
            // for (var i = children.length - 1; i >= 0; i--) {
            //     this.nodeParentCardProgress.removeChild(children[i]);
            // }
        },

        initializeLoan: function (info) {
            var loanInfor = info.LoanInfor;
            var quaterInfo = info.QuaterInfo;
            var beforeQuaterInfo = info.BeforeQuaterInfo;


            if (beforeQuaterInfo) {
                //hop le chua nhan -> active button
                var item = cc.instantiate(this.itemVIPPrize);

                this.nodeParentLoanActive.addChild(item);
                item.getComponent(cc.VIPPrizeItem).updateItem(beforeQuaterInfo);


                // if (beforeQuaterInfo.QuaterPrizeStatus === cc.QuaterPrizeStatus.VALID_NOT_RECEIVED) {
                //     this.nodeParentLoanActive.addChild(item);
                //     item.getComponent(cc.VIPPrizeItem).updateItem(beforeQuaterInfo);
                // } else if (beforeQuaterInfo.QuaterPrizeStatus === cc.QuaterPrizeStatus.NOT_YET_RECEIVED_TIME ||
                //     beforeQuaterInfo.QuaterPrizeStatus === cc.QuaterPrizeStatus.NOT_ENOUGH_CONDITION) {
                //     this.nodeParentLoanProgress.addChild(item);
                //     item.getComponent(cc.VIPPrizeItem).updateItem(beforeQuaterInfo);
                // } else {
                //     this.nodeParentLoan.addChild(item);
                //     item.getComponent(cc.VIPPrizeItem).updateItem(beforeQuaterInfo);
                // }
            }

            if (quaterInfo) {
                item = cc.instantiate(this.itemVIPPrize);

                this.nodeParentLoanActive.addChild(item);
                item.getComponent(cc.VIPPrizeItem).updateItem(quaterInfo);

                //hop le chua nhan -> active button
                // if (quaterInfo.QuaterPrizeStatus === cc.QuaterPrizeStatus.VALID_NOT_RECEIVED) {
                //     this.nodeParentLoanActive.addChild(item);
                //     item.getComponent(cc.VIPPrizeItem).updateItem(quaterInfo);
                // } else if (quaterInfo.QuaterPrizeStatus === cc.QuaterPrizeStatus.NOT_YET_RECEIVED_TIME ||
                //     quaterInfo.QuaterPrizeStatus === cc.QuaterPrizeStatus.NOT_ENOUGH_CONDITION) {
                //     this.nodeParentLoanProgress.addChild(item);
                //     item.getComponent(cc.VIPPrizeItem).updateItem(quaterInfo);
                // }  else {
                //     this.nodeParentLoan.addChild(item);
                //     item.getComponent(cc.VIPPrizeItem).updateItem(quaterInfo);
                // }
            }

            if (loanInfor) {
                item = cc.instantiate(this.itemVIPLoan);
                this.nodeParentLoanActive.addChild(item);
                item.getComponent(cc.VIPLoanItem).updateItem(loanInfor);

                // if (loanInfor.LoanAmount === 0) {
                //     this.nodeParentLoanProgress.addChild(item); //
                //     item.getComponent(cc.VIPLoanItem).updateItem(loanInfor);
                // } else {
                //     //truong hop Vay luon active button
                //     this.nodeParentLoanActive.addChild(item);
                //     item.getComponent(cc.VIPLoanItem).updateItem(loanInfor);
                // }
            }

            this.updateAllIndex();
        },

        resetListLoan: function () {
            if (this.scrollView === null) return;

            this.scrollView.stopAutoScroll();

            var children = this.nodeParentLoanActive.children;
            for (var i = children.length - 1; i >= 0; i--) {
                this.nodeParentLoanActive.removeChild(children[i]);
            }

            // children = this.nodeParentLoan.children;
            // for (var i = children.length - 1; i >= 0; i--) {
            //     this.nodeParentLoan.removeChild(children[i]);
            // }
            //
            // children = this.nodeParentLoanProgress.children;
            // for (var i = children.length - 1; i >= 0; i--) {
            //     this.nodeParentLoanProgress.removeChild(children[i]);
            // }
        },
    });
}).call(this);
