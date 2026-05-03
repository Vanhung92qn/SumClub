

(function () {
    var TXSieuTocGetBigWinnersCommand;

    TXSieuTocGetBigWinnersCommand = (function () {
        function TXSieuTocGetBigWinnersCommand() {
        }

        TXSieuTocGetBigWinnersCommand.prototype.execute = function (controller) {
            var url = 'api/luckydicesieutoc/GetBigWinner';

            return cc.ServerConnector.getInstance().sendRequest(cc.SubdomainName.TAI_XIU_SIEU_TOC, url, function (response) {
                var obj = JSON.parse(response);
                return controller.onTXGetBigWinnersResponse(obj);
            });
        };

        return TXSieuTocGetBigWinnersCommand;

    })();

    cc.TXSieuTocGetBigWinnersCommand = TXSieuTocGetBigWinnersCommand;

}).call(this);
