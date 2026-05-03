

(function () {
    var TXSieuTocGetHistoryJackpotCommand;

    TXSieuTocGetHistoryJackpotCommand = (function () {
        function TXSieuTocGetHistoryJackpotCommand() {
        }

        TXSieuTocGetHistoryJackpotCommand.prototype.execute = function (controller) {
            var url = 'api/luckydicesieutoc/GetJackpotsHis';

            return cc.ServerConnector.getInstance().sendRequest(cc.SubdomainName.TAI_XIU_SIEU_TOC, url, function (response) {
                var obj = JSON.parse(response);
                return controller.onTXGetHistoryResponse(obj);
            });
        };

        return TXSieuTocGetHistoryJackpotCommand;

    })();

    cc.TXSieuTocGetHistoryJackpotCommand = TXSieuTocGetHistoryJackpotCommand;

}).call(this);
