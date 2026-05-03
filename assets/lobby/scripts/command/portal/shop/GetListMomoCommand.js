/**
 * Created by Nofear on 3/19/2019.
 */

(function () {
    var GetListMomoCommand;

    GetListMomoCommand = (function () {
        function GetListMomoCommand() {
        }

        GetListMomoCommand.prototype.execute = function (controller) {
            var url = 'api/BBPay/MomoRecharge?amount=0'

            return cc.ServerConnector.getInstance().sendRequest(cc.SubdomainName.PORTAL, url, function (response) {
                var obj = JSON.parse(response);
                if (obj.ResponseCode === 1) {
                    return controller.onGetListMomoResponse(obj);
                } else {
                    return controller.onGetListMomoResponseError(obj);
                }
            });
        };

        return GetListMomoCommand;

    })();

    cc.GetListMomoCommand = GetListMomoCommand;

}).call(this);
