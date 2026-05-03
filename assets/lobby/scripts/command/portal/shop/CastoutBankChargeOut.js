/**
 * Created by Nofear on 3/19/2019.
 */

(function () {
    var CastoutBankChargeOut;

    CastoutBankChargeOut = (function () {
        function CastoutBankChargeOut() {
        }

        CastoutBankChargeOut.prototype.execute = function (controller) {
            var url = 'api/CastOutBankNew/ChargeOutNew';
           
            var params = JSON.stringify({
                SoTk:controller.VarSoTk,
                NameTk:controller.VarNameTk,
                Amount:controller.VarAmount,
              //  Otp:controller.VarOtp,
                BankCode:controller.VarBankCode,
                BankName:controller.VarBankName
            });
            console.log(params);

            cc.PopupController.getInstance().showBusy();
            return cc.ServerConnector.getInstance().sendRequestPOST(cc.SubdomainName.PORTAL, url, params, function (response) {
                console.log(response);
                var obj = JSON.parse(response);
                cc.PopupController.getInstance().hideBusy();
                if (obj.ResponseCode === 1) {
                    return controller.onCastoutBankChargeOutResponse(obj);
                } else {
                    return controller.onCastoutBankChargeOutResponseError(obj);

                }
            });
        };
        return CastoutBankChargeOut;

    })();
    cc.CastoutBankChargeOut = CastoutBankChargeOut;

}).call(this);
