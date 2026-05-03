/**
 * Created by Nofear on 2/27/2019.
 */

(function () {
    var MiniPokerNegotiateCommand;

    MiniPokerNegotiateCommand = (function () {
        function MiniPokerNegotiateCommand() {
        }

        MiniPokerNegotiateCommand.prototype.execute = function (controller) {
            var url = 'signalr/negotiate';

            return cc.ServerConnector.getInstance().sendRequest(cc.SubdomainName.MINI_POKER, url, function (response) {
                var obj = JSON.parse(response);

                return controller.onMiniPokerNegotiateResponse(obj);

            }, true);
        };

        return MiniPokerNegotiateCommand;

    })();

    cc.MiniPokerNegotiateCommand = MiniPokerNegotiateCommand;

}).call(this);
