/**
 * Created by Nofear on 2/27/2019.
 */

(function () {
    var TreasureCarrotUserGiftChooseCommand;

    TreasureCarrotUserGiftChooseCommand = (function () {
        function TreasureCarrotUserGiftChooseCommand() {
        }

        TreasureCarrotUserGiftChooseCommand.prototype.execute = function (controller) {
            var url = 'api/Treasure/CarrotUserGiftChoose';
            var params = JSON.stringify({
                GiftID: controller.package.GiftID,
            });

            return cc.ServerConnector.getInstance().sendRequestPOST(cc.SubdomainName.TREASURE, url, params, function (response) {
                var obj = JSON.parse(response);
                if (obj.ResponseCode === 1) {
                    return controller.onTreasureCarrotUserGiftChooseResponse(obj);
                } else {
                    cc.PopupController.getInstance().showMessageError(obj.Message, obj.ResponseCode);
                }
            });
        };

        return TreasureCarrotUserGiftChooseCommand;

    })();

    cc.TreasureCarrotUserGiftChooseCommand = TreasureCarrotUserGiftChooseCommand;

}).call(this);
