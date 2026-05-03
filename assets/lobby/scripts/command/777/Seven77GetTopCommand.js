

(function () {
    var Seven77GetTopCommand;

    Seven77GetTopCommand = (function () {
        function Seven77GetTopCommand() {
        }

        Seven77GetTopCommand.prototype.execute = function (controller, type) {
            var url = 'api/kingstar/GetBigWinner?top=50&type=' + type;

            return cc.ServerConnector.getInstance().sendRequest(cc.SubdomainName.SEVEN77, url, function (response) {
                var obj = JSON.parse(response);
                return controller.onSeven77GetTopResponse(obj);
            });
        };

        return Seven77GetTopCommand;

    })();

    cc.Seven77GetTopCommand = Seven77GetTopCommand;

}).call(this);
