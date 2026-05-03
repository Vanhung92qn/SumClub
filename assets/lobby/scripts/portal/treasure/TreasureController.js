/**
 * Created by Nofear on 3/14/2019.
 */

(function () {
    var TreasureController;

    TreasureController = (function () {
        var instance;

        function TreasureController() {
        }

        instance = void 0;

        TreasureController.getInstance = function () {
            if (instance === void 0) {
                instance = this;
            }
            return instance.prototype;
        };

        TreasureController.prototype.setBuyCarrotView = function (buyCarrotView) {
            return this.buyCarrotView = buyCarrotView;
        };

        TreasureController.prototype.getBuyCarrotView = function () {
            return this.buyCarrotView;
        };

        TreasureController.prototype.setGiftView = function (giftView) {
            return this.giftView = giftView;
        };

        TreasureController.prototype.getGiftView = function () {
            return this.giftView;
        };

        TreasureController.prototype.setTreasureView = function (treasureView) {
            return this.treasureView = treasureView;
        };

        TreasureController.prototype.setTreasureMINIView = function (treasureMINIView) {
            return this.treasureMINIView = treasureMINIView;
        };

        TreasureController.prototype.setTreasureChestView = function (treasureChestView) {
            return this.treasureChestView = treasureChestView;
        };

        TreasureController.prototype.getTreasureChestView = function () {
            return this.treasureChestView;
        };

        TreasureController.prototype.setTreasureProgress = function (treasureProgress) {
            return this.treasureProgress = treasureProgress;
        };

        TreasureController.prototype.setTreasureBGLoop = function (treasureBGLoop) {
            return this.treasureBGLoop = treasureBGLoop;
        };

        TreasureController.prototype.setTreasureVQMMView = function (treasureVQMMView) {
            return this.treasureVQMMView = treasureVQMMView;
        };

        TreasureController.prototype.setTreasureFightBossView = function (treasureFightBossView) {
            return this.treasureFightBossView = treasureFightBossView;
        };

        TreasureController.prototype.setTreasurePrizeView = function (treasurePrizeView) {
            return this.treasurePrizeView = treasurePrizeView;
        };

        TreasureController.prototype.setTreasureBossDemoView = function (treasureBossDemoView) {
            return this.treasureBossDemoView = treasureBossDemoView;
        };

        TreasureController.prototype.setTreasureImage = function (treasureImage) {
            return this.treasureImage = treasureImage;
        };

        TreasureController.prototype.getTreasureImage = function () {
            return this.treasureImage;
        };

        //TREASURE VIEW
        TreasureController.prototype.sendRequestOnHub = function (method, data) {
            if (this.treasureView) {
                return this.treasureView.sendRequestOnHub(method, data);
            }
        };

        TreasureController.prototype.updateCarrot = function (carrot) {
            this.carrot = carrot;
            if (this.treasureView && this.treasureVQMMView) {
                this.treasureVQMMView.updateCarrot(cc.Tool.getInstance().formatNumber(this.carrot));
                return this.treasureView.updateCarrot(cc.Tool.getInstance().formatNumber(this.carrot));
            }
        };

        TreasureController.prototype.addCarrot = function (carrot) {
            if (this.carrot && this.treasureView) {
                this.carrot += carrot;
                this.treasureVQMMView.updateCarrot(cc.Tool.getInstance().formatNumber(this.carrot));
                return this.treasureView.updateCarrot(cc.Tool.getInstance().formatNumber(this.carrot));
            }
        };

        TreasureController.prototype.subCarrot = function (carrot) {
            this.carrot -= carrot;
            this.treasureVQMMView.updateCarrot(cc.Tool.getInstance().formatNumber(this.carrot));
            return this.treasureView.updateCarrot(cc.Tool.getInstance().formatNumber(this.carrot));
        };

        TreasureController.prototype.getCarrot = function () {
            return this.carrot;
        };

        TreasureController.prototype.getTreasure = function () {
            return this.treasureView.getTreasure();
        };

        TreasureController.prototype.getTreasureSuccess = function (response) {
            return this.treasureView.onTreasureCarrotUserGetTreasureResponse(response);
        };

        TreasureController.prototype.bunnyPlayAnimation = function (name) {
            return this.treasureView.bunnyPlayAnimation(name);
        };

        TreasureController.prototype.updateEventTime = function (remaining) {
            if (this.treasureView) {
                return this.treasureView.updateEventTime(remaining);
            }
        };

        TreasureController.prototype.checkPlayFxDailyBonus = function () {
            if (this.treasureView)
                return this.treasureView.checkPlayFxDailyBonus();
        };

        //TREASURE VIEW END

        //TREASURE VQMM
        TreasureController.prototype.showBoss = function () {
            //update Vong quay
            this.treasureVQMMView.updateVQMM(false);

            //khoi tao BOSS
            this.treasureFightBossView.showBoss(this.getBossIndex());
            return this.treasureView.showBoss();
        };

        TreasureController.prototype.getMultiProcess = function () {
            return this.treasureVQMMView.getMultiProcess();
        };

        TreasureController.prototype.showRoad = function (data) {
            this.treasureVQMMView.updateVQMM(true);
            return this.treasureView.showRoad(data);
        };

        TreasureController.prototype.spinFinish = function () {
            return this.treasureVQMMView.spinFinish();
        };

        TreasureController.prototype.activeButtonSpin = function (enabled) {
            return this.treasureVQMMView.activeButtonSpin(enabled);
        };

        TreasureController.prototype.activeAutoSpin = function () {
            return this.treasureVQMMView.activeAutoSpin();
        };

        TreasureController.prototype.updateVQMM = function (isSpinJump) {
            return this.treasureVQMMView.updateVQMM(isSpinJump);
        };

        TreasureController.prototype.jumpSpinSuccess = function (response) {
            return this.treasureVQMMView.onTreasureCarrotJumpSpinCreateResponse(response);
        };

        TreasureController.prototype.fightSpinSuccess = function (response) {
            return this.treasureVQMMView.onTreasureCarrotFightSpinCreateResponse(response);
        };

        TreasureController.prototype.activateX = function () {
            return this.treasureVQMMView.activateX();
        };
        //TREASURE VQMM END

        //TREASURE PROGRESS
        TreasureController.prototype.updateProgressHP = function (hp) {
            return this.treasureProgress.updateProgressHP(hp);
        };

        TreasureController.prototype.addStep = function (step) {
            this.currentStep += step;
            return this.treasureProgress.updateCurrentStep(this.currentStep);
        };

        TreasureController.prototype.updateCurrentStep = function (step) {
            this.currentStep = step;
            return this.treasureProgress.updateCurrentStep(step);
        };

        TreasureController.prototype.updateUIChest = function (treasureID, idConvert) {
            return this.treasureProgress.updateUIChest(treasureID, idConvert);
        };

        TreasureController.prototype.increUIChest = function () {
            return this.treasureProgress.increUIChest();
        };

        TreasureController.prototype.showHPBar = function () {
            return this.treasureProgress.showHPBar();
        };

        TreasureController.prototype.showRoadBar = function () {
            return this.treasureProgress.showRoadBar();
        };
        //TREASURE PROGRESS END

        //TREASURE BG LOOP
        TreasureController.prototype.jump = function (step, multi) {
            return this.treasureBGLoop.jump(step, multi);
        };

        TreasureController.prototype.resetMushroom = function () {
            return this.treasureBGLoop.resetMushroom();
        };

        TreasureController.prototype.hardResetMushroom = function () {
            return this.treasureBGLoop.hardResetMushroom();
        };

        TreasureController.prototype.reSetPrizeToMushroom = function () {
            return this.treasureBGLoop.reSetPrizeToMushroom();
        };

        TreasureController.prototype.setPrizeToMushroom = function (prizeList, treasureList) {
            return this.treasureBGLoop.setPrizeToMushroom(prizeList, treasureList);
        };
        //TREASURE BG LOOP END

        //TREASURE FIGHT BOSS
        TreasureController.prototype.attackBoss = function (hp, bossHP) {
            this.bossHP = bossHP;
            this.hp = hp;
            return this.treasureFightBossView.attackBoss(hp);
        };

        TreasureController.prototype.getBossHP = function () {
            return this.bossHP;
        };

        TreasureController.prototype.bossPlayAnimation = function (name) {
            return this.treasureFightBossView.bossPlayAnimation(name);
        };

        TreasureController.prototype.createNodeHP = function () {
            return this.treasureFightBossView.createNodeHP(this.hp);
        };
        //TREASURE FIGHT BOSS END

        //TREASURE PRIZE
        TreasureController.prototype.initPrize = function (prize, indexPrizeSelect) {
            return this.treasurePrizeView.initPrize(prize, indexPrizeSelect);
        };

        TreasureController.prototype.hidePrize = function () {
            return this.treasurePrizeView.hidePrize();
        };
        //TREASURE PRIZE END

        //TREASURE MINI
        TreasureController.prototype.refreshPortalTreasureInfo = function () {
            return this.treasureMINIView.refreshPortalTreasureInfo();
        };

        TreasureController.prototype.resetCarrot = function () {
            return this.treasureMINIView.resetCarrot();
        };

        TreasureController.prototype.openTreasure = function () {
            return this.treasureMINIView.openTreasure();
        };

        //TREASURE MINI END

        //TREASURE INFO
        TreasureController.prototype.setTreasureInfoResponse = function (response) {
            return this.treasureInfoResponse = response;
        };

        TreasureController.prototype.getTreasureInfoResponse = function () {
            return this.treasureInfoResponse;
        };
        //TREASURE INFO END

        //TREASURE BOSS DEMO
        TreasureController.prototype.showBossDemo = function (index) {
            return this.treasureBossDemoView.showBossDemo(index);
        };

        TreasureController.prototype.hideBossDemo = function () {
            return this.treasureBossDemoView.hideBossDemo();
        };
        //TREASURE BOSS DEMO END

        //PROPERTY
        TreasureController.prototype.getArrayBoost = function () {
            if (this.carrot <= 50) {
                return [1, 3, 5];
            } else if (this.carrot <= 200) {
                return [3, 5, 10];
            } else if (this.carrot <= 500) {
                return [5, 10, 20];
            } else {
                return [10, 20, 100];
            }
        };

        TreasureController.prototype.getBossIndex = function () {
            var bossIndex = 0;
            var treasureId = cc.TreasureController.getInstance().getTreasureId();
            switch (treasureId) {
                case 4:
                    bossIndex = 0;
                    break;
                case 8:
                    bossIndex = 1;
                    break;
                case 12:
                    bossIndex = 2;
                    break;
            }
            return bossIndex;
        };

        TreasureController.prototype.setTreasureId = function (treasureId) {
            return this.treasureId = treasureId;
        };

        TreasureController.prototype.getTreasureId = function () {
            return this.treasureId;
        };

        TreasureController.prototype.setJumpData = function (jumpData) {
            return this.jumpData = jumpData;
        };

        TreasureController.prototype.getJumpData = function () {
            return this.jumpData;
        };

        TreasureController.prototype.setJumpIndex = function (jumpIndex) {
            return this.jumpIndex = jumpIndex;
        };

        TreasureController.prototype.increJumpIndex = function () {
            return this.jumpIndex += 1;
        };

        TreasureController.prototype.getJumpIndex = function () {
            return this.jumpIndex;
        };

        TreasureController.prototype.setSymbol = function (symbol) {
            return this.symbol = symbol;
        };

        TreasureController.prototype.getSymbol = function () {
            return this.symbol;
        };

        TreasureController.prototype.setIsDailyBonus = function (isDailyBonus) {
            return this.isDailyBonus = isDailyBonus;
        };

        TreasureController.prototype.getIsDailyBonus  = function () {
            return this.isDailyBonus;
        };
        //PROPERTY END

        return TreasureController;

    })();

    cc.TreasureController = TreasureController;

}).call(this);

