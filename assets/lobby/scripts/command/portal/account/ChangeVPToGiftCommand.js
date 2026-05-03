/**
 * Created by Nofear on 2/27/2019.
 */

(function () {
    var ChangeVPToGiftCommand;

    ChangeVPToGiftCommand = (function () {
        function ChangeVPToGiftCommand() {
        }

        ChangeVPToGiftCommand.prototype.execute = function (controller) {
            var url = '/api/Vip/ChangeVPToGif';
            var params = JSON.stringify({
                RankID: controller.item.RankID,
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
                    return controller.onChangeVPToGiftResponse(obj);
                } else {
                    cc.PopupController.getInstance().showMessageError(obj.Message, obj.ResponseCode);
                }
            });
        };

        return ChangeVPToGiftCommand;

    })();

    cc.ChangeVPToGiftCommand = ChangeVPToGiftCommand;

}).call(this);
