/**
 * Created by Nobita on 01/15/2022.
 */

(function () {
    var SicBoNegotiateCommand;

    SicBoNegotiateCommand = (function () {
        function SicBoNegotiateCommand() {
        }

        SicBoNegotiateCommand.prototype.execute = function (controller) {
            var url = 'signalr/negotiate';
			console.log('Connect to hub');
            return cc.ServerConnector.getInstance().sendRequest(cc.SubdomainName.SICBO, url, function (response) {				
                var obj = JSON.parse(response);
                return controller.onSicBoNegotiateResponse(obj);
				console.log(obj);
            }, true);
        };

        return SicBoNegotiateCommand;

    })();

    cc.SicBoNegotiateCommand = SicBoNegotiateCommand;

}).call(this);
