

(function () {
    var TQGetTopCommand;

    TQGetTopCommand = (function () {
        function TQGetTopCommand() {
        }

        TQGetTopCommand.prototype.execute = function (controller, type) {
            var url = 'api/blockbuster/GetBigWinner?top=50&type=' + type;

            return cc.ServerConnector.getInstance().sendRequest(cc.SubdomainName.BLOCK_BUSTER, url, function (response) {
                var obj = JSON.parse(response);
                return controller.onTQGetTopResponse(obj);
            });
        };

        return TQGetTopCommand;

    })();

    cc.TQGetTopCommand = TQGetTopCommand;

}).call(this);
