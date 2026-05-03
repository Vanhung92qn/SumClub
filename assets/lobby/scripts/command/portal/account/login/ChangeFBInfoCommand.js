/**
 * Created by Nofear on 2/27/2019.
 */

(function () {
    var ChangeFBInfoCommand;

    ChangeFBInfoCommand = (function () {
        function ChangeFBInfoCommand() {
        }

        ChangeFBInfoCommand.prototype.execute = function (controller) {
            var url = 'api/Account/ChangeFBInfor';
            var params = JSON.stringify({
                UserName: controller.username,
                Password: controller.newPass,
                Otp: controller.otp
            });

            return cc.ServerConnector.getInstance().sendRequestPOST(cc.SubdomainName.PORTAL, url, params, function (response) {
                var obj = JSON.parse(response);
                if (obj.ResponseCode === 1) {
                    return controller.onChangeFBInfoResponse(obj);
                } else {
                    return controller.onChangeFBInfoResponseError(obj);
                }
            });
        };

        return ChangeFBInfoCommand;

    })();

    cc.ChangeFBInfoCommand = ChangeFBInfoCommand;

}).call(this);
