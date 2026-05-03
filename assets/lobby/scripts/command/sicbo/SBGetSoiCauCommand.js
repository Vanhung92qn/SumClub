

(function () {
    var SBGetSoiCauCommand;

    SBGetSoiCauCommand = (function () {
        function SBGetSoiCauCommand() {
        }

        SBGetSoiCauCommand.prototype.execute = function (controller) {
            var url = 'api/sicbo/GetSoiCau';

            return cc.ServerConnector.getInstance().sendRequest(cc.SubdomainName.SICBO, url, function (response) {
                var obj = JSON.parse(response);
                return controller.onSBGetSoiCauResponse(obj);
            });
        };

        return SBGetSoiCauCommand;

    })();

    cc.SBGetSoiCauCommand = SBGetSoiCauCommand;

}).call(this);
