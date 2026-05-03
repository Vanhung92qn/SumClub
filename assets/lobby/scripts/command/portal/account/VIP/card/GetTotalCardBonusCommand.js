/**
 * Created by Nofear on 2/27/2019.
 */

(function () {
    var GetTotalCardBonusCommand;

    GetTotalCardBonusCommand = (function () {
        function GetTotalCardBonusCommand() {
        }

        GetTotalCardBonusCommand.prototype.execute = function (controller) {
            var url = 'api/VIP2/TotalCardBonus';

            return cc.ServerConnector.getInstance().sendRequest(cc.SubdomainName.PORTAL, url, function (response) {
                var obj = JSON.parse(response);
                if (obj.ResponseCode === 1) {
                    return controller.onGetTotalCardBonusResponse(obj);
                } else {
                    // cc.PopupController.getInstance().showMessageError(obj.Message, obj.ResponseCode);
                }
            });
        };

        return GetTotalCardBonusCommand;

    })();

    cc.GetTotalCardBonusCommand = GetTotalCardBonusCommand;

}).call(this);
