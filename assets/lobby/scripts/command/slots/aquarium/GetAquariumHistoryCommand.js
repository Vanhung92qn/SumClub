/**
 * Created by Nofear on 2/27/2019.
 */

(function () {
    var GetAquariumHistoryCommand;

    GetAquariumHistoryCommand = (function () {
        function GetAquariumHistoryCommand() {
        }

        GetAquariumHistoryCommand.prototype.execute = function (controller) {
            var url = 'api/Game/GetHistory?top=50';

            return cc.ServerConnector.getInstance().sendRequest(cc.SubdomainName.AQUARIUM, url, function (response) {
                var obj = JSON.parse(response);
                return controller.onGetSlotsHistoryResponse(obj);
            });
        };

        return GetAquariumHistoryCommand;

    })();

    cc.GetAquariumHistoryCommand = GetAquariumHistoryCommand;

}).call(this);
