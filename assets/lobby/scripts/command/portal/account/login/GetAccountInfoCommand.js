/**
 * Created by Nofear on 2/27/2019.
 */

(function () {
    var GetAccountInfoCommand;

    GetAccountInfoCommand = (function () {
        function GetAccountInfoCommand() {
        }

        GetAccountInfoCommand.prototype.execute = function (controller) {
            var url = 'api/Account/GetAccountInfo';

            return cc.ServerConnector.getInstance().sendRequest(cc.SubdomainName.PORTAL, url, function (response) {
                var obj = JSON.parse(response);
                cc.PopupController.getInstance().hideBusy();
                if (obj.ResponseCode === 1) {
                    /*
                    {				
                        "ResponseCode": 1,
                        "AccountInfo": {
                            "AccountID": 15364516,
                            "AccountName": "Player_15364516",
                            "AvatarID": 10,
                            "Balance": 10004704895,
                            "Status": "",
                            "Gender": -1,
                            "BirthDay": "0001-01-01T00:00:00",
                            "PhoneNumber": "843938383838",
                            "PendingMessage": 0,
                            "PendingGiftcode": 0,
                            "TotalWin": 0,
                            "TotalLose": 0,
                            "TotalDraw": 0,
                            "IsUpdateAccountName": false
                        }
                    }
                    * */
                    return controller.onGetAccountInfoResponse(obj);
                } else {
                    //cc.PopupController.getInstance().show(obj.Message, cc.PopupStyle.NOTHING);
                }
            });
        };

        return GetAccountInfoCommand;

    })();

    cc.GetAccountInfoCommand = GetAccountInfoCommand;

}).call(this);
