/**
 * Created by Nofear on 2/27/2019.
 */

(function () {
    var DepositCommand;

    DepositCommand = (function () {
        function DepositCommand() {
        }

        DepositCommand.prototype.execute = function (controller) {
            var url = 'api/Account/AddToSafe';
            var params = JSON.stringify({
                Amount: controller.amount
            });

            return cc.ServerConnector.getInstance().sendRequestPOST(cc.SubdomainName.PORTAL, url, params, function (response) {
                var obj = JSON.parse(response);
                if (obj.ResponseCode === 1) {
                    /*
                    {
                        "ResponseCode": 1,
                        "AccountSafeInfo": {

                            "SafeBalance": 1000010000,
                            "Balance": 10004692095
                        }
                    }
                    * */
                    return controller.onDepositResponse(obj);
                } else {
                    cc.PopupController.getInstance().showMessageError(obj.Message, obj.ResponseCode);
                }
            });
        };

        return DepositCommand;

    })();

    cc.DepositCommand = DepositCommand;

}).call(this);
