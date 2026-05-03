
/**
 * Created by Nofear on 2/27/2019.
 */

(function () {
    var TreasureCarrotUserGetTreasureCommand;

    TreasureCarrotUserGetTreasureCommand = (function () {
        function TreasureCarrotUserGetTreasureCommand() {
        }

        TreasureCarrotUserGetTreasureCommand.prototype.execute = function (controller) {
            var url = 'api/Treasure/CarrotUserGetTreasure';

            return cc.ServerConnector.getInstance().sendRequest(cc.SubdomainName.TREASURE, url, function (response) {
                var obj = JSON.parse(response);
                controller.onTreasureCarrotUserGetTreasureResponse(obj);
            });
        };

        return TreasureCarrotUserGetTreasureCommand;

    })();

    cc.TreasureCarrotUserGetTreasureCommand = TreasureCarrotUserGetTreasureCommand;

}).call(this);
