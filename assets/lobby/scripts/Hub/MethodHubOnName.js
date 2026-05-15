/**
 * Created by Nofear on 3/21/2019.
 */

(function () {
    cc.MethodHubOnName = cc.Enum({
        //slots
        JOIN_GAME: 'joinGame',
        RESULT_SPIN: 'resultSpin',
        RESULT_FREE_SPIN: 'resultFreeSpin',
        UPDATE_USER_BALANCE: 'updateUserBalance',
        RESULT_X2_GAME: 'resultX2Game',
        UPDATE_JACKPOT: 'updateJackpot',
        MESSAGE: 'message',
        BET_USER: 'betUser',
        REJOIN: 'reJoin',
        TOTAL_WIN_MONEY: 'totalWinMoney',

        //taixiu
        SESSION_INFO: 'sessionInfo', //enterLobby
        GAME_HISTORY: 'gameHistory', //enterLobby
        BET_OF_ACCOUNT: 'betOfAccount', //enterLobby
        BET_SUCCESS: 'betSuccess', //Bet
        WIN_RESULT: 'winResult',
        CORD_ACCOUNT_INFO: 'cordAccountInfo', //thong tin du day của user
        EVENT_WINNER_RESULT: 'eventWinnerResult', //ket qua khi trieu hoi duoc rong -> ban cho tat ca user
        SUMMON_DRAGON_AWARD: 'summonDragonAward',

        // taixiu md5
        SESSION_INFO_MD5: 'Md5sessionInfo', //enterLobby
        GAME_HISTORY_MD5: 'Md5gameHistory', //enterLobby
        BET_OF_ACCOUNT_MD5: 'Md5betOfAccount', //enterLobby
        BET_SUCCESS_MD5: 'Md5betSuccess', //Bet
        WIN_RESULT_MD5: 'Md5winResult',
        CORD_ACCOUNT_INFO_MD5: 'Md5cordAccountInfo', //thong tin du day của user
        EVENT_WINNER_RESULT_MD5: 'Md5eventWinnerResult', //ket qua khi trieu hoi duoc rong -> ban cho tat ca user
        SUMMON_DRAGON_AWARD_MD5: 'Md5summonDragonAward',		

        // taixiu sieutoc
        SESSION_INFO_ST: 'STsessionInfo', //enterLobby
        GAME_HISTORY_ST: 'STgameHistory', //enterLobby
        BET_OF_ACCOUNT_ST: 'STbetOfAccount', //enterLobby
        BET_SUCCESS_ST: 'STbetSuccess', //Bet
        WIN_RESULT_ST: 'STwinResult',
        CORD_ACCOUNT_INFO_ST: 'STcordAccountInfo', //thong tin du day của user
        EVENT_WINNER_RESULT_ST: 'STeventWinnerResult', //ket qua khi trieu hoi duoc rong -> ban cho tat ca user
        SUMMON_DRAGON_AWARD_ST: 'STsummonDragonAward',
		
		//SICBO
        SESSION_INFO_SICBO: 'SicbosessionInfo', //enterLobby
        GAME_HISTORY_SICBO: 'SicbogameHistory', //enterLobby
        BET_OF_ACCOUNT_SICBO: 'SicbobetOfAccount', //enterLobby
        BET_SUCCESS_SICBO: 'SicbobetSuccess', //Bet
        WIN_RESULT_SICBO: 'SicbowinResult',
        CORD_ACCOUNT_INFO_SICBO: 'SicbocordAccountInfo', //thong tin du day của user
        EVENT_WINNER_RESULT_SICBO: 'SicboeventWinnerResult', //ket qua khi trieu hoi duoc rong -> ban cho tat ca user
        SUMMON_DRAGON_AWARD_SICBO: 'SicbosummonDragonAward',	

        //xoc dia
        PLAYER_LEAVE: 'playerLeave', //người chơi rời bàn
        UPDATE_CONNECTION_STATUS: 'updateConnectionStatus', //cập nhật trạng thái của người chơi tới người chơi khác trong bàn
        PLAYER_JOIN: 'playerJoin', //người chơi khác tham gia vào bàn
        PLAYER_BET: 'playerBet', //thông tin người chơi đặt cược
        PLAYER_MESSAGE: 'playerMessage', //thông báo khi đặt cược
        OPEN_PLATE_NOW: 'openPlateNow', //mở bát
        START_ACTION_TIMER: 'startActionTimer', //bắt đầu count down time với action
        UPDATE_PLAYER_STATUS: 'updatePlayerStatus', //cập nhật lại trạng thái player
        UPDATE_ROOM_TIME: 'updateRoomTime',

        //card game
        BUY_MANUAL: 'buyManual', //thông báo không đủ tiền yêu cầu nạp chips
        UPDATE_ACCOUNT: 'updateAccount', //cập nhật số chips của người chơi khi nạp chips thành công
        PLAYER_CHECK_AUTO: 'playerCheckAuto', //thông báo đăng ký chơi tự động thành công
        NOTIFY_CHANGE_PHRASE: 'notifyChangePhrase',
        NOTIFY_START_ACTIONS: 'notifyStartActions', //bắt đầu hành động của người chơi
        NOTIFY_FINISH_ACTIONS: 'notifyFinishActions', //kết thúc hành động của người chơi
        PLAYER_FLIP_CARDS: 'playerFlipCards', //thông báo khi đặt cược
        REFUND: 'refund', //trả lại tiền cho người chơi đặt cao nhất

        //3cay
        UPDATE_BETTING: 'updateBetting', //Thông tin người chơi đặt cược
        BET_OTHER: 'betOther', //Đánh biên
        ACCEPTED_BET: 'acceptedBet', //Đồng ý đánh biên
        FEED_CHICKEN: 'feedChicken', //Nuôi gà
        START_GAME: 'startGame', // Trang thai game
        START_BETTING_TIME: 'startBettingTime',//Betting
        START_ANIMATION_TIME: 'startAnimationTime',// Chia Bai
        SHOW_ALL_RESULT: 'showAllResult',// Mo bai,so ket qua
        UPDATE_SESSION: 'updateSession', // Ket thuc phien
        ASK_OTHER_TO_BUY: 'askOtherToBuy',// Hoi mua chuong
        SHOW_PRIZE: 'showPrize',//Hien thi ket qua
        ASK_TO_SELL: 'askToSell',// Hoi ban chuong
        FLIP_CARDS: 'flipCards',//Mo bai
        CHANGE_OWNER: 'changeOwner',//Doi chuong
        BUY_OWNER_SUCCESS: 'buyOwnerSuccess',// Ket qua mua chuong

        //Tien len mien nam
        DANH_BAI: "danhBai",//Nguoi choi danh bai
        BO_LUOT: "boLuot", //Nguoi choi bo luot
        END_ROUND: "endRound",//Het vong
        ALLOW_CHAN_NGAY: "allowChanNgay", //Cho phep chan ngay
        CANCEL_CHAN_NGAY: "cancelChanNgay",//Huy chan ngay
        SHOW_RESULT: 'showResult',// Mo bai,so ket qua
        SORT_HAND_CARDS: 'sortHandCards',//Xep bai

        //MauBinh
        CHECK_SORT_CHI: "checkSortChi",
        HA_BAI: "haBai",
        UPDATE_GAME_SESSION: "updateGameSession",
        FINISH_GAME: "finishGame",

        //Bacarat
        BET_SESSION: "betSession",
        VIP_PLAYERS: "vipPlayers",
        WIN_RESULT_VIP: "winResultVip",
        SUMMARY_PLAYER: "summaryPlayer",
        //Bau cua
        NOTIFY_CHANGE_PHRASE:"notifyChangePhrase",

        //portal
        TOPUP_CARD: 'topupCard',
        EFFECT_JACKPOT_ALL: 'effectJackpotAll',

        //chat
        LIST_LAST_MESSAGES: 'listLastMessages',
        RECEIVE_MESSAGE: 'receiveMessage',
        SYSTEM_MESSAGE: 'systemMessage',

        //login other device
        OTHER_DEVICE: 'otherDevice',

        //event
        X_BOOM: 'xBoom',

        //EVENT - San Kho Bau
        TREASURE_CARROT_JUMP_SPIN_CREATE_SUCCESS: 'carrotJumpSpinCreateSuccess',
        TREASURE_CARROT_FIGHT_SPIN_CREATE_SUCCESS: 'carrotFightSpinCreateSuccess',
        TREASURE_CARROT_USER_GET_TREASURE_SUCCESS: 'carrotUserGetTreasuresuccess',
        TREASURE_GET_CARROT_USER_INFO_SUCCESS: 'getCarrotUserInforSuccess',

        //Lode
        CURR_SESSION_INFO: 'currSessionInfo',
        //VietLot
        SESSION_RESULT: 'sessionResult',
        UPDATE_TIMER: 'updateTimer',

        //XocDia Jackpot Hoang Kim Long
        SLOT_RESULT:  'slotResult',   //mini-slot 4 dice 1..6 (push truoc khi mo bat)
        JACKPOT_HIT:  'jackpotHit',   //no hu - list winners + award
        JACKPOT_INFO: 'jackpotInfo'   //pool info push khi user PlayNow (sync ban dau)

    });

}).call(this);
