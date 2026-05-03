/**
 * Created by Nofear on 2/27/2019.
 */

(function () {
    var OtpSafeDisLinkAccountCommand;

    OtpSafeDisLinkAccountCommand = (function () {
        function OtpSafeDisLinkAccountCommand() {
        }

        OtpSafeDisLinkAccountCommand.prototype.execute = function (controller, otp) {
            var url = 'api/otp/OtpSafeUnLinkAccount';

            var params = {
                Otp: otp
            };

            params = JSON.stringify(params);

            return cc.ServerConnector.getInstance().sendRequestPOST(cc.SubdomainName.PORTAL, url, params, function (response) {
                var obj = JSON.parse(response);
                if (obj.ResponseCode === 1) {
                    return controller.onOtpSafeDisLinkAccountResponse(obj);
                } else {
                    cc.PopupController.getInstance().showMessageError(obj.Message, obj.ResponseCode);
                }
            });
        };

        return OtpSafeDisLinkAccountCommand;

    })();

    cc.OtpSafeDisLinkAccountCommand = OtpSafeDisLinkAccountCommand;

}).call(this);
