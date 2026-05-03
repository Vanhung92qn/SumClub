/**
 * Created by Nofear on 2/27/2019.
 */

(function () {
    var TreasureBuyCarrotCommand;

    TreasureBuyCarrotCommand = (function () {
        function TreasureBuyCarrotCommand() {
        }

        TreasureBuyCarrotCommand.prototype.execute = function (controller) {
            var url = 'api/Treasure/BuyCarrot';
            var params = JSON.stringify({
                PackageID: controller.package.PackageID,
            });

            return cc.ServerConnector.getInstance().sendRequestPOST(cc.SubdomainName.TREASURE, url, params, function (response) {
                var obj = JSON.parse(response);
                if (obj.ResponseCode === 1) {
                    return controller.onTreasureBuyCarrotResponse(obj);
                } else {
                    cc.PopupController.getInstance().showMessageError(obj.Message, obj.ResponseCode);
                }
            });
        };

        return TreasureBuyCarrotCommand;

    })();

    cc.TreasureBuyCarrotCommand = TreasureBuyCarrotCommand;

}).call(this);
