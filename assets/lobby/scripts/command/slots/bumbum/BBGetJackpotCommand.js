/**
 * Created by Nofear on 2/27/2019.
 */

(function () {
    var BBGetJackpotCommand;

    BBGetJackpotCommand = (function () {
        function BBGetJackpotCommand() {
        }

        BBGetJackpotCommand.prototype.execute = function (controller) {
            var url = 'api/Game/GetBigWinner?top=50&type=' + cc.BigWinnerType.JACKPOT;

            return cc.ServerConnector.getInstance().sendRequest(cc.SubdomainName.BUM_BUM, url, function (response) {
                var obj = JSON.parse(response);
                return controller.onGetJackpotResponse(obj);
            });
        };

        return BBGetJackpotCommand;

    })();

    cc.BBGetJackpotCommand = BBGetJackpotCommand;

}).call(this);
