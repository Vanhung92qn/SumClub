/**
 * Created by Nofear on 2/27/2019.
 */

(function () {
    var CheckSafeLinkAccountCommand;

    CheckSafeLinkAccountCommand = (function () {
        function CheckSafeLinkAccountCommand() {
        }

        CheckSafeLinkAccountCommand.prototype.execute = function () {
            var url = 'api/otp/CheckSafeLinkAccount';

            var params = {
                DeviceId: cc.ServerConnector.getInstance().getDeviceId(),
                DeviceType: cc.Config.getInstance().getDeviceType()
            };

            params = JSON.stringify(params);

            return cc.ServerConnector.getInstance().sendRequestPOST(cc.SubdomainName.PORTAL, url, params, function (response) {
                var obj = JSON.parse(response);
                if (obj.ResponseCode === 1) {
                    switch (obj.OptLinkStatus) {
                        //chưa từng gắn kết
                        case 0:
                            switch (obj.Status) {
                                //hợp lệ để nhận 10K
                                case 1:
                                    //#KingViet
                                    cc.LobbyController.getInstance().createEventPopupView();
                                    cc.AccountController.getInstance().setAppSafeSatus(true);
                                    break;
                                //đã nhận 10
                                case 2:
                                    break;
                                //không hợp lệ để nhận 10K
                                case 3:
                                    break;
                            }
                            break;
                        //đã gắn kết và huỷ
                        case 1:
                            break;
                        //đã gắn kết
                        case 2:
                            break;
                    }
                } else {
                    cc.PopupController.getInstance().showMessageError(obj.Message, obj.ResponseCode);
                }
            });
        };

        return CheckSafeLinkAccountCommand;

    })();

    cc.CheckSafeLinkAccountCommand = CheckSafeLinkAccountCommand;

}).call(this);
