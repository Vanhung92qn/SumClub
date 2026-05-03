
/**
 * Created by Nofear on 2/27/2019.
 */

//
(function () {
    var TreasureCarrotUserInfoCommand;

    TreasureCarrotUserInfoCommand = (function () {
        function TreasureCarrotUserInfoCommand() {
        }

        TreasureCarrotUserInfoCommand.prototype.execute = function (controller) {
            var url = 'api/Treasure/CarrotUserInfor';

            return cc.ServerConnector.getInstance().sendRequest(cc.SubdomainName.TREASURE, url, function (response) {
                var obj = JSON.parse(response);
                controller.onTreasureCarrotUserInfoResponse(obj);
            });
        };

        return TreasureCarrotUserInfoCommand;

    })();

    cc.TreasureCarrotUserInfoCommand = TreasureCarrotUserInfoCommand;

}).call(this);
