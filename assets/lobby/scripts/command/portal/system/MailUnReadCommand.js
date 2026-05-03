/**
 * Created by Nofear on 2/27/2019.
 */

(function () {
    var MailUnReadCommand;

    MailUnReadCommand = (function () {
        function MailUnReadCommand() {
        }

        MailUnReadCommand.prototype.execute = function (controller) {
            var url = 'api/System/MailUnRead';

            return cc.ServerConnector.getInstance().sendRequest(cc.SubdomainName.PORTAL, url, function (response) {
                var obj = JSON.parse(response);
                if (obj.ResponseCode === 1) {
                    return controller.onMailUnReadResponse(obj);
                } else {
                    //cc.PopupController.getInstance().showMessageError(obj.Message, obj.ResponseCode);
                }
            });
        };

        return MailUnReadCommand;

    })();

    cc.MailUnReadCommand = MailUnReadCommand;

}).call(this);
