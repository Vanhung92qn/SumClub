
(function () {
    var Seven77SpinController;

    Seven77SpinController = (function () {
        var instance;

        function Seven77SpinController() {
        }

        instance = void 0;

        Seven77SpinController.getInstance = function () {
            if (instance === void 0) {
                instance = this;
            }
            return instance.prototype;
        };

        Seven77SpinController.prototype.setSeven77SpinView = function (seven77SpinView) {
            return this.seven77SpinView = seven77SpinView;
        };

        Seven77SpinController.prototype.setSeven77IconView = function (seven77IconView) {
            return this.seven77IconView = seven77IconView;
        };

        Seven77SpinController.prototype.setSpinResponse = function (spinResponse) {
            return this.spinResponse = spinResponse;
        };

        Seven77SpinController.prototype.getSpinResponse = function () {
            return this.spinResponse;
        };

        Seven77SpinController.prototype.updateTotalBet = function (totalBet) {
            return this.seven77SpinView.updateTotalBet(totalBet);
        };

        Seven77SpinController.prototype.updateTotalLines = function (totalLines) {
            return this.seven77SpinView.updateTotalLines(totalLines);
        };

        Seven77SpinController.prototype.getTotalLines = function () {
            return this.seven77SpinView.getTotalLines();
        };

        Seven77SpinController.prototype.updateBetLinesText = function (betLinesText) {
            return this.seven77SpinView.updateBetLinesText(betLinesText);
        };

        Seven77SpinController.prototype.getBetLinesText = function () {
            return this.seven77SpinView.getBetLinesText();
        };

        Seven77SpinController.prototype.stopSpinFinish = function () {
            return this.seven77SpinView.stopSpinFinish();
        };

        Seven77SpinController.prototype.startSpin = function () {
            return this.seven77SpinView.startSpin();
        };

        Seven77SpinController.prototype.stopSpin = function () {
            return this.seven77SpinView.stopSpin();
        };

        Seven77SpinController.prototype.randomAllIcon = function () {
            return this.seven77SpinView.randomAllIcon();
        };

        Seven77SpinController.prototype.getSpining = function () {
            return this.seven77SpinView.isSpining;
        };

        Seven77SpinController.prototype.autoSpin = function (isAutoSpin) {
            this.isAutoSpin = isAutoSpin;
            return this.seven77SpinView.autoSpin(isAutoSpin);
        };

        Seven77SpinController.prototype.checkIsAutoSpin = function () {
            if (this.isAutoSpin)
                return this.isAutoSpin;
            else
                return false;
        };

        Seven77SpinController.prototype.getSkeletonDataIcons = function () {
            return this.seven77IconView.skeletonDataIcons;
        };

        Seven77SpinController.prototype.getSpriteIcons = function () {
            return this.seven77IconView.spriteIcons;
        };

        return Seven77SpinController;

    })();

    cc.Seven77SpinController = Seven77SpinController;

}).call(this);
