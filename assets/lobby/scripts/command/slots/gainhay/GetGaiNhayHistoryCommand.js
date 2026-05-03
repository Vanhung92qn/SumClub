/**
 * Created by Nofear on 2/27/2019.
 */

(function () {
    var GetGaiNhayHistoryCommand;

    GetGaiNhayHistoryCommand = (function () {
        function GetGaiNhayHistoryCommand() {
        }

        GetGaiNhayHistoryCommand.prototype.execute = function (controller) {
            var url = 'api/GirlJump/GetHistory?top=50';
            var params = JSON.stringify({
                top: 50,
            });

            return cc.ServerConnector.getInstance().sendRequest(cc.SubdomainName.GAINHAY, url, function (response) {
                var obj = JSON.parse(response);
                return controller.onGetSlotsHistoryResponse(obj);
            });
        };

        return GetGaiNhayHistoryCommand;

    })();

    cc.GetGaiNhayHistoryCommand = GetGaiNhayHistoryCommand;

}).call(this);
