/**
 * Created by Nofear on 3/21/2019.
 */

(function () {
    cc.BCState = {
        WAITING: -1,//wating
        CONFIRM: 0,//confirm
        BETTING: 1,//dat tien
        DEALER: 2,//chia bài
        FLIP: 3,//lat bai
        FINISH: 4,//xem ket qua. ket thuc -> hoi chuong
        ASK_OTHER: 5, //ket thuc hoi chuong -> hoi nguoi khac
        FINISH_ASKED: 6 //het thoi gian hoi nguoi muon lam chuong.
    };

}).call(this);
