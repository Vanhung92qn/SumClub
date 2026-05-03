/**
 * Created by Nofear on 6/8/2017.
 */
(function() {
    cc.TopupState = cc.Enum({
        FAILED2: '-2', //Thất bại
        FAILED: '-1', //Thất bại
        PENDING: '0', //Chờ xử lý
        PENDING1: '1', //Chờ xử lý
        SUCCESS: '2', //Thành công
        PENDING3: '3', //Chờ xử lý
        ADMIN_SUCCESS: '4', //Thành công (Hoàn tiền) - Admin xử lý hoàn tiền
        //Còn lại là thất bại
    });

}).call(this);