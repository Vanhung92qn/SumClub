/**
 * Created by Nofear on 2/27/2019.
 */

(function () {
    var VIPReceiveQuaterPrizeCommand;

    VIPReceiveQuaterPrizeCommand = (function () {
        function VIPReceiveQuaterPrizeCommand() {
        }

        VIPReceiveQuaterPrizeCommand.prototype.execute = function (controller) {
            var url = 'api/VIP2/ReceiveQuaterPrize';
            var params = JSON.stringify({

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
                    return controller.onVIPReceiveQuaterPrizeResponse(obj);
                } else {
                    cc.PopupController.getInstance().hideBusy();
                    cc.PopupController.getInstance().showMessage(obj.Message, obj.ResponseCode);
                }
            });
        };

        return VIPReceiveQuaterPrizeCommand;

    })();

    cc.VIPReceiveQuaterPrizeCommand = VIPReceiveQuaterPrizeCommand;

}).call(this);
