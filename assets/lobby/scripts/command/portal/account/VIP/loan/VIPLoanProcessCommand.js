/**
 * Created by Nofear on 2/27/2019.
 */

(function () {
    var VIPLoanProcessCommand;

    VIPLoanProcessCommand = (function () {
        function VIPLoanProcessCommand() {
        }

        VIPLoanProcessCommand.prototype.execute = function (controller, otp) {
            var url = 'api/VIP2/LoanProcess';
            var params = JSON.stringify({
                Otp: otp
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
                    return controller.onVIPLoanProcessResponse(obj);
                } else {
                    cc.PopupController.getInstance().hideBusy();
                    cc.PopupController.getInstance().showMessage(obj.Message, obj.ResponseCode);
                }
            });
        };

        return VIPLoanProcessCommand;

    })();

    cc.VIPLoanProcessCommand = VIPLoanProcessCommand;

}).call(this);
