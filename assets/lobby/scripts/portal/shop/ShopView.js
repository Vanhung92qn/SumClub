/**
 * Created by Nofear on 3/14/2019.
 */

(function () {
    cc.ShopView = cc.Class({
        "extends": cc.Component,
        properties: {
            nodeAgency: cc.Node,
            nodeTransfer: cc.Node,
            nodeTopup: cc.Node,
            nodeRedeemReward: cc.Node,
            nodeSafe: cc.Node,
            nodeBank: cc.Node,

            nodeBusy: cc.Node,
        },

        // use this for initialization
        onLoad: function () {
            cc.ShopController.getInstance().setShopView(this);
            this.nodeTabActive = this.nodeAgency;
            this.currentTab = cc.ShopTab.AGENCY;
            this.node.zIndex = cc.NoteDepth.POPUP_PORTAL;
            this.animation = this.node.getComponent(cc.Animation);
        },

        onEnable: function () {
            this.animation.play('openPopup');
            var startTab = cc.Tool.getInstance().getItem('@startShopTab');
            var self = this;
            cc.director.getScheduler().schedule(function () {
                self.activeTab(startTab);
            }, this, 0, 0, 0.3, false);
        },

        changeTabClicked: function (event, data) {
            if (data.toString() === this.currentTab) return;
            this.activeTab(data.toString());

            cc.DDNA.getInstance().uiInteraction(cc.DDNAUILocation.SHOP, data.toString(), cc.DDNAUIType.BUTTON);
        },

        activeTab (tabName, nickName) {
            if (nickName === undefined) {
                cc.Tool.getInstance().setItem('@nickNameAgency', '');
            } else {
                cc.Tool.getInstance().setItem('@nickNameAgency', nickName);
            }

            this.nodeTabActive.active = false;
            switch (tabName) {
                case cc.ShopTab.AGENCY:
                    this.nodeTabActive = this.nodeAgency;
                    break;
                case cc.ShopTab.TRANSFER:
                    this.nodeTabActive = this.nodeTransfer;
                    break;
                case cc.ShopTab.TOPUP:
                    this.nodeTabActive = this.nodeTopup;
                    break;
                case cc.ShopTab.REDEEM_REWARD:
                    this.nodeTabActive = this.nodeRedeemReward;
                    break;
                case cc.ShopTab.SAFE:
                    this.nodeTabActive = this.nodeSafe;
                    break;
                case cc.ShopTab.BANK:
                    this.nodeTabActive = this.nodeBank;
                    break;
            }
            this.nodeTabActive.active = true;

            this.currentTab = tabName;
        },

        showShopBusy: function () {
            this.nodeBusy.active = true;
        },

        hideShopBusy: function () {
            if (this.nodeBusy)
                this.nodeBusy.active = false;
        },

        closeClicked: function () {
            //this.showRegister(false);
            this.animation.play('closePopup');
            var self = this;
            var delay = 0.12;
            cc.director.getScheduler().schedule(function () {
                self.animation.stop();
                cc.LobbyController.getInstance().destroyShopView();
            }, this, 1, 0, delay, false);
        }

    });
}).call(this);
