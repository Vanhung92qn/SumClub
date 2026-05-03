/**
 * Created by Nofear on 2/27/2019.
 */

(function () {
    var ChangeFBInfoPopupCommand;

    ChangeFBInfoPopupCommand = (function () {
        function ChangeFBInfoPopupCommand() {
        }

        ChangeFBInfoPopupCommand.prototype.execute = function (controller) {
            var url = 'api/Account/ChangeFBInforPopup';
            var params = JSON.stringify({
                UserName: controller.username,
                Password: controller.newPass,
                PrivateKey: cc.ServerConnector.getInstance().getCaptchaPrivateKey(),
                Captcha: controller.captcha,
            });

            return cc.ServerConnector.getInstance().sendRequestPOST(cc.SubdomainName.PORTAL, url, params, function (response) {
                var obj = JSON.parse(response);
                if (obj.ResponseCode === 1) {
                    return controller.onChangeFBInfoPopupResponse(obj);
                } else {
                    return controller.onChangeFBInfoPopupResponseError(obj);
                }
            });
        };

        return ChangeFBInfoPopupCommand;

    })();

    cc.ChangeFBInfoPopupCommand = ChangeFBInfoPopupCommand;

}).call(this);
