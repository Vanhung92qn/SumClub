/**
 * Created by Nofear on 3/19/2019.
 */

 (function () {
    var CastoutGetListBankCode;

    CastoutGetListBankCode = (function () {
        function CastoutGetListBankCode() {
        }

        CastoutGetListBankCode.prototype.execute = function (controller) {
            var url = 'api/CastOutBank/GetListBankCode';
            var params = JSON.stringify({
                
            });
            cc.PopupController.getInstance().showBusy();
            return cc.ServerConnector.getInstance().sendRequestPOST(cc.SubdomainName.PORTAL, url, params, function (response) {
                var obj = JSON.parse(response);
                cc.PopupController.getInstance().hideBusy();
                if (obj.ResponseCode === 1) {
                    return controller.onCastOutBankGetListBankCodeResponse(obj);
                } else {
                    return controller.onCastOutBankGetListBankCodeError(obj);

                }
            });
        };
        return CastoutGetListBankCode;

    })();
    cc.CastoutGetListBankCode = CastoutGetListBankCode;

}).call(this);
