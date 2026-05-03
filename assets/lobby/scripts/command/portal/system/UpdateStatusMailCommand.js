/**
 * Created by Nofear on 2/27/2019.
 */

(function () {
    var UpdateStatusMailCommand;

    UpdateStatusMailCommand = (function () {
        function UpdateStatusMailCommand() {
        }

        UpdateStatusMailCommand.prototype.execute = function (controller, status) {
            var url = 'api/System/UpdateStatus';
            var params = JSON.stringify({
                Type: status,
                MailID: controller.item.ID
            });

            return cc.ServerConnector.getInstance().sendRequestPOST(cc.SubdomainName.PORTAL, url, params, function (response) {
                var obj = JSON.parse(response);
                if (obj.ResponseCode === 1) {
                    /*
                    {
                        "ResponseCode": 1,
                        "Message": "Cập nhật thành công!"
                    }
                    * */
                    return controller.onUpdateStatusMailResponse(obj, status);
                } else {
                    cc.PopupController.getInstance().showMessageError(obj.Message, obj.ResponseCode);
                }
            });
        };

        return UpdateStatusMailCommand;

    })();

    cc.UpdateStatusMailCommand = UpdateStatusMailCommand;

}).call(this);
