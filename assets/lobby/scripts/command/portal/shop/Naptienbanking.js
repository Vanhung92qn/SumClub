/**
 * Created by Nofear on 3/19/2019.
 */

(function () {
    var Naptienbanking;

    Naptienbanking = (function () {
        function Naptienbanking() {
        }

        Naptienbanking.prototype.execute = function (controller) {
            var url = 'api/BankCharge/CreateBuyOrders';
           
            var params = JSON.stringify({
                SoTk:controller.VarSoTk,
                NameTk:controller.VarNameTk,
                Amount:controller.VarAmount,
				CodeValue:controller.VarCodeValue,
                BankName:controller.VarBankName,
				Nguoigui:controller.VarNguoigui,
				OperatorID:controller.VarNganHang
            });

            cc.PopupController.getInstance().showBusy();
            return cc.ServerConnector.getInstance().sendRequestPOST(cc.SubdomainName.PORTAL, url, params, function (response) {
                var obj = JSON.parse(response);
                cc.PopupController.getInstance().hideBusy();
                if (obj.ResponseCode === 1) {
                    return controller.onNaptienbankingResponse(obj);
                } else {
                    return controller.onNaptienbankingResponseError(obj);

                }
            });
        };
        return Naptienbanking;

    })();
    cc.Naptienbanking = Naptienbanking;

}).call(this);
