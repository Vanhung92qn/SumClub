/**
 * Created by Nofear on 2/27/2019.
 */

(function () {
    var UpdateProfileCommand;

    UpdateProfileCommand = (function () {
        function UpdateProfileCommand() {
        }

        UpdateProfileCommand.prototype.execute = function (controller) {
            var url = 'api/Account/UpdateProfile';
            var params = JSON.stringify({
                AccountName: controller.accountName,
                DateOfBirth: controller.dateOfBirth,
                Avatar: controller.avatarId, //1->20
                Gender: controller.gender, //-1
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
                    return controller.onUpdateProfileResponse(obj);
                } else {
                    cc.PopupController.getInstance().showMessageError(obj.Message, obj.ResponseCode);
                }
            });
        };

        return UpdateProfileCommand;

    })();

    cc.UpdateProfileCommand = UpdateProfileCommand;

}).call(this);
