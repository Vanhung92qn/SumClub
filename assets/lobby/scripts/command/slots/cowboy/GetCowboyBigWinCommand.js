/**
 * Created by Nofear on 2/27/2019.
 */

(function () {
    var GetCowboyBigWinCommand;

    GetCowboyBigWinCommand = (function () {
        function GetCowboyBigWinCommand() {
        }

        GetCowboyBigWinCommand.prototype.execute = function (controller) {
            var url = 'api/Cowboys/GetBigWinner?top=50&type=' + cc.BigWinnerType.BIG_WIN;

            return cc.ServerConnector.getInstance().sendRequest(cc.SubdomainName.COWBOY, url, function (response) {
                var obj = JSON.parse(response);
                return controller.onGetBigWinResponse(obj);
            });
        };

        return GetCowboyBigWinCommand;

    })();

    cc.GetCowboyBigWinCommand = GetCowboyBigWinCommand;

}).call(this);
