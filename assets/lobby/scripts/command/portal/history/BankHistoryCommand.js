/**
 * Created by Nofear on 3/20/2019.
 */

(function () {
    var BankHistoryCommand;

    BankHistoryCommand = (function () {
        function BankHistoryCommand() {
        }

        BankHistoryCommand.prototype.execute = function (controller) {

            var url = 'api/BankCharge/GetHistory'; //32//

            return cc.ServerConnector.getInstance().sendRequest(cc.SubdomainName.PORTAL, url, function (response) {
                var obj = JSON.parse(response);
				console.log(response);
                if (obj.ResponseCode === 1) {
                    return controller.onBankHistoryResponse(obj);
                } else {
                    cc.PopupController.getInstance().showMessageError(obj.Message, obj.ResponseCode);
                }
            });
        };

        return BankHistoryCommand;

    })();

    cc.BankHistoryCommand = BankHistoryCommand;

}).call(this);
