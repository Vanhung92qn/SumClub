/**
 * Created by Nofear on 6/8/2017.
 */
(function() {
    cc.RedeemState = cc.Enum({
        SUCCESS: '1', //Hợp lệ - Thành công
        PENDING: '2', //Chờ duyệt
        CANCEL: '3', //Hủy thẻ
        //con lai la Thất bại
    });

}).call(this);