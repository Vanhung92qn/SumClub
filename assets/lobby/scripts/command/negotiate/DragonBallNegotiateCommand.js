/**
 * Created by Nofear on 2/27/2019.
 */

(function () {
    var DragonBallNegotiateCommand;

    DragonBallNegotiateCommand = (function () {
        function DragonBallNegotiateCommand() {
        }

        DragonBallNegotiateCommand.prototype.execute = function (controller) {
            var url = 'signalr/negotiate';

            return cc.ServerConnector.getInstance().sendRequest(cc.SubdomainName.DRAGON_BALL, url, function (response) {
                var obj = JSON.parse(response);

                return controller.onSlotsNegotiateResponse(obj);

            }, true);
        };

        return DragonBallNegotiateCommand;

    })();

    cc.DragonBallNegotiateCommand = DragonBallNegotiateCommand;

}).call(this);
