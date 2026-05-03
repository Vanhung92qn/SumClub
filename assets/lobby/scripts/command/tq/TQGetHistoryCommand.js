

(function () {
    var TQGetHistoryCommand;

    TQGetHistoryCommand = (function () {
        function TQGetHistoryCommand() {
            
        }

        TQGetHistoryCommand.prototype.execute = function (controller) {
            var url = 'api/blockbuster/GetHistory?top=50';

            return cc.ServerConnector.getInstance().sendRequest(cc.SubdomainName.BLOCK_BUSTER, url, function (response) {
                var obj = JSON.parse(response);
                return controller.onTQGetHistoryResponse(obj);
            });
        };

        return TQGetHistoryCommand;

    })();

    cc.TQGetHistoryCommand = TQGetHistoryCommand;

}).call(this);
