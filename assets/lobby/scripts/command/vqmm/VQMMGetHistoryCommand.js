

(function () {
    var VQMMGetHistoryCommand;

    VQMMGetHistoryCommand = (function () {
        function VQMMGetHistoryCommand() {

        }

        VQMMGetHistoryCommand.prototype.execute = function (controller) {
            var url = 'api/luckyrotation/GetHistory';

            return cc.ServerConnector.getInstance().sendRequest(cc.SubdomainName.VQMM, url, function (response) {
                var obj = JSON.parse(response);
                return controller.onVQMMGetHistoryResponse(obj);
            });
        };

        return VQMMGetHistoryCommand;

    })();

    cc.VQMMGetHistoryCommand = VQMMGetHistoryCommand;

}).call(this);
