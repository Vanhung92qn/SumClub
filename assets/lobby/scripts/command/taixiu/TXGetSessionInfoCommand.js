

(function () {
    var TXGetSessionInfoCommand;

    TXGetSessionInfoCommand = (function () {
        function TXGetSessionInfoCommand() {

        }

        TXGetSessionInfoCommand.prototype.execute = function (controller, sessionId) {
            var url = 'api/luckydice/GetSessionInfo?sessionId=' + sessionId;

            return cc.ServerConnector.getInstance().sendRequest(cc.SubdomainName.TAI_XIU, url, function (response) {
                var obj = JSON.parse(response);
                return controller.onTXGetSessionInfoResponse(obj);
            });
        };

        TXGetSessionInfoCommand.prototype.executeSieuToc = function (controller, sessionId) {
            var url = 'api/luckydicesieutoc/GetSessionInfo?sessionId=' + sessionId;

            return cc.ServerConnector.getInstance().sendRequest(cc.SubdomainName.TAI_XIU_SIEU_TOC, url, function (response) {
                var obj = JSON.parse(response);
                return controller.onTXGetSessionInfoResponse(obj);
            });
        };

        return TXGetSessionInfoCommand;

    })();

    cc.TXGetSessionInfoCommand = TXGetSessionInfoCommand;

}).call(this);
