/**
 * Created by Nofear on 2/27/2019.
 */

(function () {
    var TKNegotiateCommand;

    TKNegotiateCommand = (function () {
        function TKNegotiateCommand() {
        }

        TKNegotiateCommand.prototype.execute = function (controller) {
            var url = 'signalr/negotiate';

            return cc.ServerConnector.getInstance().sendRequest(cc.SubdomainName.THREE_KINGDOM, url, function (response) {
                var obj = JSON.parse(response);

                return controller.onSlotsNegotiateResponse(obj);

            }, true);
        };

        return TKNegotiateCommand;

    })();

    cc.TKNegotiateCommand = TKNegotiateCommand;

}).call(this);
