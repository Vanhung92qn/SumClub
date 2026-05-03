

(function () {
    var MonkeyGetSoiCauCommand;

    MonkeyGetSoiCauCommand = (function () {
        function MonkeyGetSoiCauCommand() {
        }

        MonkeyGetSoiCauCommand.prototype.execute = function (controller) {
            var url = 'api/Game/GetSoiCau';

            return cc.ServerConnector.getInstance().sendRequest(cc.SubdomainName.MONKEY, url, function (response) {
                var obj = JSON.parse(response);
                return controller.onMonkeyGetSoiCauResponse(obj);
            });
        };

        return MonkeyGetSoiCauCommand;

    })();

    cc.MonkeyGetSoiCauCommand = MonkeyGetSoiCauCommand;

}).call(this);
