/**
 * Lay list dat cuoc cua 1 phien (Tai/Xiu) cho popup SicBoSessionDetailView.
 * Endpoint server: api/sicbo/GetSessionInfo?sessionId=...
 */

(function () {
    var SBGetSessionInfoCommand;

    SBGetSessionInfoCommand = (function () {
        function SBGetSessionInfoCommand() {
        }

        SBGetSessionInfoCommand.prototype.execute = function (controller, sessionId) {
            var url = 'api/sicbo/GetSessionInfo?sessionId=' + sessionId;
            return cc.ServerConnector.getInstance().sendRequest(cc.SubdomainName.SICBO, url, function (response) {
                var obj = JSON.parse(response);
                return controller.onSBGetSessionInfoResponse(obj);
            });
        };

        return SBGetSessionInfoCommand;
    })();

    cc.SBGetSessionInfoCommand = SBGetSessionInfoCommand;
}).call(this);
