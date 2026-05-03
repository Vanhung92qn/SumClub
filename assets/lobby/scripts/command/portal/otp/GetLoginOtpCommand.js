/**
 * Created by Nofear on 2/27/2019.
 */

(function () {
    var GetLoginOTPCommand;

    GetLoginOTPCommand = (function () {
        function GetLoginOTPCommand() {
        }

        GetLoginOTPCommand.prototype.execute = function (controller, otpType) {
            var url = 'api/Otp/GetLoginOtp';

            if (cc.LoginController.getInstance().getLoginType() === cc.LoginType.Type1) {
                var params = JSON.stringify({
                    LoginType: cc.LoginType.Type1,
                    UserName: cc.LoginController.getInstance().getUsername(),
                    Password: cc.LoginController.getInstance().getPassword(),
                    DeviceId: cc.ServerConnector.getInstance().getDeviceId(),
                    DeviceType: cc.Config.getInstance().getDeviceType(),
                    Type: otpType
                });
            } else {
                params = JSON.stringify({
                    LoginType: cc.LoginType.Type2,
                    AccessToken: cc.FacebookController.getInstance().getFBAccessToken(),
                    DeviceId: cc.ServerConnector.getInstance().getDeviceId(),
                    DeviceType: cc.Config.getInstance().getDeviceType(),
                    Type: otpType
                });
            }

            return cc.ServerConnector.getInstance().sendRequestPOST(cc.SubdomainName.PORTAL, url, params, function (response) {
                var obj = JSON.parse(response);
                if (obj.ResponseCode === 1) {
                    /*
                    {
                        "ResponseCode": 1,
                        "OTP": "zrPhFlke"
                    }
                    * */
                    return controller.onGetLoginOTPResponse(obj);
                } else {
                    return controller.onGetLoginOTPResponseError(obj);
                    //cc.PopupController.getInstance().show(obj.Message, cc.PopupStyle.NOTHING);
                }
            });
        };

        return GetLoginOTPCommand;

    })();

    cc.GetLoginOTPCommand = GetLoginOTPCommand;

}).call(this);
