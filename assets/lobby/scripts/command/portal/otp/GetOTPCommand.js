/**
 * Created by Nofear on 2/27/2019.
 */

var netConfig = require('NetConfig');

(function () {
    var GetOTPCommand;

    GetOTPCommand = (function () {
        function GetOTPCommand() {
        }

        GetOTPCommand.prototype.execute = function (controller, phoneNumber, type) {
            var url = 'api/Otp/GetOTP';

            //#KingViet
            if (cc.Config.getInstance().getDomainVK().includes(netConfig.HOST)) {
                var params =  JSON.stringify({
                    UserNameSafeNo: phoneNumber,
                    Type: cc.OTPType.TELE_SAFE
                });
            } else {
                // console.log('GetOTP: ' + phoneNumber);
                if (phoneNumber) {
                    var phone = phoneNumber;
                } else {
                    phone = '';
                }

                if (type) {
                    var otpType = type;
                } else {
                    otpType = cc.OTPType.TELE_GRAM;
                }

                var params =  JSON.stringify({
                    PhoneNumber: phone,
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
                    return controller.onGetOTPResponse(obj);
                } else {
                    return controller.onGetOTPResponseError(obj);
                }
            });
        };

        return GetOTPCommand;

    })();

    cc.GetOTPCommand = GetOTPCommand;

}).call(this);
