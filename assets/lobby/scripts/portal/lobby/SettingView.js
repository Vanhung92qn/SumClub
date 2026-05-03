/**
 * Created by Nofear on 3/15/2019.
 */
var netConfig = require('NetConfig');

(function () {
    cc.SettingView = cc.Class({
        "extends": cc.Component,
        properties: {
        },

        // use this for initialization
        onLoad: function () {
            this.animationSetting = this.node.getComponent(cc.Animation);
            cc.LobbyController.getInstance().setSettingView(this);
            this.node.zIndex = cc.NoteDepth.SETTING;
			// this.animation = this.node.getComponent(cc.Animation);
        },
		
        
        openSetting: function () {
            this.animationSetting.play('openSettingMenu');
        },

        closeSetting: function () {
            this.animationSetting.play('closeSettingMenu');
        },

        onLogoutResponse: function () {
            cc.LobbyController.getInstance().resetTopBar();

            cc.BalanceController.getInstance().updateRealBalance(0);
            cc.BalanceController.getInstance().updateBalance(0);

            //xoa token
            cc.ServerConnector.getInstance().setToken(null);
            //clear local token
            cc.Tool.getInstance().setItem("@atn", null);
            //cc.ServerConnector.getInstance().setToken(cc.Tool.getInstance().getItem("@atn"));

            cc.LobbyController.getInstance().destroyAllMiniGameView();

            cc.HubController.getInstance().disconnectPortalHub();


            //disconnect hub tx
            cc.TaiXiuController.getInstance().disconnectAndLogout();
            //connect lai voi token = null
            cc.TaiXiuController.getInstance().connectHubTx();

            cc.LoginController.getInstance().setLoginState(false);
            cc.PopupController.getInstance().closePopup();
            cc.LobbyController.getInstance().updateUILogin(true);
            //cc.LobbyController.getInstance().createLoginView();
            cc.LobbyController.getInstance().destroyAccountView();
            cc.LobbyController.getInstance().destroyShopView();

            //EVENT SAN KHO BAU
            // if (!cc.Config.getInstance().getDomainVK().includes(netConfig.HOST)) {
            //     cc.TreasureController.getInstance().resetCarrot();
            // }

            // if (cc.sys.isNative && sdkbox) {
            //     sdkbox.PluginFacebook.logout();
            // }

            cc.DDNA.getInstance().removeSessionId();
        },

        closeClicked: function () {
            this.closeSetting();
        },
        
        securityClicked: function () {
            if (cc.LoginController.getInstance().checkLogin()) {
                cc.LobbyController.getInstance().createSecurityView(cc.AccountTab.SECURITY);
                this.closeSetting();
                cc.DDNA.getInstance().uiInteraction(cc.DDNAUILocation.PORTAL, 'SETTING_SECURITY', cc.DDNAUIType.BUTTON);
                // if (cc.Config.getInstance().getDomainVK().includes(netConfig.HOST)) {
                //     cc.LobbyController.getInstance().createAccountView(cc.AccountTab.SAFE_PLUS);
                //     this.closeSetting();
                // } else {
                //     cc.LobbyController.getInstance().createAccountView(cc.AccountTab.SECURITY);
                //     this.closeSetting();
                //     cc.DDNA.getInstance().uiInteraction(cc.DDNAUILocation.PORTAL, 'SETTING_SECURITY', cc.DDNAUIType.BUTTON);
                // }
            }
        },

        
        transactionHistoryClicked: function () {
            if (cc.LoginController.getInstance().checkLogin()) {
                cc.LobbyController.getInstance().createHistoryView(cc.HistoryTab.GAME);
                cc.DDNA.getInstance().uiInteraction(cc.DDNAUILocation.PORTAL, 'SETTING_HISTORY', cc.DDNAUIType.BUTTON);
                this.closeSetting();
            }
        },
        
        inboxClicked: function () {
            
        },
        
        hotlineClicked: function () {
            
        },
        
        logoutClicked: function () {
            this.closeSetting();
            this.showPopupLogout();
            cc.DDNA.getInstance().uiInteraction(cc.DDNAUILocation.PORTAL, 'SETTING_LOGOUT', cc.DDNAUIType.BUTTON);
        },

        quickLogoutClicked: function () {
            this.showPopupLogout();
            cc.DDNA.getInstance().uiInteraction(cc.DDNAUILocation.PORTAL, 'BACK', cc.DDNAUIType.BUTTON);
        },

        showPopupLogout: function () {
            var clickEventHandlerBlue = new cc.Component.EventHandler();
            clickEventHandlerBlue.target = this; //This node is the node to which your event handler code component belongs
            clickEventHandlerBlue.component = 'SettingView';//This is the code file name
            clickEventHandlerBlue.handler = 'confirmLogoutClicked';
            //clickEventHandlerBlue.customEventData = '';

            var clickEventHandlerRed = new cc.Component.EventHandler();
            clickEventHandlerRed.target = this; //This node is the node to which your event handler code component belongs
            clickEventHandlerRed.component = 'SettingView';//This is the code file name
            clickEventHandlerRed.handler = 'cancelLogoutClicked';

            cc.PopupController.getInstance().showPopup(
                'Bạn có chắc chắn muốn đăng xuất?',
                'HỦY',
                'CHẤP NHẬN',
                clickEventHandlerRed,
                clickEventHandlerBlue
            );
        },

        confirmLogoutClicked: function () {
            var logoutCommand = new cc.LogoutCommand;
            logoutCommand.execute(this);
        },

        cancelLogoutClicked: function () {
            cc.PopupController.getInstance().closePopup();
        },

        clickAudioBg: function() {
            cc.LobbyController.getInstance().setIsOnAudioBg();
        },

        clickHoTro: function() {
            cc.sys.openURL(cc.Config.getInstance().teleHotro());
        }

    });
}).call(this);
