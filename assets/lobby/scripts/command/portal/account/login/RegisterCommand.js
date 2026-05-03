/**
 * Created by Nofear on 2/27/2019.
 */

(function () {
    var RegisterCommand;

    RegisterCommand = (function () {
        function RegisterCommand() {
        }

        RegisterCommand.prototype.execute = function (controller) {
            var url = 'api/Account/CreateAccount';


            if (!cc.sys.isNative) {
                var referUrl = cc.Tool.getInstance().getHref();

                var params = JSON.stringify({
                    LoginType: cc.LoginType.Type1,
                    UserName: controller.username,
                    Password: controller.password,
                    DeviceId: cc.ServerConnector.getInstance().getDeviceId(),
                    PrivateKey: cc.ServerConnector.getInstance().getCaptchaPrivateKey(),
                    Captcha: controller.captcha,
                    DeviceType: cc.Config.getInstance().getDeviceType(),
                    IsLanding: controller.IsLanding,
                    ReferUrl: referUrl
                });
            } else {
                params = JSON.stringify({
                    LoginType: cc.LoginType.Type1,
                    UserName: controller.username,
                    Password: controller.password,
                    DeviceId: cc.ServerConnector.getInstance().getDeviceId(),
                    PrivateKey: cc.ServerConnector.getInstance().getCaptchaPrivateKey(),
                    Captcha: controller.captcha,
                    DeviceType: cc.Config.getInstance().getDeviceType(),
                });
            }

            return cc.ServerConnector.getInstance().sendRequestPOST(cc.SubdomainName.PORTAL, url, params, function (response) {
                var obj = JSON.parse(response);
                if (obj.ResponseCode === 1) {
                    /*
                    {
                        "ResponseCode": 1,
                        "AccountInfo": {
                            "AccountID": 15364647,
                            "AccountName": "93939abceete",
                            "AvatarID": 2,
                            "Balance": 0,
                            "Status": "",
                            "Gender": -1,
                            "BirthDay": "0001-01-01T00:00:00",
                            "PhoneNumber": "0",
                            "PendingMessage": 0,
                            "PendingGiftcode": 0,
                            "TotalWin": 0,
                            "TotalLose": 0,
                            "TotalDraw": 0,
                            "IsUpdateAccountName": false
                        }
                    }
                    * */
                    return controller.onRegisterResponse(obj);
                } else {
                    cc.PopupController.getInstance().showMessageError(obj.Message, obj.ResponseCode);
                }
            });
        };

        return RegisterCommand;

    })();

    cc.RegisterCommand = RegisterCommand;

}).call(this);
