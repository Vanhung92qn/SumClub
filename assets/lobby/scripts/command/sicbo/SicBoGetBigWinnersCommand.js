

(function () {
    var SBGetBigWinnersCommand;

    SBGetBigWinnersCommand = (function () {
        function SBGetBigWinnersCommand() {
        }

        SBGetBigWinnersCommand.prototype.execute = function (controller) {
            var url = 'api/sicbo/GetBigWinner';

            return cc.ServerConnector.getInstance().sendRequest(cc.SubdomainName.SICBO, url, function (response) {
                var obj = JSON.parse(response);
                return controller.onSBGetBigWinnersResponse(obj);
            });
        };

        return SBGetBigWinnersCommand;

    })();

    cc.SBGetBigWinnersCommand = SBGetBigWinnersCommand;

}).call(this);
