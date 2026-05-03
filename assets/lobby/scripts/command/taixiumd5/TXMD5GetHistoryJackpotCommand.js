

(function () {
    var TXMD5GetHistoryJackpotCommand;

    TXMD5GetHistoryJackpotCommand = (function () {
        function TXMD5GetHistoryJackpotCommand() {
        }

        TXMD5GetHistoryJackpotCommand.prototype.execute = function (controller) {
            var url = 'api/md5luckydice/GetJackpotsHis';

            return cc.ServerConnector.getInstance().sendRequest(cc.SubdomainName.TAI_XIU_MD5, url, function (response) {
                var obj = JSON.parse(response);
                return controller.onTXGetHistoryResponse(obj);
            });
        };

        return TXMD5GetHistoryJackpotCommand;

    })();

    cc.TXMD5GetHistoryJackpotCommand = TXMD5GetHistoryJackpotCommand;

}).call(this);
