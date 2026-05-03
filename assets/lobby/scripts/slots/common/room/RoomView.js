/**
 * Created by Nofear on 6/7/2017.
 */

var netConfig = require('NetConfig');

(function () {
    cc.RoomView = cc.Class({
        "extends": cc.Component,
        properties: {
            nodeRoom: cc.Node,
            nodeMain: cc.Node,

            btnRooms: [cc.Button],
        },

        onLoad: function () {
            cc.RoomController.getInstance().setRoomView(this);
            this.hubName = '';

            //bien check active button room chua
            this.isActiveButtonRoom = false;

            //Lay gameId (set khi click vao big game)
            this.gameId = cc.RoomController.getInstance().getGameId();


            switch (this.gameId) {
                case cc.GameId.EGYPT:
                    this.hubName = cc.HubName.EgyptHub;
                    var egyptNegotiateCommand = new cc.EgyptNegotiateCommand;
                    egyptNegotiateCommand.execute(this);
                    break;
                case cc.GameId.GAINHAY:
                    this.hubName = cc.HubName.GaiNhayHub;
                    var gaiNhayNegotiateCommand = new cc.GaiNhayNegotiateCommand;
                    gaiNhayNegotiateCommand.execute(this);
                    break;
                case cc.GameId.THREE_KINGDOM:
                    this.hubName = cc.HubName.ThreeKingdomHub;
                    var tkNegotiateCommand = new cc.TKNegotiateCommand;
                    tkNegotiateCommand.execute(this);
                    break;
                case cc.GameId.AQUARIUM:
                    this.hubName = cc.HubName.AquariumHub;
                    var aquariumNegotiateCommand = new cc.AquariumNegotiateCommand;
                    aquariumNegotiateCommand.execute(this);
                    break;
                case cc.GameId.DRAGON_BALL:
                    this.hubName = cc.HubName.DragonBallHub;
                    var dragonBallNegotiateCommand = new cc.DragonBallNegotiateCommand;
                    dragonBallNegotiateCommand.execute(this);
                    break;
                case cc.GameId.BUM_BUM:
                    this.hubName = cc.HubName.BumBumHub;
                    var negotiateCommand = new cc.NegotiateCommand;
                    negotiateCommand.execute(this, cc.SubdomainName.BUM_BUM);
                    break;
                case cc.GameId.COWBOY:
                    this.hubName = cc.HubName.CowboyHub;
                    var cowboyNegotiateCommand = new cc.CowboyNegotiateCommand;
                    cowboyNegotiateCommand.execute(this, cc.SubdomainName.COWBOY);
                    break;
                case cc.GameId.THUONG_HAI:
                    this.hubName = cc.HubName.ThuongHaiHub;
                    var thuongHaiNegotiateCommand = new cc.ThuongHaiNegotiateCommand;
                    thuongHaiNegotiateCommand.execute(this, cc.SubdomainName.THUONGHAI);
                    break;
            }

            this.lastTimeReconnect = (new Date()).getTime();

            //tam dung update jackpot ngoai lobby -> bat lai khi tat big game
            cc.LobbyJackpotController.getInstance().pauseUpdateJackpot(true);
        },

        onEnable: function () {
            this.nodeMain.active = false;
            this.nodeRoom.active = true;
        },

        onDestroy: function () {
            cc.LobbyJackpotController.getInstance().pauseUpdateJackpot(false);

            if (this.slotsHub)
                this.slotsHub.disconnect();
            this.unscheduleAllCallbacks();

            if (this.gameId === cc.GameId.DRAGON_BALL) {
                cc.AccumulationController.getInstance().clearPowerPool();
            }

            
            if (cc.sys.isNative) {
                switch (this.gameId) {
                    case cc.GameId.EGYPT:
                        cc.loader.releaseResDir('egypt/prefabs');
                        cc.loader.releaseResDir('egypt/images');   
                        break;
                    case cc.GameId.GAINHAY:
                        cc.loader.releaseResDir('gainhay/prefabs');
                        cc.loader.releaseResDir('gainhay/images');
                        break;
                    case cc.GameId.THREE_KINGDOM:
                        cc.loader.releaseResDir('tk/prefabs');
                        cc.loader.releaseResDir('tk/images'); 
                        break;
                    case cc.GameId.AQUARIUM:
                        cc.loader.releaseResDir('aquarium/prefabs');
                        cc.loader.releaseResDir('aquarium/images'); 
                        break;
                    case cc.GameId.DRAGON_BALL:
                        cc.loader.releaseResDir('dragonball/prefabs');
                        cc.loader.releaseResDir('dragonball/images'); 
                        break;
                    case cc.GameId.BUM_BUM:
                        cc.loader.releaseResDir('bumbum/prefabs');
                        cc.loader.releaseResDir('bumbum/images'); 
                        break;
                    case cc.GameId.COWBOY:
                        cc.loader.releaseResDir('cowboy/prefabs');
                        cc.loader.releaseResDir('cowboy/images');
                        break;
                    case cc.GameId.THUONG_HAI:
                        cc.loader.releaseResDir('demthuonghai/prefabs');
                        cc.loader.releaseResDir('demthuonghai/images');
                        break;
                }
            }
            cc.PopupController.getInstance().hideBusy();
        },

        
        activeRoom: function () {
            this.nodeMain.active = false;
            this.nodeRoom.active = true;
        },

        activeMain: function () {
            this.nodeMain.active = true;
            this.nodeRoom.active = false;
        },

        sendRequestOnHub: function (method, data1, data2) {
            if (this.slotsHub === undefined || this.slotsHub === null) return;
            switch (method) {
                case cc.MethodHubName.PLAY_TRY:
                    cc.PopupController.getInstance().showBusy();
                    this.slotsHub.playTry();
                    break;
                case cc.MethodHubName.PLAY_NOW:
                    cc.PopupController.getInstance().showBusy();
                    this.slotsHub.playNow(data1);
                    break;
                case cc.MethodHubName.SPIN_TRY:
                    this.slotsHub.spinTry();
                    break;
                case cc.MethodHubName.SPIN:
                    this.slotsHub.spin(data1);
                    break;
                case cc.MethodHubName.PLAY_BONUS:
                    this.slotsHub.playBonus(data1, data2);
                    break;
                case cc.MethodHubName.PLAY_X2_GAME:
                    this.slotsHub.playX2Game();
                    break;
                case cc.MethodHubName.FINISH_X2_GAME:
                    this.slotsHub.finishX2Game();
                    break;
                case cc.MethodHubName.FREE_SPIN:
                    this.slotsHub.freeSpin();
                    break;
            }
        },

        reconnect: function () {
            this.lastTimeReconnect = (new Date()).getTime();
            this.slotsHub.connect(this, this.hubName, this.connectionToken, true);
        },

        onSlotsNegotiateResponse: function (response) {
            this.connectionToken = response.ConnectionToken;
            this.slotsHub = new cc.Hub;
            this.slotsHub.connect(this, this.hubName, response.ConnectionToken);
        },

        onHubMessage: function (response) {

            if (response.M !== undefined && response.M.length > 0) {
                var m = (response.M)[0];
                switch (m.M) {
                    //vao Phong
                    case cc.MethodHubOnName.JOIN_GAME:

                        var data = m.A[0];
                        //Set RoomID vua vao
                        cc.RoomController.getInstance().setRoomId(data.RoomID);

                        //vao phong thanh cong -> acitve main game
                        this.activeMain();

                        //set Bet value
                        cc.SpinController.getInstance().setBetValue(data.BetValue);
                        cc.SpinController.getInstance().updateBetUI(data.BetValue);

                        //cap nhat jackpot trong game
                        cc.JackpotController.getInstance().updateJackpotInGame(data.SpinData.Jackpot);
                        //Set xem co phai choi thu ko?
                        cc.SpinController.getInstance().setIsPlayTry(data.IsPlayTry);
                        //set accountID
                        cc.SpinController.getInstance().setSpinAccountID(data.AccountID);

                        //random icon phong
                        //cc.SpinController.getInstance().randomIcon();

                        switch (this.gameId) {
                            case cc.GameId.EGYPT:
                                // vao phong la auto set full lines
                                var linesData = '1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25';
                                //set tong so Line UI
                                var totalLine = 25;
                                break;
                            case cc.GameId.GAINHAY:
                                // vao phong la auto set full lines
                                var linesData = '1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25';
                                //set tong so Line UI
                                var totalLine = 25;
                                break;
                            case cc.GameId.DRAGON_BALL:
                                // vao phong la auto set full lines
                                linesData = '1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20';
                                //set tong so Line UI
                                totalLine = 20;
                                //set he so SPIN
                                cc.CoefficientController.getInstance().setMultiplier(data.SpinData.SpinCoefficient);
                                //set diem thich luy FreeSpin
                                cc.AccumulationController.getInstance().setAccumulation(data.SpinData.PointAccumulation, data.SpinData.IsPointFree);
                                break;
                            case cc.GameId.THREE_KINGDOM:
                                linesData = '1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20';
                                //set tong so Line UI
                                totalLine = 20;
                                //set nen cua phong
                                cc.SpinController.getInstance().updateBGRoomUI();
                                break;
                            case cc.GameId.AQUARIUM:
                                linesData = '1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30';
                                //set tong so Line UI
                                totalLine = 30;
                                //set nen cua phong
                                cc.SpinController.getInstance().updateBGRoomUI();
                                break;
                            case cc.GameId.THUONG_HAI:
                                linesData = '1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30';
                                //set tong so Line UI
                                totalLine = 30;
                                //set nen cua phong
                                cc.SpinController.getInstance().updateBGRoomUI();
                                break;
                            case cc.GameId.BUM_BUM:
                                linesData = '1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20';
                                //set tong so Line UI
                                totalLine = 20;
                                break;
                            case cc.GameId.COWBOY:
                                // vao phong la auto set full lines
                                linesData = '1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25';
                                //set tong so Line UI
                                totalLine = 25;
                                cc.CBAccumulateController.getInstance().onUpdateAccumulate(data.AccumulateGame);
                                break;
                        }

                        cc.SpinController.getInstance().updateTotalLines(totalLine); //data.TotalLine

                        //set betLineText
                        cc.SpinController.getInstance().updateBetLinesText(linesData); //data.SpinData.LinesData
                        //set Total Value
                        cc.SpinController.getInstance().updateTotalBet(totalLine * data.BetValue);

                        //setTotalPrize
                        cc.SpinController.getInstance().setPaylinePrize(data.SpinData.PaylinePrize);

                        //Kiem tra xem co bonus ko?
                        if (data.BonusGame && data.BonusGame.BonusData !== null) {
                            //set gia tri bonus
                            cc.BonusGameController.getInstance().setData(data.BonusGame);
                            //Tat button quay
                            cc.SpinController.getInstance().activeButtonSpin(false);
                            //tao bonusgame
                            cc.MainController.getInstance().createBonusGameView();
                        }
                        //Kiem tra xem co freespin (minigame) ko?
                        else if (data.SpinData.TotalFreeSpin > 0) {
                            //Cap nhat UI so freespin dang co
                            cc.FreeSpinController.getInstance().updateFreeSpinText(data.SpinData.TotalFreeSpin);
                            //Kich hoat che do FreeSpin
                            cc.FreeSpinController.getInstance().activeFreeSpin(true);
                            //set lai so tien total Win da choi duoc o FreeSpin
                            switch (this.gameId) {
                                case cc.GameId.EGYPT:
                                case cc.GameId.GAINHAY:
                                    cc.SpinController.getInstance().updateTotalWinUI(data.FreeSpinData.FreeSpinsPrize);
                                    break;
                                case cc.GameId.AQUARIUM:
                                case cc.GameId.DRAGON_BALL:
                                case cc.GameId.THREE_KINGDOM:
                                case cc.GameId.BUM_BUM:
                                case cc.GameId.COWBOY:
                                case cc.GameId.THUONG_HAI:
                                    cc.SpinController.getInstance().updateTotalWinUI(data.SpinData.FreeSpinsPrize);
                                    break;
                            }
                        } //Kiem tra xem co freespin event ko?
                        else if (data.SpinData.EventFreeSpin && data.SpinData.EventFreeSpin > 0) {
                            //Cap nhat UI so freespin dang co
                            cc.FreeSpinController.getInstance().updateFreeSpinText(data.SpinData.EventFreeSpin);
                            //Kich hoat che do FreeSpin
                            cc.FreeSpinController.getInstance().activeFreeSpin(true);
                            //set lai so tien total Win da choi duoc o FreeSpin
                            cc.SpinController.getInstance().updateTotalWinUI(data.SpinData.FreeSpinsPrize);
                            // switch (this.gameId) {
                            //     case cc.GameId.EGYPT:
                            //         cc.SpinController.getInstance().updateTotalWinUI(data.SpinData.FreeSpinsPrize);
                            //         break;
                            //     case cc.GameId.THREE_KINGDOM:
                            //         cc.SpinController.getInstance().updateTotalWinUI(data.SpinData.FreeSpinsPrize);
                            //         break;
                            // }
                        }
                        //Kiem tra xem con dang choi x2 ko?
                        else if (data.X2Game && data.X2Game.RoundPrize > 0 && data.X2Game.Step > 0) {
                            //set gia tri bonus
                            cc.X2GameController.getInstance().setBaseValue(data.X2Game.RoundPrize);
                            cc.X2GameController.getInstance().setX2GameData(data.X2Game);
                            //tao bonusgame
                            cc.MainController.getInstance().createX2GameView();
                        } else {
                            cc.FreeSpinController.getInstance().activeFreeSpin(false);
                        }


                        //TryPlayer
                        if (data.AccountID < 0)  {
                            cc.BalanceController.getInstance().updateTryBalance(data.Account.TotalStar);
                            cc.SpinController.getInstance().activeButtonSelectBetLines(false);
                        } else {
                            cc.BalanceController.getInstance().updateRealBalance(data.Account.TotalStar);
                            cc.BalanceController.getInstance().updateBalance(data.Account.TotalStar);
                            cc.SpinController.getInstance().activeButtonSelectBetLines(true);
                        }


                        cc.SpinController.getInstance().randomIcon();

                        cc.PopupController.getInstance().hideBusy();
                        break;
                    case cc.MethodHubOnName.RESULT_SPIN:
                        var data = m.A[0];

                        //Cap nhat jackpot trong game
                        cc.JackpotController.getInstance().updateJackpotInGame(data.SpinData.Jackpot);
                        //cap nhat sessionID
                        cc.SpinController.getInstance().setSessionID('#' + data.SpinData.SpinID);
                        //Luu lai spinResponse
                        cc.SpinController.getInstance().setSpinResponse(data);

                        //update lai so du thuc te
                        cc.BalanceController.getInstance().updateRealBalance(data.Account.TotalStar);


                        //setTotalPrize
                        cc.SpinController.getInstance().setPaylinePrize(data.SpinData.PaylinePrize);

                        //Doi sang kieu cho ket qua -> moi cho Quay
                        cc.SpinController.getInstance().startSpin();
                        //Yeu cau stop SPIN
                        cc.SpinController.getInstance().stopSpin();

                        cc.DDNA.getInstance().spinSummary(this.gameId, cc.SpinController.getInstance().checkIsAutoSpin(), data);
                        break;
                    case cc.MethodHubOnName.RESULT_FREE_SPIN:
                        var data = m.A[0];

                        //cc.JackpotController.getInstance().updateJackpotInGame(data.SpinData.Jackpot);
                        //set data response
                        cc.SpinController.getInstance().setSpinResponse(data);
                        //Doi sang kieu cho ket qua -> moi cho Quay
                        cc.SpinController.getInstance().startSpin();
                        //dung quay
                        cc.SpinController.getInstance().stopSpin();
                        break;
                    case cc.MethodHubOnName.UPDATE_USER_BALANCE:
                        //method = PlayBonusGame
                        cc.BonusGameController.getInstance().onPlayBonusFinishResponse(m.A[0]);
                        break;
                    case cc.MethodHubOnName.RESULT_X2_GAME:
                        //refresh lại balance UI
                        cc.BalanceController.getInstance().updateRealBalance(m.A[0].Balance);
                        cc.BalanceController.getInstance().updateBalance(m.A[0].Balance);
                        cc.X2GameController.getInstance().onResultX2Game(m.A[0]);
                        break;
                    case cc.MethodHubOnName.UPDATE_JACKPOT:

                        var jackpots = m.A[0].split('|');
                        //update thong tin jackpot ngoai phong cho
                        cc.JackpotController.getInstance().updateJackpot(jackpots);
                        //update thong tin jackpot trong man choi
                        var jackpotVal = jackpots[cc.RoomController.getInstance().getRoomId() - 1];
                        if (jackpotVal !== undefined && !cc.SpinController.getInstance().getIsPlayTry())
                            cc.JackpotController.getInstance().updateJackpotInGame(parseInt(jackpotVal));
                        break;
                    case cc.MethodHubOnName.MESSAGE:
                        //thong bao
                        var data = m.A[0];
                        if (data.Description) {
                            cc.PopupController.getInstance().showSlotsMessage(data.Description);
                        } else if (data.Message) {
                            cc.PopupController.getInstance().showSlotsMessage(data.Message);
                        } else {
                            cc.PopupController.getInstance().showSlotsMessage(data);
                        }

                        //da co loi xay ra -> hien message -> out khoi phong choi
                        cc.director.getScheduler().schedule(function () {
                            cc.LobbyController.getInstance().destroyDynamicView(null);
                        }, this, 2, 0, 0, false);

                        break;
                    case cc.MethodHubOnName.OTHER_DEVICE:
                        // m.A[0] = ma loi , m.A[1] = message
                        //vao phong choi tren thiet bi khac
                        cc.PopupController.getInstance().showPopupOtherDevice( m.A[1], cc.RoomController.getInstance().getGameId());
                        break;
                    default:
                        //Error
                        if (response.E !== undefined) {
                            /*
                            {
                              "I": "2",
                              "E": "'Spin' method could not be resolved. Potential candidates are: \nSpin(lines:String, deviceId:Int32):Int32"
                            }
                            * */
                        }
                        break;
                }
            } else if (response.G && response.G !== '') {
                //khi nao co response nay -> enterlobby thanh cong -> active button cho chon phong
                if (!this.isActiveButtonRoom) {
                    this.btnRooms.forEach(function (btnRoom) {
                        btnRoom.interactable = true;
                    });
                    this.isActiveButtonRoom = true;
                }
            } else {
                //PING PONG
                if (response.I) {
                    this.slotsHub.pingPongResponse(response.I);
                }
            }
        },

        onHubOpen: function () {
            this.slotsHub.enterLobby();
        },

        onHubClose: function () {
            //reconnect
            if ((new Date()).getTime() - this.lastTimeReconnect >= netConfig.RECONNECT_TIME * 1000) {
                this.reconnect();
            } else {
                cc.director.getScheduler().schedule(this.reconnect, this, netConfig.RECONNECT_TIME, 0, 0, false);
            }
        },

        onHubError: function () {
            cc.SpinController.getInstance().activeButtonSpin(true);
        },

        backClicked: function () {
            // console.log('');
            cc.LobbyController.getInstance().destroyDynamicView(null);
			 cc.LobbyController.getInstance().offuserguest(true);
			
        },

        roomClicked: function (event, data) {
            var roomId = parseInt(data.toString());
            cc.RoomController.getInstance().setRoomId(roomId);
            if (roomId === 0) {
                this.sendRequestOnHub(cc.MethodHubName.PLAY_TRY);
                cc.RoomController.getInstance().setRoomId(3);
            } else {
                this.sendRequestOnHub(cc.MethodHubName.PLAY_NOW, roomId);
            }

        },
    });
}).call(this);
