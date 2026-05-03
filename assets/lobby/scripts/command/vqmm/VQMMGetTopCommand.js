

(function () {
    var VQMMGetTopCommand;

    VQMMGetTopCommand = (function () {
        function VQMMGetTopCommand() {
        }

        VQMMGetTopCommand.prototype.execute = function (controller) {
            var url = 'api/luckyrotation/GetBigWinner';

            return cc.ServerConnector.getInstance().sendRequest(cc.SubdomainName.VQMM, url, function (response) {
                var obj = JSON.parse(response);
                return controller.onVQMMGetTopResponse(obj);
            });
        };

        return VQMMGetTopCommand;

    })();

    cc.VQMMGetTopCommand = VQMMGetTopCommand;

}).call(this);
