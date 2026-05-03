/**
 * Created by Nofear on 2/27/2019.
 */

(function () {
    var ChangePasswordCommand;

    ChangePasswordCommand = (function () {
        function ChangePasswordCommand() {
        }

        ChangePasswordCommand.prototype.execute = function (controller) {
            var url = 'api/Account/ChangePassword';
            var params = JSON.stringify({
                OldPass: controller.oldPass,
                NewPass: controller.newPass,
                PrivateKey: cc.ServerConnector.getInstance().getCaptchaPrivateKey(),
                Captcha: controller.captcha,
                Otp: controller.otp
            });

            return cc.ServerConnector.getInstance().sendRequestPOST(cc.SubdomainName.PORTAL, url, params, function (response) {
                var obj = JSON.parse(response);
                if (obj.ResponseCode === 1) {
                    /*
                    {
                        "ResponseCode": 1,
                        "Message": "Cập nhật thành công!"
                    }
                    * */
                    return controller.onChangePasswordResponse(obj);
                } else {
                    return controller.onChangePasswordResponseError(obj);
                }
            });
        };

        return ChangePasswordCommand;

    })();

    cc.ChangePasswordCommand = ChangePasswordCommand;

}).call(this);
