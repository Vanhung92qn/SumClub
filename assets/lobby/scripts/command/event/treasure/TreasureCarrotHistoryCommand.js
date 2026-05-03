
/**
 * Created by Nofear on 2/27/2019.
 */

(function () {
    var TreasureCarrotHistoryCommand;

    TreasureCarrotHistoryCommand = (function () {
        function TreasureCarrotHistoryCommand() {
        }

        TreasureCarrotHistoryCommand.prototype.execute = function (controller) {
            var url = 'api/Treasure/CarrotHistory';

            return cc.ServerConnector.getInstance().sendRequest(cc.SubdomainName.TREASURE, url, function (response) {
                var obj = JSON.parse(response);
                controller.onTreasureCarrotHistoryResponse(obj);
            });
        };

        return TreasureCarrotHistoryCommand;

    })();

    cc.TreasureCarrotHistoryCommand = TreasureCarrotHistoryCommand;

}).call(this);
