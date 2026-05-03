/**
 * Created by Nofear on 3/21/2019.
 */

(function () {
    cc.HubError = cc.Enum({
        SUCCESS_1: 'Thành công',
        ERROR_10_INPUT_INVALID: 'Đầu vào không hợp lệ (-10)',
        ERROR_11_LINES_INVALID: 'Dòng đặt không hợp lệ (-11)',
        ERROR_12_ROOM_NOT_EXIST: 'Phòng không tồn tại (-12)',
        ERROR_13_DEVICE_ID_NOT_EXIST: 'Thiết bị không tồn tại (-13)',

        //Tai Xiu
        ERROR_14_INVALID_TIME: 'Hết thời gian đặt cược (-14)',
        ERROR_15_BET: 'Đặt cược lỗi (-15)',
        ERROR_16_INVALID_BET_SIDE: 'Không được đặt hai bên cùng một phiên (-16)',

        //BaCay
        ERROR_97_SESSION_NOT_EXIST: 'Phiên không tồn tại',

        ERROR_98_OTHER_DEVICE: 'Tài khoản đăng nhập trên thiết bị khác',
        ERROR_99_EXCEPTION: 'Exception (-99)',

        ERROR_100_Captcha: 'Mã xác nhận không chính xác (-100)',

        ERROR_211_ROOM_EXIST: 'Phòng chơi đã tồn tại (-211)',
        ERROR_214_ROOM_NOT_EXIST: 'Phòng chơi không tồn tại (-214)',
        ERROR_231_PLAYER_NOT_IN_ROOM: 'Người chơi không ở trong phòng (-231)',
        ERROR_232_TRANS_DATA_INVALID: 'Dữ liệu giao dịch không hợp lệ (-232)',
        ERROR_233_ROOM_TYPE_NOT_EXIST: 'Loại phòng không tồn tại (-233)',
        ERROR_234_ROOM_OVER: 'Phòng chơi đã kết thúc (-234)',
        ERROR_235_ROOM_CANCELED: 'Phòng chơi đã bị hủy (-235)',
        ERROR_236_TOTAL_MONEY_NOT_EQUAL: 'Tổng lượng tiền vào ra không bằng nhau (-236)',

        ERROR_504_NOT_ENOUGH_MONEY: 'Số dư không đủ',

        ERROR_999_UNDEFINED: 'Lỗi không xác định (-999)',

        ERROR_1001_NOT_AUTHENTICATE: 'Vui lòng đăng nhập lại (-1001)',
        ERROR_1002_PLAYER_NULL: 'Đã có lỗi xảy ra (-1002)', //'Tài khoản không tồn tại (-1002)',
        ERROR_1003_DUPLICATE_SPIN: 'Bạn đặt quá nhanh (-1003)',
        ERROR_1004_BLOCK_SPIN: 'Block spin (-1004)',
        ERROR_1005_BLOCK_PLAY_NOW: 'Block play now (-1005)',
        ERROR_1006_PLAY_BONUS: 'Không chơi được Bonus Game (-1006)',
        ERROR_1007_PLAY_FREE_SPIN: 'Không chơi được Free Spin (-1007)',
        ERROR_1008_PLAY_X2: 'Không chơi được X2 (-1008)',

        //Bacay
        ERROR_1: 'Lỗi',
        //VietLot
        ERROR_600_SESSION_NOT_EXIST: "Phiên không tồn tại (-600)",
        ERROR_601_MEGA_CODE_NOT_EXIST: "Mã mega không tồn tại (-601)",
        ERROR_602_SESSION_HAS_RESULT: "Phiên đã có kết quả (-602)",
        ERROR_603_SESSION_HAS_REWARD: "Phiên đã trả thưởng (-603)",

    });

}).call(this);
