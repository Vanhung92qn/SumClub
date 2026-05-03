/**
 * Created by Nofear on 2/27/2019.
 */

(function () {
    var PortalNegotiateCommand;

    PortalNegotiateCommand = (function () {
        function PortalNegotiateCommand() {
        }

        PortalNegotiateCommand.prototype.execute = function (controller) {
            var url = 'signalr/negotiate';

            return cc.ServerConnector.getInstance().sendRequest(cc.SubdomainName.PORTAL, url, function (response) {
                var obj = JSON.parse(response);

                return controller.onPortalNegotiateResponse(obj);

            }, true);
        };

        return PortalNegotiateCommand;

    })();

    cc.PortalNegotiateCommand = PortalNegotiateCommand;

}).call(this);
