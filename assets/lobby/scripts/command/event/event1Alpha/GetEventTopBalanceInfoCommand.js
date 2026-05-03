
/**
 * Created by Nofear on 2/27/2019.
 */

(function () {
    var GetEventTopBalanceInfoCommand;

    GetEventTopBalanceInfoCommand = (function () {
        function GetEventTopBalanceInfoCommand() {
        }

        GetEventTopBalanceInfoCommand.prototype.execute = function (controller) {
            var url = 'api/event/GetTopBalanceInfo'; //top (default=50)

            return cc.ServerConnector.getInstance().sendRequest(cc.SubdomainName.EVENT, url, function (response) {
                var obj = JSON.parse(response);
                controller.onGetTopEventResponse(obj);
            });
        };

        return GetEventTopBalanceInfoCommand;

    })();

    cc.GetEventTopBalanceInfoCommand = GetEventTopBalanceInfoCommand;

}).call(this);
