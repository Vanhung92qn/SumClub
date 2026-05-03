/**
 * Created by Nofear on 2/27/2019.
 */

(function () {
    var UserMailCommand;

    UserMailCommand = (function () {
        function UserMailCommand() {
        }

        UserMailCommand.prototype.execute = function (controller) {
            var url = 'api/System/GetUserMail';
            var params = JSON.stringify({
                MailType: 2, //1=send, 2=receive
                CurrentPage: 1,
                PageSize: 25
            });

            return cc.ServerConnector.getInstance().sendRequestPOST(cc.SubdomainName.PORTAL, url, params, function (response) {
                var obj = JSON.parse(response);
                if (obj.ResponseCode === 1) {
                    return controller.onUserMailResponse(obj);
                } else {
                    cc.PopupController.getInstance().showMessageError(obj.Message, obj.ResponseCode);
                }
            });
        };

        return UserMailCommand;

    })();

    cc.UserMailCommand = UserMailCommand;

}).call(this);
