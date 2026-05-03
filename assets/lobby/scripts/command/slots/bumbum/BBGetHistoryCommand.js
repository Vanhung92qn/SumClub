/**
 * Created by Nofear on 2/27/2019.
 */

(function () {
    var BBGetHistoryCommand;

    BBGetHistoryCommand = (function () {
        function BBGetHistoryCommand() {
        }

        BBGetHistoryCommand.prototype.execute = function (controller) {
            var url = 'api/Game/GetHistory?top=50';

            return cc.ServerConnector.getInstance().sendRequest(cc.SubdomainName.BUM_BUM, url, function (response) {
                var obj = JSON.parse(response);
                return controller.onGetSlotsHistoryResponse(obj);
            });
        };

        return BBGetHistoryCommand;

    })();

    cc.BBGetHistoryCommand = BBGetHistoryCommand;

}).call(this);
