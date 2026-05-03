/**
 * Created by Nofear on 2/27/2019.
 */

var netConfig = require('NetConfig');

(function () {
    var GetOTPForgotPasswordCommand;

    GetOTPForgotPasswordCommand = (function () {
        function GetOTPForgotPasswordCommand() {
        }

        GetOTPForgotPasswordCommand.prototype.execute = function (controller, otpType) {
            var url = 'api/Otp/GetOTPForgotPassword';

            //#KingViet
            if (cc.Config.getInstance().getDomainVK().includes(netConfig.HOST)) {
                var params = JSON.stringify({
                    UserName: controller.username,
                    UserNameSafeNo: controller.phoneNumber,
                    Type: otpType
                });
            } else {
                params = JSON.stringify({
                    UserName: controller.username,
                    PhoneNumber: controller.phoneNumber,
                    Type: otpType
                });
            }



            return cc.ServerConnector.getInstance().sendRequestPOST(cc.SubdomainName.PORTAL, url, params, function (response) {
                var obj = JSON.parse(response);
                if (obj.ResponseCode === 1) {
                    /*
                    {
                        "ResponseCode": 1,
                        "OTP": "dKrDhEM5"
                    }
                    * */
                    return controller.onGetOTPForgotPasswordResponse(obj);
                } else {
                    cc.PopupController.getInstance().showMessageError(obj.Message, obj.ResponseCode);
                }
            });
        };

        return GetOTPForgotPasswordCommand;

    })();

    cc.GetOTPForgotPasswordCommand = GetOTPForgotPasswordCommand;

}).call(this);
