/**
 * Created by Nofear on 2/27/2019.
 */

var netConfig = require('NetConfig');

(function () {
    var DeletePhoneCommand;

    DeletePhoneCommand = (function () {
        function DeletePhoneCommand() {
        }

        DeletePhoneCommand.prototype.execute = function (controller) {
            var url = 'api/Account/DeletePhone';

            if (cc.Config.getInstance().getDomainVK().includes(netConfig.HOST)) {
                var params = {};
            } else {
                params = JSON.stringify({
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
                    * */
                    return controller.onDeletePhoneResponse(obj);
                } else {
                    cc.PopupController.getInstance().showMessageError(obj.Message, obj.ResponseCode);
                }
            });
        };

        return DeletePhoneCommand;

    })();

    cc.DeletePhoneCommand = DeletePhoneCommand;

}).call(this);
