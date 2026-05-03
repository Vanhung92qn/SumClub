/**
 * Created by Nofear on 2/27/2019.
 */

(function () {
    var LoginOTPCommand;

    LoginOTPCommand = (function () {
        function LoginOTPCommand() {
        }

        LoginOTPCommand.prototype.execute = function (controller) {
            var url = 'api/Account/Login';

            //login thuong
            if (cc.LoginController.getInstance().getLoginType() === cc.LoginType.Type1) {
                var params = {
                    LoginType: cc.LoginController.getInstance().getLoginType(),
                    UserName: cc.LoginController.getInstance().getUsername(),
                    Password: cc.LoginController.getInstance().getPassword(),
                    DeviceId: cc.ServerConnector.getInstance().getDeviceId(),
                    DeviceType: cc.Config.getInstance().getDeviceType(),
                    Otp: controller.otp
                };
            } else {
                params = {
                    LoginType: cc.LoginController.getInstance().getLoginType(),
                    //FBUserId: cc.FacebookController.getInstance().getFBUserId(),
                    AccessToken: cc.FacebookController.getInstance().getFBAccessToken(),
                    DeviceId: cc.ServerConnector.getInstance().getDeviceId(),
                    DeviceType: cc.Config.getInstance().getDeviceType(),
                    Otp: controller.otp
                };
            }

            if (controller.captcha !== undefined) {
                params.Captcha = controller.captcha;
            }

            params = JSON.stringify(params);

            return cc.ServerConnector.getInstance().sendRequestPOST(cc.SubdomainName.PORTAL, url, params, function (response) {
                var obj = JSON.parse(response);
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
                    return controller.onLoginOTPResponse(obj);
                } else {
                    return controller.onLoginOTPResponseError(obj);
                    //cc.PopupController.getInstanLoginOTPCommandce().show(obj.Message, cc.PopupStyle.NOTHING);
                }
            });
        };

        return LoginOTPCommand;

    })();

    cc.LoginOTPCommand = LoginOTPCommand;

}).call(this);
