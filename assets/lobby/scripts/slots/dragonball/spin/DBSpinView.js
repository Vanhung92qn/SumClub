/**
 * Created by Nofear on 3/22/2019.
 */

var slotsConfig = require('DragonBallConfig');
var gameMessage = require('GameMessage');

(function () {
    cc.DBSpinView = cc.Class({
        extends: cc.SpinViewBase,
        properties: {
            spinColumnViews: [cc.DBSpinColumnView],
            lbiBet: cc.LabelIncrement,
        },

        //cap nhat UI TotalBet
        updateTotalBet: function (totalBet) {
            this.lbiBet.setValue(totalBet / 20);
            this.totalBet = totalBet;
            this.lbiTotalBet.setValue(totalBet);
            //this.lbiTotalBet.tweenValueto(totalBet);
        },

        //khi click SPIN goi ham nay
        callSpin: function () {
            if (this.betLinesText === '') {
                cc.PopupController.getInstance().showSlotsMessage(gameMessage.YOU_NOT_CHOOSE_BET_LINES);
                return;
            }

            //kiem tra so du
            if (!this.checkBalance()) return;

            cc.AudioController.getInstance().playSound(cc.AudioTypes.SPIN);

            //danh danh trang thai dang SPIN
            this.isSpining = true;
            var self = this;
            this.indexSpin = 0;

            //Set time goi STOP va time goi SPIN cot theo mode
            if (this.isFastSpin) {
                this.timeBetweenCol = slotsConfig.TIME_COLUMN_FAST;
                this.timeStop = slotsConfig.TIME_CALL_STOP_FAST;
            } else {
                this.timeBetweenCol = slotsConfig.TIME_COLUMN_NORMAL;
                this.timeStop = slotsConfig.TIME_CALL_STOP_NORMAL;
            }

            //Stop tat ca cac Effect
            this.resetSpin();

            //Khoa Click cac button chuc nang
            this.spinController.activeButtonSpin(false);

            //Request len server de lay ket qua
            if (this.spinAccountID < 0) {
                this.roomController.sendRequestOnHub(cc.MethodHubName.SPIN_TRY);
            } else {
                this.roomController.sendRequestOnHub(cc.MethodHubName.SPIN, this.betLinesText);
            }

            //this.startSpin();
        },

        startSpin: function () {
            var self = this;
            this.indexSpins = [0,1,2,3,4];
            this.indexStops = [];

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
            var randomIndex = Math.floor((Math.random() * this.indexSpins.length));

            var indexVal = this.indexSpins[randomIndex];
            var index = this.indexSpins.indexOf(indexVal);

            this.spinColumnViews[indexVal].spin();

            this.indexStops.push(indexVal);
            this.indexSpins.splice(index, 1);
        },

        stopColumn: function () {
            this.spinColumnViews[this.indexStops[this.indexStop]].stop();
            this.indexStop++;
        },

        fastStopColumn: function () {
            this.spinColumnViews[this.indexStops[this.indexStop]].fastStop();
            this.indexStop++;
        },

        //goi khi STOP SPIN xong
        stopSpinFinish: function () {
            this.indexStopFinish++;
            //Khi ca 5 cot deu dung thi cho SPIN tiep
            if (this.indexStopFinish === 5) {
                //doi lai trang thai
                this.isSpining = false;

                /*
                 //Bat lai Click cac button chuc nang
                 this.spinController.activeButtonSpin(true);*/

                //Lay ve ket qua de hien giai thuong + hieu ung + xu ly neu co bonus game hoac minigame
                this.spinResponse = cc.SpinController.getInstance().getSpinResponse();
                this.bonusGameData = this.spinResponse.BonusGame;
                var account = this.spinResponse.Account;

                this.spinData = this.spinResponse.SpinData;
                //Bat lai Click cac button chuc nang
                if (this.bonusGameData.BonusData === null) {
                    //ko co bonus game. Ko co freespin thi bat lai cac button
                    this.spinController.activeButtonSpin(true);
                }

                //Update lai balance sau khi SPIN
                if (this.spinResponse.AccountID < 0) {
                    cc.BalanceController.getInstance().updateTryBalance(account.TotalStar);

                } else {
                    cc.BalanceController.getInstance().updateBalance(account.TotalStar);
                }

                //set he so SPIN
                cc.CoefficientController.getInstance().setMultiplier(this.spinData.SpinCoefficient);
                //set diem thich luy FreeSpin
                cc.AccumulationController.getInstance().setAccumulation(this.spinData.PointAccumulation, this.spinData.IsPointFree);

                var haveWILD = false;
                //Check xem cos WILD ko thi hien Expand WILD truoc
                this.spinColumnViews.forEach(function (spinColumnView) {
                    if (spinColumnView.checkActiveWild()) {
                        haveWILD = true;
                    }
                });

                //co WILD thi cho xong hieu ung WILD moi hien hieu ung thang
                if (haveWILD) {
                    //this.spinController.activeButtonSpin(true);

                    if (this.isFastSpin) {
                        var timePlayEffectWild = slotsConfig.TIME_PLAY_EFFECT_EXPAND_WILD_FAST;
                    } else {
                        timePlayEffectWild = slotsConfig.TIME_PLAY_EFFECT_EXPAND_WILD;
                    }
                    cc.AudioController.getInstance().playSound(cc.AudioTypes.EXPAND_WILD);

                    var self = this;
                    this.scheduler.schedule(function () {
                        self.playEffect(self.spinData);
                    }, this, 0, 0, timePlayEffectWild, false);
                } else {
                    this.playEffect(this.spinData);
                }


            }
        },


        playEffect: function (spinData) {
            var self = this;

            var timeWaitJackpot = 0;
            //kiem tra co trung jackpot ko?
            if (spinData.IsJackpot) {
                cc.EffectController.getInstance().playEffect(cc.EffectType.JACKPOT, spinData.PaylinePrize);
                cc.PayLinesController.getInstance().playEffect(spinData.PrizeLines, -1); //jackpot delay = -1
                cc.AudioController.getInstance().playSound(cc.AudioTypes.BIG_WIN);

                //stop autoSpin
                this.isAutoSpin = false;
                this.spinController.activeButtonAutoSpin(this.isAutoSpin);
                timeWaitJackpot = 2;
            }

            //neu co jackpot thi hien Jackpot 2s sau do moi check tiep
            this.scheduler.schedule(function () {
                self.checkHaveBonusGame();

                //dang ko phai la freeSpin thi moi check
                if (cc.FreeSpinController.getInstance().getStateFreeSpin() === false && spinData.TotalFreeSpin > 0) {
                    // //tat auto SPIN - game Tam quoc ko can tat vi freespin giong quay binh thuong
                    // this.isAutoSpin = false;
                    // this.spinController.activeButtonAutoSpin(this.isAutoSpin);

                    //Tam quoc van hien thi tien thang bt
                    this.lbiTotalWin.tweenValueto(this.spinData.PaylinePrize);

                    //duoc freespin -> kich hoạt freespin sau xx giay
                    cc.PopupController.getInstance().showSlotsMessage('Chúc mừng bạn quay được\n' + spinData.TotalFreeSpin + ' lượt quay miễn phí');
                    this.scheduler.schedule(function () {
                        cc.FreeSpinController.getInstance().activeFreeSpin(true);
                        cc.FreeSpinController.getInstance().updateFreeSpinText(spinData.TotalFreeSpin);
                    }, this, 0, 0, slotsConfig.TIME_WAIT_START_FREE_SPIN, false);

                    this.scheduler.schedule(function () {
                        //Neu tu dong quay thi tu goi SPIN tiep
                        if (self.isAutoSpin && this.bonusGameData.BonusData === null) {
                            self.callSpin();
                        }
                    }, this, 0, 0, slotsConfig.TIME_WAIT_RESULT_FREE_SPIN, false);

                    return;
                } else if (cc.FreeSpinController.getInstance().getStateFreeSpin()) {
                    cc.FreeSpinController.getInstance().updateFreeSpinText(spinData.TotalFreeSpin);
                }

                if (cc.FreeSpinController.getInstance().getStateFreeSpin()) {
                    //update Win UI = totalPrize
                    this.lbiTotalWin.tweenValueto(this.spinData.TotalPrize);
                } else {
                    //choi normal = PaylinePrize
                    this.lbiTotalWin.tweenValueto(this.spinData.PaylinePrize);
                }


                //Van con freespin thi bat lai nut quay luon (truong hop = 0 phai cho het anim)
                if (cc.FreeSpinController.getInstance().getStateFreeSpin() && spinData.TotalFreeSpin > 0) {
                    //Bat lai Click cac button chuc nang
                    this.spinController.activeButtonSpin(true);
                }

                if (spinData.PaylinePrize > 0) { //PaylinePrize //TotalPrize
                    if (!spinData.IsJackpot) {
                        if (spinData.PaylinePrize >= this.spinResponse.BetValue * cc.Config.getInstance().getMultiplierByRoomId(this.spinResponse.RoomID)) {
                            cc.EffectController.getInstance().playEffect(cc.EffectType.BIG_WIN, spinData.PaylinePrize, self.isFastSpin ? slotsConfig.TIME_TWEEN_MONEY_FAST : null); //PaylinePrize
                            cc.PayLinesController.getInstance().playEffect(spinData.PrizeLines, self.isFastSpin ? slotsConfig.TIME_MONEY_EFFECT_BIG_WIN_FAST : slotsConfig.TIME_MONEY_EFFECT_BIG_WIN);
                            cc.AudioController.getInstance().playSound(cc.AudioTypes.BIG_WIN);
                            this.scheduler.schedule(function () {
                                self.checkHaveFreeSpin(spinData);
                            }, this, 0, 0, self.isFastSpin ? slotsConfig.TIME_MONEY_EFFECT_BIG_WIN_FAST : slotsConfig.TIME_MONEY_EFFECT_BIG_WIN, false);
                        } else {
                            cc.EffectController.getInstance().playEffect(cc.EffectType.NORMAL_WIN, spinData.PaylinePrize, self.isFastSpin ? slotsConfig.TIME_TWEEN_MONEY_FAST : null); //PaylinePrize
                            cc.PayLinesController.getInstance().playEffect(spinData.PrizeLines, self.isFastSpin ? slotsConfig.TIME_MONEY_EFFECT_NORMAL_WIN_FAST : slotsConfig.TIME_MONEY_EFFECT_NORMAL_WIN);
                            cc.AudioController.getInstance().playSound(cc.AudioTypes.NORMAL_WIN);
                            this.scheduler.schedule(function () {
                                self.checkHaveFreeSpin(spinData);
                            }, this, 0, 0, self.isFastSpin ? slotsConfig.TIME_MONEY_EFFECT_NORMAL_WIN_FAST : slotsConfig.TIME_MONEY_EFFECT_NORMAL_WIN, false);
                        }
                    }

                    //set gia tri base phuc vu cho viec choi X2
                    cc.X2GameController.getInstance().setBaseValue(this.spinResponse.SpinData.DoubleSet);
                    //da khi quay xong -> chua co data
                    cc.X2GameController.getInstance().setX2GameData(this.spinResponse.X2Game);

                    //Tk that moi choi duoc x2
                    if (this.spinResponse.AccountID > 0 && this.spinResponse.SpinData.DoubleSet > 0) {
                        //Neu thang thi bat button X2 len
                        cc.SpinController.getInstance().activeButtonX2(true);
                    } else {
                        cc.SpinController.getInstance().activeButtonX2(false);
                    }
                } else if (spinData.PrizeLines.length > 0) {
                    cc.PayLinesController.getInstance().playEffect(spinData.PrizeLines, self.isFastSpin ? slotsConfig.TIME_MONEY_EFFECT_NORMAL_WIN_FAST : slotsConfig.TIME_MONEY_EFFECT_NORMAL_WIN);
                    cc.AudioController.getInstance().playSound(cc.AudioTypes.NORMAL_WIN);
                    this.scheduler.schedule(function () {
                        self.checkHaveFreeSpin(spinData);
                    }, this, 0, 0, self.isFastSpin ? slotsConfig.TIME_MONEY_EFFECT_NORMAL_WIN_FAST : slotsConfig.TIME_MONEY_EFFECT_NORMAL_WIN, false);
                } else {
                    //THua -> ko lam gi
                    this.scheduler.schedule(function () {
                        self.checkHaveFreeSpin(spinData);
                    }, this, 0, 0, self.isFastSpin ? slotsConfig.TIME_WAIT_LOST_FAST : slotsConfig.TIME_WAIT_LOST, false);
                }

            }, this, 0, 0, timeWaitJackpot, false);

        },

        x2Clicked: function () {
            cc.SpinController.getInstance().activeButtonX2(false);
            cc.MainController.getInstance().createX2GameView();
        },
    });
}.call(this));
