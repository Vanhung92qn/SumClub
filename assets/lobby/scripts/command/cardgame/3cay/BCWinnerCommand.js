/**
 * Created by BeChicken on 8/6/2019.
 * Vsersion 1.0
 */
(function () {
    var BCWinnerCommand;

    BCWinnerCommand = (function () {
        function BCWinnerCommand() {
        }

        BCWinnerCommand.prototype.execute = function (controller) {
            var url = 'api/BaCay/GetTop';

            return cc.ServerConnector.getInstance().sendRequest(cc.SubdomainName.THREE_CARDS, url, function (response) {
                var obj = JSON.parse(response);
                return controller.onBCGetBigWinnerResponse(obj);
            });
        };

        return BCWinnerCommand;

    })();

    cc.BCWinnerCommand = BCWinnerCommand;

}).call(this);