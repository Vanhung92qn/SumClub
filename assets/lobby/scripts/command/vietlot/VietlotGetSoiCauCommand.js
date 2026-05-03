
(function () {
    var VietlotGetSoiCauCommand;

    VietlotGetSoiCauCommand = (function () {
        function VietlotGetSoiCauCommand() {
        }

        VietlotGetSoiCauCommand.prototype.execute = function (controller) {
            var url = 'api/VietLott/GetSoiCau';

            return cc.ServerConnector.getInstance().sendRequest(cc.SubdomainName.VIETLOT, url, function (response) {
                var obj = JSON.parse(response);
                return controller.onVietlotGetSoiCauResponse(obj);
            });
        };

        return VietlotGetSoiCauCommand;

    })();

    cc.VietlotGetSoiCauCommand = VietlotGetSoiCauCommand;

}).call(this);
