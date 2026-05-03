/**
 * Created by Nofear on 3/19/2019.
 */

 (function () {
    var CastoutGetMomo;

    CastoutGetMomo = (function () {
        function CastoutGetMomo() {
        }

        CastoutGetMomo.prototype.execute = function (controller) {
            var url = 'api/CastOutBank/GetMomo';
            var params = JSON.stringify({
                
            });
            cc.PopupController.getInstance().showBusy();
            return cc.ServerConnector.getInstance().sendRequestPOST(cc.SubdomainName.PORTAL, url, params, function (response) {
                var obj = JSON.parse(response);
                cc.PopupController.getInstance().hideBusy();
                if (obj.ResponseCode === 1) {
                    return controller.onGetMomoResponse(obj);
                } else {
                    return controller.onGetMomoError(obj);

                }
            });
        };
        return CastoutGetMomo;

    })();
    cc.CastoutGetMomo = CastoutGetMomo;

}).call(this);
