
/**
 * Created by Nofear on 2/27/2019.
 */

(function () {
    var GetKBTimeCommand;

    GetKBTimeCommand = (function () {
        function GetKBTimeCommand() {
        }

        GetKBTimeCommand.prototype.execute = function (controller) {
            var url = 'api/KingBoom/GetKbTime';

            return cc.ServerConnector.getInstance().sendRequest(cc.SubdomainName.BLOCK_BUSTER, url, function (response) {
                var obj = JSON.parse(response);
                controller.onGetKBTimeResponse(obj);
            });
        };

        return GetKBTimeCommand;

    })();

    cc.GetKBTimeCommand = GetKBTimeCommand;

}).call(this);
