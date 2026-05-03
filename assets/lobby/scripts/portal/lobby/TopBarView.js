/**
 * Created by Nofear on 6/7/2017.
 */
var netConfig = require('NetConfig');

(function () {
    cc.TopBarView = cc.Class({
        "extends": cc.Component,
        properties: {

            nodeLogin: [cc.Node],
            nodeLoginSuccess: [cc.Node],

            lbNickName: cc.Label,
            lbRank: cc.Label,
            lbiBalance: cc.LabelIncrement,

            avatar: cc.Avatar,

            //so thu chua doc
            lbCountMail: cc.Label,
            badgeMail: cc.Node,
            lbVipPoint: cc.Label,
            AudioClick: cc.AudioSource,
            AudioNapRut: cc.AudioSource,
        },

        onLoad: function () {
            this.isCardGame = false
            this.node.zIndex = cc.NoteDepth.TOP_BAR;
            cc.LobbyController.getInstance().setTopBarView(this);        
            this.node.active = false;
        },

        getMailUnRead: function () {
            var mailUnReadCommand = new cc.MailUnReadCommand;
            mailUnReadCommand.execute(this);
        },

        onMailUnReadResponse: function (response) {
            if (response.Count > 0) {
                this.lbCountMail.string = response.Count;
                this.lbCountMail.node.active = true;
                this.badgeMail.active = true;
            } else {
                this.lbCountMail.node.active = false;
                this.badgeMail.active = false;
            }
        },

        resetTopBar: function () {
            //this.lbiBalance.tweenValueto(0);
        },

        updateUILogin: function (enable) {
            this.nodeLogin.forEach(function (node) {
                node.active = enable;
            });
            this.nodeLoginSuccess.forEach(function (node) {
                node.active = !enable;
            });
            this.node.active = !enable;
        },

        topBarUpdateInfo: function () {
            var loginResponse = cc.LoginController.getInstance().getLoginResponse();
            var nextVP = cc.LoginController.getInstance().getNextVPResponse();

            this.lbNickName.string = loginResponse.AccountName;
            //this.lbRank.string = loginResponse.RankName + '(' + loginResponse.VP + '/' + VIPMaps[loginResponse.RankID] + ')';


            this.lbVipPoint.string = cc.Config.getInstance().formatRank(
                loginResponse.RankID,
                loginResponse.RankName,
                loginResponse.VP,
                nextVP ? nextVP.VP : 0,
            );
            this.lbRank.string = this.getVipRank(nextVP ? nextVP.RankID - 1 : 0);
            //this.lbiBalance.tweenValueto(loginResponse.Balance);

            cc.BalanceController.getInstance().updateRealBalance(loginResponse.Balance);
            cc.BalanceController.getInstance().updateBalance(loginResponse.Balance);

            this.avatar.setAvatar(cc.AccountController.getInstance().getAvatarImage(loginResponse.AvatarID));
        },

        refreshAvatar: function () {
            this.AudioClick.loop = false;
            this.AudioClick.play();
            var loginResponse = cc.LoginController.getInstance().getLoginResponse();
            this.avatar.setAvatar(cc.AccountController.getInstance().getAvatarImage(loginResponse.AvatarID));
        },

        quickLogoutClicked: function () {
            this.AudioClick.loop = false;
            this.AudioClick.play();
            if (this.isCardGame) {
                //thoat game
                cc.LobbyController.getInstance().destroyDynamicView(null);
            } else {
                cc.LobbyController.getInstance().showPopupLogout();
            }
            cc.DDNA.getInstance().uiInteraction(cc.DDNAUILocation.PORTAL, 'BACK', cc.DDNAUIType.BUTTON);
        },

        avatarClicked: function () {
            this.AudioClick.loop = false;
            this.AudioClick.play();
            cc.LobbyController.getInstance().createAccountView(cc.AccountTab.PROFILE);
            cc.DDNA.getInstance().uiInteraction(cc.DDNAUILocation.PORTAL, 'ACCOUNT_INFO', cc.DDNAUIType.BUTTON);
        },

         profileClicked: function () {
            this.AudioClick.loop = false;
            this.AudioClick.play();
            cc.LobbyController.getInstance().createAccountView(cc.AccountTab.PROFILE);
            cc.DDNA.getInstance().uiInteraction(cc.DDNAUILocation.PORTAL, 'ACCOUNT_INFO', cc.DDNAUIType.BUTTON);
        },

        topupClicked: function () {
            this.AudioNapRut.loop = false;
            this.AudioNapRut.play();
            if (cc.LoginController.getInstance().checkLogin()) {
                if (!cc.Config.getInstance().getDomainVK().includes(netConfig.HOST)) {
                    switch (cc.ShopController.getInstance().getChargeDefault()) { //cc.ShopController.getInstance().getChargeDefault()
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
                } else {
                    cc.LobbyController.getInstance().createShopView(cc.ShopTab.AGENCY);
                    cc.DDNA.getInstance().shopEntered(cc.DDNAShopName.AGENCY);
                    cc.DDNA.getInstance().uiInteraction(cc.DDNAUILocation.PORTAL, 'AGENCY', cc.DDNAUIType.BUTTON);
                }

                // if (cc.Config.getInstance().getServiceId() === cc.ServiceId.BLOCK_BUSTER_3 ||
                //     cc.Config.getInstance().getServiceId() === cc.ServiceId.BLOCK_BUSTER_2) {
                //     cc.LobbyController.getInstance().createShopView(cc.ShopTab.BANK);
                // } else {
                //     cc.LobbyController.getInstance().createShopView(cc.ShopTab.TOPUP);
                // }

                cc.DDNA.getInstance().shopEntered(cc.DDNAShopName.TOPUP);
                cc.DDNA.getInstance().uiInteraction(cc.DDNAUILocation.PORTAL, 'SHOP_PURCHASE', cc.DDNAUIType.BUTTON);
            }
        },

        eventClicked: function () {
            this.AudioClick.loop = false;
            this.AudioClick.play();
            if (cc.LoginController.getInstance().checkLogin()) {
                if (cc.Config.getInstance().getDomainVK().includes(netConfig.HOST)) {
                    cc.Tool.getInstance().setItem('@startTabEvent', 4);
                } else {
                    cc.Tool.getInstance().setItem('@startTabEvent', 4); //TX
                    // cc.Tool.getInstance().setItem('@startTabEvent', 2); //2-Huthoi, 0-TopVP
                }

                cc.Tool.getInstance().setItem('@startSubTabEvent', 'TOP');
                cc.LobbyController.getInstance().createEventView();
                cc.DDNA.getInstance().uiInteraction(cc.DDNAUILocation.PORTAL, 'EVENT', cc.DDNAUIType.BUTTON);
            }
        },

        //Su kien San Kho Bau
        treasureClicked: function () {
            this.AudioClick.loop = false;
            this.AudioClick.play();
            if (cc.LoginController.getInstance().checkLogin()) {
                cc.LobbyController.getInstance().createTreasureView();
                cc.DDNA.getInstance().uiInteraction(cc.DDNAUILocation.PORTAL, 'TREASURE', cc.DDNAUIType.BUTTON);
            }
        },
        
        inboxClicked: function () {
            this.AudioClick.loop = false;
            this.AudioClick.play();
            if (cc.LoginController.getInstance().checkLogin()) {
                cc.LobbyController.getInstance().createAccountView(cc.AccountTab.INBOX);
                cc.DDNA.getInstance().uiInteraction(cc.DDNAUILocation.PORTAL, 'INBOX', cc.DDNAUIType.BUTTON);
            }
        },
        
        settingClicked: function () {
            this.AudioClick.loop = false;
            this.AudioClick.play();
            if (cc.LoginController.getInstance().checkLogin()) {
                cc.LobbyController.getInstance().openSetting();
                cc.DDNA.getInstance().uiInteraction(cc.DDNAUILocation.PORTAL, 'SETTING', cc.DDNAUIType.BUTTON);
            }
        },

        loginClicked: function () {
            this.AudioClick.loop = false;
            this.AudioClick.play();
            cc.LobbyController.getInstance().createLoginView();
            cc.DDNA.getInstance().uiInteraction(cc.DDNAUILocation.PORTAL, 'LOGIN', cc.DDNAUIType.BUTTON);
        },

        registerClicked: function () {
            this.AudioClick.loop = false;
            this.AudioClick.play();
            cc.LobbyController.getInstance().createLoginView();
            cc.LoginController.getInstance().showRegister(true);
            cc.LoginController.getInstance().showLogin(false);
            cc.DDNA.getInstance().uiInteraction(cc.DDNAUILocation.PORTAL, 'REGISTER', cc.DDNAUIType.BUTTON);
        },

        telegramClicked: function () {
            this.AudioClick.loop = false;
            this.AudioClick.play();
            if (cc.LoginController.getInstance().checkLogin()) {
                cc.sys.openURL(cc.Config.getInstance().taiotpx6());
            }
        },

        getVipRank: function(rankID) {
            switch (rankID) {
                case 2:
                    return "2";                
                case 3:
                    return "3";
                case 4:
                    return "4";
                case 5:
                    return "5";
                case 6:
                    return "6";
                case 7:
                    return "7";
                case 8:
                    return "8";
                case 9:
                    return "9";        
                default:
                    return "1";
            }
        },
    });
}).call(this);
