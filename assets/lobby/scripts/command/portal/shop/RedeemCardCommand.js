/**
 * Created by Nofear on 3/19/2019.
 */

(function () {
    var RedeemCardCommand;

    RedeemCardCommand = (function () {
        function RedeemCardCommand() {
        }

        RedeemCardCommand.prototype.execute = function (controller) {
            var url = 'api/CardExchange/Cashout';

            var params = JSON.stringify({
                CardCode: controller.cardCode,
                TeleCode: controller.cardType,
                Otp: controller.otp
            });

            cc.PopupController.getInstance().showBusy();

            return cc.ServerConnector.getInstance().sendRequestPOST(cc.SubdomainName.PORTAL, url, params, function (response) {
                var obj = JSON.parse(response);

                cc.PopupController.getInstance().hideBusy();

                if (obj.ResponseCode === 1) {
                    //========
                    return controller.onRedeemCardResponse(obj);
                } else {
                    return controller.onRedeemCardResponseError(obj);

                }
            });
        };

        return RedeemCardCommand;

    })();

    cc.RedeemCardCommand = RedeemCardCommand;

}).call(this);
