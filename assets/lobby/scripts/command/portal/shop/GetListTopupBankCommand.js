/**
 * Created by Nofear on 3/19/2019.
 */

(function () {
    var GetListTopupBankCommand;

    GetListTopupBankCommand = (function () {
        function GetListTopupBankCommand() {
        }

        GetListTopupBankCommand.prototype.execute = function (controller) {
            //var url = 'api/MopayBank/GetListBank';
			var url = 'api/BankCharge/GetChargeConfigs';

            return cc.ServerConnector.getInstance().sendRequest(cc.SubdomainName.PORTAL, url, function (response) {
                cc.PopupController.getInstance().hideBusy();
                var obj = JSON.parse(response);
                if (obj.ResponseCode === 1) {
                    return controller.onGetListTopupBankResponse(obj);
                } else {
                    cc.PopupController.getInstance().showMessageError(obj.Message, obj.ResponseCode);
                }
            });
        };

        return GetListTopupBankCommand;

    })();

    cc.GetListTopupBankCommand = GetListTopupBankCommand;

}).call(this);
