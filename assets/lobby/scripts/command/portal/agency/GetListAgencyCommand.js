/**
 * Created by Nofear on 2/27/2019.
 */

(function () {
    var GetListAgencyCommand;

    GetListAgencyCommand = (function () {
        function GetListAgencyCommand() {
        }

        GetListAgencyCommand.prototype.execute = function (controller) {
            var url = 'api/Agency/GetList';

            return cc.ServerConnector.getInstance().sendRequest(cc.SubdomainName.PORTAL, url, function (response) {
                var obj = JSON.parse(response);
                if (obj.ResponseCode === 1) {
                    return controller.onGetListAgencyResponse(obj);
                } else {
                    cc.PopupController.getInstance().showMessageError(obj.Message, obj.ResponseCode);
                }
            });
        };

        return GetListAgencyCommand;

    })();

    cc.GetListAgencyCommand = GetListAgencyCommand;

}).call(this);
