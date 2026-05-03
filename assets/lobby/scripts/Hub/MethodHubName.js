/**
 * Created by Nofear on 3/21/2019.
 */

(function () {
    cc.MethodHubName = cc.Enum({
        ENTER_LOBBY: 'EnterLobby',
        EXIT_LOBBY: 'ExitLobby',
        PLAY_NOW: 'PlayNow',
        SPIN: 'Spin',
        FREE_SPIN: 'FreeSpin',
        PLAY_BONUS: 'PlayBonusGame',
        PLAY_X2_GAME: 'PlayX2Game',
        FINISH_X2_GAME: 'FinishX2Game',
        PLAY_TRY: 'PlayTry',
        SPIN_TRY: 'SpinTry',

        //Xoc Dia
        REGISTER_LEAVE_ROOM: 'RegisterLeaveRoom',
        UNREGISTER_LEAVE_ROOM: 'UnregisterLeaveRoom',

        //Tai Xiu
        BET: 'Bet',
        CORD_INFO: 'CordInfo',

        //Card game
        BUY_IN: 'BuyIn', //nap chip
        REGISTER_AUTO: 'RegisterAuto', //đăng ký chơi auto với hành động xác định
        FLIP_CARDS: 'FlipCards', //lật bài

        //3cay
        SELL_OWNER: 'SellOwner',//Bán chương
        BUY_OWNER: 'BuyOwner',//Mua chương
        BET_OTHERS: 'BetOthers',//Đánh Biên
        ACCEPT_BET: 'AcceptBet',//Chấp nhận đánh biên
        FEED_CHICKEN: 'FeedChicken',//Nuôi gà
        FLIP: 'Flip',//Lật bài

        //Tien len mien nam
        DANH_BAI: "DanhBai",
        BO_LUOT: "BoLuot",
        SORT_HAND_CARDS: "SortHandCards",//Xep bai
        START_GAME: "StartGame",// Bat dau choi

        //Mau Binh
        CHECK_CHI: 'CheckChi',//Kiem tra xep chi
        FINISH_GAME: 'FinishGame',//Cap nhat ket qua

        //Chat
        REGISTER_CHAT: 'RegisterChat',
        UNREGISTER_CHAT: 'UnregisterChat',
        SEND_MESSAGE: 'SendMessage',

        //Event - San Kho Bau
        TREASURE_CARROT_JUMP_SPIN_CREATE: 'CarrotJumpSpinCreate',
        TREASURE_CARROT_FIGHT_SPIN_CREATE: 'CarrotFightSpinCreate',
        TREASURE_GET_CARROT_USER_INFO: 'GetCarrotUserInfor',
        TREASURE_CARROT_USER_GET_TREASURE: 'CarrotUserGetTreasure',
        TREASURE_CARROT_JUMP_CREATE_NEXT_DATA: 'CarrotJumpCreateNextData',

        PING_PONG: 'PingPong',
    });

}).call(this);
