
/**
 * Created by Nofear on 2/27/2019.
 */

(function () {
    var GetEventTopVPCommand;

    GetEventTopVPCommand = (function () {
        function GetEventTopVPCommand() {
        }

        GetEventTopVPCommand.prototype.execute = function (controller) {
            var url = 'api/Quay/GetHonors?DateEvent=' + controller.dateSelected;

            return cc.ServerConnector.getInstance().sendRequest(cc.SubdomainName.EVENT, url, function (response) {
                var obj = JSON.parse(response);
                controller.onGetEventTopVPResponse(obj);
            });
        };

        return GetEventTopVPCommand;

    })();

    cc.GetEventTopVPCommand = GetEventTopVPCommand;

}).call(this);
