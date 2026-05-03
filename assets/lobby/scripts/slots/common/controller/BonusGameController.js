/**
 * Created by Nofear on 6/21/2017.
 */

(function () {
    var BonusGameController;

    BonusGameController = (function () {
        var instance;

        function BonusGameController() {

        }

        instance = void 0;

        BonusGameController.getInstance = function () {
            if (instance === void 0) {
                instance = this;
            }
            return instance.prototype;
        };

        BonusGameController.prototype.setBonusGameView = function (bonusGameView) {
            return this.bonusGameView = bonusGameView;
        };

        BonusGameController.prototype.setBonusPickView = function (bonusPickView) {
            return this.bonusPickView = bonusPickView;
        };

        BonusGameController.prototype.updateResultFromLuckyBoard = function () {
            return this.bonusPickView.updateResultFromLuckyBoard();
        };

        BonusGameController.prototype.updateTotalWin = function (totalWin) {
            this.totalWin = totalWin;
            return this.bonusGameView.updateTotalWin(totalWin);
        };

        BonusGameController.prototype.addTotalWin = function (winAmount) {
            return this.bonusGameView.addTotalWin(winAmount);
        };


        BonusGameController.prototype.updateMultiplier = function (multiplier) {
            return this.bonusGameView.updateMultiplier(multiplier);
        };

        BonusGameController.prototype.updatePickRemaining = function (remaining) {
            return this.bonusGameView.updatePickRemaining(remaining);
        };

        BonusGameController.prototype.getPickRemaining = function () {
            return this.bonusGameView.getPickRemaining();
        };

        BonusGameController.prototype.updateKey = function (key) {
            return this.key = key;
        };

        BonusGameController.prototype.getKey = function () {
            return this.key;
        };

        BonusGameController.prototype.getTotalWin = function () {
            return this.totalWin;
        };

        BonusGameController.prototype.activeButtonQuickPlay = function (enable) {
            return this.bonusGameView.activeButtonQuickPlay(enable);
        };

        BonusGameController.prototype.getBonusGameState = function () {
            return this.bonusGameState;
        };

        BonusGameController.prototype.changeView = function (bonusGameState) {
            this.bonusGameState = bonusGameState;
            return this.bonusGameView.changeView(bonusGameState);
        };

        BonusGameController.prototype.resetTimer = function () {
            return this.bonusGameView.resetTimer();
        };

        BonusGameController.prototype.startTimer = function () {
            return this.bonusGameView.startTimer();
        };

        BonusGameController.prototype.stopTimer = function () {
            return this.bonusGameView.stopTimer();
        };

        BonusGameController.prototype.getData = function () {
            return this.bonusGameResponse;
        };

        BonusGameController.prototype.setData = function (bonusGameResponse) {
            return this.bonusGameResponse = bonusGameResponse;
        };

        BonusGameController.prototype.getCurrentStep = function () {
            return this.currentStep;
        };

        BonusGameController.prototype.setCurrentStep = function (currentStep) {
            return this.currentStep = currentStep;
        };

        BonusGameController.prototype.getCurrentPositionPick = function () {
            return this.positionPick;
        };

        BonusGameController.prototype.setCurrentPositionPick = function (positionPick) {
            return this.positionPick = positionPick;
        };

        BonusGameController.prototype.getLuckyPrize = function () {
            return this.luckyPrize;
        };

        BonusGameController.prototype.setLuckyPrize = function (luckyPrize) {
            return this.luckyPrize = luckyPrize;
        };

        BonusGameController.prototype.onPlayBonusFinishResponse = function (data) {
            return this.bonusGameView.onPlayBonusFinishResponse(data);
        };

        return BonusGameController;

    })();

    cc.BonusGameController = BonusGameController;

}).call(this);

