/**
 * Created by Nofear on 2/27/2019.
 */

(function () {
    var GetThuongHaiBigWinCommand;

    GetThuongHaiBigWinCommand = (function () {
        function GetThuongHaiBigWinCommand() {
        }

        GetThuongHaiBigWinCommand.prototype.execute = function (controller) {
            var url = 'api/DemThuongHai/GetBigWinner?top=50&type=' + cc.BigWinnerType.BIG_WIN;

            return cc.ServerConnector.getInstance().sendRequest(cc.SubdomainName.THUONGHAI, url, function (response) {
                var obj = JSON.parse(response);
                return controller.onGetBigWinResponse(obj);
            });
        };

        return GetThuongHaiBigWinCommand;

    })();

    cc.GetThuongHaiBigWinCommand = GetThuongHaiBigWinCommand;

}).call(this);
