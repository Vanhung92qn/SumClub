/**
 * Lay top phien Jackpot Sicbo cho popup SicBoJackpotHistoryView.
 * Endpoint server: api/sicbo/GetJackpotsHis (giu nguyen URL cu - server da co).
 */

(function () {
    var SBGetHistoryJackpotCommand;

    SBGetHistoryJackpotCommand = (function () {
        function SBGetHistoryJackpotCommand() {
        }

        SBGetHistoryJackpotCommand.prototype.execute = function (controller) {
            var url = 'api/sicbo/GetJackpotsHis';

            return cc.ServerConnector.getInstance().sendRequest(cc.SubdomainName.SICBO, url, function (response) {
                var obj = JSON.parse(response);
                return controller.onSBGetHistoryJackpotResponse(obj);
            });
        };

        return SBGetHistoryJackpotCommand;
    })();

    cc.SBGetHistoryJackpotCommand = SBGetHistoryJackpotCommand;
}).call(this);
