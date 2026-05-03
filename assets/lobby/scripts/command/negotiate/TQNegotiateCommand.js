/**
 * Created by Nofear on 2/27/2019.
 */

(function () {
    var TQNegotiateCommand;

    TQNegotiateCommand = (function () {
        function TQNegotiateCommand() {
        }

        TQNegotiateCommand.prototype.execute = function (controller) {
            var url = 'signalr/negotiate';

            return cc.ServerConnector.getInstance().sendRequest(cc.SubdomainName.BLOCK_BUSTER, url, function (response) {
                var obj = JSON.parse(response);

                return controller.onTQNegotiateResponse(obj);

            }, true);
        };

        return TQNegotiateCommand;

    })();

    cc.TQNegotiateCommand = TQNegotiateCommand;

}).call(this);
