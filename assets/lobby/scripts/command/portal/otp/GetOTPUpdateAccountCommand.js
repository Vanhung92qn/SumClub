var netConfig = require('NetConfig');

(function () {
    var GetOTPUpdateAccountCommand;

    GetOTPUpdateAccountCommand = (function () {
        function GetOTPUpdateAccountCommand() {
        }

        GetOTPUpdateAccountCommand.prototype.execute = function (controller, otpType) {
            var url = 'api/OTP/GetOTP';

          
            let params = JSON.stringify({
                PhoneNumber: '',
                Type: otpType
            });
           
            return cc.ServerConnector.getInstance().sendRequestPOST(cc.SubdomainName.PORTAL, url, params, function (response) {
                var obj = JSON.parse(response);
                console.log(obj);
                if (obj.ResponseCode === 1) {
                    /*
                    {
                        "ResponseCode": 1,
                        "OTP": "dKrDhEM5"
                    }
                    * */
                    return controller.onGetOTPUpdateAccountResponse(obj);
                } else {
                    cc.PopupController.getInstance().showMessageError(obj.Message, obj.ResponseCode);
                    return controller.onGetOTPUpdateAccountResponseError(obj);
                }
            });
        };

        return GetOTPUpdateAccountCommand;

    })();

    cc.GetOTPUpdateAccountCommand = GetOTPUpdateAccountCommand;

}).call(this);
