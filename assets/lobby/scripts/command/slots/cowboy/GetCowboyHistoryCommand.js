/**
 * Created by Nofear on 2/27/2019.
 */

(function () {
    var GetCowboyHistoryCommand;

    GetCowboyHistoryCommand = (function () {
        function GetCowboyHistoryCommand() {
        }

        GetCowboyHistoryCommand.prototype.execute = function (controller) {
            var url = 'api/Cowboys/GetHistory?top=50';

            return cc.ServerConnector.getInstance().sendRequest(cc.SubdomainName.COWBOY, url, function (response) {
                var obj = JSON.parse(response);
                return controller.onGetSlotsHistoryResponse(obj);
            });
        };

        return GetCowboyHistoryCommand;

    })();

    cc.GetCowboyHistoryCommand = GetCowboyHistoryCommand;

}).call(this);
