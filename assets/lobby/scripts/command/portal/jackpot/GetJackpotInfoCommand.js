/**
 * Created by Nofear on 2/27/2019.
 */

(function () {
    var GetJackpotInfoCommand;

    GetJackpotInfoCommand = (function () {
        function GetJackpotInfoCommand() {
        }

        GetJackpotInfoCommand.prototype.execute = function (controller, roomId) {
            var url = 'api/Jackpot/GetJackpotInfo?roomId=' + roomId; //-1 tat ca cac game

            return cc.ServerConnector.getInstance().sendRequest(cc.SubdomainName.PORTAL, url, function (response) {
                var obj = JSON.parse(response);
                if (obj.ResponseCode === 1) {
                    return controller.onGetJackpotInfoResponse(obj);
                } else {
                    //cc.PopupController.getInstance().showMessageError(obj.Message, obj.ResponseCode);
                }
            });
        };

        return GetJackpotInfoCommand;

    })();

    cc.GetJackpotInfoCommand = GetJackpotInfoCommand;

}).call(this);
