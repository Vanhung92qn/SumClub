/**
 * Created by Nofear on 2/27/2019.
 */

(function () {
    var GetCaptchaCommand;

    GetCaptchaCommand = (function () {
        function GetCaptchaCommand() {
        }

        GetCaptchaCommand.prototype.execute = function (controller) {
            var url = 'api/Account/Captcha';

            return cc.ServerConnector.getInstance().sendRequest(cc.SubdomainName.PORTAL, url, function (response) {
                var obj = JSON.parse(response);
                //[privatekey,binarystring]
                cc.ServerConnector.getInstance().setCaptchaPrivateKey(obj[0]);
                return controller.onGetCaptchaResponse(obj);
            });
        };

        return GetCaptchaCommand;

    })();

    cc.GetCaptchaCommand = GetCaptchaCommand;

}).call(this);
