/**
 * Created by Nofear on 2/27/2019.
 */

var netConfig = require('NetConfig');

(function () {
    var ForgotPasswordCommand;

    ForgotPasswordCommand = (function () {
        function ForgotPasswordCommand() {
        }

        ForgotPasswordCommand.prototype.execute = function (controller) {
            var url = 'api/Account/ForgotPassword';

            //#KingViet
            if (cc.Config.getInstance().getDomainVK().includes(netConfig.HOST)) {
                var params = JSON.stringify({
                    UserName: controller.username,
                    UserNameSafeNo: controller.phoneNumber,
                    Otp: controller.otp,
                    Password: controller.password,
                    PrivateKey: cc.ServerConnector.getInstance().getCaptchaPrivateKey(),
                    Captcha: controller.captcha,
                });
            } else {
                params = JSON.stringify({
                    UserName: controller.username,
                    PhoneNumber: controller.phoneNumber,
                    Otp: controller.otp,
                    Password: controller.password,
                    PrivateKey: cc.ServerConnector.getInstance().getCaptchaPrivateKey(),
                    Captcha: controller.captcha,
                });
            }

            return cc.ServerConnector.getInstance().sendRequestPOST(cc.SubdomainName.PORTAL, url, params, function (response) {
                var obj = JSON.parse(response);
                if (obj.ResponseCode === 1) {
                    /*
                    {
                        ResponseCode: 1,
                        Message: "Cập nhật thành công!"
                    }
                    * */
                    return controller.onForgotPasswordResponse(obj);
                } else {
                    return controller.onForgotPasswordResponseError(obj);
                    //cc.PopupController.getInstance().show(obj.Message, cc.PopupStyle.NOTHING);
                }
            });
        };

        return ForgotPasswordCommand;

    })();

    cc.ForgotPasswordCommand = ForgotPasswordCommand;

}).call(this);
