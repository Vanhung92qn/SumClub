/**
 * Created by Nofear on 7/14/2017.
 */

(function () {
    cc.BannerView = cc.Class({
        "extends": cc.Component,
        properties: {
            nodeBanner: cc.Node,
            nodeBanner2: cc.Node,
            nodeBanner3: cc.Node,
        },

        onLoad: function () {
            cc.BannerController.getInstance().setBannerView(this);
            this.scrollPageView = this.node.getComponent(cc.AutoScrollPageView);
            this.scrollPageView.getTotalPage();
        },

        switchPage: function () {
            this.scrollPageView.switchPage();
        },

        openMomoTopupClicked: function () {
            if (cc.LoginController.getInstance().checkLogin()) {
                cc.LobbyController.getInstance().createShopView(cc.ShopTab.MOMO);
            }
        },

        openAppSafeHelpClicked: function () {
            cc.LobbyController.getInstance().createAppSafeHelpView();
        },

        openDNSHelp:function(){
            cc.LobbyController.getInstance().createDNSHelpView();    
        },

        openUpdateAccount:function(){
            cc.LobbyController.getInstance().createUpdateAccountView();    
        },

        openMoveBB:function(){
            cc.LobbyController.getInstance().createMoveBBView();    
        },

        openUrlClicked: function (event, data) {
            if (data) {
                cc.sys.openURL(data.toString());
            }
        },

        openEventClicked: function (event, index) {
            if (index) {
                if (cc.LoginController.getInstance().checkLogin()) {
                    cc.Tool.getInstance().setItem('@startTabEvent', index.toString());
                    cc.LobbyController.getInstance().createEventView();
                }
            }
        },

        openTreasureClicked: function () {
            cc.TreasureController.getInstance().openTreasure();
        },
    });

}).call(this);