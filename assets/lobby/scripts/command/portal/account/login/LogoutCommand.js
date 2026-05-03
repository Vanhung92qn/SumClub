/**
 * Created by Nofear on 2/27/2019.
 */

(function () {
    var LogoutCommand;

    LogoutCommand = (function () {
        function LogoutCommand() {
        }

        LogoutCommand.prototype.execute = function (controller) {
            var url = 'api/Account/Logout';
            var params = JSON.stringify({
            });

            return cc.ServerConnector.getInstance().sendRequestPOST(cc.SubdomainName.PORTAL, url, params, function (response) {
                var obj = JSON.parse(response);
                if (obj.ResponseCode === 1) {
                    /*
                    {
                        "ResponseCode": 1
                    }
                    * */
                    return controller.onLogoutResponse(obj);
                } else {
                    cc.PopupController.getInstance().showMessageError(obj.Message, obj.ResponseCode);
                }
            });
        };

        return LogoutCommand;

    })();

    cc.LogoutCommand = LogoutCommand;

}).call(this);
