/**
 * Created by Nofear on 2/27/2019.
 */

(function () {
    var ChangeVPToGifCommand;

    ChangeVPToGifCommand = (function () {
        function ChangeVPToGifCommand() {
        }

        ChangeVPToGifCommand.prototype.execute = function (controller, rankID) {
            var url = 'api/VIP2/ChangeVPToGif';
            var params = JSON.stringify({
                RankID: rankID
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
                    return controller.onChangeVPToGifResponse(obj);
                } else {
                    cc.PopupController.getInstance().hideBusy();
                    cc.PopupController.getInstance().showMessageError(obj.Message, obj.ResponseCode);
                }
            });
        };

        return ChangeVPToGifCommand;

    })();

    cc.ChangeVPToGifCommand = ChangeVPToGifCommand;

}).call(this);
