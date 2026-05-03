/**
 * Created by Nofear on 3/22/2019.
 */

var slotsConfig = require('MPConfig');

(function () {
    cc.MPSpinView = cc.Class({
        extends: cc.Component,
        properties: {
            spinColumn1Views: [cc.MPSpinColumnView],
            spinColumn2Views: [cc.MPSpinColumnView],
            spinColumn3Views: [cc.MPSpinColumnView],

            spritePrizes: [cc.Sprite],
            lbiTotalWins: [cc.LabelIncrement],

            lbSessionID: cc.Label,
        },

        onLoad: function () {
            var self = this;
            this.spinController = cc.MPSpinController.getInstance();
            this.spinController.setMPSpinX3View(this);

            this.scheduler = cc.director.getScheduler();
            this.isSpining = false;

            this.animationWins = [];
            this.lbiTotalWins.forEach(function (lbiTotalWin) {
                self.animationWins.push(lbiTotalWin.node.parent.getComponent(cc.Animation));
            });
        },

        onEnable: function () {
            this.lbiTotalWins.forEach(function (lbiTotalWin) {
                lbiTotalWin.setValue(0);
            });
        },

        //random tat ca cac icon trong man choi
        randomAllIcon: function () {
            this.spinColumn1Views.forEach(function (spinColumnView) {
                spinColumnView.randomAllIcon();
            });
            this.spinColumn2Views.forEach(function (spinColumnView) {
                spinColumnView.randomAllIcon();
            });
            this.spinColumn3Views.forEach(function (spinColumnView) {
                spinColumnView.randomAllIcon();
            });
        },

        //set sessionID UI ngoai game
        setSessionID: function (sessionID) {
            this.lbSessionID.string = sessionID;
        },

        //khi click SPIN goi ham nay
        startSpin: function () {

            //danh danh trang thai dang SPIN
            this.isSpining = true;
            var self = this;
            this.indexSpin = 0;

            //Set time goi STOP va time goi SPIN cot theo mode
            if (cc.MiniPokerController.getInstance().getFastSpin()) {
                this.timeBetweenCol = slotsConfig.TIME_COLUMN_FAST;
                this.timeStop = slotsConfig.TIME_CALL_STOP_FAST;
            } else {
                this.timeBetweenCol = slotsConfig.TIME_COLUMN_NORMAL;
                this.timeStop = slotsConfig.TIME_CALL_STOP_NORMAL;
            }

            //Stop tat ca cac Effect
            this.resetSpin();

            //dat lich SPIN lan luot cac cot
            this.scheduler.schedule(function () {
                self.spinColumn();
            }, this, 0, 0, 0, false);
            this.scheduler.schedule(function () {
                self.spinColumn();
            }, this, 0, 0, this.timeBetweenCol * 1, false);
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

        //goi khi STOP SPIN xong
        stopSpinX3Finish: function () {
            this.indexStopFinish++;
            //Khi ca 5 cot deu dung thi cho SPIN tiep
            if (this.indexStopFinish === 15) {
                //doi lai trang thai
                this.isSpining = false;

                //Update lai balance sau khi SPIN
                cc.BalanceController.getInstance().updateBalance(this.spinResponse.Balance);

                cc.MiniPokerController.getInstance().activateButton(true);
                if (this.spinResponse.EventFreeSpin && this.spinResponse.EventFreeSpin > 0) {
                    cc.MPFreeSpinController.getInstance().showFreeSpin(this.spinResponse.EventFreeSpin);
                    cc.MiniPokerController.getInstance().activateButtonX(false);

                    cc.MiniPokerController.getInstance().setMode(cc.MiniPokerX.X1);
                } else {
                    cc.MPFreeSpinController.getInstance().hideFreeSpin();
                    cc.MiniPokerController.getInstance().activateButtonX(true);
                }

                this.playEffect();
            }
        },

        //reset lai cac tham so + tat cac hieu ung + stop cac schedule
        resetSpin: function () {
            this.unscheduleAllCallbacks();
            cc.MPEffectController.getInstance().stopEffect();
            this.lbiTotalWins.forEach(function (lbiTotalWin) {
                lbiTotalWin.node.parent.active = false;
            });
        },

        playEffect: function () {
            var roomId = cc.MiniPokerController.getInstance().getRoomId();
            var totalBet = this.spinResponse.TotalBet;

            // if (this.spinResponse.FreeSpin > 0) {
            //     cc.MPFreeSpinController.getInstance().showFreeSpin(this.spinResponse.FreeSpin);
            // } else {
            //     cc.MPFreeSpinController.getInstance().hideFreeSpin();
            // }

            var self = this;
            var prizeData = this.spinResponse.PrizeData;
            if (this.spinResponse.TotalPrize > 0) {
                var sfPrizes = cc.MPSpinController.getInstance().getSFPrizes();

                //update Win UI
                prizeData.forEach(function (prizeData) {
                    var lineID = prizeData.LineID - 1;
                    var prizeId = prizeData.PrizeID - 1;
                    if (prizeData.PrizeValue > 0) {
                        //hien giai thuong
                        self.lbiTotalWins[lineID].node.parent.active = true;
                        self.lbiTotalWins[lineID].tweenValue(0, prizeData.PrizeValue, cc.MiniPokerController.getInstance().getFastSpin() ? slotsConfig.TIME_TWEEN_MONEY_FAST : null);
                        self.animationWins[lineID].play('showPrize');
                        self.spritePrizes[lineID].spriteFrame = sfPrizes[prizeId];
                    }
                });

                if (this.spinResponse.IsJackpot) {
                    //trung jackpot
                    cc.MPEffectController.getInstance().playEffect(cc.EffectType.JACKPOT, this.spinResponse.TotalPrize); //JackpotPrize
                    //top autoSpin
                    cc.MiniPokerController.getInstance().stopAutoSpin();
                }
                else if (this.spinResponse.TotalPrize >= totalBet * cc.Config.getInstance().getMultiplierByTotalBet(totalBet)) {
                    //thang cac giai khac
                    if (this.isAutoSpin) {
                        this.scheduler.schedule(function () {
                            cc.MiniPokerController.getInstance().startSpin();
                        }, this, 0, 0, cc.MiniPokerController.getInstance().getFastSpin() ? slotsConfig.TIME_MONEY_EFFECT_BIG_WIN_FAST : slotsConfig.TIME_MONEY_EFFECT_BIG_WIN, false);
                    }

                    cc.MPEffectController.getInstance().playEffect(cc.EffectType.BIG_WIN, this.spinResponse.TotalPrize,  cc.MiniPokerController.getInstance().getFastSpin() ? slotsConfig.TIME_TWEEN_MONEY_FAST : null);
                }
                else {
                    //thang cac giai khac
                    if (this.isAutoSpin) {
                        this.scheduler.schedule(function () {
                            cc.MiniPokerController.getInstance().startSpin();
                        }, this, 0, 0, cc.MiniPokerController.getInstance().getFastSpin() ? slotsConfig.TIME_MONEY_EFFECT_NORMAL_WIN_FAST : slotsConfig.TIME_MONEY_EFFECT_NORMAL_WIN, false);
                    }
                    // cc.MPEffectController.getInstance().playEffect(cc.EffectType.BIG_WIN, this.spinResponse.TotalPrize);
                }
            } else {
                //THUA
                if (this.isAutoSpin) {
                    this.scheduler.schedule(function () {
                        cc.MiniPokerController.getInstance().startSpin();
                    }, this, 0, 0, cc.MiniPokerController.getInstance().getFastSpin() ? slotsConfig.TIME_WAIT_LOST_FAST : slotsConfig.TIME_WAIT_LOST, false);
                }
            }
        },

        //goi khi muon STOP SPIN
        stopSpin: function () {

            this.spinResponse = cc.MPSpinController.getInstance().getSpinResponse();
            //gan thong tin UI chung
            this.lbSessionID.string = '#' + this.spinResponse.SpinID;

            this.indexStopFinish = 0;
            this.indexStop = 0;
            var timeFinish = 0;
            var self = this;

            if (cc.MiniPokerController.getInstance().getFastSpin()) {
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
            this.spinColumn1Views[this.indexSpin].spin(1); //params = lineId
            this.spinColumn2Views[this.indexSpin].spin(2);
            this.spinColumn3Views[this.indexSpin].spin(3);
            this.indexSpin++;
        },

        stopColumn: function () {
            this.spinColumn1Views[this.indexStop].stop();
            this.spinColumn2Views[this.indexStop].stop();
            this.spinColumn3Views[this.indexStop].stop();
            this.indexStop++;
        },

        fastStopColumn: function () {
            this.spinColumn1Views[this.indexStop].fastStop();
            this.spinColumn2Views[this.indexStop].fastStop();
            this.spinColumn3Views[this.indexStop].fastStop();
            this.indexStop++;
        },

        autoSpin: function (isAutoSpin) {
            this.isAutoSpin = isAutoSpin;

            if (this.isAutoSpin && !this.isSpining) {
                cc.MiniPokerController.getInstance().startSpin();
            }
        },
    });
}.call(this));
