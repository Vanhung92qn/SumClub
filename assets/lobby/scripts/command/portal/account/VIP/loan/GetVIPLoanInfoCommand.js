/**
 * Created by Nofear on 2/27/2019.
 */

// Hàm này dùng cho vay tiền và nhận thưởng quý
// -Vay tiền chỉ dùng thông tin trong QuaterInfor
// -VPQuaterAcc:hiển thị số tiền chỗ thưởng quý
// -QuaterPrizeStatus://0: đã nhận; 1: hợp lệ chưa nhận; 2: Chua den thoi gian nhan; 3: Qua thoi gian nhan
// -OldDebt:số tiền nợ
// -LoanAmount:số tiền được vay
// -Chú ý :nút vay tiền thì hiển thị suốt ngày,còn nút nhận thưởng hiển thị từ 1-7 quý tiếp theo

(function () {
    var GetVIPLoanInfoCommand;

    GetVIPLoanInfoCommand = (function () {
        function GetVIPLoanInfoCommand() {
        }

        GetVIPLoanInfoCommand.prototype.execute = function (controller) {
            var url = 'api/VIP2/GetQuaterInfo'; //api/Vip/GetPrivilegeType

            return cc.ServerConnector.getInstance().sendRequest(cc.SubdomainName.PORTAL, url, function (response) {
                var obj = JSON.parse(response);
                if (obj.ResponseCode === 1) {
                    return controller.onGetVIPLoanInfoResponse(obj);
                } else {
                    cc.PopupController.getInstance().showMessageError(obj.Message, obj.ResponseCode);
                }
            });
        };

        return GetVIPLoanInfoCommand;

    })();

    cc.GetVIPLoanInfoCommand = GetVIPLoanInfoCommand;

}).call(this);
