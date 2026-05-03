/**
 * Created by Nofear on 2/27/2019.
 */

(function () {
    var EgyptNegotiateCommand;

    EgyptNegotiateCommand = (function () {
        function EgyptNegotiateCommand() {
        }

        EgyptNegotiateCommand.prototype.execute = function (controller) {
            var url = 'signalr/negotiate';

            return cc.ServerConnector.getInstance().sendRequest(cc.SubdomainName.EGYPT, url, function (response) {
                var obj = JSON.parse(response);
                return controller.onSlotsNegotiateResponse(obj);
            }, true);
        };

        return EgyptNegotiateCommand;

    })();

    cc.EgyptNegotiateCommand = EgyptNegotiateCommand;

}).call(this);
