/**
 * Created by Nofear on 2/27/2019.
 */

(function () {
    var GetEgyptHistoryCommand;

    GetEgyptHistoryCommand = (function () {
        function GetEgyptHistoryCommand() {
        }

        GetEgyptHistoryCommand.prototype.execute = function (controller) {
            var url = 'api/egypt/GetHistory?top=50';
            var params = JSON.stringify({
                top: 50,
            });

            return cc.ServerConnector.getInstance().sendRequest(cc.SubdomainName.EGYPT, url, function (response) {
                var obj = JSON.parse(response);
                return controller.onGetSlotsHistoryResponse(obj);
            });
        };

        return GetEgyptHistoryCommand;

    })();

    cc.GetEgyptHistoryCommand = GetEgyptHistoryCommand;

}).call(this);
