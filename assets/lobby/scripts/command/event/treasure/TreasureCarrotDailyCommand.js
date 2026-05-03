
/**
 * Created by Nofear on 2/27/2019.
 */

//
(function () {
    var TreasureCarrotDailyCommand;

    TreasureCarrotDailyCommand = (function () {
        function TreasureCarrotDailyCommand() {
        }

        TreasureCarrotDailyCommand.prototype.execute = function (controller) {
            var url = 'api/Treasure/CarrotDaily';

            return cc.ServerConnector.getInstance().sendRequest(cc.SubdomainName.TREASURE, url, function (response) {
                var obj = JSON.parse(response);
                cc.PopupController.getInstance().hideBusy();
                if (obj.ResponseCode === 1) {
                    return controller.onTreasureCarrotDailyResponse(obj);
                } else {
                    cc.PopupController.getInstance().showMessage(obj.Message);
                }
            });
        };

        return TreasureCarrotDailyCommand;

    })();

    cc.TreasureCarrotDailyCommand = TreasureCarrotDailyCommand;

}).call(this);
