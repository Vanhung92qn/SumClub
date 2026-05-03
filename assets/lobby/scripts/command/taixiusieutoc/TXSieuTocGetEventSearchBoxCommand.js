

(function () {
    var TXSieuTocGetEventSearchBoxCommand;

    TXSieuTocGetEventSearchBoxCommand = (function () {
        function TXSieuTocGetEventSearchBoxCommand() {
        }

        TXSieuTocGetEventSearchBoxCommand.prototype.execute = function (controller) {
            var url = 'api/luckydicesieutoc/GetEventSearchBox';

            return cc.ServerConnector.getInstance().sendRequest(cc.SubdomainName.TAI_XIU_SIEU_TOC, url, function (response) {
                var obj = JSON.parse(response);
                return controller.onTXGetEventSearchBoxResponse(obj);
            });
        };

        return TXSieuTocGetEventSearchBoxCommand;

    })();

    cc.TXSieuTocGetEventSearchBoxCommand = TXSieuTocGetEventSearchBoxCommand;

}).call(this);
