/**
 * Created by Nofear on 2/27/2019.
 */

(function () {
    var GetGaiNhayJackpotCommand;

    GetGaiNhayJackpotCommand = (function () {
        function GetGaiNhayJackpotCommand() {
        }

        GetGaiNhayJackpotCommand.prototype.execute = function (controller) {
            var url = 'api/GirlJump/GetBigWinner?top=50&type=' + cc.BigWinnerType.JACKPOT;

            return cc.ServerConnector.getInstance().sendRequest(cc.SubdomainName.GAINHAY, url, function (response) {
                var obj = JSON.parse(response);
                return controller.onGetJackpotResponse(obj);
            });
        };

        return GetGaiNhayJackpotCommand;

    })();

    cc.GetGaiNhayJackpotCommand = GetGaiNhayJackpotCommand;

}).call(this);
