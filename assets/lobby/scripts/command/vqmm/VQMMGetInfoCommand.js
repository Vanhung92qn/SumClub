

(function () {
    var VQMMGetInfoCommand;

    VQMMGetInfoCommand = (function () {
        function VQMMGetInfoCommand() {

        }

        VQMMGetInfoCommand.prototype.execute = function (controller) {
            var url = 'api/luckyrotation/GetAccountInfo';

            return cc.ServerConnector.getInstance().sendRequest(cc.SubdomainName.VQMM, url, function (response) {
                var obj = JSON.parse(response);
                return controller.onVQMMGetInfoResponse(obj);
            });
        };

        return VQMMGetInfoCommand;

    })();

    cc.VQMMGetInfoCommand = VQMMGetInfoCommand;

}).call(this);
