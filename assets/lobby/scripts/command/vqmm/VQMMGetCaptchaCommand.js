/**
 * Created by Nofear on 2/27/2019.
 */

(function () {
    var VQMMGetCaptchaCommand;

    VQMMGetCaptchaCommand = (function () {
        function VQMMGetCaptchaCommand() {
        }

        VQMMGetCaptchaCommand.prototype.execute = function (controller) {
            var url = 'api/luckyrotation/GetCaptcha';

            return cc.ServerConnector.getInstance().sendRequest(cc.SubdomainName.VQMM, url, function (response) {
                var obj = JSON.parse(response);
                //[privatekey,binarystring]
                cc.ServerConnector.getInstance().setCaptchaPrivateKey(obj[0]);
                return controller.oVQMMGetCaptchaResponse(obj);
            });
        };

        return VQMMGetCaptchaCommand;

    })();

    cc.VQMMGetCaptchaCommand = VQMMGetCaptchaCommand;

}).call(this);
