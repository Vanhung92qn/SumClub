

(function () {
    var TXSieuTocGetHistoryCommand;

    TXSieuTocGetHistoryCommand = (function () {
        function TXSieuTocGetHistoryCommand() {
        }

        TXSieuTocGetHistoryCommand.prototype.execute = function (controller) {
            var url = 'api/luckydicesieutoc/GetHistory';

            return cc.ServerConnector.getInstance().sendRequest(cc.SubdomainName.TAI_XIU_SIEU_TOC, url, function (response) {
                var obj = JSON.parse(response);
                console.log(obj);
                return controller.onTXGetHistoryResponse(obj);
            });
        };

        return TXSieuTocGetHistoryCommand;

    })();

    cc.TXSieuTocGetHistoryCommand = TXSieuTocGetHistoryCommand;

}).call(this);
