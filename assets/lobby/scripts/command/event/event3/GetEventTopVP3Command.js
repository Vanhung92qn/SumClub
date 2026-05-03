
/**
 * Created by Nofear on 2/27/2019.
 */

(function () {
    var GetEventTopVP3Command;

    GetEventTopVP3Command = (function () {
        function GetEventTopVP3Command() {
        }

        GetEventTopVP3Command.prototype.execute = function (controller) {
            var url = 'api/EventT9/GetHonors?' + 'weekId=' + controller.weekID;

            return cc.ServerConnector.getInstance().sendRequest(cc.SubdomainName.EVENT, url, function (response) {
                var obj = JSON.parse(response);
                controller.onGetEventTopVP3Response(obj);
            });
        };

        return GetEventTopVP3Command;

    })();

    cc.GetEventTopVP3Command = GetEventTopVP3Command;

}).call(this);
