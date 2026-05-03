/**
 * Created by Nofear on 2/27/2019.
 */

var netConfig = require('NetConfig');

(function () {
    var UpdateNicknameCommand;

    UpdateNicknameCommand = (function () {
        function UpdateNicknameCommand() {
        }

        UpdateNicknameCommand.prototype.execute = function (controller) {

            if (cc.Config.getInstance().getDomainVK().includes(netConfig.HOST)) {
                var url = 'api/Account/UpdateInfo';
                var params = JSON.stringify({
                    AccountName: controller.nickname,
                    NationCode: controller.nationCode,
                });
            } else {
                url = 'api/Account/UpdateNickName';
                params = JSON.stringify({
                    AccountName: controller.nickname,
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
                    cc.LoginController.getInstance().setNickname(controller.nickname);
                    return controller.onUpdateNicknameResponse(obj);
                } else {
                    return controller.onUpdateNicknameResponseError(obj);
                    //cc.PopupController.getInstance().show(obj.Message, cc.PopupStyle.NOTHING);
                }
            });
        };

        return UpdateNicknameCommand;

    })();

    cc.UpdateNicknameCommand = UpdateNicknameCommand;

}).call(this);
