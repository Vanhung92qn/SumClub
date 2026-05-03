/**
 * Created by Nofear on 6/7/2017.
 */

var netConfig = require('NetConfig');

(function () {
    cc.BottomBarView = cc.Class({
        "extends": cc.Component,
        properties: {
            nodeTabbar: cc.Node,
            AudioClick: cc.AudioSource,
            AudioNapRut: cc.AudioSource,
        },

        onLoad: function () {
            cc.LobbyController.getInstance().setBottomBarView(this);
            if (cc.sys.isNative) {
                this.nodeTabbar.active = true;
            }
        },

        redeemClicked: function () {
            if (cc.LoginController.getInstance().checkLogin()) {
                if (!cc.Config.getInstance().getDomainVK().includes(netConfig.HOST)) {
                    cc.LobbyController.getInstance().createShopView(cc.ShopTab.REDEEM_REWARD);
                    cc.DDNA.getInstance().shopEntered(cc.DDNAShopName.CASH_OUT);
                    cc.DDNA.getInstance().uiInteraction(cc.DDNAUILocation.PORTAL, 'CASH_OUT', cc.DDNAUIType.BUTTON);
                } else {
                    cc.LobbyController.getInstance().createShopView(cc.ShopTab.AGENCY);
                    cc.DDNA.getInstance().shopEntered(cc.DDNAShopName.AGENCY);
                    cc.DDNA.getInstance().uiInteraction(cc.DDNAUILocation.PORTAL, 'AGENCY', cc.DDNAUIType.BUTTON);
                }
            }
        },

        vipClicked: function () {
            if (cc.LoginController.getInstance().checkLogin()) {
                cc.LobbyController.getInstance().createAccountView(cc.AccountTab.VIP);
                cc.DDNA.getInstance().uiInteraction(cc.DDNAUILocation.PORTAL, 'VIP', cc.DDNAUIType.BUTTON);
            }
        },

        x2Clicked: function () {
            if (cc.LoginController.getInstance().checkLogin()) {
                cc.LobbyController.getInstance().createX2RewardView(cc.X2Tab.PROGRESS);
            }
        },

        transferClicked: function () {
            if (cc.LoginController.getInstance().checkLogin()) {
                cc.LobbyController.getInstance().createShopView(cc.ShopTab.TRANSFER);
                cc.DDNA.getInstance().shopEntered(cc.DDNAShopName.TRANSFER);
                cc.DDNA.getInstance().uiInteraction(cc.DDNAUILocation.PORTAL, 'TRANSFER', cc.DDNAUIType.BUTTON);
            }
        },

        agencyClicked: function () {
            if (cc.LoginController.getInstance().checkLogin()) {
                cc.LobbyController.getInstance().createShopView(cc.ShopTab.AGENCY);
                cc.DDNA.getInstance().shopEntered(cc.DDNAShopName.AGENCY);
                cc.DDNA.getInstance().uiInteraction(cc.DDNAUILocation.PORTAL, 'AGENCY', cc.DDNAUIType.BUTTON);
            }
        },

        giftcodeClicked: function () {
            if (cc.LoginController.getInstance().checkLogin()) {
                cc.LobbyController.getInstance().createGiftcodeView();
                cc.DDNA.getInstance().uiInteraction(cc.DDNAUILocation.PORTAL, 'GIFTCODE', cc.DDNAUIType.BUTTON);
            }
        },

        groupFBClicked: function () {
            if (cc.LoginController.getInstance().checkLogin()) {
                cc.sys.openURL(cc.Config.getInstance().groupFB());
                cc.DDNA.getInstance().uiInteraction(cc.DDNAUILocation.PORTAL, 'FB_GROUP', cc.DDNAUIType.BUTTON);
            }
        },

        pageFBClicked: function () {
            if (cc.LoginController.getInstance().checkLogin()) {
                cc.sys.openURL(cc.Config.getInstance().fanPageFB());
                cc.DDNA.getInstance().uiInteraction(cc.DDNAUILocation.PORTAL, 'FB_PAGE', cc.DDNAUIType.BUTTON);
            }
        },
        pageTaiGame: function () {
            cc.sys.openURL(cc.Config.getInstance().taigame());
            cc.DDNA.getInstance().uiInteraction(cc.DDNAUILocation.PORTAL, 'TAI_GAME', cc.DDNAUIType.BUTTON);
        },

        clickHoTro: function () {
            cc.sys.openURL(cc.Config.getInstance().teleHotro());
            cc.DDNA.getInstance().uiInteraction(cc.DDNAUILocation.PORTAL, 'HO_TRO', cc.DDNAUIType.BUTTON);
        },
        
        casoutClicked: function () {
                if (cc.LoginController.getInstance().checkLogin()) {
                  cc.LobbyController.getInstance().createShopCastOutView(cc.ShopTab.BANK);
                  cc.DDNA.getInstance().shopEntered(cc.DDNAShopName.CASH_OUT);
                  cc.DDNA.getInstance().uiInteraction(cc.DDNAUILocation.PORTAL, 'BANK', cc.DDNAUIType.BUTTON);
                  this.AudioNapRut.loop = false;
                  this.AudioNapRut.play();
            }
        },
    });
}).call(this);
