/**
 * Created by Welcome on 5/28/2019.
 */

(function () {
    cc.XXInfoView = cc.Class({
        "extends": cc.Component,
        properties: {
            //phien
            lbSID: cc.Label,
            //thoi gian
            lbTimer: cc.Label,
            //giai doan (đặt cửa, kết quả...)
            lbInfo: cc.Label,
            progressTimer: cc.ProgressBar,
            //total user
            lbTotalUser: cc.Label,
            lbTotalUserWin: cc.Label,
			spriteBarTime: cc.Sprite,
            //players
            xxPlayers: [cc.XXPlayer],
        },

        onLoad: function () {
            this.interval = null;
            this.timeBet = 54;
            this.reset();
            cc.XXController.getInstance().setXXInfoView(this);

            this.maxPlayer = this.xxPlayers.length;

            this.animInfo = this.lbInfo.node.parent.getComponent(cc.Animation);

            this.currPlayer = this.xxPlayers[0];
        },
        //Cap nhat thong tin nguoi choi hien tai
        updateInfoCurrPlayer: function (data) {
            this.currPlayer.registerPlayer(data);
        },
        //HubOn - joinGame
        joinGame: function (info) {
            //lay ve mang vi tri player
            this.positions = info.Positions;

            this.countPlayer = 0;
            //luu vi tri player tren UI
            this.positionsUI = [0, 0, 0, 0, 0, 0, 0];

            //tim index của owner
            this.onwerIndex = 0;

            //gan vi tri Owner
            this.positionsUI[this.countPlayer] = cc.LoginController.getInstance().getUserId();

            this.countPlayer++;
            for (var i = 0; i < this.maxPlayer; i++) {
                var accID = this.positions[i];
                //add vi tri cac accID khac vao position tren UI
                if (accID > 0 && accID !== cc.LoginController.getInstance().getUserId()) {
                    this.positionsUI[this.countPlayer] = accID;
                    this.countPlayer++;
                }
            }

            //lay ve players
            var players = info.Players;

            for (var i = 0; i < this.maxPlayer; i++) {
                var accID = this.positions[i];
                //cac vi tri co nguoi choi: accID > 0
                if (accID > 0) {
                    this.registerPlayer(this.getIndexUIBetByAccID(accID), players[accID].Account);
                }
            }
            cc.XXController.getInstance().updatePositionPlayerUI(this.positionsUI);
        },

        //HubOn - playerJoin
        playerJoin: function (info) {
            for (var i = 0; i < this.maxPlayer; i++) {
                var accID = this.positionsUI[i];
                if (accID === 0) {
                    this.positionsUI[i] = info.Account.AccountID;
                    this.registerPlayer(i, info.Account);
                    break;
                }
            }
        },

        //HubOn - playerLeave
        playerLeave: function (info) {
            //dam bao joinGame xong moi xu ly - tranh loi server neu bi
            if (this.positionsUI) {
                var accID = info[0];

                this.unRegisterPlayer(this.getIndexUIBetByAccID(accID));

                var index = -1;
                for (var i = 0; i < this.maxPlayer; i++) {
                    if (accID === this.positionsUI[i]) {
                        index = i;
                        break;
                    }
                }

                this.positionsUI[index] = 0;
            }
        },

        //HubOn - updateConnectionStatus
        updateConnectionStatus: function (info) {
            if (this.positionsUI) {
                var accID = info[0];
                var status = info[1];
                this.xxPlayers[this.getIndexUIBetByAccID(accID)].updateConnectionStatus(status);

                //neu la owner dky rời game -> tắt game
                if (status === cc.XXConnectionStatus.REGISTER_LEAVE_GAME && accID === cc.LoginController.getInstance().getUserId()) {
                    cc.LobbyController.getInstance().destroyDynamicView(null);
                }
            }
        },

        //HubOn - updatePlayerStatus
        updatePlayerStatus: function (playerStatus) {
            if (this.positionsUI) {
                this.xxPlayers[0].updatePlayerStatus(playerStatus);
            }
        },
        //HubOn - summaryPlayer
        summaryPlayer: function (totalUser) {
            this.lbTotalUser.string = totalUser;
        },

        //HubOn - vipPlayer
        vipPlayer: function (dataPlayers) {
            let countPlayer = 0;
            this.positionsUI = [0, 0, 0, 0, 0, 0, 0];
            this.positionsUI[0] = cc.LoginController.getInstance().getUserId();
            countPlayer++;
            dataPlayers.map(player => {
                if (player.AccountID != cc.LoginController.getInstance().getUserId()) {
                    if (countPlayer <= 6) {
                        this.positionsUI[countPlayer] = player.AccountID;
                        countPlayer++;
                    }
                }
            }, this);
            //Hien thi player
            this.positionsUI.forEach(function (accID, index) {
                if (accID != 0) {
                    try {
                        let playerInfo = dataPlayers.filter(player => player.AccountID == accID);
                        //Loai tru player hien tai
                        if (playerInfo.length > 0 && index != 0) {
                            this.xxPlayers[index].registerPlayer(playerInfo[0].Account);
                            this.xxPlayers[index].resetPlayerResultUI();
                        }
                    } catch (e) {
                        console.log(e);
                    }
                } else {
                    //Reset lai vi tri cua player
                    this.xxPlayers[index].unRegisterPlayer();
                }
            }, this);
            cc.XXController.getInstance().updatePositionPlayerUI(this.positionsUI);
        },
        //HubOn - totalUserWin
        totalUserWin: function (amount) {
            //set gia tri
            this.lbTotalUserWin.string = '+' + cc.Tool.getInstance().formatNumber(amount);
            this.lbTotalUserWin.font = cc.XXController.getInstance().getWinFont();
            //play fx thang
            this.lbTotalUserWin.node.active = true;
            this.lbTotalUserWin.node.scaleY = 0;
            this.lbTotalUserWin.node.getComponent(cc.Animation).play('xxWin');
        },
        //HubOn - WinResultVip
        winResultVip: function (dataPlayer) {
            if (!this.positionsUI)
                return;
            if (dataPlayer.length > 0) {
                dataPlayer.map(player => {
                    let indexPlayer = this.positionsUI.indexOf(player.AccountID);
                    if (player.AccountID != cc.LoginController.getInstance().getUserId() && indexPlayer != -1) {
                        this.xxPlayers[indexPlayer].playerResultUI(true, player.Award);
                        this.xxPlayers[indexPlayer].updateChip(player.Balance);
                    }
                });
            }
        },
        //HubOn - WinResult
        winResult: function (dataPlayer) {
            if (!this.currPlayer)
                return;
            this.currPlayer.playerResultUI(true, dataPlayer.Award);
            this.currPlayer.updateChip(dataPlayer.Balance);
        },
        updateChip: function (accID, chip) {
            if (this.positionsUI.indexOf(accID) != -1) {
                this.xxPlayers[this.getIndexUIBetByAccID(accID)].updateChip(chip);
            }
        },

        getPositions: function () {
            return this.positionsUI;
        },

        //lay ve index bet theo accID
        getIndexUIBetByAccID: function (accID) {
            var indexBet = -1;
            try {
                for (var i = 0; i < this.maxPlayer; i++) {
                    if (this.positionsUI[i] === accID) {
                        indexBet = i;
                        break;
                    }
                }
            } catch (err) {

            }
            // console.log('getIndexUIBetByAccID: ' + indexBet);
            return indexBet;
        },

        //lay ve index bet theo accID
        getIndexUIBetByPosition: function (pos) {
            var indexBet = pos;

            if (indexBet > this.onwerIndex) {
                //map lai theo UI
                indexBet += this.onwerIndex;

                if (indexBet >= this.maxPlayer) {
                    indexBet -= (this.maxPlayer - 1);
                }
            } else if (indexBet < this.onwerIndex) {
                //map lai theo UI
                indexBet -= this.onwerIndex;
                if (indexBet < 0) {
                    indexBet = (this.maxPlayer + indexBet);
                }
            } else {
                indexBet = 0;
            }

            // console.log('getIndexUIBetByPosition: ' + indexBet);
            return indexBet;
        },

        //reset UI ket qua (win/lose) sau moi Phien cua tat ca player
        resetPlayersResultUI: function () {
            this.lbTotalUserWin.node.active = false;
            for (var i = 0; i < this.maxPlayer; i++) {
                this.xxPlayers[i].resetPlayerResultUI();
            }
        },

        //set ket qua cua player
        playerResultUI: function (playerIndex, isWin, amount) {
            this.xxPlayers[playerIndex].playerResultUI(isWin, amount);
        },

        //player vao phong
        registerPlayer: function (playerIndex, info) {
            this.xxPlayers[playerIndex].registerPlayer(info);
        },

        unRegisterPlayer: function (playerIndex) {
            this.xxPlayers[playerIndex].unRegisterPlayer();
        },

        playerShowBubbleChat: function (message) {
            if (cc.ChatRoomController.getInstance().checkIsEmotion(message)) {
// <<<<<<< HEAD
//                 this.xxPlayers.forEach(function (player) {
//                     if (player.lbName.string === cc.Config.getInstance().formatName(message[0], 7)
//                         && player.lbSID.string === cc.Config.getInstance().getServiceNameNoFormat(message[2])) {
//                         player.showEmotion(cc.ChatRoomController.getInstance().getIndexEmotion(message)
// =======
                this.xxPlayers.forEach(function (xxPlayer) {
                    if (xxPlayer.nickName === message[0]) {
                        xxPlayer.showEmotion(cc.ChatRoomController.getInstance().getIndexEmotion(message)
// >>>>>>> remotes/origin/Update-DgTiger-XX
                            , message);
                    }
                });
            } else {
// <<<<<<< HEAD
//                 this.xxPlayers.forEach(function (player) {
//                     if (player.lbName.string === cc.Config.getInstance().formatName(message[0], 7)
//                         && player.lbSID.string === cc.Config.getInstance().getServiceNameNoFormat(message[2])) {
//                         player.showBubbleChat(message);
// =======
                this.xxPlayers.forEach(function (xxPlayer) {
                    if (xxPlayer.nickName === message[0]) {
                        xxPlayer.showBubbleChat(message);
// >>>>>>> remotes/origin/Update-DgTiger-XX
                    }
                });
            }

        },

        reset: function () {
            this.isTimer = false;
            this.timer = 0;
            this.currentState = 999;
            if (this.interval !== null) {
                clearInterval(this.interval);
            }
        },

        startTimer: function (remaining) {
            if (this.interval !== null) {
                clearInterval(this.interval);
            }

            var self = this;
            this.timer = remaining;
            this.isTimer = true;

            ////update timer UI
            this.updateTimer(remaining);

            this.interval = setInterval(function () {
                if (self.isTimer) {
                    self.timer -= 1;
                    self.updateTimer(self.timer);
                }
            }, 1000);

        },

        updateTimer: function (time) {
            
                if (this.progressTimer) {
                    switch (this.currentState) {
                        case cc.XXState.BETTING:
                            var progress = time / 20;
                            this.progressTimer.progress =  progress;
                            break;
                        case cc.XXState.OPEN_PLATE:
                            progress = time / 5;
                            this.progressTimer.progress =  progress;
                            break;
                        case cc.XXState.SHOW_RESULT:
                            progress = time / 7;
                            this.progressTimer.progress =  progress;
                            break;
                        case cc.XXState.WAITING:
                            progress = time / 1;
                            this.progressTimer.progress =  progress;
                            break;
                        case cc.XXState.SHAKING:
                            progress = time / 3;
                            this.progressTimer.progress =  progress;
                            break;
                    }
					
					console.log(progress);
                }
if (this.lbTimer) {
                // var timeInt =  Math.round(time);
                var timeInt = time;
                this.timeInt = timeInt;

                if (timeInt > 0) {
                    this.lbTimer.string = timeInt;
                    if (timeInt <= 3 && this.currentState === cc.XXState.BETTING) {
                        this.lbTimer.node.color = cc.Color.RED;
                        // cc.XXController.getInstance().activeAllButtonBet(false);
                    }
                }
            }
        },

        getTime: function () {
            return this.timeInt;
        },

        updateSessionId: function (sID) {
            this.lbSID.string = 'Phiên: #' + sID;
        },

        updateInfo: function (info, state, time) {
            //check state de xu ly hien thi
            switch (state) {
                //giai doan dat cuoc
                case cc.XXState.BETTING: //54
                    if (this.currentState !== state) {
                        this.updateSessionId(info.SessionID);
                        cc.XXController.getInstance().setSID(info.SessionID);

                        this.progressTimer.node.parent.active = true;
                        // this.startTimer(time);
                        this.resetPlayersResultUI();
                        this.lbTimer.node.color = cc.Color.GREEN;
                        this.lbInfo.string = 'Đặt cửa';
                        this.animInfo.play('xxInfo');

                        //cc.XXController.getInstance().resetDraw();
                        //cc.XXController.getInstance().draw(info.History.reverse());
                    }
                    break;

                //giai doan mo dia
                case cc.XXState.OPEN_PLATE:
                    if (this.currentState !== state) {
                        this.updateSessionId(info.SessionID);
                        cc.XXController.getInstance().setSID(info.SessionID);

                        this.progressTimer.node.parent.active = false;
                        // this.startTimer(time);
                        this.resetPlayersResultUI();
                        this.lbTimer.node.color = cc.Color.WHITE;
                        this.lbInfo.string = 'Mở bát';
                        this.animInfo.play('xxInfo');
                    }
                    break;

                //giai doan ket qua
                case cc.XXState.SHOW_RESULT: //15
                    if (this.currentState !== state) {
                        this.updateSessionId(info.SessionID);
                        cc.XXController.getInstance().setSID(info.SessionID);

                        this.progressTimer.node.parent.active = true;
                        // this.startTimer(time);
                        this.lbTimer.node.color = cc.Color.WHITE;
                        this.lbInfo.string = 'Kết quả';
                        this.animInfo.play('xxInfo');
                    }
                    break;

                //giai doan cho phien moi
                case cc.XXState.WAITING:
                    if (this.currentState !== state) {
                        this.updateSessionId(info.SessionID);
                        cc.XXController.getInstance().setSID(info.SessionID);

                        this.progressTimer.node.parent.active = false;
                        // this.startTimer(time);
                        this.resetPlayersResultUI();
                        this.lbTimer.node.color = cc.Color.WHITE;
                        // this.lbInfo.string = 'Đợi phiên mới';
                        // this.animInfo.play('xxInfo');
                    }
                    break;

                //giai doan xoc dia
                case cc.XXState.SHAKING:
                    if (this.currentState !== state) {
                        this.updateSessionId(info.SessionID);
                        cc.XXController.getInstance().clearAllChip();
                        this.progressTimer.node.parent.active = false;
                        // this.startTimer(time);
                        this.resetPlayersResultUI();
                        this.lbTimer.node.color = cc.Color.WHITE;
                        // this.lbInfo.string = 'Xóc xóc';
                        // this.animInfo.play('xxInfo');
                    }
                    break;

            }

            //luu lai state hien tai
            this.currentState = state;
        },
    });
}).call(this);
