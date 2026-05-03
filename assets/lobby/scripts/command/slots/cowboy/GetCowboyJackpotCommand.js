/**
 * Created by Nofear on 2/27/2019.
 */

(function () {
    var GetCowboyJackpotCommand;

    GetCowboyJackpotCommand = (function () {
        function GetCowboyJackpotCommand() {
        }

        GetCowboyJackpotCommand.prototype.execute = function (controller) {
            var url = 'api/Cowboys/GetBigWinner?top=50&type=' + cc.BigWinnerType.JACKPOT;

            return cc.ServerConnector.getInstance().sendRequest(cc.SubdomainName.COWBOY, url, function (response) {
                var obj = JSON.parse(response);
                return controller.onGetJackpotResponse(obj);
            });
        };

        return GetCowboyJackpotCommand;

    })();

    cc.GetCowboyJackpotCommand = GetCowboyJackpotCommand;

}).call(this);
