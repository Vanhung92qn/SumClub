

(function () {
    var TXGetSoiCauCommand;

    TXGetSoiCauCommand = (function () {
        function TXGetSoiCauCommand() {
        }

        TXGetSoiCauCommand.prototype.execute = function (controller) {
            var url = 'api/luckydice/GetSoiCau';

            return cc.ServerConnector.getInstance().sendRequest(cc.SubdomainName.TAI_XIU, url, function (response) {
                var obj = JSON.parse(response);
                return controller.onTXGetSoiCauResponse(obj);
            });
        };

        TXGetSoiCauCommand.prototype.executeSieuToc = function (controller) {
            var url = 'api/luckydicesieutoc/GetSoiCau';

            return cc.ServerConnector.getInstance().sendRequest(cc.SubdomainName.TAI_XIU_SIEU_TOC, url, function (response) {
                var obj = JSON.parse(response);
                return controller.onTXGetSoiCauResponse(obj);
            });
        };

        return TXGetSoiCauCommand;

    })();

    cc.TXGetSoiCauCommand = TXGetSoiCauCommand;

}).call(this);
