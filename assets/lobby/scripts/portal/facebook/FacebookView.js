/**
 * Created by Nofear on 6/7/2017.
 */

var netConfig = require('NetConfig');
(function () {
    cc.FacebookView = cc.Class({
        "extends": cc.Component,
        properties: {

        },

        // use this for initialization
        onLoad: function () {
            cc.FacebookController.getInstance().setFacebookView(this);

            if (!cc.sys.isNative) return;

            sdkbox.PluginFacebook.init();
            // console.log('FACEBOOK SDK VERSION: ' + sdkbox.PluginFacebook.getSDKVersion());

            var self = this;
            sdkbox.PluginFacebook.setListener({
                onLogin: function(isLogin, msg) {
                    if (isLogin) {
                        cc.FacebookController.getInstance().setFBUserId(sdkbox.PluginFacebook.getUserID());
                        cc.FacebookController.getInstance().setFBAccessToken(sdkbox.PluginFacebook.getAccessToken());

                        self.loginFacebookSuccess();
                        //muon lay them email moi goi them
                        //sdkbox.PluginFacebook.api("/me?fields=id,name,email", "GET", [], "/me?fields=id,name,email");
                    } else {
                        cc.PopupController.getInstance().hideBusy();
                    }
                },

                onAPI: function(tag, data) {
                    // console.log('onAPI tag: ' + tag + ' - data: ' + data);
                    //{"id":"1973773579545067","name":"IngenStudio VN","email":"tuyen.ingen@gmail.com","__debug__":{}}
                    const dataResponse = JSON.parse(data);

                    if (tag === '/me?fields=id,name,email') {
                        cc.FacebookController.getInstance().setFBEmail(dataResponse.email);
                        // console.log('setFBEmail: ' + dataResponse.email);
                        self.loginFacebookSuccess();
                    }
                },

                onGetUserInfo: function(userInfo) {
                    cc.FacebookController.getInstance().setFBUserId(sdkbox.PluginFacebook.getUserID());
                    cc.FacebookController.getInstance().setFBAccessToken(sdkbox.PluginFacebook.getAccessToken());
                },
            });
        },

        loginFacebookMobile: function (controller) {
            this.controller = controller;
            if(cc.sys.isNative) {
                cc.PopupController.getInstance().showBusy();

                //Kiem tra xem da login chua
                if (sdkbox.PluginFacebook.isLoggedIn()) {
                    cc.FacebookController.getInstance().setFBUserId(sdkbox.PluginFacebook.getUserID());
                    cc.FacebookController.getInstance().setFBAccessToken(sdkbox.PluginFacebook.getAccessToken());

                    this.loginFacebookSuccess();

                    //muon lay them email moi goi them
                    //sdkbox.PluginFacebook.api("/me?fields=id,name,email", "GET", [], "/me?fields=id,name,email");
                } else {
                    //goi login
                    sdkbox.PluginFacebook.login(["public_profile"]);

                }
            }
        },

        logoutFacebookMobile: function () {
            if(cc.sys.isNative) {
                sdkbox.PluginFacebook.logout();
            }
        },

        loginFacebookSuccess: function () {
            // console.log('loginFacebookSuccess');
            var loginFacebookCommand = new cc.LoginFacebookCommand;
            loginFacebookCommand.execute(this.controller);
        },
    });
}).call(this);
