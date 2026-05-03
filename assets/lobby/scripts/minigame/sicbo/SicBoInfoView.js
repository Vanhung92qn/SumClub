/**
 * Created by Nobita on 01/12/2022.
 */

(function () {
    cc.SicBoInfoView = cc.Class({
        "extends": cc.Component,
        properties: {
            lbSessionID: cc.Label,
            lbHash: cc.Label,
            lbMd5Decript: cc.Label,
			lbUserTotalBet: cc.Label,
            nodeHash: cc.Node,
            nodeString: cc.Node,
            lblTextNoti: cc.Label,
            lbTimer: cc.Label,
            lbTotalBetTai: cc.Label,
            lbTotalBetXiu: cc.Label,
            lbTotalBetChan: cc.Label,
            lbTotalBetLe: cc.Label,
            nodeDiceBox: cc.Node,
            skeBoxBase: sp.Skeleton,
            skeLid: sp.Skeleton,
            skeDiceBoxJounce: sp.Skeleton,
			closePlate: cc.Node,
			effectMd5: sp.Skeleton,
            lstPlayers: [cc.SicBoPlayer],
            lbTotalPlayer: cc.Label,
            lbTotalUserWin: cc.Label,
            lbStatus: cc.Label,
            lbLastResult: cc.Label,
            lbResult: cc.Label,
            spDice1: cc.Sprite,
            spDice2: cc.Sprite,
            spDice3: cc.Sprite,
            spDices: [cc.SpriteFrame],
            circleTimeLeft: cc.ProgressBar,
			circleBar: cc.Node,
            spShakerCupGlow: cc.Sprite,
        },

        onLoad: function () {
            this.controller = cc.SicBoController.getInstance();
            this.controller.setSicBoInfoView(this);
            this.activeTimer(false);
            this.showStatus(null);
            this.currentState = null;
            this.interval = null;
            this.time = 0;
			this.sumaryAllSideBet = 0;
            this.currPlayer = this.lstPlayers[0];
            this.animTotalUserWin = this.lbTotalUserWin.node.getComponent(cc.Animation);
            this.animationMess = this.lblTextNoti.node.parent.getComponent(cc.Animation);
			this.rootPasBowl = this.closePlate.position;
        },

        onEnable: function () {
            this.resetPlate();
        },

        onDestroy: function () {
            cc.SicBoController.getInstance().setSicBoInfoView(null);

            try {
                if (this.interval) {
                    clearInterval(this.interval);
                }
            } catch (e) {

            }
        },

        openEndDiaNan: function(){
            if (this.closePlate.active) {         
                this.closePlate.active = false;
				this.playAnimDiceBox(cc.SicBoState.OpenPlate);
				this.controller.getIsNan();
            }
        },
		
        activeOpenPlate: function () {
            let isNan = this.controller.getIsNan();
            if (!isNan) {
				this.skeLid.node.active = true;
                this.playAnimDiceBox(cc.SicBoState.OpenPlate);
            } else {
				this.skeLid.node.active = false;
				this.closePlate.active = isNan;
				cc.tween(this.nodeDiceBox).to(0.3, { position: cc.v2(0, 0), scale: 0.5 }).start();
				this.skeBoxBase.setAnimation(1, "idle", false);
				if ((!isNan)) {
					setTimeout(() => {
						this.playAnimDiceBox(cc.SicBoState.OpenPlate);
					}, 8000);
				}				
			}
        },
		
        reset: function () {
            this.currentState = 999;
            this.lastTime = 999;
        },

        nFormatter: function (num, digits) {
            if (!digits) {
                digits = 2;
            }

            const lookup = [
                { value: 1, symbol: "" },
                { value: 1e3, symbol: "K" },
                { value: 1e6, symbol: "M" },
                { value: 1e9, symbol: "G" },
                { value: 1e12, symbol: "T" },
                { value: 1e15, symbol: "P" },
                { value: 1e18, symbol: "E" }
            ];
            const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
            var item = lookup.slice().reverse().find(function (item) {
                return num >= item.value;
            });
            return item ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol : "0";
        },

		timeProgressBar: function (time) {
			if (time === 0) {
				this.circleBar.active = false;
			} else {
				this.circleBar.active = true;
			}
			
			cc.tween(this.circleTimeLeft)
				.to(time, { progress: 0 })
				.call(() => { this.circleTimeLeft.progress = 1; })
				.start();
		},
		
        updateTimerInfo: function (time) {			
            if (this.lbTimer) {
                var timeInt = time;
                if (timeInt >= 0) {
                    this.lbTimer.string = (timeInt < 10 ? "0" : "") + timeInt;

                    if (timeInt < 10) {
                        cc.tween(this.lbTimer.node)
                            .to(0, { scale: 1.5 })
                            .to(0.3, { scale: 1 })
                            .start();
                    }
                    switch (this.currentState) {						
                        case cc.SicBoState.Shaking: 
							this.timeProgressBar(timeInt);
                            break;
                        case cc.SicBoState.Betting:
                            this.timeProgressBar(timeInt);
                            break;
                        case cc.SicBoState.OpenPlate:
                            this.timeProgressBar(timeInt);
                            break;
                        case cc.SicBoState.ShowResult:
                            this.timeProgressBar(timeInt);
                            break;
                   }
                }
            }
        },

        updateResultLastSession: function (data) {
            const lastSession = data[0];
            this.spDice1.spriteFrame = this.spDices[lastSession.FirstDice - 1];
            this.spDice2.spriteFrame = this.spDices[lastSession.SecondDice - 1];
            this.spDice3.spriteFrame = this.spDices[lastSession.ThirdDice - 1];
            this.lbLastResult.string = lastSession.DiceSum + ' / ' + (lastSession.DiceSum > 10 ? 'TÀI' : 'XỈU');
        },

        showRuleClick: function () {
            cc.SicBoMainController.getInstance().createRuleView();
        },
		
        updateTotalBet: function (data) {
            this.lbTotalBetTai.string = this.nFormatter(data.Totals[1]);
            this.lbTotalBetXiu.string = this.nFormatter(data.Totals[2]);
            this.lbTotalBetChan.string = this.nFormatter(data.Totals[3]);
            this.lbTotalBetLe.string = this.nFormatter(data.Totals[4]);
        },

		updateBetOfAccount: function (betValue) {
			this.sumaryAllSideBet += betValue;
			this.lbUserTotalBet.string = cc.Tool.getInstance().formatNumberK(this.sumaryAllSideBet);
		},
		
        onNotifyChangePhrase: function (data) {
            var totalDice = data.Result.Dice1 + data.Result.Dice2 + data.Result.Dice3;
            if (data.Result.Dice1 == data.Result.Dice2 && data.Result.Dice1 == data.Result.Dice3) {
                this.lbResult.string = totalDice + ' - ' + ('BÃO');
            } else {
                this.lbResult.string = totalDice + ' - ' + (totalDice > 10 ? 'TÀI' : 'XỈU');
            }
			const state = parseInt(data.Phrase);
			const time = parseInt(data.Elapsed);

			if (state === cc.SicBoState.Betting) {
			  this.nodeHash.active = true;
			  this.nodeString.active = false;
			} else {
				this.nodeHash.active = state === cc.SicBoState.EndBetting;
				this.nodeString.active = !this.nodeHash.active;
			}

            switch (state) {
                case cc.SicBoState.None:
                    if (this.currentState !== state) {
                        this.controller.enableClickBet(false);
                        this.showStatus(null);
                    }
                    break;
                case cc.SicBoState.Waiting://Cho phien moi
                    if (this.currentState !== state) {
                        this.resetPlate();
                        //Reset trang thai
                        this.controller.enableClickBet(false);
                        //Stop animation
                        this.controller.stopAnimationWin();
                        //Clear chip
                        this.controller.clearAllChips();
                        //Khoi tao lai paramchip
                        this.controller.initParamChips();
                        this.controller.resetUserBets();
                        //Clear session truoc
                        this.controller.clearBetLog(this.controller.getBetLogSession());
                        //Tao session betlog
                        this.controller.setBetLogSession(this.controller.getBetLogSession() + 1);
                        this.resetPlayerUI();
                        this.updateTotalUserWin(null);
                        this.playAnimDiceBox(cc.SicBoState.Waiting);
                        this.showStatus("CHỜ PHIÊN MỚI");
                    }
                    break;
                case cc.SicBoState.Shaking://Xoc
                    if (this.currentState !== state) {
                        this.playAnimDiceBox(cc.SicBoState.Shaking);
                        this.controller.enableClickBet(false);
                    }
                    break;
                case cc.SicBoState.Betting://Dat Cua
					if (time >= 34) {
						this.effectMd5.node.active = true;
						this.effectMd5.setAnimation(0, 'animation_md5', false);
					}
                    if (this.currentState !== state) {
                        this.resetPlate();
                        this.controller.setWinResult(null);
                        this.controller.setWinVipResult(null);
                        this.controller.setTotalWinResult(null);
                        this.controller.enableClickBet(true);
                        this.activeTimer(true);
                        this.showStatus("ĐẶT CỬA");
                        this.lbHash.string = data.Md5Encript;
                    }
                    break;
                case cc.SicBoState.EndBetting://Dat Cua
                    if (this.currentState !== state) {
                        this.controller.enableClickBet(false);
                        this.showStatus("HẾT THỜI GIAN ĐẶT");
                    }
                    break;
                case cc.SicBoState.OpenPlate://Mo bat
						this.effectMd5.node.active = true;
						this.effectMd5.setAnimation(0, 'animation_key', false);
						this.effectMd5.setCompleteListener(() => {
							this.effectMd5.node.active = false;
						});
                    if (this.currentState !== state) {
                        this.controller.enableClickBet(false);
                        this.controller.setDicesResult(data);
                        this.activeOpenPlate();
                        this.activeTimer(false);
                        this.lbMd5Decript.string = data.Md5Decript;
                        this.showStatus(null);
                    }
                    break;
                case cc.SicBoState.ShowResult://Ket qua
                    if (this.currentState !== state) {
                        this.playAnimDiceBox(cc.SicBoState.ShowResult);
                        this.controller.initChipsWin();
                        this.controller.enableClickBet(false);
                        this.controller.onShowResult(data);
                        this.activeTimer(true);
                        this.showStatus(null);
                        this.lbMd5Decript.string = data.Md5Decript;
                    }
                    break;
            }
            this.controller.setCurrentState(state);
            this.currentState = state;
            this.updateSessionId(data.SessionID);
            //Cap nhat tong tien bet
            this.controller.updateTotalBet(data);
        },

        resetPlayerUI: function () {
			this.lbUserTotalBet.string = '0';
			this.sumaryAllSideBet = 0;
            this.lstPlayers.map(player => {
                player.resetPlayerResultUI();
            }, this)
        },
		
        //Cap nhat thong tin nguoi choi hien tai
        updatePlayerInfor: function (dataPlayer) {
            this.currPlayer.registerPlayer(dataPlayer.Account);
        },
		
        //Cap nhat thong tin player
        updatePlayersUI: function (dataPlayers) {
            this.positionsUI = [0, 0, 0, 0, 0, 0, 0];
            let countPlayer = 0;
            this.positionsUI[countPlayer] = cc.LoginController.getInstance().getUserId();
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
                            this.lstPlayers[index].registerPlayer(playerInfo[0].Account);
                        }
                    } catch (e) {
                        console.log(e);
                    }
                } else {
                    try {
                        //Reset lai vi tri cua player
                        this.lstPlayers[index].unRegisterPlayer();
                    } catch (e) {
                        console.log(e);
                    }
                }
            }, this);

            this.controller.updatePositionPlayerUI(this.positionsUI);
        },

        //Cap nhat balance cua player hien tai
        updateBalanceCurrPlayer: function (balance) {
            this.currPlayer.updateChipNormal(balance);
        },

        //Cap nhat balance player khac
        updateBalancePlayer: function (data) {
            let accID = data[0];
            let balance = data[3];
            // Defensive: server bot bcast playerBet co the khong gui balance hop le (bot dummy = balanceIn-amount)
            if (balance == null || isNaN(balance)) {
                return;
            }
            if (this.positionsUI) {
                let indexPlayer = this.positionsUI.indexOf(accID);
                if (indexPlayer != -1) {
                    this.lstPlayers[indexPlayer].updateChip(balance);
                }
            }
        },

        //Hien thi ket qua thang
        winResult: function (data) {
			//console.log(data);
            this.currPlayer.playerResultUI(data.Award, data.Balance);
        },

        //Hien thi tien thang cua nguoi choi ngoi trong ban
        winResultVip: function (data) {
            data.map(player => {
                //Kiem tra player co trong mang hay ko
                if (this.positionsUI.includes(player.AccountID) && player.AccountID != cc.LoginController.getInstance().getUserId()) {
                    let indexPlayer = this.positionsUI.indexOf(player.AccountID);
                    this.lstPlayers[indexPlayer].playerResultUI(player.Award, player.Balance);
                }
            }, this);
        },

		resetPlate: function () {
			this.nodeDiceBox.active = true;
			this.skeLid.node.active = true;
			this.skeDiceBoxJounce.node.active = false;
			this.lbResult.node.parent.active = false;
			this.closePlate.position = this.rootPasBowl;
		},

        playAnimDiceBox: function (sicBoState) {
			//console.log(sicBoState);
            let waitTime = 0;
            this.animationOpenPlaying = true;

            switch (sicBoState) {
                case cc.SicBoState.Waiting:
                    break;
                case cc.SicBoState.Shaking:
                    this.skeLid.setAnimation(1, "traKQ_uplai", false);

                    waitTime = 0.6;
                    cc.director.getScheduler().schedule(function () {

                        cc.tween(this.nodeDiceBox).to(0.3, { position: cc.v2(0, 0), scale: 0.5 }).start();
                    }, this, 0, 0, waitTime, false);


                    waitTime += 0.83;
                    cc.director.getScheduler().schedule(function () {
                        //play fx win
                        this.skeLid.setAnimation(1, "idle", false);
                        this.skeBoxBase.setAnimation(1, "idle", false);
                        this.nodeDiceBox.active = false;
                        this.skeDiceBoxJounce.node.active = true;
                        //update lai balance
                    }, this, 0, 0, waitTime, false);

                    waitTime += 0.1;

                    cc.director.getScheduler().schedule(function () {
                        this.skeDiceBoxJounce.setAnimation(1, "lacxingau5", false);
                    }, this, 0, 0, waitTime, false);

                    waitTime += 1.3;

                    cc.director.getScheduler().schedule(function () {
                        this.nodeDiceBox.active = true;
                        this.skeDiceBoxJounce.node.active = false;

                        this.skeDiceBoxJounce.setAnimation(1, "idle", false);
                    }, this, 0, 0, waitTime, false);

                    waitTime += 0.6

                    cc.director.getScheduler().schedule(function () {
                        cc.tween(this.nodeDiceBox).to(0.3, { position: cc.v2(0, 305), scale: 0.15 }).start();
                    }, this, 0, 0, waitTime, false);
                    break;
                case cc.SicBoState.OpenPlate:
                    cc.tween(this.nodeDiceBox).to(0.3, { position: cc.v2(0, 0), scale: 0.5 }).start();
					this.closePlate.active = false;
                    let waitTime = 0.6;

                    cc.director.getScheduler().schedule(function () {
                        this.skeLid.setAnimation(1, "traKQ_sangtren", false);
                        this.lbResult.node.parent.active = true;

                        cc.tween(this.lbResult.node.parent)
                            .to(0, { opacity: 0 })
                            .to(.15, { opacity: 255 })
                            .delay(7)
                            .to(0.15, { opacity: 0 })
                            .start();

                        this.skeBoxBase.setAnimation(1, "MoNap", false);
                        cc.tween(this.spShakerCupGlow.node)
                            .to(0, { opacity: 0 })
                            .to(.15, { opacity: 255 })
                            .delay(7)
                            .to(0.15, { opacity: 0 })
                            .start();
                    }, this, 0, 0, waitTime, false);
                    break;
                case cc.SicBoState.ShowResult:
                    this.lbResult.node.parent.active = false;
					this.closePlate.active = false;
                    cc.tween(this.nodeDiceBox).to(0.3, { position: cc.v2(0, 305), scale: 0.15 }).start();
                    break;
            }
        },

        //reset dem nguoc
        activeTimer: function (isActive) {
            this.lbTimer.active = isActive;
            if (this.interval && !isActive) {
                clearInterval(this.interval);
            }
        },

        updateTime: function (time) {
            //Clear interval
            if (this.interval) {
                clearInterval(this.interval);
            }
            this.time = parseInt(time);
            this.startTimer();

            this.interval = setInterval(function () {
                this.startTimer();
            }.bind(this), 1000)
        },

        startTimer: function () {
            if (this.time < 0) {
                this.time = 0;
                return;
            }
            this.lbTimer.string = this.time;
            this.time--;
        },

        showStatus: function (strStatus) {
            if (strStatus != null) {
                this.lbStatus.string = strStatus;
                this.lbStatus.node.parent.active = true;
                this.lbStatus.node.getComponent(cc.Animation).play('notify-checkchi');

                cc.tween(this.lbStatus.node.parent)
                    .to(0, { opacity: 0 })
                    .to(0.3, { opacity: 255 })
                    .delay(2)
                    .to(0.3, { opacity: 0 })
                    .start();
            } else {
                this.lbStatus.node.parent.active = false;
            }
        },

        //Cap nhat phien
        updateSessionId: function (sID) {
            this.lbSessionID.string = "#" + sID;
        },

        updatePlayersInGame: function (totalPlayer) {
            this.lbTotalPlayer.string = totalPlayer;
        },

        //Hien thi tin nhan
        playerShowBubbleChat: function (message) {
            if (message[4] == false && message[3] != cc.LoginController.getInstance().getUserId()) {
                return;
            }
            if (cc.ChatRoomController.getInstance().checkIsEmotion(message)) {
                this.lstPlayers.forEach(function (player) {
                    let playerNickName = player.nickName;
                    let nickName = message[0];
                    if (nickName === playerNickName) {
                        player.showEmotion(cc.ChatRoomController.getInstance().getIndexEmotion(message)
                            , message);
                    }
                });
            } else {
                this.lstPlayers.forEach(function (player) {
                    let playerNickName = player.nickName;
                    let nickName = message[0];
                    if (nickName === playerNickName) {
                        player.showBubbleChat(message);
                    }
                });
            }

        },

        //Hien thi tien thang cua user ko ngoi trong ban
        updateTotalUserWin: function (amount) {
            this.lbTotalUserWin.node.active = false;
            if (amount != null && amount != 0) {
                this.lbTotalUserWin.string = "+" + cc.Tool.getInstance().formatNumber(amount);
                this.lbTotalUserWin.node.active = true;
                this.lbTotalUserWin.node.scaleY = 0;
                this.animTotalUserWin.play('xxWin');
            }
        },

        copyHashClicked: function () {
            cc.Tool.getInstance().copyToClipboard(this.lbHash.string)
            this.animationMess.play('openMessage');
            this.lblTextNoti.string = 'Copy chuỗi MD5 thành công';
        },

        copyResultClicked: function () {
            cc.Tool.getInstance().copyToClipboard(this.lbMd5Decript.string)
            this.animationMess.play('openMessage');
            this.lblTextNoti.string = 'Copy chuỗi kết quả thành công';
        }
    });
}).call(this);