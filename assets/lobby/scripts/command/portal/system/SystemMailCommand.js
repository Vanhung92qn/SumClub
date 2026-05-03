/**
 * Created by Nofear on 2/27/2019.
 */

(function () {
    var SystemMailCommand;

    SystemMailCommand = (function () {
        function SystemMailCommand() {
        }

        SystemMailCommand.prototype.execute = function (controller) {
            var url = 'api/System/GetSystemMail';
            var params = JSON.stringify({

            });

            return cc.ServerConnector.getInstance().sendRequestPOST(cc.SubdomainName.PORTAL, url, params, function (response) {
                var obj = JSON.parse(response);
                if (obj.ResponseCode === 1) {
                    /*
                    {
                        "ResponseCode": 1,
                        "List": [
                            {
                                "ID": 1,
                                "Title": "Test",
                                "Content": "Test",
                                "CreatedTime": null
                            }
                        ],
                        "TotalRecord": 0
                    }
                    * */
                    return controller.onSystemMailResponse(obj);
                } else {
                    return controller.onSystemMailResponseError(obj);
                    //cc.PopupController.getInstance().show(obj.Message, cc.PopupStyle.NOTHING);
                }
            });
        };

        return SystemMailCommand;

    })();

    cc.SystemMailCommand = SystemMailCommand;

}).call(this);
