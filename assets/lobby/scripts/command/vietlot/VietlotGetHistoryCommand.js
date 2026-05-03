
(function () {
    var VietlotGetHistoryCommand;

    VietlotGetHistoryCommand = (function () {
        function VietlotGetHistoryCommand() {
        }

        VietlotGetHistoryCommand.prototype.execute = function (controller, sessionID) {
            var url = 'api/VietLott/GetHistory?sessionId='+sessionID;//>0: 1 phien, -1: all

            return cc.ServerConnector.getInstance().sendRequest(cc.SubdomainName.VIETLOT, url, function (response) {
                var obj = JSON.parse(response);
                return controller.onVietlotGetHistoryResponse(obj);
            });
        };

        return VietlotGetHistoryCommand;

    })();

    cc.VietlotGetHistoryCommand = VietlotGetHistoryCommand;

}).call(this);
