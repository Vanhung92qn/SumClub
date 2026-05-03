
(function () {
    var VietlotGetTopCommand;

    VietlotGetTopCommand = (function () {
        function VietlotGetTopCommand() {
        }

        VietlotGetTopCommand.prototype.execute = function (controller) {
            var url = 'api/VietLott/GetBigWinner';

            return cc.ServerConnector.getInstance().sendRequest(cc.SubdomainName.VIETLOT, url, function (response) {
                var obj = JSON.parse(response);
                return controller.onVietlotGetTopResponse(obj);
            });
        };

        return VietlotGetTopCommand;

    })();

    cc.VietlotGetTopCommand = VietlotGetTopCommand;

}).call(this);
