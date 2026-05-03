/**
 * Created by Nofear on 2/27/2019.
 */

(function () {
    var GetThuongHaiJackpotCommand;

    GetThuongHaiJackpotCommand = (function () {
        function GetThuongHaiJackpotCommand() {
        }

        GetThuongHaiJackpotCommand.prototype.execute = function (controller) {
            var url = 'api/DemThuongHai/GetBigWinner?top=50&type=' + cc.BigWinnerType.JACKPOT;

            return cc.ServerConnector.getInstance().sendRequest(cc.SubdomainName.THUONGHAI, url, function (response) {
                var obj = JSON.parse(response);
                return controller.onGetJackpotResponse(obj);
            });
        };

        return GetThuongHaiJackpotCommand;

    })();

    cc.GetThuongHaiJackpotCommand = GetThuongHaiJackpotCommand;

}).call(this);
