/**
 * Created by Nofear on 2/27/2019.
 */

(function () {
    var GaiNhayNegotiateCommand;

    GaiNhayNegotiateCommand = (function () {
        function GaiNhayNegotiateCommand() {
        }

        GaiNhayNegotiateCommand.prototype.execute = function (controller) {
            var url = 'signalr/negotiate';

            return cc.ServerConnector.getInstance().sendRequest(cc.SubdomainName.GAINHAY, url, function (response) {
                var obj = JSON.parse(response);
                return controller.onSlotsNegotiateResponse(obj);
            }, true);
        };

        return GaiNhayNegotiateCommand;

    })();

    cc.GaiNhayNegotiateCommand = GaiNhayNegotiateCommand;

}).call(this);
