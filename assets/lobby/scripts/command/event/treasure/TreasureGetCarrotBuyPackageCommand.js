
/**
 * Created by Nofear on 2/27/2019.
 */

//
(function () {
    var TreasureGetCarrotBuyPackageCommand;

    TreasureGetCarrotBuyPackageCommand = (function () {
        function TreasureGetCarrotBuyPackageCommand() {
        }

        TreasureGetCarrotBuyPackageCommand.prototype.execute = function (controller) {
            var url = 'api/Treasure/GetCarrotBuyPackage';

            return cc.ServerConnector.getInstance().sendRequest(cc.SubdomainName.TREASURE, url, function (response) {
                var obj = JSON.parse(response);
                controller.onTreasureGetCarrotBuyPackageResponse(obj);
            });
        };

        return TreasureGetCarrotBuyPackageCommand;

    })();

    cc.TreasureGetCarrotBuyPackageCommand = TreasureGetCarrotBuyPackageCommand;

}).call(this);
