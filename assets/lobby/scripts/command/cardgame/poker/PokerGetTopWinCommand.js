/**
 * Created by Nofear on 2/27/2019.
 */

(function () {
    var PokerGetTopWinCommand;

    PokerGetTopWinCommand = (function () {
        function PokerGetTopWinCommand() {
        }

        PokerGetTopWinCommand.prototype.execute = function (controller) {
            var url = 'api/Poker/GetTopRanks';

            return cc.ServerConnector.getInstance().sendRequest(cc.SubdomainName.TEXAS_POKER, url, function (response) {
                var obj = JSON.parse(response);
                return controller.onPokerGetTopWinResponse(obj);
            });
        };

        return PokerGetTopWinCommand;

    })();

    cc.PokerGetTopWinCommand = PokerGetTopWinCommand;

}).call(this);
