/**
 * Created by Nofear on 3/19/2019.
 */

(function () {
    var GetListViettelPayCommand;

    GetListViettelPayCommand = (function () {
        function GetListViettelPayCommand() {
        }

        GetListViettelPayCommand.prototype.execute = function (controller) {
            var url = 'api/ViettelPay/GetInfor';

            return cc.ServerConnector.getInstance().sendRequest(cc.SubdomainName.PORTAL, url, function (response) {
                var obj = JSON.parse(response);
                if (obj.ResponseCode === 1) {
                    return controller.onGetListViettelPayResponse(obj);
                } else {
                    return controller.onGetListViettelPayResponseError(obj);
                }
            });
        };

        return GetListViettelPayCommand;

    })();

    cc.GetListViettelPayCommand = GetListViettelPayCommand;

}).call(this);
