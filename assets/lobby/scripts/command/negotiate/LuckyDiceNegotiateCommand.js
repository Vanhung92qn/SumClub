/**
 * Created by Nofear on 2/27/2019.
 */

(function () {
    var LuckyDiceNegotiateCommand;

    LuckyDiceNegotiateCommand = (function () {
        function LuckyDiceNegotiateCommand() {
        }

        LuckyDiceNegotiateCommand.prototype.execute = function (controller) {
            var url = 'signalr/negotiate';

            return cc.ServerConnector.getInstance().sendRequest(cc.SubdomainName.TAI_XIU, url, function (response) {
                var obj = JSON.parse(response);
				//console.log(obj);

                return controller.onLuckyDiceNegotiateResponse(obj);

            }, true);
        };

        return LuckyDiceNegotiateCommand;

    })();

    cc.LuckyDiceNegotiateCommand = LuckyDiceNegotiateCommand;

}).call(this);
