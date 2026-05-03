

(function () {
    var TXMD5GetBigWinnersCommand;

    TXMD5GetBigWinnersCommand = (function () {
        function TXMD5GetBigWinnersCommand() {
        }

        TXMD5GetBigWinnersCommand.prototype.execute = function (controller) {
            var url = 'api/md5luckydice/GetBigWinner';

            return cc.ServerConnector.getInstance().sendRequest(cc.SubdomainName.TAI_XIU_MD5, url, function (response) {
                var obj = JSON.parse(response);
                return controller.onTXGetBigWinnersResponse(obj);
            });
        };

        return TXMD5GetBigWinnersCommand;

    })();

    cc.TXMD5GetBigWinnersCommand = TXMD5GetBigWinnersCommand;

}).call(this);
