/**
 * Created by Nofear on 2/27/2019.
 */

(function () {
    var CowboyNegotiateCommand;

    CowboyNegotiateCommand = (function () {
        function CowboyNegotiateCommand() {
        }

        CowboyNegotiateCommand.prototype.execute = function (controller) {
            var url = 'signalr/negotiate';

            return cc.ServerConnector.getInstance().sendRequest(cc.SubdomainName.COWBOY, url, function (response) {
                var obj = JSON.parse(response);

                return controller.onSlotsNegotiateResponse(obj);

            }, true);
        };

        return CowboyNegotiateCommand;

    })();

    cc.CowboyNegotiateCommand = CowboyNegotiateCommand;

}).call(this);
