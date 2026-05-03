/**
 * Created by Nofear on 2/27/2019.
 */

(function () {
    var GetBalanceCommand;

    GetBalanceCommand = (function () {
        function GetBalanceCommand() {
        }

        GetBalanceCommand.prototype.execute = function (controller) {
            var url = 'api/Account/GetBalance';
            var params = JSON.stringify({

            });

            return cc.ServerConnector.getInstance().sendRequestPOST(cc.SubdomainName.PORTAL, url, params, function (response) {
                var obj = JSON.parse(response);
                if (obj.ResponseCode === 1) {
                    /*
                    {
                        "ResponseCode": 1,
                        "balance": 15866995071,
                        "safebalance": 25000
                    }
                    * */
                    return controller.onGetBalanceResponse(obj);
                } else {
                    //cc.PopupController.getInstance().show(obj.Message, cc.PopupStyle.NOTHING);
                }
            });
        };

        return GetBalanceCommand;

    })();

    cc.GetBalanceCommand = GetBalanceCommand;

}).call(this);
