/**
 * Created by Nofear on 2/27/2019.
 */

(function () {
    var NegotiateCommand;

    NegotiateCommand = (function () {
        function NegotiateCommand() {
        }

        NegotiateCommand.prototype.execute = function (controller, subDomainName) {
            var url = 'signalr/negotiate';
            return cc.ServerConnector.getInstance().sendRequest(subDomainName, url, function (response) {
                cc.PopupController.getInstance().hideBusy();
                var obj = JSON.parse(response);
                return controller.onSlotsNegotiateResponse(obj);

            }, true);
        };

        return NegotiateCommand;

    })();

    cc.NegotiateCommand = NegotiateCommand;

}).call(this);
