/**
 * Created by Nofear on 2/27/2019.
 */

(function () {
    var BBGetBigWinCommand;

    BBGetBigWinCommand = (function () {
        function BBGetBigWinCommand() {
        }

        BBGetBigWinCommand.prototype.execute = function (controller) {
            var url = 'api/Game/GetBigWinner?top=50&type=' + cc.BigWinnerType.BIG_WIN;

            return cc.ServerConnector.getInstance().sendRequest(cc.SubdomainName.BUM_BUM, url, function (response) {
                var obj = JSON.parse(response);
                return controller.onGetBigWinResponse(obj);
            });
        };

        return BBGetBigWinCommand;

    })();

    cc.BBGetBigWinCommand = BBGetBigWinCommand;

}).call(this);
