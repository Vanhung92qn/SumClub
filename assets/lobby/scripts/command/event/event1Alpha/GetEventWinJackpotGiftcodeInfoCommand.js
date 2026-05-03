
/**
 * Created by Nofear on 2/27/2019.
 */

(function () {
    var GetEventWinJackpotGiftcodeInfoCommand;

    GetEventWinJackpotGiftcodeInfoCommand = (function () {
        function GetEventWinJackpotGiftcodeInfoCommand() {
        }

        GetEventWinJackpotGiftcodeInfoCommand.prototype.execute = function (controller) {
            var url = 'api/event/GetWinJackpotGiftcodeInfo'; //top (default=50)

            return cc.ServerConnector.getInstance().sendRequest(cc.SubdomainName.EVENT, url, function (response) {
                var obj = JSON.parse(response);
                controller.onGetTopEventResponse(obj);
            });
        };

        return GetEventWinJackpotGiftcodeInfoCommand;

    })();

    cc.GetEventWinJackpotGiftcodeInfoCommand = GetEventWinJackpotGiftcodeInfoCommand;

}).call(this);
