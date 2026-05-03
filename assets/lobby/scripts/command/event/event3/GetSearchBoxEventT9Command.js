
/**
 * Created by Nofear on 2/27/2019.
 */

(function () {
    var GetSearchBoxEventT9Command;

    GetSearchBoxEventT9Command = (function () {
        function GetSearchBoxEventT9Command() {
        }

        GetSearchBoxEventT9Command.prototype.execute = function (controller) {
            var url = 'api/EventT9/GetWeekly';

            return cc.ServerConnector.getInstance().sendRequest(cc.SubdomainName.EVENT, url, function (response) {
                var obj = JSON.parse(response);
                controller.onGetSearchBoxEventT9Response(obj);
            });
        };

        return GetSearchBoxEventT9Command;

    })();

    cc.GetSearchBoxEventT9Command = GetSearchBoxEventT9Command;

}).call(this);
