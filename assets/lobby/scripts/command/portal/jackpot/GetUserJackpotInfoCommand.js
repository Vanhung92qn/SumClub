/**
 * Created by Nofear on 2/27/2019.
 */

(function () {
    var GetUserJackpotInfoCommand;

    GetUserJackpotInfoCommand = (function () {
        function GetUserJackpotInfoCommand() {
        }

        GetUserJackpotInfoCommand.prototype.execute = function (controller, roomId) {
            var url = 'api/Jackpot/GetUserJackpotInfo?roomId=' + roomId; //-1 tat ca cac game

            return cc.ServerConnector.getInstance().sendRequest(cc.SubdomainName.PORTAL, url, function (response) {
                var obj = JSON.parse(response);
                if (obj.ResponseCode === 1) {
                    /*
                    {
                        "ResponseCode": 1,
                        "list": [
                            {
                                "Username": "devtest1",
                                "PrizeValue": 104093900,
                                "CreatedTime": "2018-07-03T15:44:15.28",
                                "GameID": 7,
                                "GameName": "StarKingdom"
                            },
                        ]
                    }
                    * */
                    return controller.onGetUserJackpotInfoResponse(obj);
                } else {
                   cc.PopupController.getInstance().showMessageError(obj.Message, obj.ResponseCode);
                }
            });
        };

        return GetUserJackpotInfoCommand;

    })();

    cc.GetUserJackpotInfoCommand = GetUserJackpotInfoCommand;

}).call(this);
