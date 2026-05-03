/**
 * Created by Nofear on 2/27/2019.
 */

(function () {
    var UpdateAvatarCommand;

    UpdateAvatarCommand = (function () {
        function UpdateAvatarCommand() {
        }

        UpdateAvatarCommand.prototype.execute = function (controller) {
            var url = 'api/Account/UpdateAvatar';
            var params = JSON.stringify({
                Avatar: controller.avatarID, //1->20
            });

            //cc.PopupController.getInstance().showBusy();

            return cc.ServerConnector.getInstance().sendRequestPOST(cc.SubdomainName.PORTAL, url, params, function (response) {
                var obj = JSON.parse(response);
                //cc.PopupController.getInstance().hideBusy();
                if (obj.ResponseCode === 1) {
                    /*
                    {
                        "ResponseCode": 1,
                        "Messenge": "Cập nhật thành công!"
                    }
                    * */
                    return controller.onUpdateAvatarResponse(obj);
                } else {
                    return controller.onUpdateAvatarResponseError(obj);
                    //cc.PopupController.getInstance().show(obj.Message, cc.PopupStyle.NOTHING);
                }
            });
        };

        return UpdateAvatarCommand;

    })();

    cc.UpdateAvatarCommand = UpdateAvatarCommand;

}).call(this);
