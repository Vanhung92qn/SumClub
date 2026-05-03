/**
 * Created by Nofear on 6/8/2017.
 */

(function() {
    cc.QuaterPrizeStatus = cc.Enum({
        RECEIVED: 0, //đã nhận
        VALID_NOT_RECEIVED: 1, //hợp lệ chưa nhận
        NOT_YET_RECEIVED_TIME: 2, //Chua den thoi gian nhan
        OVER_TIME_RECEIVE: 3, //Qua thoi gian nhan
        NOT_ENOUGH_CONDITION: 4, //Chua du dieu kien nhan
    });

}).call(this);