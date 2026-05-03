
/**
 * Created by Nofear on 2/27/2019.
 */

//
(function () {
    var TreasureGetCarrotGiftCommand;

    TreasureGetCarrotGiftCommand = (function () {
        function TreasureGetCarrotGiftCommand() {
        }

        TreasureGetCarrotGiftCommand.prototype.execute = function (controller) {
            var url = 'api/Treasure/GetCarrotGift';

            return cc.ServerConnector.getInstance().sendRequest(cc.SubdomainName.TREASURE, url, function (response) {
                var obj = JSON.parse(response);
                controller.onTreasureGetCarrotGiftResponse(obj);
            });
        };

        return TreasureGetCarrotGiftCommand;

    })();

    cc.TreasureGetCarrotGiftCommand = TreasureGetCarrotGiftCommand;

}).call(this);
