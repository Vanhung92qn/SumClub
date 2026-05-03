/**
 * Created by Nofear on 3/19/2019.
 */

(function () {
    var GetListCardCommand;

    GetListCardCommand = (function () {
        function GetListCardCommand() {
        }

        GetListCardCommand.prototype.execute = function (controller) {
            var url = 'api/CardCharging/GetListCard';

            return cc.ServerConnector.getInstance().sendRequest(cc.SubdomainName.PORTAL, url, function (response) {
                var obj = JSON.parse(response);
                if (obj.ResponseCode === 1) {
                    return controller.onGetListCardResponse(obj);
                } else {
                    cc.PopupController.getInstance().showMessageError(obj.Message, obj.ResponseCode);
                }
            });
        };

        return GetListCardCommand;

    })();

    cc.GetListCardCommand = GetListCardCommand;

}).call(this);
