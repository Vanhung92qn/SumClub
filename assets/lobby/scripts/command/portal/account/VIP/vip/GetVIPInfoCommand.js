/**
 * Created by Nofear on 2/27/2019.
 */

//Danh sách nhận thưởng theo vip 1
(function () {
    var GetVIPInfoCommand;

    GetVIPInfoCommand = (function () {
        function GetVIPInfoCommand() {
        }

        GetVIPInfoCommand.prototype.execute = function (controller) {
            var url = 'api/VIP2/GetUserVP';

            return cc.ServerConnector.getInstance().sendRequest(cc.SubdomainName.PORTAL, url, function (response) {
                var obj = JSON.parse(response);
                if (obj.ResponseCode === 1) {
                    return controller.onGetVIPInfoResponse(obj);
                } else {
                    cc.PopupController.getInstance().showMessageError(obj.Message, obj.ResponseCode);
                }
            });
        };

        return GetVIPInfoCommand;

    })();

    cc.GetVIPInfoCommand = GetVIPInfoCommand;

}).call(this);
