(function () {
    var LodeWinnerCommand;

    LodeWinnerCommand = (function () {
        function LodeWinnerCommand() {
        }

        LodeWinnerCommand.prototype.execute = function (controller, openDate) {
            let url = 'api/Xoso/GetBigWinner?openDate='+openDate;
            let subDomainName = cc.SubdomainName.LODE;
            return cc.ServerConnector.getInstance().sendRequest(subDomainName, url, function (response) {
                var obj = JSON.parse(response);
                return controller.onGetBigWinnerResponse(obj);
            });
        };

        return LodeWinnerCommand;

    })();

    cc.LodeWinnerCommand = LodeWinnerCommand;

}).call(this);
