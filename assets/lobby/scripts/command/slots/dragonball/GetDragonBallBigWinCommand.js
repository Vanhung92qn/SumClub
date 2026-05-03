/**
 * Created by Nofear on 2/27/2019.
 */

(function () {
    var GetDragonBallBigWinCommand;

    GetDragonBallBigWinCommand = (function () {
        function GetDragonBallBigWinCommand() {
        }

        GetDragonBallBigWinCommand.prototype.execute = function (controller) {
            var url = 'api/Game/GetBigWinner?top=50&type=' + cc.BigWinnerType.BIG_WIN;

            return cc.ServerConnector.getInstance().sendRequest(cc.SubdomainName.DRAGON_BALL, url, function (response) {
                var obj = JSON.parse(response);
                return controller.onGetBigWinResponse(obj);
            });
        };

        return GetDragonBallBigWinCommand;

    })();

    cc.GetDragonBallBigWinCommand = GetDragonBallBigWinCommand;

}).call(this);
