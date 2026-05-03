/**
 * Created by Nofear on 2/27/2019.
 */

(function () {
    var GetGameJackpotInfoCommand;

    GetGameJackpotInfoCommand = (function () {
        function GetGameJackpotInfoCommand() {
        }

        GetGameJackpotInfoCommand.prototype.execute = function (controller) {
            var url = 'api/Jackpot/GetGameJackpotInfo';

            return cc.ServerConnector.getInstance().sendRequest(cc.SubdomainName.PORTAL, url, function (response) {
                var obj = JSON.parse(response);
                return controller.onGetGameJackpotInfoResponse(obj);
            });
        };

        return GetGameJackpotInfoCommand;

    })();

    cc.GetGameJackpotInfoCommand = GetGameJackpotInfoCommand;

}).call(this);
