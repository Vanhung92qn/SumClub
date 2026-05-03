/**
 * Created by Nofear on 2/27/2019.
 */

(function () {
    var GetGaiNhayBigWinCommand;

    GetGaiNhayBigWinCommand = (function () {
        function GetGaiNhayBigWinCommand() {
        }

        GetGaiNhayBigWinCommand.prototype.execute = function (controller) {
            var url = 'api/GirlJump/GetBigWinner?top=50&type=' + cc.BigWinnerType.BIG_WIN;

            return cc.ServerConnector.getInstance().sendRequest(cc.SubdomainName.GAINHAY, url, function (response) {
                var obj = JSON.parse(response);
                return controller.onGetBigWinResponse(obj);
            });
        };

        return GetGaiNhayBigWinCommand;

    })();

    cc.GetGaiNhayBigWinCommand = GetGaiNhayBigWinCommand;

}).call(this);
