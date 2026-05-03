/**
 * Created by Nofear on 3/22/2019.
 */

var slotsConfig = require('TKConfig');
var gameMessage = require('GameMessage');

(function () {
    cc.SpinViewBase = cc.Class({
        extends: cc.Component,
        properties: {
            lbiTotalBet: cc.LabelIncrement,
            lbiTotalWin: cc.LabelIncrement,
            lbSessionID: cc.Label,
            lbTotalLines: cc.Label,
            lbTotalLinesFreeSpin: cc.Label,
        },

        onLoad: function () {
            this.gameId = cc.RoomController.getInstance().getGameId();

            this.spinController = cc.SpinController.getInstance();
            this.spinController.setSpinView(this);
            this.roomController = cc.RoomController.getInstance();

            this.scheduler = cc.director.getScheduler();
            this.isSpining = false;
            this.isFastSpin = false;
            this.isAutoSpin = false;
            this.betLinesText = '';

            this.timeBetweenCol = 0;
        },

        onEnable: function () {
            this.lbiTotalWin.setValue(0);
            //this.randomIcon();
        },

        //random tat ca cac icon trong man choi
        randomIcon: function () {
            this.spinColumnViews.forEach(function (spinColumnView) {
                spinColumnView.randomAllIcon();
            });
        },

        //goi setAccountID khi joinRoom de biet duoc la tryUser hay User that
        setSpinAccountID: function (spinAccountID) {
            this.spinAccountID = spinAccountID;
        },

        //set sessionID UI ngoai game
        setSessionID: function (sessionID) {
            this.lbSessionID.string = sessionID;
        },

        //update lai totalWin ngoai main game sau khi choi bonusgame
        updateTotalWinFromBonus: function (bonusPrize) {
            var paylinePrize = cc.SpinController.getInstance().getPaylinePrize();

            this.lbiTotalWin.tweenValueto(paylinePrize + bonusPrize);

            //bat lai button
            cc.SpinController.getInstance().activeButtonSpin(true);

            //check xem co dang de auto spin ko -> quay tiep
            if (this.isAutoSpin) {
                this.callSpin();
            }
        },

        //update lai totalWin UI (dung cho FS khi joinRoom de set totalWin da quay dc)
        updateTotalWinUI: function (amount) {
            this.lbiTotalWin.tweenValueto(amount);
        },

        //cap nhat betlinesText de truyen len server khi SPIN
        updateBetLinesText: function (betLinesText) {
            this.betLinesText = betLinesText;
        },

        getBetLinesText: function () {
            return this.betLinesText;
        },

        //update tong so Line UI
        updateTotalLines: function (totalLines) {
            this.lbTotalLines.string = totalLines;

            if (this.lbTotalLinesFreeSpin !== null)
                this.lbTotalLinesFreeSpin.string = totalLines;

            this.updateTotalBet (totalLines * cc.SpinController.getInstance().getBetValue());
        },

        getTotalLines: function () {
            return this.lbTotalLines.string;
        },

        //cap nhat UI TotalBet
        updateTotalBet: function (totalBet) {
            this.totalBet = totalBet;
            this.lbiTotalBet.setValue(totalBet);
            //this.lbiTotalBet.tweenValueto(totalBet);
        },

        //kiem tra balance
        checkBalance: function () {
            if (!cc.FreeSpinController.getInstance().getStateFreeSpin()) {
                if ((!cc.SpinController.getInstance().getIsPlayTry()
                    && cc.BalanceController.getInstance().getBalance() < this.totalBet) ||
                    (cc.SpinController.getInstance().getIsPlayTry()
                    && cc.BalanceController.getInstance().getTryBalance() < this.totalBet)) {
                    cc.PopupController.getInstance().showMessage(gameMessage.BALANCE_NOT_ENOUGH_SPIN);

                    //tat auto SPIN
                    this.isAutoSpin = false;
                    this.spinController.activeButtonAutoSpin(this.isAutoSpin);
                    //bat lai button SPIN
                    this.spinController.activeButtonSpin(true);
                    return false;
                }  else {
                    return true;
                }
            } else {
                return true;
            }
        },

        //reset lai cac tham so + tat cac hieu ung + stop cac schedule
        resetSpin: function () {
            this.unscheduleAllCallbacks();
            cc.EffectController.getInstance().stopEffect();
            cc.PayLinesController.getInstance().stopEffect();
        },

        checkHaveFreeSpin: function (spinData) {
            var self = this;
            //Dang choi freespin va la lan quay cuoi
            //console.log('check: ' + cc.FreeSpinController.getInstance().getStateFreeSpin() + ' ' + spinData.TotalFreeSpin);
            if (cc.FreeSpinController.getInstance().getStateFreeSpin() && spinData.TotalFreeSpin === 0) {
                //bat lai cho chon dong

                //chi hien thong bao tong thang voi nhung game co tra ve totalWin tu backend
                if (cc.RoomController.getInstance().getGameId() === cc.GameId.EGYPT) {
                    //Hien tong ket thang tat ca bao nhieu
                    cc.PopupController.getInstance().showSlotsMessage(
                        gameMessage.RESULT_FREE_SPIN_1
                        + cc.Tool.getInstance().formatNumber(spinData.TotalPrize)
                        + gameMessage.RESULT_FREE_SPIN_2
                    );
                }

                this.scheduler.schedule(function () {
                    cc.FreeSpinController.getInstance().activeFreeSpin(false);
                    //Bat lai Click cac button chuc nang
                    this.spinController.activeButtonSpin(true);
                    //Neu tu dong quay thi tu goi SPIN tiep
                    if (self.isAutoSpin && (self.bonusGameData === undefined || self.bonusGameData.BonusData === null)) {
                        self.callSpin();
                    }
                }, this, 0, 0, slotsConfig.TIME_WAIT_RESULT_FREE_SPIN, false);
            } else {
                ///Neu tu dong quay thi tu goi SPIN tiep
                if (self.isAutoSpin && (self.bonusGameData === undefined || self.bonusGameData.BonusData === null)) {
                    self.callSpin();
                }
            }
        },

        checkHaveBonusGame: function () {
            //Kiem tra xem co bonus ko
            if (this.bonusGameData && this.bonusGameData.BonusData !== null) {
                //set gia tri bonus
                cc.BonusGameController.getInstance().setData(this.bonusGameData);
                //tao bonusgame
                cc.MainController.getInstance().createBonusGameView();
                cc.AudioController.getInstance().playSound(cc.AudioTypes.GET_BONUS);
                return true;
            } else {
                return false;
            }
        },

        startSpin: function () {
            var self = this;

            //dat lich SPIN lan luot cac cot
            this.scheduler.schedule(function () {
                self.spinColumn();
            }, this, 0, 0, 0, false);
            this.scheduler.schedule(function () {
                self.spinColumn();
            }, this, 0, 0, this.timeBetweenCol, false);
            this.scheduler.schedule(function () {
                self.spinColumn();
            }, this, 0, 0, this.timeBetweenCol * 2, false);
            this.scheduler.schedule(function () {
                self.spinColumn();
            }, this, 0, 0, this.timeBetweenCol * 3, false);
            this.scheduler.schedule(function () {
                self.spinColumn();
            }, this, 0, 0, this.timeBetweenCol * 4, false);
        },

        //goi khi muon STOP SPIN
        stopSpin: function () {
            this.indexStopFinish = 0;
            this.indexStop = 0;
            var self = this;

            if (this.isFastSpin) {
                self.scheduler.schedule(function () {
                    self.scheduler.schedule(function () {
                        self.fastStopColumn();
                    }, self, 0, 0, 0, false);
                    self.scheduler.schedule(function () {
                        self.fastStopColumn();
                    }, self, 0, 0, self.timeBetweenCol, false);
                    self.scheduler.schedule(function () {
                        self.fastStopColumn();
                    }, self, 0, 0, self.timeBetweenCol * 2, false);
                    self.scheduler.schedule(function () {
                        self.fastStopColumn();
                    }, self, 0, 0, self.timeBetweenCol * 3, false);
                    self.scheduler.schedule(function () {
                        self.fastStopColumn();
                    }, self, 0, 0, self.timeBetweenCol * 4, false);
                }, self, 0, 0, self.timeStop, false);
            } else {
                self.scheduler.schedule(function () {
                    self.scheduler.schedule(function () {
                        self.stopColumn();
                    }, self, 0, 0, 0, false);
                    self.scheduler.schedule(function () {
                        self.stopColumn();
                    }, self, 0, 0, self.timeBetweenCol, false);
                    self.scheduler.schedule(function () {
                        self.stopColumn();
                    }, self, 0, 0, self.timeBetweenCol * 2, false);
                    self.scheduler.schedule(function () {
                        self.stopColumn();
                    }, self, 0, 0, self.timeBetweenCol * 3, false);
                    self.scheduler.schedule(function () {
                        self.stopColumn();
                    }, self, 0, 0, self.timeBetweenCol * 4, false);
                }, self, 0, 0, self.timeStop, false);
            }
        },

        spinColumn: function () {
            this.spinColumnViews[this.indexSpin].spin();
            this.indexSpin++;
        },

        stopColumn: function () {
            this.spinColumnViews[this.indexStop].stop();
            this.indexStop++;
        },

        fastStopColumn: function () {
            this.spinColumnViews[this.indexStop].fastStop();
            this.indexStop++;
        },

        x2Clicked: function () {
            cc.SpinController.getInstance().activeButtonX2(false);
            cc.MainController.getInstance().createX2GameView();
        },

        fastSpinClicked: function () {
            this.isFastSpin = !this.isFastSpin;
            this.spinController.activeButtonFastSpin(this.isFastSpin);
        },

        autoSpinClicked: function () {
            if (this.betLinesText === '') {
                cc.PopupController.getInstance().showSlotsMessage(gameMessage.YOU_NOT_CHOOSE_BET_LINES);
                return;
            }

            //kiem tra so du
            if (!this.checkBalance()) return;

            this.isAutoSpin = !this.isAutoSpin;
            this.spinController.activeButtonAutoSpin(this.isAutoSpin);

            if (this.isAutoSpin && !this.isSpining) {
                this.callSpin();
                cc.AudioController.getInstance().playSound(cc.AudioTypes.SPIN);
            }
            //this.unscheduleAllCallbacks();
        },

        spinClicked: function () {
            this.callSpin();
        },
    });
}.call(this));
