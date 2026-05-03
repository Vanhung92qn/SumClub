
(function () {
    var MPSpinController;

    MPSpinController = (function () {
        var instance;

        function MPSpinController() {
        }

        instance = void 0;

        MPSpinController.getInstance = function () {
            if (instance === void 0) {
                instance = this;
            }
            return instance.prototype;
        };

        MPSpinController.prototype.setMPSpinView = function (mpSpinView) {
            return this.mpSpinView = mpSpinView;
        };

        MPSpinController.prototype.setMPSpinX3View = function (mpSpinX3View) {
            return this.mpSpinX3View = mpSpinX3View;
        };

        MPSpinController.prototype.setMPCardView = function (mpCardView) {
            return this.mpCardView = mpCardView;
        };

        MPSpinController.prototype.setMPPrizeView = function (mpPrizeView) {
            return this.mpPrizeView = mpPrizeView;
        };

        MPSpinController.prototype.setSpinResponse = function (spinResponse) {
            return this.spinResponse = spinResponse;
        };

        MPSpinController.prototype.getSpinResponse = function () {
            return this.spinResponse;
        };

        MPSpinController.prototype.getSFCards = function () {
            return this.mpCardView.sfCards;
        };

        MPSpinController.prototype.getSFPrizes = function () {
            return this.mpPrizeView.sfPrizes;
        };

        MPSpinController.prototype.stopSpinFinish = function () {
            switch (cc.MiniPokerController.getInstance().getMode()) {
                case cc.MiniPokerX.X1:
                    return this.mpSpinView.stopSpinX1Finish();
                    break;
                case cc.MiniPokerX.X3:
                    return this.mpSpinX3View.stopSpinX3Finish();
                    break;
            }
        };

        MPSpinController.prototype.startSpinX1 = function () {
            return this.mpSpinView.startSpin();
        };

        MPSpinController.prototype.startSpinX3 = function () {
            return this.mpSpinX3View.startSpin();
        };

        MPSpinController.prototype.stopSpinX1 = function () {
            return this.mpSpinView.stopSpin();
        };

        MPSpinController.prototype.stopSpinX3 = function () {
            return this.mpSpinX3View.stopSpin();
        };

        MPSpinController.prototype.randomAllIcon = function () {
            switch (cc.MiniPokerController.getInstance().getMode()) {
                case cc.MiniPokerX.X1:
                    this.mpSpinView.randomAllIcon();
                    break;
                case cc.MiniPokerX.X3:
                    this.mpSpinX3View.randomAllIcon();
                    break;
            }
        };

        MPSpinController.prototype.getSpining = function () {
            switch (cc.MiniPokerController.getInstance().getMode()) {
                case cc.MiniPokerX.X1:
                    return this.mpSpinView.isSpining;
                    break;
                case cc.MiniPokerX.X3:
                    return this.mpSpinX3View.isSpining;
                    break;
            }
        };

        MPSpinController.prototype.autoSpin = function (isAutoSpin) {
            switch (cc.MiniPokerController.getInstance().getMode()) {
                case cc.MiniPokerX.X1:
                    this.isAutoSpin = isAutoSpin;
                    return this.mpSpinView.autoSpin(isAutoSpin);
                    break;
                case cc.MiniPokerX.X3:
                    this.isAutoSpin = isAutoSpin;
                    return this.mpSpinX3View.autoSpin(isAutoSpin);
                    break;
            }
        };

        MPSpinController.prototype.checkIsAutoSpin = function () {
            if (this.isAutoSpin)
                return this.isAutoSpin;
            else
                return false;
        };

        return MPSpinController;

    })();

    cc.MPSpinController = MPSpinController;

}).call(this);
