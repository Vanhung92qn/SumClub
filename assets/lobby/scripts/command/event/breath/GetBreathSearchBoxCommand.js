
/**
 * Created by Nofear on 2/27/2019.
 */

(function () {
    var GetBreathSearchBoxCommand;

    GetBreathSearchBoxCommand = (function () {
        function GetBreathSearchBoxCommand() {
        }

        GetBreathSearchBoxCommand.prototype.execute = function (controller) {
            var url = 'api/ShortBreath/GetSbSearchBox';

            return cc.ServerConnector.getInstance().sendRequest(cc.SubdomainName.EVENT, url, function (response) {
                var obj = JSON.parse(response);
                controller.onGetBreathSearchBoxResponse(obj);
            });
        };

        return GetBreathSearchBoxCommand;

    })();

    cc.GetBreathSearchBoxCommand = GetBreathSearchBoxCommand;

}).call(this);
