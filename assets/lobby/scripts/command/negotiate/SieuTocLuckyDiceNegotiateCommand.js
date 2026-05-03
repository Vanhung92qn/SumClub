/**
 * Created by Nofear on 2/27/2019.
 */

(function () {
    var SieuTocLuckyDiceNegotiateCommand;

    SieuTocLuckyDiceNegotiateCommand = (function () {
        function SieuTocLuckyDiceNegotiateCommand() {
        }

        SieuTocLuckyDiceNegotiateCommand.prototype.execute = function (controller) {
            var url = 'signalr/negotiate';

            return cc.ServerConnector.getInstance().sendRequest(cc.SubdomainName.TAI_XIU_SIEU_TOC, url, function (response) {
                var obj = JSON.parse(response);
				//console.log(obj);

                return controller.onLuckyDiceNegotiateResponse(obj);

            }, true);
        };

        return SieuTocLuckyDiceNegotiateCommand;

    })();

    cc.SieuTocLuckyDiceNegotiateCommand = SieuTocLuckyDiceNegotiateCommand;

}).call(this);
