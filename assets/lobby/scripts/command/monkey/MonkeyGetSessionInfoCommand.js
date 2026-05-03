

(function () {
    var MonkeyGetSessionInfoCommand;

    MonkeyGetSessionInfoCommand = (function () {
        function MonkeyGetSessionInfoCommand() {

        }

        MonkeyGetSessionInfoCommand.prototype.execute = function (controller, sessionId) {
            var url = 'api/Game//GetSessionInfo?sessionId=' + sessionId;

            return cc.ServerConnector.getInstance().sendRequest(cc.SubdomainName.MONKEY, url, function (response) {
                var obj = JSON.parse(response);
                return controller.onMonkeyGetSessionInfoResponse(obj);
            });
        };

        return MonkeyGetSessionInfoCommand;

    })();

    cc.MonkeyGetSessionInfoCommand = MonkeyGetSessionInfoCommand;

}).call(this);
