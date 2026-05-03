/**
 * Created by Nofear on 2/27/2019.
 */

(function () {
    var ThuongHaiNegotiateCommand;

    ThuongHaiNegotiateCommand = (function () {
        function ThuongHaiNegotiateCommand() {
        }

        ThuongHaiNegotiateCommand.prototype.execute = function (controller) {
            var url = 'signalr/negotiate';
            return cc.ServerConnector.getInstance().sendRequest(cc.SubdomainName.THUONGHAI, url, function (response) {

                var obj = JSON.parse(response);

                return controller.onSlotsNegotiateResponse(obj);

            }, true);
        };

        return ThuongHaiNegotiateCommand;

    })();

    cc.ThuongHaiNegotiateCommand = ThuongHaiNegotiateCommand;

}).call(this);
