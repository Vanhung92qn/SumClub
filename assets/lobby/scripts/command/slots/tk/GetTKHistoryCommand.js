/**
 * Created by Nofear on 2/27/2019.
 */

(function () {
    var GetTKHistoryCommand;

    GetTKHistoryCommand = (function () {
        function GetTKHistoryCommand() {
        }

        GetTKHistoryCommand.prototype.execute = function (controller) {
            var url = 'api/tayduky/GetHistory?top=50';

            return cc.ServerConnector.getInstance().sendRequest(cc.SubdomainName.THREE_KINGDOM, url, function (response) {
                var obj = JSON.parse(response);
                return controller.onGetSlotsHistoryResponse(obj);
            });
        };

        return GetTKHistoryCommand;

    })();

    cc.GetTKHistoryCommand = GetTKHistoryCommand;

}).call(this);
