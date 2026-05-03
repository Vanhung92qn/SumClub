/**
 * Created by Nofear on 3/19/2019.
 */

(function () {
    var GetListTopupBank1Command;

    GetListTopupBank1Command = (function () {
        function GetListTopupBank1Command() {
        }

        GetListTopupBank1Command.prototype.execute = function (controller) {
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

        return GetListTopupBank1Command;

    })();

    cc.GetListTopupBank1Command = GetListTopupBank1Command;
	
	

}).call(this);