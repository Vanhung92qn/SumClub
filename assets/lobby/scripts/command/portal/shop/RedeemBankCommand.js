/**
 * Created by Nofear on 3/19/2019.
 */

(function () {
    var RedeemBankCommand;

    RedeemBankCommand = (function () {
        function RedeemBankCommand() {
        }

        RedeemBankCommand.prototype.execute = function (controller) {
            var url = 'api/BankExchange/CreateOrders';

            var params = JSON.stringify({
                Amount: controller.amount,
                BankName: controller.lbSelectedBank.string,
                BankAccountName: controller.editBoxBankAccName.string,
                BankAccount: controller.editBoxBankAccNumber.string,
                Otp: controller.otp
            });

            cc.PopupController.getInstance().showBusy();

            return cc.ServerConnector.getInstance().sendRequestPOST(cc.SubdomainName.PORTAL, url, params, function (response) {
                var obj = JSON.parse(response);

                cc.PopupController.getInstance().hideBusy();

                if (obj.ResponseCode === 1) {
                    //========
                    return controller.onRedeemBankResponse(obj);
                } else {
                    return controller.onRedeemBankResponseError(obj);

                }
            });
        };

        return RedeemBankCommand;

    })();

    cc.RedeemBankCommand = RedeemBankCommand;

}).call(this);
