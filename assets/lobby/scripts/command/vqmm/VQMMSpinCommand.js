/**
 * Created by Nofear on 2/27/2019.
 */

(function () {
    var VQMMSpinCommand;

    VQMMSpinCommand = (function () {
        function VQMMSpinCommand() {
        }

        VQMMSpinCommand.prototype.execute = function (controller) {
            var url = '/api/luckyrotation/Spin';

            var params = JSON.stringify({
                Captcha: controller.captcha,
                PrivateKey: cc.ServerConnector.getInstance().getCaptchaPrivateKey(),
                DeviceID: cc.Config.getInstance().getDeviceType()
            });

            return cc.ServerConnector.getInstance().sendRequestPOST(cc.SubdomainName.VQMM, url, params, function (response) {
                var obj = JSON.parse(response);

                cc.PopupController.getInstance().hideBusy();
                return controller.onVQMMSpinResponse(obj);
            });
        };

        return VQMMSpinCommand;

    })();

    cc.VQMMSpinCommand = VQMMSpinCommand;

}).call(this);
