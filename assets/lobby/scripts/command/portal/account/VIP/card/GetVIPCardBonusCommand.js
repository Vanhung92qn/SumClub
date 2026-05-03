/**
 * Created by Nofear on 2/27/2019.
 */

// Danh sách  record nhận thẻ
// CurrentCard:Thẻ đang chuẩn bị được  nhận ( có 2 thông số Percent và CardBonusNo  )
// CardReceived: danh sách thẻ đã nhận  ( có 2 thông số Percent và CardBonusNo số thẻ đã nhận)
// CardNotYetReceived:danh sách thẻ chưa nhận thưởng

(function () {
    var GetVIPCardBonusCommand;

    GetVIPCardBonusCommand = (function () {
        function GetVIPCardBonusCommand() {
        }

        GetVIPCardBonusCommand.prototype.execute = function (controller) {
            var url = 'api/VIP2/VIPCheckCardBonus'; //api/Vip/GetPrivilegeType
            var params = JSON.stringify({

            });

            return cc.ServerConnector.getInstance().sendRequestPOST(cc.SubdomainName.PORTAL, url, params, function (response) {
                var obj = JSON.parse(response);
                if (obj.ResponseCode === 1) {
                    return controller.onGetVIPCardBonusResponse(obj);
                } else {
                    cc.PopupController.getInstance().showMessageError(obj.Message, obj.ResponseCode);
                }
            });
        };

        return GetVIPCardBonusCommand;

    })();

    cc.GetVIPCardBonusCommand = GetVIPCardBonusCommand;

}).call(this);
