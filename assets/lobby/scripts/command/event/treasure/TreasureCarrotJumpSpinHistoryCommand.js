
/**
 * Created by Nofear on 2/27/2019.
 */

(function () {
    var TreasureCarrotJumpSpinHistoryCommand;

    TreasureCarrotJumpSpinHistoryCommand = (function () {
        function TreasureCarrotJumpSpinHistoryCommand() {
        }

        TreasureCarrotJumpSpinHistoryCommand.prototype.execute = function (controller) {
            var url = 'api//Treasure/CarrotJumpSpinHistory';

            return cc.ServerConnector.getInstance().sendRequest(cc.SubdomainName.TREASURE, url, function (response) {
                var obj = JSON.parse(response);
                controller.onTreasureCarrotJumpSpinHistoryResponse(obj);
            });
        };

        return TreasureCarrotJumpSpinHistoryCommand;

    })();

    cc.TreasureCarrotJumpSpinHistoryCommand = TreasureCarrotJumpSpinHistoryCommand;

}).call(this);
