/**
 * Created by Nofear on 2/27/2019.
 */

(function () {
    var GameHistoryCommand;

    GameHistoryCommand = (function () {
        function GameHistoryCommand() {
        }

        GameHistoryCommand.prototype.execute = function (controller) {
            var url = 'api/History/GetGameHistory'; //12
            var params = JSON.stringify({
                GameType: parseInt(cc.GameType.ALL), //-1 lấy tất cả
                DateTransaction: controller.lbDateSelected.string,
                CurrentPage: 1,
                RecordPerpage: 200
            });

            return cc.ServerConnector.getInstance().sendRequestPOST(cc.SubdomainName.PORTAL, url, params, function (response) {
                var obj = JSON.parse(response);
                console.log(response)
                if (obj.ResponseCode === 1) {
                    /*
                    {
                        "ResponseCode": 1,
                        "list": [
                            {
                                "Balance": 6405147732,
                                "BetValue": 2000,
                                "PrizeValue": 1500,
                                "RefundValue": 0,
                                "GameType": 2,
                                "Description": "Payline",
                                "PlayTime": "2018-06-19T14:31:22.76"
                            },
                            {
                                "Balance": 6405148232,
                                "BetValue": 2000,
                                "PrizeValue": 0,
                                "RefundValue": 0,
                                "GameType": 2,
                                "Description": "",
                                "PlayTime": "2018-06-19T14:31:17.397"
                            }
                        ],
                        "totalPage": 2
                    }
                    * */
                    return controller.onGameHistoryResponse(obj);
                } else {
                    cc.PopupController.getInstance().showMessageError(obj.Message, obj.ResponseCode);
                }
            });
        };

        return GameHistoryCommand;

    })();

    cc.GameHistoryCommand = GameHistoryCommand;

}).call(this);
