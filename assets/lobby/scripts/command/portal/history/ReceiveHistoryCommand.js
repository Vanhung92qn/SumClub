/**
 * Created by Nofear on 3/20/2019.
 */

(function () {
    var ReceiveHistoryCommand;

    ReceiveHistoryCommand = (function () {
        function ReceiveHistoryCommand() {
        }

        ReceiveHistoryCommand.prototype.execute = function (controller) {
            var url = 'api/UserTranfer/GetHistory?type=2'; //1=chuyeen,2=nhan  //38

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
                    return controller.onReceiveHistoryResponse(obj);
                } else {
                    cc.PopupController.getInstance().showMessageError(obj.Message, obj.ResponseCode);
                }
            });
        };

        return ReceiveHistoryCommand;

    })();

    cc.ReceiveHistoryCommand = ReceiveHistoryCommand;

}).call(this);
