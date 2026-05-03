/**
 * Lay md5 hash + result + tong user cua 1 phien Sicbo.
 * Endpoint server: api/sicbo/GetResultSessionInfo?sessionId=...
 */

(function () {
    var SBGetResultSessionInfoCommand;

    SBGetResultSessionInfoCommand = (function () {
        function SBGetResultSessionInfoCommand() {
        }

        SBGetResultSessionInfoCommand.prototype.execute = function (controller, sessionId) {
            var url = 'api/sicbo/GetResultSessionInfo?sessionId=' + sessionId;
            return cc.ServerConnector.getInstance().sendRequest(cc.SubdomainName.SICBO, url, function (response) {
                var obj = JSON.parse(response);
                return controller.onSBGetResultSessionInfoResponse(obj);
            });
        };

        return SBGetResultSessionInfoCommand;
    })();

    cc.SBGetResultSessionInfoCommand = SBGetResultSessionInfoCommand;
}).call(this);
