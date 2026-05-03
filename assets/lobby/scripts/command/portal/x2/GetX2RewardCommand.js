/**
 * Created by Nofear on 3/19/2019.
 */

(function () {
    var GetX2RewardCommand;

    GetX2RewardCommand = (function () {
        function GetX2RewardCommand() {
        }

        GetX2RewardCommand.prototype.execute = function (controller) {
            var url = 'api/X2Reward/GetX2Reward';

            var params = JSON.stringify({
                RechargeType: controller.rewardType,
            });

            cc.PopupController.getInstance().showBusy();

            return cc.ServerConnector.getInstance().sendRequestPOST(cc.SubdomainName.EVENT, url, params, function (response) {
                var obj = JSON.parse(response);

                cc.PopupController.getInstance().hideBusy();

                if (obj.ResponseCode === 1) {
                    //========
                    return controller.onGetX2RewardResponse(obj);
                } else {
                    return controller.onGetX2RewardResponseError(obj);

                }
            });
        };

        return GetX2RewardCommand;

    })();

    cc.GetX2RewardCommand = GetX2RewardCommand;

}).call(this);
