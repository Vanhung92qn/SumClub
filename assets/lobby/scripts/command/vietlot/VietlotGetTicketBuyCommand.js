
(function () {
    var VietlotGetTicketBuyCommand;

    VietlotGetTicketBuyCommand = (function () {
        function VietlotGetTicketBuyCommand() {
        }

        VietlotGetTicketBuyCommand.prototype.execute = function (controller, sessionID) {
            var url = 'api/VietLott/GetHistory?sessionId='+sessionID;//>0: phien hien tai, -1: all

            return cc.ServerConnector.getInstance().sendRequest(cc.SubdomainName.VIETLOT, url, function (response) {
                var obj = JSON.parse(response);
                return controller.onVietlotGetTicketBuyResponse(obj);
            });
        };

        return VietlotGetTicketBuyCommand;

    })();

    cc.VietlotGetTicketBuyCommand = VietlotGetTicketBuyCommand;

}).call(this);
