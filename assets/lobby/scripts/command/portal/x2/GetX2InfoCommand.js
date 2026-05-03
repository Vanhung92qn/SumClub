/**
 * Created by Nofear on 3/19/2019.
 */

(function () {
    var GetX2InfoCommand;

    GetX2InfoCommand = (function () {
        function GetX2InfoCommand() {
        }

        GetX2InfoCommand.prototype.execute = function (controller) {
            var url = 'api/X2Reward/GetX2Infor';

            return cc.ServerConnector.getInstance().sendRequest(cc.SubdomainName.EVENT, url, function (response) {
                var obj = JSON.parse(response);
                if (obj.ResponseCode === 1) {
                    return controller.onGetX2InfoResponse(obj);
                } else {
                    cc.PopupController.getInstance().showMessageError(obj.Message, obj.ResponseCode);
                }
            });
        };

        return GetX2InfoCommand;

    })();

    cc.GetX2InfoCommand = GetX2InfoCommand;

}).call(this);
