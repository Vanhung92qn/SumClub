/**
 * Created by Nofear on 3/13/2019.
 */
var netConfig = require('NetConfig');

(function () {
    var Hub;

    Hub = (function () {
        function Hub() {}

        Hub.prototype.connect = function (controller, hubName, connectionToken, isReconnect, channelChatId) {
            if (hubName && controller) {
                var e;
                try {
                    this.controller = controller;
                    this.hubName = hubName;

                    this.channelChatId = channelChatId ? channelChatId : 'taixiu' ? channelChatId : 'taixiumd5';

                    var data = JSON.stringify(
                        [{
                            name: this.hubName
                        }]
                    );

                    var host = netConfig.HOST;

                    if (hubName === cc.HubName.DragonTigerHub || hubName === cc.HubName.XocXocHub || hubName === cc.HubName.ChatHub ||
                        hubName === cc.HubName.ThreeCardsHub || hubName === cc.HubName.TexasPokerHub || hubName === cc.HubName.TLMNHub ||
                        hubName === cc.HubName.MBHub || hubName === cc.HubName.BaccaratHub || hubName === cc.HubName.TreasureHub ||
                        hubName === cc.HubName.BauCuaHub || hubName === cc.HubName.LodeHub || hubName === cc.HubName.VietlotHub) {

                        if (host === 'ibom2.cc' || host === 'ibom3.cc') {
                            host = 'bay789x.me';
                        }
                    }

                    var url = 'wss://' + cc.Config.getInstance().getSubDomainByHub(hubName) +
                        host + '/signalr/connect?' +
                        'transport=webSockets' //longPolling //webSockets
                        +
                        '&connectionToken=' + encodeURIComponent(connectionToken) +
                        '&connectionData=' + encodeURIComponent(data) +
                        '&tid=' + cc.Config.getInstance().getTID();

                    if (cc.ServerConnector.getInstance().getToken()) {
                        url += ('&access_token=' + encodeURIComponent(cc.ServerConnector.getInstance().getToken()));
                    }

                    //TEMP
                    // if (cc.sys.isNative) {
                    //     url = url.replace('wss://', 'ws://');
                    // }

                    if (isReconnect) {
                        url = url.replace('/signalr/connect?', '/signalr/reconnect?');
                    } else {
                        cc.PopupController.getInstance().showBusy();
                    }

                    try {
                        if (cc.sys.isNative) {
                            this.netControl = new WebSocket(url, [], cc.url.raw('resources/cacert.pem'));
                        } else {
                            this.netControl = new WebSocket(url);
                        }
                    } catch (error) {
                        e = error;
                        // console.log('Caught Exception: ' + e.message);
                        cc.PopupController.getInstance().hideBusy();
                        //cc.PopupController.getInstance().showMessage();
                    }

                    // if (cc.sys.isNative) {
                    //     this.netControl = new CustomWebSocket(url, cc.ServerConnector.getInstance().getCookie());
                    // } else {
                    //     this.netControl = new WebSocket(url);
                    // }
                    this.netControl.onopen = this.onOpen.bind(this);
                    this.netControl.onclose = this.onClose.bind(this);
                    this.netControl.onmessage = this.onMessage.bind(this);
                    this.netControl.onerror = this.onError.bind(this);

                    // this.sendDate = (new Date()).getTime();
                } catch (error) {
                    e = error;
                    // console.log('Caught Exception: ' + e.message);
                    cc.PopupController.getInstance().hideBusy();
                    //cc.PopupController.getInstance().showMessage();
                }
                this.ID = 0;
                this.lastID = 0;
            }
        };

        Hub.prototype.disconnect = function () {
            // console.log(this.hubName + ' disconnect');

            if (this.netControl) {
                this.netControl.close();
                this.netControl.onopen = null;
                this.netControl.onclose = null;
                this.netControl.onmessage = null;
                this.netControl.onerror = null;
                this.netControl = null;
            }

            this.controller = null;
            this.ID = 0;
            this.lastID = 0;

            if (this.interval) {
                clearInterval(this.interval);
            }
        };

        //Slots ============================
        Hub.prototype.enterLobby = function () {
            var data = {
                M: cc.MethodHubName.ENTER_LOBBY,
            };

            switch (this.hubName) {
                case cc.HubName.XocXocHub:
                case cc.HubName.TexasPokerHub:
                case cc.HubName.ThreeCardsHub:
                case cc.HubName.TLMNHub:
                case cc.HubName.MBHub:
                case cc.HubName.BaccaratHub:
                case cc.HubName.DragonTigerHub:
                case cc.HubName.BauCuaHub:
                    data.A = [
                        cc.Config.getInstance().getDeviceType(), cc.LoginController.getInstance().getLoginResponse().RankID
                    ];
                    break;
                default:
                    break;
            }

            this.send(data);
        };
        Hub.prototype.exitLobby = function () {
            var data = {
                M: cc.MethodHubName.EXIT_LOBBY,
            };

            this.send(data);
        };

        Hub.prototype.playNow = function (roomId) {
            var data = {
                M: cc.MethodHubName.PLAY_NOW,
            };

            switch (this.hubName) {
                case cc.HubName.XocXocHub:
                case cc.HubName.BaccaratHub:
                case cc.HubName.DragonTigerHub:
                case cc.HubName.BauCuaHub:
                    break;
                case cc.HubName.ThreeCardsHub:
                    data.A = [roomId, 1];
                    break;
                case cc.HubName.TLMNHub:
                case cc.HubName.MBHub:
                    data.A = [roomId, 1, cc.ServerConnector.getInstance().getLatitude(), cc.ServerConnector.getInstance().getLongitude()];
                    // data.A = [roomId, 1, 100, 40];
                    break;
                case cc.HubName.CowboyHub:
                    data.A = [roomId, cc.Config.getInstance().getDeviceType()];
                    break;
                default:
                    data.A = [roomId];
                    break;
            }

            this.send(data);
        };

        Hub.prototype.spin = function (lines, roomId) {
            var data = {
                M: cc.MethodHubName.SPIN,
            };

            switch (this.hubName) {
                case cc.HubName.EgyptHub:
                case cc.HubName.ThreeKingdomHub:
                case cc.HubName.AquariumHub:
                case cc.HubName.DragonBallHub:
                case cc.HubName.BumBumHub:
                case cc.HubName.ThuongHaiHub:
                case cc.HubName.GaiNhayHub:    
                    data.A = [lines, cc.Config.getInstance().getDeviceType()];
                    break;
                case cc.HubName.CowboyHub:
                    data.A = [lines];
                    break;
                case cc.HubName.BlockBusterHub:
                case cc.HubName.LuckyWildHub:
                    data.A = [roomId, cc.Config.getInstance().getDeviceType()];
                    break;
                default:
                    data.A = [roomId, lines, cc.Config.getInstance().getDeviceType()];
                    break;
            }

            this.send(data);

            // for (var i = 0; i < 1000; i++) {
            //     this.send(data);
            // }

            // this.sendDate = (new Date()).getTime();
        };

        Hub.prototype.freeSpin = function () {
            var data = {
                M: cc.MethodHubName.FREE_SPIN,
                //A: [],
            };
            this.send(data);
        };

        Hub.prototype.playBonus = function (step, position) { //step 12 = choi nhanh
            var data = {
                M: cc.MethodHubName.PLAY_BONUS,
                A: [step, position],
            };
            this.send(data);
        };

        Hub.prototype.playX2Game = function () {
            var data = {
                M: cc.MethodHubName.PLAY_X2_GAME,
            };
            this.send(data);
        };

        Hub.prototype.finishX2Game = function () {
            var data = {
                M: cc.MethodHubName.FINISH_X2_GAME,
            };
            this.send(data);
        };

        Hub.prototype.playTry = function () {
            var data = {
                M: cc.MethodHubName.PLAY_TRY
            };
            this.send(data);
        };

        Hub.prototype.spinTry = function () {
            var data = {
                M: cc.MethodHubName.SPIN_TRY,
            };
            this.send(data);
        };
        //End Slots ============================


        //Chat ============================
        Hub.prototype.register = function () {
            var data = {
                M: cc.MethodHubName.REGISTER_CHAT,
                A: [
                    this.channelChatId, cc.LoginController.getInstance().getLoginResponse().RankID
                ],
            };
            this.send(data);
        };

        Hub.prototype.unregister = function () {
            var data = {
                M: cc.MethodHubName.UNREGISTER_CHAT,
                A: [this.channelChatId],
            };
            this.send(data);
        };

        //chat trong cac phong choi chia phong
        Hub.prototype.sendRoomMessage = function (message) {
            var data = {
                M: cc.MethodHubName.SEND_MESSAGE,
                A: [
                    message
                ],
            };
            this.send(data);
        };

        Hub.prototype.sendMessage = function (message) {
            var data = {
                M: cc.MethodHubName.SEND_MESSAGE,
                A: [
                    message,
                    this.channelChatId
                ],
            };
            this.send(data);
        };
        //End Chat ============================

        //Tai Xiu, Monkey ... =============================
        Hub.prototype.bet = function (betValue, betSide) {
            var data = {
                M: cc.MethodHubName.BET,
            };

            switch (this.hubName) {
                case cc.HubName.MonkeyHub:
                    data.A = [betValue, cc.Config.getInstance().getDeviceType()];
                    break;
                case cc.HubName.XocXocHub:
                case cc.HubName.BaccaratHub:
                case cc.HubName.DragonTigerHub:
                case cc.HubName.BauCuaHub:
                    data.A = [betValue, betSide];
                    break;
                case cc.HubName.TexasPokerHub:
                    data.A = [betValue, betSide]; //amount, action
                    break;
                case cc.HubName.ThreeCardsHub:
                    data.A = [betValue]; //amount
                    break;
                //case cc.HubName.Md5LuckyDiceHub:
                    //data.A = [betValue, betSide, cc.Config.getInstance().getDeviceType()];
                    //break;
                default:
                    data.A = [betValue, betSide, cc.Config.getInstance().getDeviceType()];
                    break;
            }

            this.send(data);
        };
        //Lode Bet
        Hub.prototype.lodeBet = function (gateId, amount, betData) {
            let data = {
                M: cc.MethodHubName.BET
            };
            data.A = [gateId, amount, betData, cc.Config.getInstance().getDeviceType()];
            this.send(data);
        };
        //VietLot bet
        Hub.prototype.vietlotBet = function (betType, ticketType, betData) {
            let data = {
                M: cc.MethodHubName.BET
            };
            data.A = [betType, ticketType, betData];
            this.send(data);
        };
        Hub.prototype.cordInfo = function () {
            var data = {
                M: cc.MethodHubName.CORD_INFO,
            };
            this.send(data);
        };
        //End Tai Xiu ============================

        //Xoc Dia =============================
        Hub.prototype.registerLeaveRoom = function () {
            var data = {
                M: cc.MethodHubName.REGISTER_LEAVE_ROOM,
            };
            this.send(data);
        };

        Hub.prototype.unRegisterLeaveRoom = function () {
            var data = {
                M: cc.MethodHubName.UNREGISTER_LEAVE_ROOM,
            };
            this.send(data);
        };
        //End Xoc Dia ============================


        //3 Cay =============================
        //Ban chuong
        Hub.prototype.sellOwner = function (isSell) {
            var data = {
                M: cc.MethodHubName.SELL_OWNER,
                A: [isSell]
            };
            this.send(data);
        };

        //Mua chuong
        Hub.prototype.buyOwner = function () {
            var data = {
                M: cc.MethodHubName.BUY_OWNER,
            };
            this.send(data);
        };
        //Danh bien
        Hub.prototype.betOther = function (fromAccountId, amount) {
            var data = {
                M: cc.MethodHubName.BET_OTHERS,
                A: [fromAccountId, amount]
            };
            this.send(data);
        };

        //Chap nhan Danh bien
        Hub.prototype.acceptBet = function (fromAccountId, accepted) {
            var data = {
                M: cc.MethodHubName.ACCEPT_BET,
                A: [fromAccountId, accepted]
            };
            this.send(data);
        };

        //Nuoi ga
        Hub.prototype.feedChicken = function () {
            var data = {
                M: cc.MethodHubName.FEED_CHICKEN,
            };
            this.send(data);
        };
        //Lat bai
        Hub.prototype.flip = function () {
            var data = {
                M: cc.MethodHubName.FLIP,
            };
            this.send(data);
        };
        //End 3 Cay ============================

        //danh bai
        Hub.prototype.danhBai = function (arrBai) {
            var data = {
                M: cc.MethodHubName.DANH_BAI,
                A: [arrBai]
            };
            this.send(data);
        };

        //Bo luot
        Hub.prototype.boLuot = function () {
            var data = {
                M: cc.MethodHubName.BO_LUOT,
            };
            this.send(data);
        };

        //Xep bai
        Hub.prototype.xepBai = function () {
            var data = {
                M: cc.MethodHubName.SORT_HAND_CARDS
            };
            this.send(data);
        };
        //danh bai
        Hub.prototype.startGame = function () {
            var data = {
                M: cc.MethodHubName.START_GAME,
            };
            this.send(data);
        };
        //End Tien len Mien Nam ============================

        //Start Mau Binh ============================
        Hub.prototype.checkChi = function (cardValues) {
            var data = {
                M: cc.MethodHubName.CHECK_CHI,
                A: [cardValues]
            };
            this.send(data);
        };

        Hub.prototype.finishGame = function (cardValues) {
            var data = {
                M: cc.MethodHubName.FINISH_GAME,
                A: [cardValues]
            };
            this.send(data);
        };
        //End Mau Binh ============================

        //Start Card game ========================
        Hub.prototype.playNowCardGame = function (minBet, chips, isAuto) {
            var data = {
                M: cc.MethodHubName.PLAY_NOW,
                // minBet:Int32, moneyType:Byte, buyin:Int32, isAuto:Boolean, lat, long
                A: [minBet, 1, chips, isAuto, cc.ServerConnector.getInstance().getLatitude(), cc.ServerConnector.getInstance().getLongitude()]
                // A: [minBet, 1, chips, isAuto, 100, 40]
            };

            this.send(data);
        };

        Hub.prototype.buyIn = function (minBet, chips, isAuto) {
            var data = {
                M: cc.MethodHubName.BUY_IN,
                // minBet:Int32, moneyType:Byte, buyin:Int32, isAuto:Boolean
                A: [minBet, 1, chips, isAuto]
            };

            this.send(data);
        };

        Hub.prototype.registerAuto = function (action) {
            var data = {
                M: cc.MethodHubName.REGISTER_AUTO,
                A: [parseInt(action)]
            };

            this.send(data);
        };

        Hub.prototype.flipCards = function () {
            var data = {
                M: cc.MethodHubName.FLIP_CARDS,
            };

            this.send(data);
        };
        //End Card game

        //Start Event Treasure
        //Lay thong tin kho bau khi bat dau
        Hub.prototype.treasureGetCarrotUserInfo = function () {
            var data = {
                M: cc.MethodHubName.TREASURE_GET_CARROT_USER_INFO,
            };

            this.send(data);
        };

        //Nhan kho bau
        Hub.prototype.treasureUserGetTreasure = function () {
            var data = {
                M: cc.MethodHubName.TREASURE_CARROT_USER_GET_TREASURE,
            };

            this.send(data);
        };

        //QUAY - Jump tao truoc data
        Hub.prototype.treasureCarrotJumpCreateNextData = function (spinFastID) {
            var data = {
                M: cc.MethodHubName.TREASURE_CARROT_JUMP_CREATE_NEXT_DATA,
                A: [spinFastID]
            };

            this.send(data);
        };

        //QUAY - jump
        Hub.prototype.treasureCarrotJumpSpinCreate = function (spinFastID) {
            var data = {
                M: cc.MethodHubName.TREASURE_CARROT_JUMP_SPIN_CREATE,
                A: [spinFastID]
            };

            this.send(data);
        };

        //QUAY - danh BOSS
        Hub.prototype.treasureCarrotFightSpinCreate = function (spinFastID) {
            var data = {
                M: cc.MethodHubName.TREASURE_CARROT_FIGHT_SPIN_CREATE,
                A: [spinFastID]
            };

            this.send(data);
        };
        //End Event Treasure

        Hub.prototype.pingPong = function () {
            var data = {
                M: cc.MethodHubName.PING_PONG,
            };
            this.lastID = this.ID;
            this.send(data);
            this.isPingPong = false;
        };

        Hub.prototype.getRecentID = function () {
            return this.ID;
        };

        Hub.prototype.send = function (data) {
            if (this.netControl) {
                data.H = this.hubName;
                data.I = this.ID;
                this.ID++;
                this.netControl.send(JSON.stringify(data));
            }
        };

        Hub.prototype.onOpen = function () {
            // console.log(this.hubName + ' onHubOpen');

            this.controller.onHubOpen();
            cc.PopupController.getInstance().hideBusy();

            var self = this;
            self.pingPong();
            this.interval = setInterval(function () {
                self.checkPingPong();
            }, netConfig.PING_TIME * 1000);

            // var receiveDate = (new Date()).getTime();
            // cc.DDNA.getInstance().logAPI(cc.Config.getInstance().getSubDomainByHub(this.hubName), 'connect', receiveDate - this.sendDate);
        };

        Hub.prototype.onClose = function () {
            // console.log(this.hubName + ' onHubClose');

            this.controller.onHubClose();

            if (this.interval) {
                clearInterval(this.interval);
            }

            cc.PopupController.getInstance().hideBusy();
        };

        Hub.prototype.onError = function (obj) {
            // console.log(obj);
            // console.log(this.hubName + ': ' + obj.type);
            this.controller.onHubError();

            if (this.interval) {
                // console.log(this.hubName + 'onError clearInterval');
                clearInterval(this.interval);
            }

            cc.PopupController.getInstance().hideBusy();
            //cc.PopupController.getInstance().showPopupLostConnection();
        };

        Hub.prototype.onMessage = function (obj) {
            // console.log(this.hubName + ' onMessage: ' + obj.data);
            var response = JSON.parse(obj.data);

            this.controller.onHubMessage(response);

            if (response.R < 0 && cc.LoginController.getInstance().getUserId() > 0) {
                cc.PopupController.getInstance().hideBusy();
                //======= ERROR ========
                switch (response.R) {
                    case -10:
                        cc.PopupController.getInstance().showMessageError(cc.HubError.ERROR_10_INPUT_INVALID);
                        break;
                    case -11:
                        cc.PopupController.getInstance().showMessageError(cc.HubError.ERROR_11_LINES_INVALID);
                        break;
                    case -12:
                        cc.PopupController.getInstance().showMessageError(cc.HubError.ERROR_12_ROOM_NOT_EXIST);
                        break;
                    case -13:
                        cc.PopupController.getInstance().showMessageError(cc.HubError.ERROR_13_DEVICE_ID_NOT_EXIST);
                        break;
                    case -98:
                        cc.PopupController.getInstance().showMessageError(cc.HubError.ERROR_98_OTHER_DEVICE);
                        break;
                    case -99:
                        cc.PopupController.getInstance().showMessageError(cc.HubError.ERROR_99_EXCEPTION);
                        break;

                    case -211:
                        cc.PopupController.getInstance().showMessageError(cc.HubError.ERROR_211_ROOM_EXIST);
                        break;
                    case -214:
                        cc.PopupController.getInstance().showMessageError(cc.HubError.ERROR_214_ROOM_NOT_EXIST);
                        break;
                    case -231:
                        cc.PopupController.getInstance().showMessageError(cc.HubError.ERROR_231_PLAYER_NOT_IN_ROOM);
                        break;
                    case -232:
                        cc.PopupController.getInstance().showMessageError(cc.HubError.ERROR_232_TRANS_DATA_INVALID);
                        break;
                    case -233:
                        cc.PopupController.getInstance().showMessageError(cc.HubError.ERROR_233_ROOM_TYPE_NOT_EXIST);
                        break;
                    case -234:
                        cc.PopupController.getInstance().showMessageError(cc.HubError.ERROR_234_ROOM_OVER);
                        break;
                    case -235:
                        cc.PopupController.getInstance().showMessageError(cc.HubError.ERROR_235_ROOM_CANCELED);
                        break;
                    case -236:
                        cc.PopupController.getInstance().showMessageError(cc.HubError.ERROR_236_TOTAL_MONEY_NOT_EQUAL);
                        break;

                    case -504:
                        cc.PopupController.getInstance().showMessageError(cc.HubError.ERROR_504_NOT_ENOUGH_MONEY);
                        break;

                    case -999:
                        cc.PopupController.getInstance().showMessageError(cc.HubError.ERROR_999_UNDEFINED);
                        break;

                    case -1001:
                        cc.PopupController.getInstance().showPopupRequireLogin(cc.HubError.ERROR_1001_NOT_AUTHENTICATE);
                        break;
                    case -1002:
                        cc.PopupController.getInstance().showMessageError(cc.HubError.ERROR_1002_PLAYER_NULL);
                        break;
                    case -1003:
                        cc.PopupController.getInstance().showMessageError(cc.HubError.ERROR_1003_DUPLICATE_SPIN);
                        break;
                    case -1004:
                        cc.PopupController.getInstance().showMessageError(cc.HubError.ERROR_1004_BLOCK_SPIN);
                        break;
                    case -1005:
                        cc.PopupController.getInstance().showMessageError(cc.HubError.ERROR_1005_BLOCK_PLAY_NOW);
                        break;
                    case -1006:
                        cc.PopupController.getInstance().showMessageError(cc.HubError.ERROR_1006_PLAY_BONUS);
                        break;
                    case -1007:
                        cc.PopupController.getInstance().showMessageError(cc.HubError.ERROR_1007_PLAY_FREE_SPIN);
                        break;
                    case -1008:
                        cc.PopupController.getInstance().showMessageError(cc.HubError.ERROR_1008_PLAY_X2);
                        break;
                        //VietLot
                    case -600:
                        cc.PopupController.getInstance().showMessageError(cc.HubError.ERROR_600_SESSION_NOT_EXIST);
                        break;
                    case -601:
                        cc.PopupController.getInstance().showMessageError(cc.HubError.ERROR_601_MEGA_CODE_NOT_EXIST);
                        break;
                    case -602:
                        cc.PopupController.getInstance().showMessageError(cc.HubError.ERROR_602_SESSION_HAS_RESULT);
                        break;
                    case -603:
                        cc.PopupController.getInstance().showMessageError(cc.HubError.ERROR_603_SESSION_HAS_REWARD);
                        break;
                }
            }

            // if (response.M !== undefined && response.M.length > 0) {
            //     var m = (response.M)[0];
            //     if (m.M === cc.MethodHubOnName.JOIN_GAME) {
            //         var receiveDate = (new Date()).getTime();
            //         cc.DDNA.getInstance().logAPI(cc.Config.getInstance().getSubDomainByHub(this.hubName), cc.MethodHubOnName.JOIN_GAME, receiveDate - this.sendDate);
            //     } else if (m.M === cc.MethodHubOnName.RESULT_SPIN) {
            //         receiveDate = (new Date()).getTime();
            //         cc.DDNA.getInstance().logAPI(cc.Config.getInstance().getSubDomainByHub(this.hubName), cc.MethodHubOnName.RESULT_SPIN, receiveDate - this.sendDate);
            //     }
            // }
        };

        Hub.prototype.checkPingPong = function () {
            if (!this.isPingPong) {
                //ko phan hoi
                // console.log(this.hubName + ' lostConnection');
                //cc.PopupController.getInstance().showPopupLostConnection();
                this.pingPong();
            } else {
                //ok -> check tiep
                this.pingPong();
            }
        };

        Hub.prototype.pingPongResponse = function (id) {
            if (this.lastID.toString() === id) {
                //ok
                this.isPingPong = true;
            }
        };

        return Hub;

    })();

    cc.Hub = Hub;

}).call(this);