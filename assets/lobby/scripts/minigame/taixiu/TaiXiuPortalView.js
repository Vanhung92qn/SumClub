/**
 * Created by Nofear on 6/7/2017.
 */
var taiXiuConfig = require('TaiXiuConfig');
var netConfig = require('NetConfig');
var timeAll=60;
(function () {
    cc.TaiXiuPortalView = cc.Class({
        "extends": cc.Component,
        properties: {
             lbiTotalBetTai: cc.LabelIncrement, //tong tien bet Tai
             lbiTotalBetXiu: cc.LabelIncrement, //tong tien bet Xiu
             lbiJackpot: cc.LabelIncrement,
        },

        onLoad: function () {
            timeAll = 60;
            this.interval = null;

            this.nodeParentTai = this.lbiTotalBetTai.node.parent;
            this.nodeParentXiu = this.lbiTotalBetXiu.node.parent;
            this.nodeParentJackpot = this.lbiJackpot.node.parent;

            cc.TaiXiuController.getInstance().setTaiXiuPortalView(this);
            this.lastTimeReconnect = (new Date()).getTime();

            this.isAuthorized = false;
            this.connectHubTx();
        },

        onDestroy: function () {
            timeAll = 60;
            if (this.interval !== null) {
                clearInterval(this.interval);
            }
            this.unscheduleAllCallbacks();
            cc.TaiXiuController.getInstance().setTaiXiuPortalView(null);
        },

        reset: function () {
            timeAll = 60;
            this.isTimer = false;
            this.timer = 0;
            this.currentState = 999;
            if (this.interval !== null) {
                clearInterval(this.interval);
            }
        },
        
        startTimer: function (remaining) {
            if(remaining >= timeAll){
                return;
            }else timeAll = remaining;
            if (this.interval !== null) {
                clearInterval(this.interval);
            }

            var self = this;
            this.timer = remaining;
            this.isTimer = true;

            ////update timer UI
            this.updateTimer(remaining);

            this.interval = setInterval(function(){
                if (self.isTimer) {
                    self.timer -= 1;
                    timeAll = self.timer;
                    self.updateTimer(Math.round(self.timer));
                    if(self.timer <=1){
                        timeAll = 60;
                    }
                }
            }, 1000);
        },

        stopTimer: function () {
            this.isTimer = false;
            if (this.interval !== null) {
                clearInterval(this.interval);
            }
            timeAll = 60;
        },

        updateInfo: function (sessionInfo) {
            this.startTimer(sessionInfo.Ellapsed);
			cc.MINIController.getInstance().updateInfoTx(sessionInfo, this.currentState);
            //luu lai state hien tai
            this.currentState = sessionInfo.CurrentState;

            //set thong tin
            this.lbiTotalBetTai.tweenValueto(sessionInfo.TotalBetTai);
            this.lbiTotalBetXiu.tweenValueto(sessionInfo.TotalBetXiu);
            this.lbiJackpot.tweenValueto(sessionInfo.Jackpot);
        },


        updateTimer: function (time) {
            if (time < 1) return;
            // this.lbTimer.string = cc.Tool.getInstance().convertSecondToTime2(time);
            cc.TaiXiuController.getInstance().updateTimerInfoView(time);
            cc.MINIController.getInstance().updateTimerTx(time, this.currentState);
            //console.log('updateTimer: ' +time);
        },

        disconnectAndLogout: function () {
            if (this.luckyDiceHub) {
                this.luckyDiceHub.disconnect();
            }
            this.lastTimeReconnect = (new Date()).getTime();
            this.isAuthorized = false;
            timeAll = 60;
        },

        connectHubTxAuthorize: function () {
            if (!this.isAuthorized) {
                if (this.luckyDiceHub) {
                    this.luckyDiceHub.disconnect();
                }

                this.lastTimeReconnect = (new Date()).getTime();
                this.isAuthorized = true;
                //cc.PopupController.getInstance().showBusy();
                var luckyDiceNegotiateCommand = new cc.LuckyDiceNegotiateCommand;
                luckyDiceNegotiateCommand.execute(this);

                return false;
            } else {
                return true;
            }
        },

        connectHubTx: function () {
            // console.log('connectHubTx');
            //cc.PopupController.getInstance().showBusy();

            this.isAuthorized = false;
            var luckyDiceNegotiateCommand = new cc.LuckyDiceNegotiateCommand;
            luckyDiceNegotiateCommand.execute(this);
        },

        reconnect: function () {
            // console.log('luckyDiceHub reconnect');
            this.lastTimeReconnect = (new Date()).getTime();
            this.luckyDiceHub.connect(this, cc.HubName.LuckyDice, this.connectionToken, true);
            timeAll = 60;
        },

        sendRequestOnHub: function (method, data1, data2) {
            switch (method) {
                case cc.MethodHubName.ENTER_LOBBY:
                    this.luckyDiceHub.enterLobby();
                    break;
                case cc.MethodHubName.BET:
                    this.luckyDiceHub.bet(data1, data2);
                    break;
                case cc.MethodHubName.CORD_INFO:
                    this.luckyDiceHub.cordInfo();
                    break;
            }
        },

        onLuckyDiceNegotiateResponse: function (response) {
            this.connectionToken = response.ConnectionToken;
            this.luckyDiceHub = new cc.Hub;
            this.luckyDiceHub.connect(this, cc.HubName.LuckyDiceHub, response.ConnectionToken);
        },

        onHubMessage: function (response) {

            if (response.M !== undefined && response.M.length > 0) {
                var m = (response.M)[0];

                switch (m.M) {
                    //vao Phong
                    case cc.MethodHubOnName.SESSION_INFO:
                        var data = m.A[0];
                        this.updateInfo(data);
                        cc.TaiXiuController.getInstance().updateInfoView(data);
                        cc.TaiXiuController.getInstance().updateResultView(data);
                        cc.TaiXiuController.getInstance().setSID(data.SessionID);
                        break;
                    //vao Phong
                    case cc.MethodHubOnName.GAME_HISTORY:
                        cc.TaiXiuController.getInstance().updateSessionHistory(m.A[0]);

                        //login roi -> moi goi
                        if (cc.LoginController.getInstance().getLoginState() && cc.TaiXiuController.getInstance().getIsOpen()) {
                            this.sendRequestOnHub(cc.MethodHubName.CORD_INFO);
                        }
                        break;
                    //vao Phong
                    case cc.MethodHubOnName.BET_OF_ACCOUNT:
                        cc.director.getScheduler().schedule(function () {
                            cc.TaiXiuController.getInstance().updateBetInfoView(m.A[0]);
                        }, this, 1, 0, 0.2, false);
                        break;

                    //su kien trieu hoi PH
                    case cc.MethodHubOnName.CORD_ACCOUNT_INFO:
                        var data = m.A[0];
                        if (data.IsEventDragon) {
                            cc.TaiXiuController.getInstance().activeEventPH(true);
                            cc.TaiXiuController.getInstance().setUserCord(data.CordWin, data.CordLost);
                        } else {
                            cc.TaiXiuController.getInstance().activeEventPH(false);
                        }
                        break;
                    //su kien trieu hoi PH
                    case cc.MethodHubOnName.EVENT_WINNER_RESULT:
                        //set giai thuong + user goi duoc rong
                        cc.TaiXiuController.getInstance().setEventWinnerResult(m.A[0]);
                        //Khoi tao hieu ung khi dang o portal hoặc đang bật TX
                        if (cc.LobbyController.getInstance().checkLobbyActive() || cc.TaiXiuController.getInstance().getIsOpen()) {
                            cc.LobbyController.getInstance().createFxSummonDragon();
                        }


                        //login roi -> moi goi
                        if (cc.LoginController.getInstance().getLoginState()) {
                            this.sendRequestOnHub(cc.MethodHubName.CORD_INFO);
                        }

                        //Khoi tao hieu ung khi đang bật TX
                        // if (cc.TaiXiuController.getInstance().getIsOpen()) {
                        //     cc.LobbyController.getInstance().createFxSummonDragon();
                        // }

                        break;
                    //su kien trieu hoi PH
                    case cc.MethodHubOnName.SUMMON_DRAGON_AWARD:
                        //user nam trong TOP dây Win/Lose -> duoc thuong -> lay lai thong tin balance
                        // {
                        //     "AccountID": 100000012,
                        //     "PrizeValue": 1756234,
                        //     "Balance": 243553877
                        // }

                        cc.LobbyController.getInstance().refreshAccountInfo();
                        break;

                    //bet thanh cong
                    case cc.MethodHubOnName.BET_SUCCESS:
                        var data = m.A[0];
                        cc.TaiXiuController.getInstance().updateBetInfoView(data);
                        //update lai balance
                        cc.BalanceController.getInstance().updateRealBalance(m.A[1]);
                        cc.BalanceController.getInstance().updateBalance(m.A[1]);

                        cc.DDNA.getInstance().betSummary(cc.DDNAGame.TAI_XIU, data.BetValue, cc.TaiXiuController.getInstance().getSID());
                        break;
					 case cc.MethodHubOnName.WIN_RESULT:
                        var data = m.A[0];
                        var waitTime = taiXiuConfig.TIME_WAIT_DICE_ANIMATION;
                        //dang bat che do Nan
                        if (cc.TaiXiuController.getInstance().getIsNan()) {
                            //thoi gian doi show ket qua win lau hon
                            waitTime = taiXiuConfig.TIME_WAIT_SHOW_WIN_RESULT_NAN;
                        }

                        cc.director.getScheduler().schedule(function () {
                            //play fx win
                            cc.TaiXiuController.getInstance().playEffectWin(data.Award);
                            //update lai balance
                            cc.BalanceController.getInstance().updateRealBalance(data.Balance);
                            cc.BalanceController.getInstance().updateBalance(data.Balance);
                        }, this, 0, 0, waitTime, false);

                        break;	
                   
                    case cc.MethodHubOnName.MESSAGE:
                        var data = m.A[0];
                        if (data.Description) {
                            cc.PopupController.getInstance().showMessage(data.Description);
                        } else if (data.Message) {
                            cc.PopupController.getInstance().showMessage(data.Message);
                        } else {
                            cc.PopupController.getInstance().showMessage(data);
                        }
                        break;
                    case cc.MethodHubOnName.OTHER_DEVICE:
                        // m.A[0] = ma loi , m.A[1] = message
                        //vao phong choi tren thiet bi khac
                        cc.PopupController.getInstance().showPopupOtherDevice( m.A[1], cc.GameId.TAI_XIU);
                        break;
                }
            }  else {
                //PING PONG
                if (response.I) {
                    this.luckyDiceHub.pingPongResponse(response.I);
                }
            }
        },

        onHubOpen: function () {
            cc.PopupController.getInstance().hideBusy();
            if (this.isAuthorized) {
                this.sendRequestOnHub(cc.MethodHubName.ENTER_LOBBY);

            }
        },

        onHubClose: function () {
            cc.TaiXiuController.getInstance().reset();
            //reconnect
            // console.log((new Date()).getTime() - this.lastTimeReconnect);
            if ((new Date()).getTime() - this.lastTimeReconnect >= netConfig.RECONNECT_TIME * 1000) {
                this.reconnect();
            } else {
                cc.director.getScheduler().schedule(this.reconnect, this, netConfig.RECONNECT_TIME, 0, 0, false);
            }
        },

        onHubError: function () {

        },
    });
}).call(this);
