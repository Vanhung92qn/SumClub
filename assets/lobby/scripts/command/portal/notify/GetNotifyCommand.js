/**
 * Created by Nofear on 2/27/2019.
 */

(function () {
    var GetNotifyCommand;

    GetNotifyCommand = (function () {
        function GetNotifyCommand() {
        }

        GetNotifyCommand.prototype.execute = function (controller) {
            var url = 'api/System/GetNotify';

            return cc.ServerConnector.getInstance().sendRequest(cc.SubdomainName.PORTAL, url, function (response) {
                var obj = JSON.parse(response);
                if (obj.ResponseCode === 1) {
                    return controller.onGetNotifyResponse(obj);
                } else {
                    //cc.PopupController.getInstance().showMessageError(obj.Message, obj.ResponseCode);
                }
            });
        };

        return GetNotifyCommand;

    })();

    cc.GetNotifyCommand = GetNotifyCommand;

}).call(this);
