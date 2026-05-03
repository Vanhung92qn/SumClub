
/**
 * Created by Nofear on 2/27/2019.
 */

(function () {
    var GetEventsCommand;

    GetEventsCommand = (function () {
        function GetEventsCommand() {
        }

        GetEventsCommand.prototype.execute = function (controller) {
            var url = 'api/ShortBreath/GetSbHappenning';

            return cc.ServerConnector.getInstance().sendRequest(cc.SubdomainName.EVENT, url, function (response) {
                var obj = JSON.parse(response);
                controller.onGetEventsResponse(obj);
            });
        };

        return GetEventsCommand;

    })();

    cc.GetEventsCommand = GetEventsCommand;

}).call(this);
