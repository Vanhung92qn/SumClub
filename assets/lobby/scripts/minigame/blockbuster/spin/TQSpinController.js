
(function () {
    var TQSpinController;

    TQSpinController = (function () {
        var instance;

        function TQSpinController() {
        }

        instance = void 0;

        TQSpinController.getInstance = function () {
            if (instance === void 0) {
                instance = this;
            }
            return instance.prototype;
        };

        TQSpinController.prototype.setTQSpinView = function (tqSpinView) {
            return this.tqSpinView = tqSpinView;
        };

        TQSpinController.prototype.setTQIconView = function (tqIconView) {
            return this.tqIconView = tqIconView;
        };

        TQSpinController.prototype.setSpinResponse = function (spinResponse) {
            return this.spinResponse = spinResponse;
        };

        TQSpinController.prototype.getSpinResponse = function () {
            return this.spinResponse;
        };

        TQSpinController.prototype.updateTotalBet = function (totalBet) {
            return this.tqSpinView.updateTotalBet(totalBet);
        };

        TQSpinController.prototype.updateTotalLines = function (totalLines) {
            return this.tqSpinView.updateTotalLines(totalLines);
        };

        TQSpinController.prototype.getTotalLines = function () {
            return this.tqSpinView.getTotalLines();
        };

        TQSpinController.prototype.updateBetLinesText = function (betLinesText) {
            return this.tqSpinView.updateBetLinesText(betLinesText);
        };

        TQSpinController.prototype.getBetLinesText = function () {
            return this.tqSpinView.getBetLinesText();
        };

        TQSpinController.prototype.stopSpinFinish = function () {
            return this.tqSpinView.stopSpinFinish();
        };

        TQSpinController.prototype.startSpinFinish = function () {
            return this.tqSpinView.startSpinFinish();
        };

        TQSpinController.prototype.startSpin = function () {
            return this.tqSpinView.startSpin();
        };

        TQSpinController.prototype.stopSpin = function () {
            return this.tqSpinView.stopSpin();
        };

        TQSpinController.prototype.randomAllIcon = function () {
            return this.tqSpinView.randomAllIcon();
        };

        TQSpinController.prototype.getSpining = function () {
            return this.tqSpinView.isSpining;
        };

        TQSpinController.prototype.autoSpin = function (isAutoSpin) {
            this.isAutoSpin = isAutoSpin;
            return this.tqSpinView.autoSpin(isAutoSpin);
        };

        TQSpinController.prototype.checkIsAutoSpin = function () {
            if (this.isAutoSpin)
                return this.isAutoSpin;
            else
                return false;
        };

        TQSpinController.prototype.getSkeletonDataIcons = function () {
            return this.tqIconView.skeletonDataIcons;
        };

        TQSpinController.prototype.getSFIcons = function () {
            return this.tqIconView.sfIcons;
        };

        return TQSpinController;

    })();

    cc.TQSpinController = TQSpinController;

}).call(this);
