/**
 * Created by Nofear on 2/27/2019.
 */

(function () {
    var TreasureCarrotJumpSpinCreateCommand;

    TreasureCarrotJumpSpinCreateCommand = (function () {
        function TreasureCarrotJumpSpinCreateCommand() {
        }

        TreasureCarrotJumpSpinCreateCommand.prototype.execute = function (controller) {
            var url = 'api/Game/CarrotJumpSpinCreate';
            var params = JSON.stringify({
                SpinFastID: controller.spinFastID,
            });

            return cc.ServerConnector.getInstance().sendRequestPOST(cc.SubdomainName.TREASURE, url, params, function (response) {
                var obj = JSON.parse(response);
                if (obj.ResponseCode === 1) {
                    return controller.onTreasureCarrotJumpSpinCreateResponse(obj);
                } else {
                    cc.PopupController.getInstance().showMessageError(obj.Message, obj.ResponseCode);
                }
            });
        };

        return TreasureCarrotJumpSpinCreateCommand;

    })();

    cc.TreasureCarrotJumpSpinCreateCommand = TreasureCarrotJumpSpinCreateCommand;

}).call(this);
