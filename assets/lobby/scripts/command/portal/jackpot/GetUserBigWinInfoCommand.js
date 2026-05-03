/**
 * Created by Nofear on 2/27/2019.
 */

(function () {
    var GetUserBigWinInfoCommand;

    GetUserBigWinInfoCommand = (function () {
        function GetUserBigWinInfoCommand() {
        }

        GetUserBigWinInfoCommand.prototype.execute = function (controller) {
            var url = 'api/rankracing/GetGameTopBalance';

            return cc.ServerConnector.getInstance().sendRequest(cc.SubdomainName.PORTAL, url, function (response) {
                var obj = JSON.parse(response);
                return controller.onGetUserBigWinInfoResponse(obj);
            });
        };

        return GetUserBigWinInfoCommand;

    })();

    cc.GetUserBigWinInfoCommand = GetUserBigWinInfoCommand;

}).call(this);
