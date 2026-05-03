
/**
 * Created by Nofear on 2/27/2019.
 */

(function () {
    var GetKBAccountInfoCommand;

    GetKBAccountInfoCommand = (function () {
        function GetKBAccountInfoCommand() {
        }

        GetKBAccountInfoCommand.prototype.execute = function (controller) {
            var url = 'api/KingBoom/GetKbAccountInfo';

            return cc.ServerConnector.getInstance().sendRequest(cc.SubdomainName.BLOCK_BUSTER, url, function (response) {
                var obj = JSON.parse(response);
                controller.onGetKBAccountInfoResponse(obj);
            });
        };

        return GetKBAccountInfoCommand;

    })();

    cc.GetKBAccountInfoCommand = GetKBAccountInfoCommand;

}).call(this);
