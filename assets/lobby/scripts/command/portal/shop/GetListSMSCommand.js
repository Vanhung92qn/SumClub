/**
 * Created by Nofear on 3/19/2019.
 */

(function () {
    var GetListSMSCommand;

    GetListSMSCommand = (function () {
        function GetListSMSCommand() {
        }

        GetListSMSCommand.prototype.execute = function (controller) {
            var url = 'api/SmsCharge/GetChargeConfigs';

            return cc.ServerConnector.getInstance().sendRequest(cc.SubdomainName.PORTAL, url, function (response) {
                var obj = JSON.parse(response);

                if (obj.ResponseCode === 1) {
                    return controller.onGetListSMSResponse(obj);
                } else {
                    return controller.onGetListSMSResponseError(obj);
                }
            });
        };

        return GetListSMSCommand;

    })();

    cc.GetListSMSCommand = GetListSMSCommand;

}).call(this);
