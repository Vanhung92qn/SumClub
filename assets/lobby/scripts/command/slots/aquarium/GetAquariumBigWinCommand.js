/**
 * Created by Nofear on 2/27/2019.
 */

(function () {
    var GetAquariumBigWinCommand;

    GetAquariumBigWinCommand = (function () {
        function GetAquariumBigWinCommand() {
        }

        GetAquariumBigWinCommand.prototype.execute = function (controller) {
            var url = 'api/Game/GetBigWinner?top=50&type=' + cc.BigWinnerType.BIG_WIN;

            return cc.ServerConnector.getInstance().sendRequest(cc.SubdomainName.AQUARIUM, url, function (response) {
                var obj = JSON.parse(response);
                return controller.onGetBigWinResponse(obj);
            });
        };

        return GetAquariumBigWinCommand;

    })();

    cc.GetAquariumBigWinCommand = GetAquariumBigWinCommand;

}).call(this);
