

(function () {
    var TXGetEventSearchBoxCommand;

    TXGetEventSearchBoxCommand = (function () {
        function TXGetEventSearchBoxCommand() {
        }

        TXGetEventSearchBoxCommand.prototype.execute = function (controller) {
            var url = 'api/luckydice/GetEventSearchBox';

            return cc.ServerConnector.getInstance().sendRequest(cc.SubdomainName.TAI_XIU, url, function (response) {
                var obj = JSON.parse(response);
                return controller.onTXGetEventSearchBoxResponse(obj);
            });
        };

        TXGetEventSearchBoxCommand.prototype.executeSieuToc = function (controller) {
            var url = 'api/luckydicesieutoc/GetEventSearchBox';

            return cc.ServerConnector.getInstance().sendRequest(cc.SubdomainName.TAI_XIU_SIEU_TOC, url, function (response) {
                var obj = JSON.parse(response);
                return controller.onTXGetEventSearchBoxResponse(obj);
            });
        };

        return TXGetEventSearchBoxCommand;

    })();

    cc.TXGetEventSearchBoxCommand = TXGetEventSearchBoxCommand;

}).call(this);
