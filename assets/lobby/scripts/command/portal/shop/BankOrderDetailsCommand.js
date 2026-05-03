/**
 * Created by Nofear on 3/19/2019.
 */

(function () {
    var BankOrderDetailsCommand;

    BankOrderDetailsCommand = (function () {
        function BankOrderDetailsCommand() {
        }

        BankOrderDetailsCommand.prototype.execute = function (controller) {
            var url = 'api/BankCharge/OrderDetails';

            var params = JSON.stringify({
                Code: controller.pin
            });

            cc.PopupController.getInstance().showBusy();

            return cc.ServerConnector.getInstance().sendRequestPOST(cc.SubdomainName.PORTAL, url, params, function (response) {
                var obj = JSON.parse(response);

                cc.PopupController.getInstance().hideBusy();

                if (obj.ResponseCode === 1) {
                    //========
                    return controller.onBankOrderDetailsResponse(obj);
                } else {
                    return controller.onBankOrderDetailsResponseError(obj);

                }

            });
        };

        return BankOrderDetailsCommand;

    })();

    cc.BankOrderDetailsCommand = BankOrderDetailsCommand;

}).call(this);
