/**
 * Created by Nofear on 2/27/2019.
 */

(function () {
    var EsportsLinkCommand;
    EsportsLinkCommand = (function () {
        function EsportsLinkCommand() {
        }
        EsportsLinkCommand.prototype.execute = function (controller) {
            var url = 'api/Esports/GetLink';
            var params = JSON.stringify({
              
            });
            return cc.ServerConnector.getInstance().sendRequestPOST(cc.SubdomainName.PORTAL, url, params, function (response) {
                var obj = JSON.parse(response);
                if (obj.ResponseCode === 1) {
                    return controller.onGetLinkResponse(obj);
                } else {
                    return controller.onGetLinkResponseError(obj);

                }
            });
        };
        return EsportsLinkCommand;

    })();
    cc.EsportsLinkCommand = EsportsLinkCommand;
}).call(this);
