

(function () {
    var MonkeyGetHistoryCommand;

    MonkeyGetHistoryCommand = (function () {
        function MonkeyGetHistoryCommand() {
        }

        MonkeyGetHistoryCommand.prototype.execute = function (controller) {
            var url = 'api/Game/GetHistory';

            return cc.ServerConnector.getInstance().sendRequest(cc.SubdomainName.MONKEY, url, function (response) {
                var obj = JSON.parse(response);
                return controller.onMonkeyGetHistoryResponse(obj);
            });
        };

        return MonkeyGetHistoryCommand;

    })();

    cc.MonkeyGetHistoryCommand = MonkeyGetHistoryCommand;

}).call(this);
