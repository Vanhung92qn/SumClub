/**
 * Created by Welcome on 4/18/2019.
 */

(function () {
    cc.X2RewardView = cc.Class({
        "extends": cc.Component,
        properties: {
            nodeProgress: cc.Node,
            nodeRules: cc.Node,

            btnProgress: cc.Button,
            btnRules: cc.Button,

            nodeParent: cc.Node,
            nodeItemTemp: cc.Node,
        },

        onLoad: function () {
            this.node.zIndex =  cc.NoteDepth.POPUP_PORTAL;
            this.animation = this.node.getComponent(cc.Animation);

            this.items = [];
        },

        onEnable: function () {
            this.animation.play('openPopup');

            //luu ben banner click
            var startTab = cc.Tool.getInstance().getItem('@startTabX2');
            if (startTab.toString() === cc.X2Tab.PROGRESS) {
                this.nodeProgress.active = true;
                this.nodeRules.active = false;

                this.btnProgress.interactable = false;
                this.btnRules.interactable = true;
            } else {
                //mac dinh mo tab 0
                this.nodeProgress.active = false;
                this.nodeRules.active = true;

                this.btnProgress.interactable = true;
                this.btnRules.interactable = false;
            }

            this.refreshX2Info();
        },

        refreshX2Info: function () {
            var getX2InfoCommand = new cc.GetX2InfoCommand;
            getX2InfoCommand.execute(this);
        },

        claimReward: function (item) {
            this.rewardType = item.RechargeType;
            var getX2RewardCommand = new cc.GetX2RewardCommand;
            getX2RewardCommand.execute(this);
        },

        onGetX2RewardResponse: function (response) {
            cc.PopupController.getInstance().showMessage(response.Message);
            this.refreshX2Info();
            cc.LobbyController.getInstance().refreshAccountInfo();
        },

        onGetX2RewardResponseError: function (response) {
            cc.PopupController.getInstance().showMessageError(response.Message, response.ResponseCode);
        },

        onGetX2InfoResponse: function (response) {
            var self = this;
            var listItems = response.List;
            if (this.items.length === 0) {
                //tao moi
                listItems.forEach(function (item) {
                    var nodeItem = cc.instantiate(self.nodeItemTemp);
                    self.nodeParent.addChild(nodeItem);
                    // item.setPosition(0,0);
                    nodeItem.getComponent(cc.X2RewardItem).updateItem(this, item);
                    self.items.push(nodeItem);
                })
            } else {
                for (var i = 0; i < listItems.length; i++) {
                    this.items[i].getComponent(cc.X2RewardItem).updateItem(this, listItems[i]);
                }
            }
        },

        ruleTabClicked: function () {
            this.nodeProgress.active = false;
            this.nodeRules.active = true;

            this.btnProgress.interactable = true;
            this.btnRules.interactable = false;
        },

        progressTabClicked: function () {
            this.nodeProgress.active = true;
            this.nodeRules.active = false;

            this.btnProgress.interactable = false;
            this.btnRules.interactable = true;
        },

        topupClicked: function () {
            switch (cc.ShopController.getInstance().getChargeDefault()) {
                case 'CARD':
                    cc.LobbyController.getInstance().createShopView(cc.ShopTab.TOPUP);
                    break;
                case 'BANK':
                    cc.LobbyController.getInstance().createShopView(cc.ShopTab.BANK);
                    break;
                case 'MOMO':
                    cc.LobbyController.getInstance().createShopView(cc.ShopTab.MOMO);
                    break;
                default:
                    cc.LobbyController.getInstance().createShopView(cc.ShopTab.TOPUP);
            }
            cc.LobbyController.getInstance().destroyX2RewardView();
        },

        closeFinished: function () {
            //this.showRegister(false);
            this.animation.play('closePopup');
            var self = this;
            var delay = 0.12;
            cc.director.getScheduler().schedule(function () {
                self.animation.stop();
                cc.LobbyController.getInstance().destroyX2RewardView();
            }, this, 1, 0, delay, false);
        },
    });
}).call(this);
