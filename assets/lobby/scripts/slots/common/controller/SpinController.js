
(function () {
    var SpinController;

    SpinController = (function () {
        var instance;

        function SpinController() {
        }

        instance = void 0;

        SpinController.getInstance = function () {
            if (instance === void 0) {
                instance = this;
            }
            return instance.prototype;
        };

        SpinController.prototype.setSpinView = function (spinView) {
            return this.spinView = spinView;
        };

        SpinController.prototype.setIsPlayTry = function (isPlayTry) {
            return this.isPlayTry = isPlayTry;
        };

        SpinController.prototype.getIsPlayTry = function () {
            return this.isPlayTry;
        };

        SpinController.prototype.checkIsSpin = function () {
            if (!this.isAutoSpin && !this.isSpin) {
                return false;
            } else {
                return true;
            }
        };

        SpinController.prototype.startSpin = function () {
            return this.spinView.startSpin();
        };

        SpinController.prototype.stopSpin = function () {
            return this.spinView.stopSpin();
        };

        SpinController.prototype.stopSpinFinish = function () {
            return this.spinView.stopSpinFinish();
        };

        SpinController.prototype.resetSpin = function () {
            return this.spinView.resetSpin();
        };

        SpinController.prototype.randomIcon = function () {
            return this.spinView.randomIcon();
        };

        SpinController.prototype.updateTotalBet = function (totalBet) {
            return this.spinView.updateTotalBet(totalBet);
        };

        SpinController.prototype.setSpinAccountID = function (spinAccountID) {
            return this.spinView.setSpinAccountID(spinAccountID);
        };

        SpinController.prototype.updateTotalLines = function (totalLines) {
            return this.spinView.updateTotalLines(totalLines);
        };

        SpinController.prototype.getTotalLines = function () {
            return this.spinView.getTotalLines();
        };

        SpinController.prototype.updateBetLinesText = function (betLinesText) {
            return this.spinView.updateBetLinesText(betLinesText);
        };

        SpinController.prototype.getBetLinesText = function () {
            return this.spinView.getBetLinesText();
        };

        SpinController.prototype.setSessionID = function (sessionID) {
            if (sessionID === 0) return;
            return this.spinView.setSessionID(sessionID);
        };

        SpinController.prototype.updateTotalWinFromBonus = function (totalPrize) {
            return this.spinView.updateTotalWinFromBonus(totalPrize);
        };

        SpinController.prototype.updateTotalWinUI = function (amount) {
            return this.spinView.updateTotalWinUI(amount);
        };

        SpinController.prototype.updateBetUI = function (betVal) {
            if (this.spinView.updateBetUI) {
                return this.spinView.updateBetUI(betVal);
            }
        };

        SpinController.prototype.updateBGRoomUI = function (betVal) {
            if (this.spinView.updateBGRoomUI) {
                return this.spinView.updateBGRoomUI(betVal);
            }
        };

        SpinController.prototype.setButtonView = function (buttonView) {
            return this.buttonView = buttonView;
        };

        SpinController.prototype.setIconView = function (iconView) {
            return this.iconView = iconView;
        };

        SpinController.prototype.getIconView = function () {
            return this.iconView;
        };

        SpinController.prototype.getNodeIconFx = function (iconType) {
            return this.iconView.nodeIconFxs[iconType - 1];
        };

        SpinController.prototype.getNodeIconMGFx = function (iconType) {
            return this.iconView.nodeIconMGFxs[iconType - 1];
        };

        SpinController.prototype.setSpinResponse = function (spinResponse) {
            return this.spinResponse = spinResponse;
        };

        SpinController.prototype.getSpinResponse = function () {
            return this.spinResponse;
        };

        SpinController.prototype.setPaylinePrize = function (paylinePrize) {
            return this.paylinePrize = paylinePrize;
        };

        SpinController.prototype.getPaylinePrize = function () {
            return this.paylinePrize;
        };

        SpinController.prototype.setRoomID = function (roomID) {
            return this.roomID = roomID;
        };

        SpinController.prototype.getRoomID = function () {
            return this.roomID;
        };

        SpinController.prototype.setBetValue = function (betValue) {
            return this.betValue = betValue;
        };

        SpinController.prototype.getBetValue = function () {
            return this.betValue;
        };

        SpinController.prototype.activeButtonSpin = function (enable) {
            this.isSpin = !enable;
            if (this.buttonView === undefined)
                return;
            return this.buttonView.activeButtonSpin(enable);
        };

        SpinController.prototype.activeButtonSelectBetLines = function (enable) {
            return this.buttonView.activeButtonSelectBetLines(enable);
        };

        SpinController.prototype.checkIsAutoSpin = function () {
            if (this.isAutoSpin)
                return this.isAutoSpin;
            else
                return false;
        };

        SpinController.prototype.activeButtonAutoSpin = function (enable) {
            this.isAutoSpin = enable;
            return this.buttonView.activeButtonAutoSpin(enable);
        };

        SpinController.prototype.activeButtonFastSpin = function (enable) {
            return this.buttonView.activeButtonFastSpin(enable);
        };

        SpinController.prototype.activeButtonX2 = function (enable) {
            return this.buttonView.activeButtonX2(enable);
        };

        return SpinController;

    })();

    cc.SpinController = SpinController;

}).call(this);
