/**
 * Created by Nofear on 2/27/2019.
 */

(function () {
    var UpdateAuthenTypeCommand;

    UpdateAuthenTypeCommand = (function () {
        function UpdateAuthenTypeCommand() {
        }

        UpdateAuthenTypeCommand.prototype.execute = function (controller, authenType) {
            var url = 'api/Account/UpdateAuthenType';
            var params = JSON.stringify({
                AuthenType: authenType,
                Otp: controller.otp
            });

            return cc.ServerConnector.getInstance().sendRequestPOST(cc.SubdomainName.PORTAL, url, params, function (response) {
                var obj = JSON.parse(response);
                if (obj.ResponseCode === 1) {
                    /*
                    {
                        "ResponseCode": 1,
                        "Messenge": "Cập nhật thành công!"
                    }
                    * */
                    return controller.onUpdateAuthenTypeResponse(obj, authenType);
                } else {
                    return controller.onUpdateAuthenTypeResponseError(obj);
                    //cc.PopupController.getInstance().show(obj.Message, cc.PopupStyle.NOTHING);
                }
            });
        };

        return UpdateAuthenTypeCommand;

    })();

    cc.UpdateAuthenTypeCommand = UpdateAuthenTypeCommand;

}).call(this);
