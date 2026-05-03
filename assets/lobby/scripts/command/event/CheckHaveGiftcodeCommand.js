
/**
 * Created by Nofear on 2/27/2019.
 */

(function () {
    var CheckHaveGiftcodeCommand;

    CheckHaveGiftcodeCommand = (function () {
        function CheckHaveGiftcodeCommand() {
        }

        CheckHaveGiftcodeCommand.prototype.execute = function (controller) {
            // cc.LobbyController.getInstance().createEventPopupView(); return;

            var url = 'api/tet/IsTetGiftcodeForUser';

            return cc.ServerConnector.getInstance().sendRequest(cc.SubdomainName.EVENT, url, function (response) {
                var obj = JSON.parse(response);
                if (obj) {
                    cc.LobbyController.getInstance().createEventPopupView();
                }
            });
        };

        return CheckHaveGiftcodeCommand;

    })();

    cc.CheckHaveGiftcodeCommand = CheckHaveGiftcodeCommand;

}).call(this);
