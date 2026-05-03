/**
 * Created by Nofear on 2/27/2019.
 */

(function () {
    var GetAquariumJackpotCommand;

    GetAquariumJackpotCommand = (function () {
        function GetAquariumJackpotCommand() {
        }

        GetAquariumJackpotCommand.prototype.execute = function (controller) {
            var url = 'api/Game/GetBigWinner?top=50&type=' + cc.BigWinnerType.JACKPOT;

            return cc.ServerConnector.getInstance().sendRequest(cc.SubdomainName.AQUARIUM, url, function (response) {
                var obj = JSON.parse(response);
                return controller.onGetJackpotResponse(obj);
            });
        };

        return GetAquariumJackpotCommand;

    })();

    cc.GetAquariumJackpotCommand = GetAquariumJackpotCommand;

}).call(this);
