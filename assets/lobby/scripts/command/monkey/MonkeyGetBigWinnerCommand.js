

(function () {
    var MonkeyGetBigWinnerCommand;

    MonkeyGetBigWinnerCommand = (function () {
        function MonkeyGetBigWinnerCommand() {
        }

        MonkeyGetBigWinnerCommand.prototype.execute = function (controller) {
            var url = 'api/Game/GetBigWinner';

            return cc.ServerConnector.getInstance().sendRequest(cc.SubdomainName.MONKEY, url, function (response) {
                var obj = JSON.parse(response);
                return controller.onMonkeyGetBigWinnerResponse(obj);
            });
        };

        return MonkeyGetBigWinnerCommand;

    })();

    cc.MonkeyGetBigWinnerCommand = MonkeyGetBigWinnerCommand;

}).call(this);
