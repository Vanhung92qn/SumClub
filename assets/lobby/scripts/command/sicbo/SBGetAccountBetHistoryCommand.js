

(function () {
    var SBGetAccountBetHistoryCommand;

    SBGetAccountBetHistoryCommand = (function () {
        function SBGetAccountBetHistoryCommand() {
        }

        SBGetAccountBetHistoryCommand.prototype.execute = function (controller, sessionId) {
            var url = 'api/sicbo/GetAccountBetHistory?sessionId=' + sessionId;
            return cc.ServerConnector.getInstance().sendRequest(cc.SubdomainName.SICBO, url, function (response) {
                var obj = JSON.parse(response);
                return controller.onSBGetAccountBetHistoryResponse(obj);
            });
        };

        return SBGetAccountBetHistoryCommand;

    })();

    cc.SBGetAccountBetHistoryCommand = SBGetAccountBetHistoryCommand;

}).call(this);
