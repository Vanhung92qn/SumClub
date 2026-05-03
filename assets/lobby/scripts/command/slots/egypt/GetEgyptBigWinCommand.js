/**
 * Created by Nofear on 2/27/2019.
 */

(function () {
    var GetEgyptBigWinCommand;

    GetEgyptBigWinCommand = (function () {
        function GetEgyptBigWinCommand() {
        }

        GetEgyptBigWinCommand.prototype.execute = function (controller) {
            var url = 'api/egypt/GetBigWinner?top=50&type=' + cc.BigWinnerType.BIG_WIN;

            return cc.ServerConnector.getInstance().sendRequest(cc.SubdomainName.EGYPT, url, function (response) {
                var obj = JSON.parse(response);
                return controller.onGetBigWinResponse(obj);
            });
        };

        return GetEgyptBigWinCommand;

    })();

    cc.GetEgyptBigWinCommand = GetEgyptBigWinCommand;

}).call(this);
