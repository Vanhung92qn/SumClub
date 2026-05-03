
/**
 * Created by Nofear on 2/27/2019.
 */

//
(function () {
    var TreasureGetCarrotNameKnownCommand;

    TreasureGetCarrotNameKnownCommand = (function () {
        function TreasureGetCarrotNameKnownCommand() {
        }

        TreasureGetCarrotNameKnownCommand.prototype.execute = function (controller) {
            var url = 'api/Treasure/GetCarrotNameKnown';

            return cc.ServerConnector.getInstance().sendRequest(cc.SubdomainName.TREASURE, url, function (response) {
                var obj = JSON.parse(response);
                controller.onTreasureGetCarrotNameKnownResponse(obj);
            });
        };

        return TreasureGetCarrotNameKnownCommand;

    })();

    cc.TreasureGetCarrotNameKnownCommand = TreasureGetCarrotNameKnownCommand;

}).call(this);
