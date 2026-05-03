

(function () {
    var TXSieuTocGetSessionInfoCommand;

    TXSieuTocGetSessionInfoCommand = (function () {
        function TXSieuTocGetSessionInfoCommand() {

        }

        TXSieuTocGetSessionInfoCommand.prototype.execute = function (controller, sessionId) {
            var url = 'api/luckydicesieutoc/GetSessionInfo?sessionId=' + sessionId;

            return cc.ServerConnector.getInstance().sendRequest(cc.SubdomainName.TAI_XIU_SIEU_TOC, url, function (response) {
                var obj = JSON.parse(response);
                return controller.onTXGetSessionInfoResponse(obj);
            });
        };

        return TXSieuTocGetSessionInfoCommand;

    })();

    cc.TXSieuTocGetSessionInfoCommand = TXSieuTocGetSessionInfoCommand;

}).call(this);
