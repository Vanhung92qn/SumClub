/**
 * Created by Nofear on 6/8/2017.
 */

(function() {
    cc.VIPCardStatus = cc.Enum({
        VALID_NOT_RECEIVED: 0, //the dang tich luy (chua nhan)
        RECEIVED: 1, //da nhan
        NOT_YET_RECEIVED_TIME: 2, //dang cho de nhan
    });

}).call(this);