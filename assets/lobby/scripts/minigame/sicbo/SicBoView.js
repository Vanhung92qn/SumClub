/**
 * Created by Nobita on 01/09/2022.
 */

var netConfig = require('NetConfig');
var sicBoConfig = require('SicBoConfig');

(function () {
    cc.SicBoView = cc.Class({
        extends: cc.Component,

        properties: {
            loading: cc.Node,
			progressBar: cc.ProgressBar,
        },

        onLoad() {
            this.controller = cc.SicBoController.getInstance();
            this.controller.setSicBoView(this);
			cc.ChatRoomController.getInstance().setHubView(this);
            this.controller.initBetLog();
            this.controller.setBetLogSession(1);
            this.lastTimeReconnect = (new Date()).getTime();
			this.isAuthorized = false;
            this.connectHubSicBo();
			this.loading.active = true;
            this.progressBar.progress = 0;
            this.loadingProgressBar();
        },

		loadingProgressBar: function() {
			const progressBar = this.progressBar.getComponent(cc.ProgressBar);
			progressBar.progress = 0;
			const duration = 5;
			
			const progressStep = 1 / (duration * 10);
			
			this.loading.active = true;

			const updateProgressBar = () => {
				progressBar.progress += progressStep;
				if (progressBar.progress >= 1) {
					this.loading.active = false;
				}
			};

			this.schedule(updateProgressBar, 1 / 60, duration * 60 - 1);

			updateProgressBar();
		},
		
        disconnectAndLogout: function () {
            if (this.sicboHub) {
                this.sicboHub.disconnect();
            }
            this.lastTimeReconnect = (new Date()).getTime();
            this.isAuthorized = false;
			this.lastTimeReconnect = (new Date()).getTime();
        },

        connectHubSicBoAuthorize: function () {
            if (!this.isAuthorized) {
                if (this.sicboHub) {
                    this.sicboHub.disconnect();
                }
                this.lastTimeReconnect = (new Date()).getTime();
                this.isAuthorized = true;
                var sicboNegotiateCommand = new cc.SicBoNegotiateCommand;
                sicboNegotiateCommand.execute(this);

                return false;
            } else {
                return true;
            }
        },

        connectHubSicBo: function () {
            this.isAuthorized = false;
            var sicboNegotiateCommand = new cc.SicBoNegotiateCommand;
            sicboNegotiateCommand.execute(this);
        },

        reconnect: function () {
            this.lastTimeReconnect = (new Date()).getTime();
            this.sicboHub.connect(this, cc.HubName.SicBoHub, this.connectionToken, true);
			this.lastTimeReconnect = (new Date()).getTime();
        },
		
        onEnable: function () {
            //cc.BalanceController.getInstance().updateBalance(cc.BalanceController.getInstance().getBalance());
        },

        onDestroy: function () {
            //cc.LobbyJackpotController.getInstance().pauseUpdateJackpot(false);
            cc.SicBoController.getInstance().sendRequestOnHub(cc.MethodHubName.EXIT_LOBBY);

            if (this.interval !== null) {
                clearInterval(this.interval);
            }

            if (this.sicboHub) {
                this.sicboHub.disconnect();
            }

            this.unscheduleAllCallbacks();
            cc.SicBoController.getInstance().setSicBoView(null);

            if (cc.sys.isNative) {
				cc.assetManager.releaseAsset('SicBo');
            }
        },
		
        sendRequestOnHub: function (method, data1, data2) {
            switch (method) {
                case cc.MethodHubName.ENTER_LOBBY:
                    this.sicboHub.enterLobby();
                    break;
                case cc.MethodHubName.EXIT_LOBBY:
                    this.sicboHub.exitLobby();
                    break;
                case cc.MethodHubName.BET:
                    this.sicboHub.bet(data1, data2);
                    break;
                case cc.MethodHubName.PLAY_NOW:
                    this.sicboHub.playNow();
                    break;
                case cc.MethodHubName.REGISTER_LEAVE_ROOM:
                    this.sicboHub.registerLeaveRoom();
                    break;
                case cc.MethodHubName.UNREGISTER_LEAVE_ROOM:
                    this.sicboHub.unRegisterLeaveRoom();
                    break;
                case cc.MethodHubName.SEND_MESSAGE:
                    this.sicboHub.sendRoomMessage(data1);
                    break;
            }
        },

        onSicBoNegotiateResponse: function (response) {
            this.connectionToken = response.ConnectionToken;
            this.sicboHub = new cc.Hub;
            this.sicboHub.connect(this, cc.HubName.SicBoHub, response.ConnectionToken);
        },

        onHubMessage: function (response) {
            if (response.M !== undefined && response.M.length > 0) {
                let res = response.M;				
                res.map(m => {
                    switch (m.M) {
                        //Thoat game
                        case cc.MethodHubOnName.PLAYER_LEAVE:
                            this.playerLeave(m.A);
                            break;
                        //Thong tin game
                        case cc.MethodHubOnName.SESSION_INFO:
                            let info = m.A[0];
                            this.controller.onNotifyChangePhrase(info);
                            //Cap nhat tong tien bet
                            this.controller.updateTotalBet(info);
                            break;
                        //Thong tin game
                        case cc.MethodHubOnName.NOTIFY_CHANGE_PHRASE:
                            this.controller.onNotifyChangePhrase(m.A[0]);
                            break;
                        case cc.MethodHubOnName.UPDATE_ROOM_TIME:
							//console.log(parseInt(m.A[0]));
                            this.controller.updateTimerInfoView(parseInt(m.A[0]));
                            break;
                        //Danh sach nguoi choi
                        case cc.MethodHubOnName.SUMMARY_PLAYER:
                            this.controller.updatePlayersInGame(m.A[0]);
                            break;
                        //Thong tin game
                        case cc.MethodHubOnName.JOIN_GAME:
                            this.controller.updatePlayerInfor(m.A[0]);
                            this.controller.onNotifyChangePhrase(m.A[1]);
                            //Cap nhat tong tien bet cua user
                            if (m.A[3].length > 0) {
                                m.A[3].map(betData => {
                                    this.controller.updateTotalUserBetSide(betData.BetSide, betData.SummaryBet);
                                }, this);
                            }
                            this.controller.initListSoiCau(m.A[2]);
                            //Cap nhat chip cua phien
                            this.controller.updateChipForBetSession(m.A[4]);
                            break;
                        //Cap nhat danh sach player
                        case cc.MethodHubOnName.VIP_PLAYERS:
                            let dataPlayer = m.A[0];
                            if (dataPlayer.length > 0) {
                                this.controller.updatePlayersUI(dataPlayer);
                            }

                            break;
                        //Lich su bet
                        case cc.MethodHubOnName.GAME_HISTORY:
                            this.controller.initListSoiCau(m.A[0]);
                            break;
                        //Thong tin bet cua player
                        case cc.MethodHubOnName.BET_OF_ACCOUNT:
                            //this.controller.updateBetOfAccount(m.A[0]);
                            break;
                        //Bet thanh cong
                        case cc.MethodHubOnName.BET_SUCCESS:
                            //Push betValue vao betLog
                            let sessionID = this.controller.getBetLogSession();							
                            this.controller.setBetLog({
                                sessionID: sessionID,
                                value: m.A[0].BetValue,
                                betSide: m.A[0].BetSide
                            });
                            //Cap nhat balance
                            this.controller.updateBalanceCurrPlayer(m.A[1]);
                            cc.BalanceController.getInstance().updateRealBalance(m.A[1]);
                            this.controller.updateTotalUserBetSide(m.A[0].BetSide, m.A[0].SummaryBet);
							this.controller.updateBetOfAccount(m.A[0].BetValue);
                            this.controller.moveChipBet(m.A[0].BetValue, m.A[0].BetSide, cc.BacaratChipOf.PLAYER, m.A[0].AccountID);
                            break;
                        //Nguoi choi bet
                        case cc.MethodHubOnName.PLAYER_BET:
                            if (m.A[0] != cc.LoginController.getInstance().getUserId()) {
                                //Update chip player
                                this.controller.updateBalancePlayer(m.A);
                                //Move Chip
                                this.controller.moveChipBet(m.A[1], m.A[2], cc.BacaratChipOf.USERS, m.A[0]);
                            }
                            break;

                        //Ket qua
                        case cc.MethodHubOnName.WIN_RESULT:
                            //KO hien thi luon khi co winResult
                            this.controller.setWinResult(m.A[0]);
                            cc.BalanceController.getInstance().updateRealBalance(m.A[0].Balance);
                            break;
                        case cc.MethodHubOnName.WIN_RESULT_VIP:
                            if (m.A.length > 0) {
                                this.controller.setWinVipResult(m.A[0]);
                            }
                            break;
                        case cc.MethodHubOnName.TOTAL_WIN_MONEY:
                            this.controller.setTotalWinResult(parseInt(m.A[0]));
                            break;
                        //thong bao khi dat cuoc
                        case cc.MethodHubOnName.PLAYER_MESSAGE:
                            cc.PopupController.getInstance().showMessage(m.A[0]);
                            break;
                        //thong bao
                        case cc.MethodHubOnName.MESSAGE:
                            if (!cc.game.isPaused())
                                cc.PopupController.getInstance().showMessage(m.A[0]);
                            break;
                        //nhan message chat
                        case cc.MethodHubOnName.RECEIVE_MESSAGE:
                            cc.ChatRoomController.getInstance().addChatContent(m.A);
                            this.controller.playerShowBubbleChat(m.A);
                            break;

                    }
                });

            } else if (response.R && response.R.AccountID) {
                this.currAccId = response.R.AccountID;
                this.sendRequestOnHub(cc.MethodHubName.PLAY_NOW);
				cc.PopupController.getInstance().hideBusy();
            } else {
                if (response.I) {
                    this.sicboHub.pingPongResponse(response.I);
                }
            }
        },

        onHubOpen: function () {
			cc.PopupController.getInstance().hideBusy();
            this.sendRequestOnHub(cc.MethodHubName.ENTER_LOBBY);
			cc.PopupController.getInstance().showBusy();
        },

        onHubClose: function () {
            if ((new Date()).getTime() - this.lastTimeReconnect >= netConfig.RECONNECT_TIME * 1000) {
                this.reconnect();
            } else {
                cc.director.getScheduler().schedule(this.reconnect, this, netConfig.RECONNECT_TIME, 0, 0, false);
            }
        },

        onHubError: function () {

        },

        playerLeave: function (info) {
            var accID = info[0];
            if (accID === cc.LoginController.getInstance().getUserId()) {
                var message = info[1];
                cc.LobbyController.getInstance().destroyDynamicView(null);
                cc.PopupController.getInstance().showMessage(message)
            }
        },		
    });
}).call(this);
