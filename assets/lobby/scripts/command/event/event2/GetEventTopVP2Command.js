
/**
 * Created by Nofear on 2/27/2019.
 */

(function () {
    var GetEventTopVP2Command;

    GetEventTopVP2Command = (function () {
        function GetEventTopVP2Command() {
        }

        GetEventTopVP2Command.prototype.execute = function (controller) {
            var url = 'api/EventT8/GetTop?'
                + 'topType=' + controller.topType; //2:final, 1:daily

            if (controller.topType === 2) {
                url += ('&topCount=100')
            } else {
                url += ('&topCount=100' + '&dateAward=' + controller.dateAward)
            }

            return cc.ServerConnector.getInstance().sendRequest(cc.SubdomainName.EVENT, url, function (response) {
                var obj = JSON.parse(response);
                controller.onGetEventTopVP2Response(obj);
            });
        };

        return GetEventTopVP2Command;

    })();

    cc.GetEventTopVP2Command = GetEventTopVP2Command;

}).call(this);
