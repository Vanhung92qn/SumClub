
/**
 * Created by Nofear on 2/27/2019.
 */

(function () {
    var GetTopGiftBox2Command;

    GetTopGiftBox2Command = (function () {
        function GetTopGiftBox2Command() {
        }

        GetTopGiftBox2Command.prototype.execute = function (controller) {
            var url = 'api/QuayII/GetTopGiftBox?'
                + 'top=100'
                + '&giftType=2';

            return cc.ServerConnector.getInstance().sendRequest(cc.SubdomainName.EVENT, url, function (response) {
                var obj = JSON.parse(response);
                controller.onGetTopGiftBox2Response(obj);
            });
        };

        return GetTopGiftBox2Command;

    })();

    cc.GetTopGiftBox2Command = GetTopGiftBox2Command;

}).call(this);
