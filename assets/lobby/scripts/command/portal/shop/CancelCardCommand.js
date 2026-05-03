/**
 * Created by Nofear on 3/19/2019.
 */

(function () {
    var CancelCardCommand;

    CancelCardCommand = (function () {
        function CancelCardCommand() {
        }

        CancelCardCommand.prototype.execute = function (controller, userCardSwapID) {
            var url = 'api/CardExchange/CancelCard';

            var params = JSON.stringify({
                UserCardSwapID: userCardSwapID
            });

            return cc.ServerConnector.getInstance().sendRequestPOST(cc.SubdomainName.PORTAL, url, params, function (response) {
                var obj = JSON.parse(response);
                if (obj.ResponseCode === 1) {
                    return controller.onCancelCardResponse(obj);
                } else {
                    return controller.onCancelCardResponseError(obj);

                }
            });
        };

        return CancelCardCommand;

    })();

    cc.CancelCardCommand = CancelCardCommand;

}).call(this);
