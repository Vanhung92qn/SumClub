

(function () {
    var Seven77GetHistoryCommand;

    Seven77GetHistoryCommand = (function () {
        function Seven77GetHistoryCommand() {
        }

        Seven77GetHistoryCommand.prototype.execute = function (controller) {
            var url = 'api/kingstar/GetHistory?top=50';

            return cc.ServerConnector.getInstance().sendRequest(cc.SubdomainName.SEVEN77, url, function (response) {
                var obj = JSON.parse(response);
                return controller.onSeven77GetHistoryResponse(obj);
            });
        };

        return Seven77GetHistoryCommand;

    })();

    cc.Seven77GetHistoryCommand = Seven77GetHistoryCommand;

}).call(this);
