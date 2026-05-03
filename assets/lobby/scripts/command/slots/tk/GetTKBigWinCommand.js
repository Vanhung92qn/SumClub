/**
 * Created by Nofear on 2/27/2019.
 */

(function () {
    var GetTKBigWinCommand;

    GetTKBigWinCommand = (function () {
        function GetTKBigWinCommand() {
        }

        GetTKBigWinCommand.prototype.execute = function (controller) {
            var url = 'api/tayduky/GetBigWinner?top=50&type=' + cc.BigWinnerType.BIG_WIN;

            return cc.ServerConnector.getInstance().sendRequest(cc.SubdomainName.THREE_KINGDOM, url, function (response) {
                var obj = JSON.parse(response);
                return controller.onGetBigWinResponse(obj);
            });
        };

        return GetTKBigWinCommand;

    })();

    cc.GetTKBigWinCommand = GetTKBigWinCommand;

}).call(this);
