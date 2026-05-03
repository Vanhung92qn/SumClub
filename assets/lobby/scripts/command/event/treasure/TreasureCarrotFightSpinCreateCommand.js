/**
 * Created by Nofear on 2/27/2019.
 */

(function () {
    var TreasureCarrotFightSpinCreateCommand;

    TreasureCarrotFightSpinCreateCommand = (function () {
        function TreasureCarrotFightSpinCreateCommand() {
        }

        TreasureCarrotFightSpinCreateCommand.prototype.execute = function (controller) {
            var url = 'api/Game/CarrotFightSpinCreate';
            var params = JSON.stringify({
                SpinFastID: controller.SpinFastID,
            });

            return cc.ServerConnector.getInstance().sendRequestPOST(cc.SubdomainName.TREASURE, url, params, function (response) {
                var obj = JSON.parse(response);
                if (obj.ResponseCode === 1) {
                    return controller.onTreasureCarrotFightSpinCreateResponse(obj);
                } else {
                    cc.PopupController.getInstance().showMessageError(obj.Message, obj.ResponseCode);
                }
            });
        };

        return TreasureCarrotFightSpinCreateCommand;

    })();

    cc.TreasureCarrotFightSpinCreateCommand = TreasureCarrotFightSpinCreateCommand;

}).call(this);
