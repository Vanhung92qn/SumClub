/**
 * Created by Nofear on 2/27/2019.
 */

(function () {
    var AquariumNegotiateCommand;

    AquariumNegotiateCommand = (function () {
        function AquariumNegotiateCommand() {
        }

        AquariumNegotiateCommand.prototype.execute = function (controller) {
            var url = 'signalr/negotiate';
            return cc.ServerConnector.getInstance().sendRequest(cc.SubdomainName.AQUARIUM, url, function (response) {

                var obj = JSON.parse(response);

                return controller.onSlotsNegotiateResponse(obj);

            }, true);
        };

        return AquariumNegotiateCommand;

    })();

    cc.AquariumNegotiateCommand = AquariumNegotiateCommand;

}).call(this);
