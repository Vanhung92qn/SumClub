
/**
 * Created by Nofear on 2/27/2019.
 */

(function () {
    var TreasureCarrotFightSpinHistoryCommand;

    TreasureCarrotFightSpinHistoryCommand = (function () {
        function TreasureCarrotFightSpinHistoryCommand() {
        }

        TreasureCarrotFightSpinHistoryCommand.prototype.execute = function (controller) {
            var url = 'api/Treasure/CarrotFightSpinHistory';

            return cc.ServerConnector.getInstance().sendRequest(cc.SubdomainName.TREASURE, url, function (response) {
                var obj = JSON.parse(response);
                controller.onTreasureCarrotFightSpinHistoryResponse(obj);
            });
        };

        return TreasureCarrotFightSpinHistoryCommand;

    })();

    cc.TreasureCarrotFightSpinHistoryCommand = TreasureCarrotFightSpinHistoryCommand;

}).call(this);
