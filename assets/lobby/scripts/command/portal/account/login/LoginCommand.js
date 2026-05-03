/**
 * Created by Nofear on 2/27/2019.
 */
(function () {
    var LoginCommand;

    LoginCommand = (function () {
        function LoginCommand() {
        }

        LoginCommand.prototype.execute = function (controller) {
            cc.LoginController.getInstance().setLoginType(cc.LoginType.Type1);

            var url = 'api/Account/Login';
            var params = {
                LoginType: cc.LoginType.Type1,
                UserName: controller.username,
                Password: controller.password,
                DeviceId: cc.ServerConnector.getInstance().getDeviceId(),
                DeviceType: cc.Config.getInstance().getDeviceType(),
            };

            if (controller.nodeCaptcha.active) {
                params.PrivateKey = cc.ServerConnector.getInstance().getCaptchaPrivateKey();
                params.Captcha = controller.captcha;
            }

            params = JSON.stringify(params);

            return cc.ServerConnector.getInstance().sendRequestPOST(cc.SubdomainName.PORTAL, url, params, function (response) {
                var obj = JSON.parse(response);
                cc.PopupController.getInstance().hideBusy();
                if (obj.ResponseCode === 1) {
                    /*
                    {
                        "ResponseCode": 1,
                        "AccountInfo": {
                            "AccountID": 15364516,
                            "AccountName": "Player_15364516",
                            "AvatarID": 10,
                            "Balance": 10028442593,
                            "Status": "",
                            "Gender": -1,
                            "BirthDay": "0001-01-01T00:00:00",
                            "PhoneNumber": null,
                            "PendingMessage": 0,
                            "PendingGiftcode": 0,
                            "TotalWin": 0,
                            "TotalLose": 0,
                            "TotalDraw": 0,
                            "IsUpdateAccountName": false
                        }
                    }
                    * */
                    return controller.onLoginResponse(obj);
                } else {
                    return controller.onLoginResponseError(obj);
                    //cc.PopupController.getInstance().show(obj.Message, cc.PopupStyle.NOTHING);
                }
            }, true);
        };

        return LoginCommand;

    })();

    cc.LoginCommand = LoginCommand;

}).call(this);
