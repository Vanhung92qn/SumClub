

(function () {
    var TXGetEventHonorsCommand;

    TXGetEventHonorsCommand = (function () {
        function TXGetEventHonorsCommand() {
        }

        TXGetEventHonorsCommand.prototype.execute = function (controller) {

            var url = 'api/luckydice/GetEventHonors?top=100'
                + '&cordType=' + controller.cordType
                + '&recallCode=' + controller.recallCode;

            return cc.ServerConnector.getInstance().sendRequest(cc.SubdomainName.TAI_XIU, url, function (response) {
                var obj = JSON.parse(response);
                return controller.onTXGetEventHonorsResponse(obj);
            });
        };

        return TXGetEventHonorsCommand;

    })();

    cc.TXGetEventHonorsCommand = TXGetEventHonorsCommand;

}).call(this);
