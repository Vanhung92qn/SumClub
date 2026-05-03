/**
 * Created by Nofear on 2/27/2019.
 */

(function () {
    var GetPrivilegeTypeCommand;

    GetPrivilegeTypeCommand = (function () {
        function GetPrivilegeTypeCommand() {
        }

        GetPrivilegeTypeCommand.prototype.execute = function (controller) {
            var url = 'api/Vip/GetUserVP'; //api/Vip/GetPrivilegeType

            return cc.ServerConnector.getInstance().sendRequest(cc.SubdomainName.PORTAL, url, function (response) {
                var obj = JSON.parse(response);
                if (obj.ResponseCode === 1) {
                    return controller.onGetPrivilegeTypeResponse(obj);
                } else {
                    cc.PopupController.getInstance().showMessageError(obj.Message, obj.ResponseCode);
                }
            });
        };

        return GetPrivilegeTypeCommand;

    })();

    cc.GetPrivilegeTypeCommand = GetPrivilegeTypeCommand;

}).call(this);
