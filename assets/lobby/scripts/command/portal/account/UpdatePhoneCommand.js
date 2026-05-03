/**
 * Created by Nofear on 2/27/2019.
 */

var netConfig = require('NetConfig');

(function () {
    var UpdatePhoneCommand;

    UpdatePhoneCommand = (function () {
        function UpdatePhoneCommand() {
        }

        UpdatePhoneCommand.prototype.execute = function (controller) {
            var url = 'api/Account/UpdatePhone';

            if (cc.Config.getInstance().getDomainVK().includes(netConfig.HOST)) {
                var params = JSON.stringify({
                    PhoneNumber: controller.phoneNumber
                });
            } else {
                params = JSON.stringify({
                    PhoneNumber: controller.phoneNumber,
                    Otp: controller.otp
                });
            }

            return cc.ServerConnector.getInstance().sendRequestPOST(cc.SubdomainName.PORTAL, url, params, function (response) {
                var obj = JSON.parse(response);
                if (obj.ResponseCode === 1) {
                    /*
                    {
                        "ResponseCode": 1,
                        "Messenge": "Cập nhật thành công!"
                    }
                    */
                    return controller.onUpdatePhoneResponse(obj);
                } else {
                    return controller.onUpdatePhoneResponseError(obj);
                    //cc.PopupController.getInstance().show(obj.Message, cc.PopupStyle.NOTHING);
                }
            });
        };

        return UpdatePhoneCommand;

    })();

    cc.UpdatePhoneCommand = UpdatePhoneCommand;

}).call(this);
