/**
 * Created by Nofear on 2/27/2019.
 */

(function () {
    var GiftcodeCommand;

    GiftcodeCommand = (function () {
        function GiftcodeCommand() {
        }

        GiftcodeCommand.prototype.execute = function (controller) {
            var url = 'api/Account/GiftCode';
            var params = JSON.stringify({
                GiftCode: controller.gc,
                PrivateKey: cc.ServerConnector.getInstance().getCaptchaPrivateKey(),
                Captcha: controller.captcha
            });

            return cc.ServerConnector.getInstance().sendRequestPOST(cc.SubdomainName.PORTAL, url, params, function (response) {
                var obj = JSON.parse(response);
                if (obj.ResponseCode === 1) {
                    return controller.onGiftcodeResponse(obj);
                } else {
                    return controller.onGiftcodeResponseError(obj);

                }
            });
        };

        return GiftcodeCommand;

    })();

    cc.GiftcodeCommand = GiftcodeCommand;

}).call(this);
