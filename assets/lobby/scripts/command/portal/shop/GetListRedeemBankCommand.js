/**
 * Created by Nofear on 3/19/2019.
 */

(function () {
    var GetListRedeemBankCommand;

    GetListRedeemBankCommand = (function () {
        function GetListRedeemBankCommand() {
        }

        GetListRedeemBankCommand.prototype.execute = function (controller) {
            var url = 'api/BankExchange/GetExchangeConfig';

            return cc.ServerConnector.getInstance().sendRequest(cc.SubdomainName.PORTAL, url, function (response) {
                cc.PopupController.getInstance().hideBusy();
                var obj = JSON.parse(response);
                if (obj.ResponseCode === 1) {
                    return controller.onGetListRedeemBankResponse(obj);
                } else {
                    cc.PopupController.getInstance().showMessageError(obj.Message, obj.ResponseCode);
                }
            });
        };

        return GetListRedeemBankCommand;

    })();

    cc.GetListRedeemBankCommand = GetListRedeemBankCommand;

}).call(this);
