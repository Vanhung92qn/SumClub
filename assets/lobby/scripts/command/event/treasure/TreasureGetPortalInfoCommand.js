
/**
 * Created by Nofear on 2/27/2019.
 */

//
(function () {
    var TreasureGetPortalInfoCommand;

    TreasureGetPortalInfoCommand = (function () {
        function TreasureGetPortalInfoCommand() {
        }

        TreasureGetPortalInfoCommand.prototype.execute = function (controller) {
            var url = 'api/Treasure/GetPortalInfor';

            return cc.ServerConnector.getInstance().sendRequest(cc.SubdomainName.TREASURE, url, function (response) {
                var obj = JSON.parse(response);
                controller.onTreasureGetPortalInfoResponse(obj);
            });
        };

        return TreasureGetPortalInfoCommand;

    })();

    cc.TreasureGetPortalInfoCommand = TreasureGetPortalInfoCommand;

}).call(this);
