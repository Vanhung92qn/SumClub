/**
 * Created by Nofear on 2/27/2019.
 */

(function () {
    var Md5LuckyDiceNegotiateCommand;

    Md5LuckyDiceNegotiateCommand = (function () {
        function Md5LuckyDiceNegotiateCommand() {
        }

        Md5LuckyDiceNegotiateCommand.prototype.execute = function (controller) {
            var url = 'signalr/negotiate';

            console.log('[TXMD5-DEBUG] NegotiateCommand.execute: subdomain=', cc.SubdomainName.TAI_XIU_MD5, 'url=', url);
            return cc.ServerConnector.getInstance().sendRequest(cc.SubdomainName.TAI_XIU_MD5, url, function (response) {
                console.log('[TXMD5-DEBUG] NegotiateCommand.callback: response received, len=', response && response.length);
                var obj = JSON.parse(response);
				//console.log(obj);
                return controller.onLuckyDiceNegotiateResponse(obj);
            }, true);
        };

        return Md5LuckyDiceNegotiateCommand;

    })();

    cc.Md5LuckyDiceNegotiateCommand = Md5LuckyDiceNegotiateCommand;

}).call(this);
