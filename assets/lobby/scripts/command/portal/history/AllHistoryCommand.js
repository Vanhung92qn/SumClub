/**
 * Created by Nofear on 3/20/2019.
 */

(function () {
    var AllHistoryCommand;

    AllHistoryCommand = (function () {
        function AllHistoryCommand() {
        }

        AllHistoryCommand.prototype.execute = function (controller) {
            var url = 'api/History/GetBalanceHistory'; //11
            var params = JSON.stringify({
                ExchangeType: -1, //-1 lấy tất cả
                DateTransaction: controller.lbDateSelected.string,
                CurrentPage: 1,
                RecordPerpage: 200
            });

            return cc.ServerConnector.getInstance().sendRequestPOST(cc.SubdomainName.PORTAL, url, params, function (response) {
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
                    return controller.onAllHistoryResponse(obj);
                } else {
                    cc.PopupController.getInstance().showMessageError(obj.Message, obj.ResponseCode);
                }
            });
        };

        return AllHistoryCommand;

    })();

    cc.AllHistoryCommand = AllHistoryCommand;

}).call(this);
