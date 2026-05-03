/**
 * Created by Nofear on 3/20/2019.
 */

(function () {
    var RedeemHistoryCommand;

    RedeemHistoryCommand = (function () {
        function RedeemHistoryCommand() {
        }

        RedeemHistoryCommand.prototype.execute = function (controller) {
            var url = 'api/CardExchange/GetHistory'; //CardExchange/GetList

            return cc.ServerConnector.getInstance().sendRequest(cc.SubdomainName.PORTAL, url, function (response) {
                var obj = JSON.parse(response);
                if (obj.ResponseCode === 1) {
                    /*
                     {
                     "ResponseCode": 1,
                     "list": [
                     {
                     "PosBalance": 10004672095,
                     "Amount": 10000,
                     "Description": "Chuyển 10.000 Bit vào két sắt",
                     "ExchangeType": 1
                     }
                     ],
                     "totalPage": 2
                     }
                     * */
                    return controller.onRedeemHistoryResponse(obj);
                } else {
                    cc.PopupController.getInstance().showMessageError(obj.Message, obj.ResponseCode);
                }
            });
        };

        return RedeemHistoryCommand;

    })();

    cc.RedeemHistoryCommand = RedeemHistoryCommand;

}).call(this);
