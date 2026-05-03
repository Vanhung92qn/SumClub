/**
 * Created by Nofear on 2/27/2019.
 */

(function () {
    var GetAvatarCommand;

    GetAvatarCommand = (function () {
        function GetAvatarCommand() {
        }

        GetAvatarCommand.prototype.execute = function (controller) {
            var url = 'api/Account/GetAvatar';

            return cc.ServerConnector.getInstance().sendRequest(cc.SubdomainName.PORTAL, url, function (response) {
                var obj = JSON.parse(response);
                if (obj.ResponseCode === 1) {
                    /*
                    {
                        ResponseCode: 1,
                        Files: [
                            http://localhost:37261/Contents/Avatars/1.jpg
                        ]
                    }
                    * */
                    return controller.onGetAvatarResponse(obj);
                } else {
                    cc.PopupController.getInstance().showMessageError(obj.Message, obj.ResponseCode);
                }
            });
        };

        return GetAvatarCommand;

    })();

    cc.GetAvatarCommand = GetAvatarCommand;

}).call(this);
