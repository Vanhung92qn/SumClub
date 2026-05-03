/**
 * Created by Nofear on 2/27/2019.
 */

(function () {
    var GetThuongHaiHistoryCommand;

    GetThuongHaiHistoryCommand = (function () {
        function GetThuongHaiHistoryCommand() {
        }

        GetThuongHaiHistoryCommand.prototype.execute = function (controller) {
            var url = 'api/DemThuongHai/GetHistory?top=50';

            return cc.ServerConnector.getInstance().sendRequest(cc.SubdomainName.THUONGHAI, url, function (response) {
                var obj = JSON.parse(response);
                return controller.onGetSlotsHistoryResponse(obj);
            });
        };

        return GetThuongHaiHistoryCommand;

    })();

    cc.GetThuongHaiHistoryCommand = GetThuongHaiHistoryCommand;

}).call(this);
