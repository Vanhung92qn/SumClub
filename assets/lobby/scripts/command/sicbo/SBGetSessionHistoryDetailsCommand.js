

(function () {
    var SBGetSessionHistoryDetailsCommand;

    SBGetSessionHistoryDetailsCommand = (function () {
        function SBGetSessionHistoryDetailsCommand() {
        }

        SBGetSessionHistoryDetailsCommand.prototype.execute = function (controller) {
            var url = 'api/sicbo/GetSessionHistoryDetails?top=100';
            return cc.ServerConnector.getInstance().sendRequest(cc.SubdomainName.SICBO, url, function (response) {
                var obj = JSON.parse(response);
                return controller.onSBGetSessionHistoryDetailsResponse(obj);
            });
        };

        return SBGetSessionHistoryDetailsCommand;

    })();

    cc.SBGetSessionHistoryDetailsCommand = SBGetSessionHistoryDetailsCommand;

}).call(this);
