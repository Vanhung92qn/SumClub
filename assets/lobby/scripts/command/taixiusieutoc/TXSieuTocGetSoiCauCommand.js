

(function () {
    var TXSieuTocGetSoiCauCommand;

    TXSieuTocGetSoiCauCommand = (function () {
        function TXSieuTocGetSoiCauCommand() {
        }

        TXSieuTocGetSoiCauCommand.prototype.execute = function (controller) {
            var url = 'api/luckydicesieutoc/GetSoiCau';

            return cc.ServerConnector.getInstance().sendRequest(cc.SubdomainName.TAI_XIU_SIEU_TOC, url, function (response) {
                var obj = JSON.parse(response);
                return controller.onTXGetSoiCauResponse(obj);
            });
        };

        return TXSieuTocGetSoiCauCommand;

    })();

    cc.TXSieuTocGetSoiCauCommand = TXSieuTocGetSoiCauCommand;

}).call(this);
