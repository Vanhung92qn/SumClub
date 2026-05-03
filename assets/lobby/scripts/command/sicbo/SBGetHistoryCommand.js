

(function () {
    var SBGetHistoryCommand;

    SBGetHistoryCommand = (function () {
        function SBGetHistoryCommand() {
        }

        SBGetHistoryCommand.prototype.execute = function (controller) {
            var url = 'api/sicbo/GetHistory?top=100';
            return cc.ServerConnector.getInstance().sendRequest(cc.SubdomainName.SICBO, url, function (response) {
                var obj = JSON.parse(response);
                return controller.onSBGetHistoryResponse(obj);
            });
        };

        return SBGetHistoryCommand;

    })();

    cc.SBGetHistoryCommand = SBGetHistoryCommand;

}).call(this);
