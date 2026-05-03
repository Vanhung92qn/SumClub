/**
 * Created by Nofear on 3/19/2019.
 */

(function () {
    var GetChargeDefaultCommand;

    GetChargeDefaultCommand = (function () {
        function GetChargeDefaultCommand() {
        }

        GetChargeDefaultCommand.prototype.execute = function (controller) {
            var url = 'api/System/ChargeDefault';

            return cc.ServerConnector.getInstance().sendRequest(cc.SubdomainName.PORTAL, url, function (response) {
                var obj = JSON.parse(response);
                if (obj.ResponseCode === 1) {
                    //return controller.onGetChargeDefaultResponse(obj);
                    cc.ShopController.getInstance().setChargeDefault(obj.Default); //BANK, CARD
                } else {
                    // cc.PopupController.getInstance().showMessageError(obj.Message, obj.ResponseCode);
                }
            });
        };

        return GetChargeDefaultCommand;

    })();

    cc.GetChargeDefaultCommand = GetChargeDefaultCommand;

}).call(this);
