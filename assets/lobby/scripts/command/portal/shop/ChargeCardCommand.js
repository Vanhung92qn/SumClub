/**
 * Created by Nofear on 3/19/2019.
 */

(function () {
    var ChargeCardCommand;

    ChargeCardCommand = (function () {
        function ChargeCardCommand() {
        }

        ChargeCardCommand.prototype.execute = function (controller) {
            var url = 'api/CardCharging/Charge';

            var params = JSON.stringify({
                CardNumber: controller.pin,
                SerialNumber: controller.serial,
                CardCode: controller.cardCode,
                CardType: controller.cardType,
                PrivateKey: cc.ServerConnector.getInstance().getCaptchaPrivateKey(),
                Captcha: controller.captcha
            });

            cc.PopupController.getInstance().showBusy();

            return cc.ServerConnector.getInstance().sendRequestPOST(cc.SubdomainName.PORTAL, url, params, function (response) {
                var obj = JSON.parse(response);

                cc.PopupController.getInstance().hideBusy();

                if (obj.ResponseCode === 1) {
                    //========
                    return controller.onChargeCardResponse(obj);
                } else {
                    return controller.onChargeCardResponseError(obj);

                }

            });
        };

        return ChargeCardCommand;

    })();

    cc.ChargeCardCommand = ChargeCardCommand;

}).call(this);
