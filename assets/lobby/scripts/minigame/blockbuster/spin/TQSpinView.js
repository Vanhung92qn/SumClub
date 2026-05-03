/**
 * Created by Nofear on 3/22/2019.
 */

var slotsConfig = require('TQConfig');
var gameMessage = require('GameMessage');

(function () {
    cc.TQSpinView = cc.Class({
        extends: cc.Component,
        properties: {
            tqSpinColumnViews: [cc.TQSpinColumnView],

            lbSessionID: cc.Label,
            // lbTotalLines: cc.Label,
        },

        onLoad: function () {
            this.spinController = cc.TQSpinController.getInstance();
            this.spinController.setTQSpinView(this);

            this.scheduler = cc.director.getScheduler();
            this.isSpining = false;

            this.betLinesText = '1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20';
        },

        onEnable: function () {
            cc.TQEffectController.getInstance().stopEffect();
        },

        //random tat ca cac icon trong man choi
        randomAllIcon: function () {
            this.tqSpinColumnViews.forEach(function (spinColumnView) {
                spinColumnView.randomAllIcon();
            });
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
            // this.lbTotalLines.string = totalLines;
            // this.updateTotalBet (totalLines * cc.TQController.getInstance().getBetValue());
        },

        getTotalLines: function () {
            // return this.lbTotalLines.string;
        },

        updateTotalBet: function (totalBet) {
            this.totalBet = totalBet;
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
            this.indexStart = 0;
            this.indexStarted = 0;

            //Set time goi STOP va time goi SPIN cot theo mode
            if (cc.TQController.getInstance().getFastSpin()) {
                this.timeBetweenCol = slotsConfig.TIME_COLUMN_FAST;
                this.timeStop = slotsConfig.TIME_CALL_STOP_FAST;
            } else {
                this.timeBetweenCol = slotsConfig.TIME_COLUMN_NORMAL;
                this.timeStop = slotsConfig.TIME_CALL_STOP_NORMAL;
            }

            //Stop tat ca cac Effect
            this.resetSpin();

            if (cc.TQController.getInstance().getFastSpin()) {
                //dat lich SPIN lan luot cac cot
                this.scheduler.schedule(function () {
                    self.fastSpinColumn();
                }, this, 0, 0, 0, false);
                this.scheduler.schedule(function () {
                    self.fastSpinColumn();
                }, this, 0, 0, this.timeBetweenCol * 1, false);
                this.scheduler.schedule(function () {
                    self.fastSpinColumn();
                }, this, 0, 0, this.timeBetweenCol * 2, false);
                this.scheduler.schedule(function () {
                    self.fastSpinColumn();
                }, this, 0, 0, this.timeBetweenCol * 3, false);
                this.scheduler.schedule(function () {
                    self.fastSpinColumn();
                }, this, 0, 0, this.timeBetweenCol * 4, false);
            } else {
                //dat lich SPIN lan luot cac cot
                this.scheduler.schedule(function () {
                    self.startSpinColumn();
                }, this, 0, 0, 0, false);
                this.scheduler.schedule(function () {
                    self.startSpinColumn();
                }, this, 0, 0, this.timeBetweenCol * 1, false);
                this.scheduler.schedule(function () {
                    self.startSpinColumn();
                }, this, 0, 0, this.timeBetweenCol * 2, false);
                this.scheduler.schedule(function () {
                    self.startSpinColumn();
                }, this, 0, 0, this.timeBetweenCol * 3, false);
                this.scheduler.schedule(function () {
                    self.startSpinColumn();
                }, this, 0, 0, this.timeBetweenCol * 4, false);
            }
        },

        //goi khi START SPIN xong
        startSpinFinish: function () {
            this.indexStarted++;
            this.spinColumn();
        },

        //goi khi STOP SPIN xong
        stopSpinFinish: function () {
            this.indexStopFinish++;
            //Khi ca 5 cot deu dung thi cho SPIN tiep
            if (this.indexStopFinish === 5) {
                //doi lai trang thai
                this.isSpining = false;

                // //Update lai balance sau khi SPIN
                cc.BalanceController.getInstance().updateBalance(this.spinResponse.Balance);

                cc.TQController.getInstance().activateButton(true);

                cc.TQKBController.getInstance().updateBoom();

                this.playEffect();
            }
        },

        //reset lai cac tham so + tat cac hieu ung + stop cac schedule
        resetSpin: function () {
            this.unscheduleAllCallbacks();
            cc.TQEffectController.getInstance().stopEffect();
            cc.TQPayLinesController.getInstance().stopEffect();
        },

        playEffect: function () {
            var totalBet = this.spinResponse.TotalBet;

            if (this.spinResponse.EventFreeSpin > 0) {
                cc.TQFreeSpinController.getInstance().showFreeSpin(this.spinResponse.EventFreeSpin);
            } else if (this.spinResponse.FreeSpin > 0) {
                cc.TQFreeSpinController.getInstance().showFreeSpin(this.spinResponse.FreeSpin);
            } else {
                cc.TQFreeSpinController.getInstance().hideFreeSpin();
            }

            var self = this;
            if (this.spinResponse.PaylinePrize > 0) {
                //update Win UI
                if (this.spinResponse.IsJackpot) {
                    //trung jackpot
                    cc.TQEffectController.getInstance().playEffect(cc.EffectType.JACKPOT, this.spinResponse); //JackpotPrize
                    //top autoSpin
                    cc.TQController.getInstance().stopAutoSpin();
                    cc.TQPayLinesController.getInstance().playEffect(this.spinResponse.PrizeLines, -1);
                } else if (this.spinResponse.PaylinePrize >= totalBet * cc.Config.getInstance().getMultiplierByTotalBet(totalBet)) {
                    //thang cac giai khac
                    if (this.isAutoSpin) {
                        this.scheduler.schedule(function () {
                            cc.TQController.getInstance().startSpin();
                        }, this, 0, 0, cc.TQController.getInstance().getFastSpin() ? slotsConfig.TIME_MONEY_EFFECT_BIG_WIN_FAST : slotsConfig.TIME_MONEY_EFFECT_BIG_WIN, false);
                    }
                    cc.TQPayLinesController.getInstance().playEffect(this.spinResponse.PrizeLines, cc.TQController.getInstance().getFastSpin() ? slotsConfig.TIME_MONEY_EFFECT_BIG_WIN_FAST : slotsConfig.TIME_MONEY_EFFECT_BIG_WIN);
                    cc.TQEffectController.getInstance().playEffect(cc.EffectType.BIG_WIN, this.spinResponse,  cc.TQController.getInstance().getFastSpin() ? slotsConfig.TIME_TWEEN_MONEY_FAST : null);
                } else {
                    //thang cac giai khac
                    if (this.isAutoSpin) {
                        this.scheduler.schedule(function () {
                            cc.TQController.getInstance().startSpin();
                        }, this, 0, 0, cc.TQController.getInstance().getFastSpin() ? slotsConfig.TIME_MONEY_EFFECT_NORMAL_WIN_FAST : slotsConfig.TIME_MONEY_EFFECT_NORMAL_WIN, false);
                    }
                    cc.TQPayLinesController.getInstance().playEffect(this.spinResponse.PrizeLines, cc.TQController.getInstance().getFastSpin() ? slotsConfig.TIME_MONEY_EFFECT_NORMAL_WIN_FAST : slotsConfig.TIME_MONEY_EFFECT_NORMAL_WIN);
                    cc.TQEffectController.getInstance().playEffect(cc.EffectType.NORMAL_WIN, this.spinResponse,  cc.TQController.getInstance().getFastSpin() ? slotsConfig.TIME_TWEEN_MONEY_FAST : null);
                }
            } else {
                //THUA
                if (this.isAutoSpin) {
                    this.scheduler.schedule(function () {
                        cc.TQController.getInstance().startSpin();
                    }, this, 0, 0, cc.TQController.getInstance().getFastSpin() ? slotsConfig.TIME_WAIT_LOST_FAST : slotsConfig.TIME_WAIT_LOST, false);
                }
            }
        },

        //goi khi muon STOP SPIN
        stopSpin: function () {

            this.spinResponse = cc.TQSpinController.getInstance().getSpinResponse();
            //gan thong tin UI chung
            this.lbSessionID.string = '#' + this.spinResponse.SpinID;

            this.indexStopFinish = 0;
            this.indexStop = 0;
            var timeFinish = 0;
            var self = this;

            if (cc.TQController.getInstance().getFastSpin()) {
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

        startSpinColumn: function () {
            this.tqSpinColumnViews[this.indexStart].startSpin(); //params = lineId
            this.indexStart++;
        },

        spinColumn: function () {
            this.tqSpinColumnViews[this.indexSpin].spin(); //params = lineId
            this.indexSpin++;
        },

        fastSpinColumn: function () {
            this.tqSpinColumnViews[this.indexSpin].fastSpin(); //params = lineId
            this.indexSpin++;
        },

        stopColumn: function () {
            this.tqSpinColumnViews[this.indexStop].stop();
            this.indexStop++;
        },

        fastStopColumn: function () {
            this.tqSpinColumnViews[this.indexStop].fastStop();
            this.indexStop++;
        },

        autoSpin: function (isAutoSpin) {
            this.isAutoSpin = isAutoSpin;

            if (this.isAutoSpin && !this.isSpining) {
                cc.TQController.getInstance().startSpin();
            }
        },
    });
}.call(this));
