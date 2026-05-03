/**
 * Created by Nofear on 2/27/2019.
 */

(function () {
    var GetEgyptJackpotCommand;

    GetEgyptJackpotCommand = (function () {
        function GetEgyptJackpotCommand() {
        }

        GetEgyptJackpotCommand.prototype.execute = function (controller) {
            var url = 'api/egypt/GetBigWinner?top=50&type=' + cc.BigWinnerType.JACKPOT;

            return cc.ServerConnector.getInstance().sendRequest(cc.SubdomainName.EGYPT, url, function (response) {
                var obj = JSON.parse(response);
                return controller.onGetJackpotResponse(obj);
            });
        };

        return GetEgyptJackpotCommand;

    })();

    cc.GetEgyptJackpotCommand = GetEgyptJackpotCommand;

}).call(this);
