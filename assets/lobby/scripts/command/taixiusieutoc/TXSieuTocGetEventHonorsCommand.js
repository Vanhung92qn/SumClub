

(function () {
    var TXSieuTocGetEventHonorsCommand;

    TXSieuTocGetEventHonorsCommand = (function () {
        function TXSieuTocGetEventHonorsCommand() {
        }

        TXSieuTocGetEventHonorsCommand.prototype.execute = function (controller) {

            var url = 'api/luckydicesieutoc/GetEventHonors?top=100'
                + '&cordType=' + controller.cordType
                + '&recallCode=' + controller.recallCode;

            return cc.ServerConnector.getInstance().sendRequest(cc.SubdomainName.TAI_XIU_SIEU_TOC, url, function (response) {
                var obj = JSON.parse(response);
                return controller.onTXGetEventHonorsResponse(obj);
            });
        };

        return TXSieuTocGetEventHonorsCommand;

    })();

    cc.TXSieuTocGetEventHonorsCommand = TXSieuTocGetEventHonorsCommand;

}).call(this);
