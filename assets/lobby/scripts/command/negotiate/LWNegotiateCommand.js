/**
 * Created by Nofear on 2/27/2019.
 */

(function () {
    var LWNegotiateCommand;

    LWNegotiateCommand = (function () {
        function LWNegotiateCommand() {
        }

        LWNegotiateCommand.prototype.execute = function (controller) {
            var url = 'signalr/negotiate';

            return cc.ServerConnector.getInstance().sendRequest(cc.SubdomainName.LUCKY_WILD, url, function (response) {
                var obj = JSON.parse(response);

                return controller.onLWNegotiateResponse(obj);

            }, true);
        };

        return LWNegotiateCommand;

    })();

    cc.LWNegotiateCommand = LWNegotiateCommand;

}).call(this);
