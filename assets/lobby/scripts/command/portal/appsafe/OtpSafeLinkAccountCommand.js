/**
 * Created by Nofear on 2/27/2019.
 */

var netConfig = require('NetConfig');

(function () {
    var OtpSafeLinkAccountCommand;

    OtpSafeLinkAccountCommand = (function () {
        function OtpSafeLinkAccountCommand() {
        }

        OtpSafeLinkAccountCommand.prototype.execute = function (controller, phoneNumber, otp) {
            var url = 'api/Otp/OtpSafeLinkAccount';

            //#KingViet
            if (cc.Config.getInstance().getDomainVK().includes(netConfig.HOST)) {
                var params = {
                    UserNameSafeNo: phoneNumber,
                    Otp: otp,
                    DeviceId: cc.ServerConnector.getInstance().getDeviceId(),
                    DeviceType: cc.Config.getInstance().getDeviceType(),
                };
            } else {
                var params = {
                    PhoneNumber: phoneNumber,
                    Otp: otp
                };
            }

            params = JSON.stringify(params);

            return cc.ServerConnector.getInstance().sendRequestPOST(cc.SubdomainName.PORTAL, url, params, function (response) {
                var obj = JSON.parse(response);
                if (obj.ResponseCode === 1) {
                    return controller.onOtpSafeLinkAccountResponse(obj);
                } else {
                    return controller.onOtpSafeLinkAccountResponseError(obj);
                }
            });
        };

        return OtpSafeLinkAccountCommand;

    })();

    cc.OtpSafeLinkAccountCommand = OtpSafeLinkAccountCommand;

}).call(this);
