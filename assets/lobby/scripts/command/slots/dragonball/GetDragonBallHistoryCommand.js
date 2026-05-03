/**
 * Created by Nofear on 2/27/2019.
 */

(function () {
    var GetDragonBallHistoryCommand;

    GetDragonBallHistoryCommand = (function () {
        function GetDragonBallHistoryCommand() {
        }

        GetDragonBallHistoryCommand.prototype.execute = function (controller) {
            var url = 'api/Game/GetHistory?top=50';

            return cc.ServerConnector.getInstance().sendRequest(cc.SubdomainName.DRAGON_BALL, url, function (response) {
                var obj = JSON.parse(response);
                return controller.onGetSlotsHistoryResponse(obj);
            });
        };

        return GetDragonBallHistoryCommand;

    })();

    cc.GetDragonBallHistoryCommand = GetDragonBallHistoryCommand;

}).call(this);
