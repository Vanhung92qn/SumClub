/**
 * Created by Nofear on 2/27/2019.
 */

var netConfig = require('NetConfig');

(function () {
    var UpdateNationCommand;

    UpdateNationCommand = (function () {
        function UpdateNationCommand() {
        }

        UpdateNationCommand.prototype.execute = function (controller) {
            var url = 'api/account/UpdateNation';
            var params = JSON.stringify({
                NationCode: controller.nationCode
            });

            return cc.ServerConnector.getInstance().sendRequestPOST(cc.SubdomainName.PORTAL, url, params, function (response) {
                var obj = JSON.parse(response);
                if (obj.ResponseCode === 1) {
                    return controller.onUpdateNationResponse(obj);
                } else {
                    return controller.onUpdateNationResponseError(obj);
                }
            });
        };

        return UpdateNationCommand;

    })();

    cc.UpdateNationCommand = UpdateNationCommand;

}).call(this);
