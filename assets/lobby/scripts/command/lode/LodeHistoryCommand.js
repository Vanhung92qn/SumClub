(function () {
    var LodeHistoryCommand;

    LodeHistoryCommand = (function () {
        function LodeHistoryCommand() {
        }

        LodeHistoryCommand.prototype.execute = function (controller) {
            let url = 'api/Xoso/GetHistory?top=50';
            let subDomainName = cc.SubdomainName.LODE;
            return cc.ServerConnector.getInstance().sendRequest(subDomainName, url, function (response) {
                var obj = JSON.parse(response);
                return controller.onGetHistoryResponse(obj);
            });
        };

        return LodeHistoryCommand;

    })();

    cc.LodeHistoryCommand = LodeHistoryCommand;

}).call(this);
