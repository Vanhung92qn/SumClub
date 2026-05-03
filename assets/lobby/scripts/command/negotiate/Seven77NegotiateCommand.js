/**
 * Created by Nofear on 2/27/2019.
 */

(function () {
    var Seven77NegotiateCommand;

    Seven77NegotiateCommand = (function () {
        function Seven77NegotiateCommand() {
        }

        Seven77NegotiateCommand.prototype.execute = function (controller) {
            var url = 'signalr/negotiate';

            return cc.ServerConnector.getInstance().sendRequest(cc.SubdomainName.SEVEN77, url, function (response) {
                var obj = JSON.parse(response);

                return controller.onSeven77NegotiateResponse(obj);

            }, true);
        };

        return Seven77NegotiateCommand;

    })();

    cc.Seven77NegotiateCommand = Seven77NegotiateCommand;

}).call(this);
