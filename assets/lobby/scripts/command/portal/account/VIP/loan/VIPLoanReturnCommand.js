/**
 * Created by Welcome on 8/13/2019.
 */
/**
 * Created by Nofear on 2/27/2019.
 */

(function () {
    var VIPLoanReturnCommand;

    VIPLoanReturnCommand = (function () {
        function VIPLoanReturnCommand() {
        }

        VIPLoanReturnCommand.prototype.execute = function (controller) {
            var url = 'api/VIP2/LoanReturn';
            var params = JSON.stringify({
                // Otp: controller.otp
            });

            return cc.ServerConnector.getInstance().sendRequestPOST(cc.SubdomainName.PORTAL, url, params, function (response) {
                var obj = JSON.parse(response);
                if (obj.ResponseCode === 1) {
                    /*
                     {
                     "ResponseCode": 1,
                     "Message": "Cập nhật thành công!"
                     }
                     * */
                    return controller.onVIPLoanReturnResponse(obj);
                } else {
                    cc.PopupController.getInstance().hideBusy();
                    cc.PopupController.getInstance().showMessage(obj.Message, obj.ResponseCode);
                }
            });
        };

        return VIPLoanReturnCommand;

    })();

    cc.VIPLoanReturnCommand = VIPLoanReturnCommand;

}).call(this);
