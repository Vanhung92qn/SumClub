/**
 * Created by Nofear on 3/19/2019.
 */

(function () {
    var CastoutMomoChargeOut;

    CastoutMomoChargeOut = (function () {
        function CastoutMomoChargeOut() {
        }

        CastoutMomoChargeOut.prototype.execute = function (controller) {
            var url = 'api/CastOutBankNew/Momo';
           
            var params = JSON.stringify({
                Phone:controller.VarPhone,
                Name:controller.VarName,
                Amount:controller.VarAmount,
				CodeValue:controller.VarCodeValue,
                //Otp:controller.VarOtp,
            });

            cc.PopupController.getInstance().showBusy();
            return cc.ServerConnector.getInstance().sendRequestPOST(cc.SubdomainName.PORTAL, url, params, function (response) {
                var obj = JSON.parse(response);
                cc.PopupController.getInstance().hideBusy();
                if (obj.ResponseCode === 1) {
                    return controller.onCastoutMomoChargeOutResponse(obj);
                } else {
                    return controller.onCastoutMomoChargeOutResponseError(obj);

                }
            });
        };
        return CastoutMomoChargeOut;

    })();
    cc.CastoutMomoChargeOut = CastoutMomoChargeOut;

}).call(this);
