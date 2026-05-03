

(function () {
    var TXMD5GetHistoryCommand;

    TXMD5GetHistoryCommand = (function () {
        function TXMD5GetHistoryCommand() {
        }

        TXMD5GetHistoryCommand.prototype.execute = function (controller) {
            var url = 'api/md5luckydice/GetHistory';

            return cc.ServerConnector.getInstance().sendRequest(cc.SubdomainName.TAI_XIU_MD5, url, function (response) {
				//console.log(response);
                var obj = JSON.parse(response);
                return controller.onTXGetHistoryResponse(obj);
            });
        };

        return TXMD5GetHistoryCommand;

    })();

    cc.TXMD5GetHistoryCommand = TXMD5GetHistoryCommand;

}).call(this);
