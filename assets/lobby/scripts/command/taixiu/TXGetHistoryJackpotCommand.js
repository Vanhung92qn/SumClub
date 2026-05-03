

(function () {
    var TXGetHistoryJackpotCommand;

    TXGetHistoryJackpotCommand = (function () {
        function TXGetHistoryJackpotCommand() {
        }

        TXGetHistoryJackpotCommand.prototype.execute = function (controller) {
            var url = 'api/luckydice/GetJackpotsHis';

            return cc.ServerConnector.getInstance().sendRequest(cc.SubdomainName.TAI_XIU, url, function (response) {
                var obj = JSON.parse(response);
                return controller.onTXGetHistoryResponse(obj);
            });
        };

        TXGetHistoryJackpotCommand.prototype.executeSieuToc = function (controller) {
            var url = 'api/luckydicesieutoc/GetJackpotsHis';

            return cc.ServerConnector.getInstance().sendRequest(cc.SubdomainName.TAI_XIU_SIEU_TOC, url, function (response) {
                var obj = JSON.parse(response);
                return controller.onTXGetHistoryResponse(obj);
            });
        };

        return TXGetHistoryJackpotCommand;

    })();

    cc.TXGetHistoryJackpotCommand = TXGetHistoryJackpotCommand;

}).call(this);
