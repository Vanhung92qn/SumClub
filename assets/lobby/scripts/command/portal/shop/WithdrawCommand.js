/**
 * Created by Nofear on 2/27/2019.
 */

(function () {
    var WithdrawCommand;

    WithdrawCommand = (function () {
        function WithdrawCommand() {
        }

        WithdrawCommand.prototype.execute = function (controller) {
            var url = 'api/Account/WithDrawFromSafe';
            var params = JSON.stringify({
                Amount: controller.amount,
                OTP: controller.otp
            });

            return cc.ServerConnector.getInstance().sendRequestPOST(cc.SubdomainName.PORTAL, url, params, function (response) {
                var obj = JSON.parse(response);
                if (obj.ResponseCode === 1) {
                    /*
                    {
                        "ResponseCode": -4,		
                        "AccountSafeInfo": {
                            "responseStatus": -4,
                            "SafeBalance": 0,
                            "Balance": 0
                        }
                    }
                    * */
                    return controller.onWithdrawResponse(obj);
                } else {
                        cc.PopupController.getInstance().showMessageError(obj.Message, obj.ResponseCode);
                }
            });
        };

        return WithdrawCommand;

    })();

    cc.WithdrawCommand = WithdrawCommand;

}).call(this);
