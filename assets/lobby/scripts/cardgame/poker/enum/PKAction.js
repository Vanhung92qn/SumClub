/**
 * Created by Nofear on 3/21/2019.
 */

(function () {
    cc.PKAction = cc.Enum({
        WAITING: '-1',
        CHECK: '1', //chi khi chua co ai bet / raise
        BET: '2', //bet 1 luong tien tuy thich
        CALL: '3', //call = chip ng choi khac bet / raise
        RAISE: '4', //raise khi co ng bet truoc
        FOLD: '5', //bo bai
        ALL_IN: '6', //tat tay
        FLIP: '7'
    });

}).call(this);
