/**
 * Created by Nofear on 2/27/2019.
 */

(function () {
    var GetDragonBallJackpotCommand;

    GetDragonBallJackpotCommand = (function () {
        function GetDragonBallJackpotCommand() {
        }

        GetDragonBallJackpotCommand.prototype.execute = function (controller) {
            var url = 'api/Game/GetBigWinner?top=50&type=' + cc.BigWinnerType.JACKPOT;

            return cc.ServerConnector.getInstance().sendRequest(cc.SubdomainName.DRAGON_BALL, url, function (response) {
                var obj = JSON.parse(response);
                return controller.onGetJackpotResponse(obj);
            });
        };

        return GetDragonBallJackpotCommand;

    })();

    cc.GetDragonBallJackpotCommand = GetDragonBallJackpotCommand;

}).call(this);
