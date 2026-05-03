/**
 * Created by Nofear on 2/27/2019.
 */

(function () {
    var VIPCardBonusReceiveCommand;

    VIPCardBonusReceiveCommand = (function () {
        function VIPCardBonusReceiveCommand() {
        }

        VIPCardBonusReceiveCommand.prototype.execute = function (controller) {
            var url = 'api/VIP2/VIPCardBonusReceive';
            var params = JSON.stringify({
                RankID: controller.item.RankID,
                VP: controller.item.VP,
                CardLimit: controller.item.CardLimit,
                CardRate: controller.item.CardRate,
                CardBonusNo: controller.item.CardBonusNo,
                Key: controller.item.Key
            });

            return cc.ServerConnector.getInstance().sendRequestPOST(cc.SubdomainName.PORTAL, url, params, function (response) {
                var obj = JSON.parse(response);
                if (obj.ResponseCode === 1) {
                    /*
                    {
                        "ResponseCode": 1,
                        "Message": "Cập nhật thành công!"
                    }
                    * */
                    return controller.onVIPCardBonusReceiveResponse(obj);
                } else {
                    cc.PopupController.getInstance().hideBusy();
                    cc.PopupController.getInstance().showMessageError(obj.Message, obj.ResponseCode);
                }
            });
        };

        return VIPCardBonusReceiveCommand;

    })();

    cc.VIPCardBonusReceiveCommand = VIPCardBonusReceiveCommand;

}).call(this);
