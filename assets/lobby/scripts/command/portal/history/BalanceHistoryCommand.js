/**
 * Created by Nofear on 2/27/2019.
 */

(function () {
    var BalanceHistoryCommand;

    BalanceHistoryCommand = (function () {
        function BalanceHistoryCommand() {
        }

        BalanceHistoryCommand.prototype.execute = function (controller) {
            var url = 'api/History/GetBalanceHistory'; //11
            var params = JSON.stringify({
                ExchangeType: controller.exchangeType, //-1 lấy tất cả
                DateTransaction: controller.dateTransaction, //"2018-06-20"
                CurrentPage: controller.currentPage,
                RecordPerpage: controller.recordPerPage
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
                    return controller.onBalanceHistoryResponse(obj);
                } else {
                    cc.PopupController.getInstance().showMessageError(obj.Message, obj.ResponseCode);
                }
            });
        };

        return BalanceHistoryCommand;

    })();

    cc.BalanceHistoryCommand = BalanceHistoryCommand;

}).call(this);
