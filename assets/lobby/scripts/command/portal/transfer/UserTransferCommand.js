/**
 * Created by Nofear on 2/27/2019.
 */

var netConfig = require('NetConfig');

(function () {
    var UserTransferCommand;

    UserTransferCommand = (function () {
        function UserTransferCommand() {
        }

        UserTransferCommand.prototype.execute = function (controller) {
            var url = 'api/UserTranfer/TranferBit';


            //Nếu là cồng #KingViet
            if (cc.Config.getInstance().getDomainVK().includes(netConfig.HOST) && controller.isAgency) {
                var params = JSON.stringify({
                    NickName: controller.nickName,
                    Amount: controller.amount,
                    Note: controller.reason,
                    Otp: controller.otp,
                    Rate: controller.exchangeRate
                });
            } else {
                params = JSON.stringify({
                    NickName: controller.nickName,
                    Amount: controller.amount,
                    Note: controller.reason,
                    Otp: controller.otp
                });
            }

            return cc.ServerConnector.getInstance().sendRequestPOST(cc.SubdomainName.PORTAL, url, params, function (response) {
                var obj = JSON.parse(response);
                cc.PopupController.getInstance().hideBusy();
                if (obj.ResponseCode === 1) {
                    //========
                    cc.DDNA.getInstance().trade(controller.nickName, controller.isAgency, controller.reason, controller.amount);
                    return controller.onUserTransferResponse(obj);
                } else {
                    return controller.onUserTransferResponseError(obj);
                    //cc.PopupController.getInstance().show(obj.Message, cc.PopupStyle.NOTHING);
                }
            });
        };

        return UserTransferCommand;

    })();

    cc.UserTransferCommand = UserTransferCommand;

}).call(this);
