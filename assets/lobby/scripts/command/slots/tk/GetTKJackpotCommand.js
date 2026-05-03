/**
 * Created by Nofear on 2/27/2019.
 */

(function () {
    var GetTKJackpotCommand;

    GetTKJackpotCommand = (function () {
        function GetTKJackpotCommand() {
        }

        GetTKJackpotCommand.prototype.execute = function (controller) {
            var url = 'api/tayduky/GetBigWinner?top=50&type=' + cc.BigWinnerType.JACKPOT;

            return cc.ServerConnector.getInstance().sendRequest(cc.SubdomainName.THREE_KINGDOM, url, function (response) {
                var obj = JSON.parse(response);
                return controller.onGetJackpotResponse(obj);
            });
        };

        return GetTKJackpotCommand;

    })();

    cc.GetTKJackpotCommand = GetTKJackpotCommand;

}).call(this);
