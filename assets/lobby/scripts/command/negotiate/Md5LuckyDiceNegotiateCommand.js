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

            return cc.ServerConnector.getInstance().sendRequest(cc.SubdomainName.TAI_XIU_MD5, url, function (response) {				
                var obj = JSON.parse(response);
				//console.log(obj);
                return controller.onLuckyDiceNegotiateResponse(obj);
            }, true);
        };

        return Md5LuckyDiceNegotiateCommand;

    })();

    cc.Md5LuckyDiceNegotiateCommand = Md5LuckyDiceNegotiateCommand;

}).call(this);
