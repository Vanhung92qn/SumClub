
/**
 * Created by Nofear on 2/27/2019.
 */

(function () {
    var TreasureGetCarrotUserHonorCommand;

    TreasureGetCarrotUserHonorCommand = (function () {
        function TreasureGetCarrotUserHonorCommand() {
        }

        TreasureGetCarrotUserHonorCommand.prototype.execute = function (controller) {
            var url = 'api/Treasure/GetCarrotUserHonor';

            return cc.ServerConnector.getInstance().sendRequest(cc.SubdomainName.TREASURE, url, function (response) {
                var obj = JSON.parse(response);
                controller.onTreasureGetCarrotUserHonorResponse(obj);
            });
        };

        return TreasureGetCarrotUserHonorCommand;

    })();

    cc.TreasureGetCarrotUserHonorCommand = TreasureGetCarrotUserHonorCommand;

}).call(this);
