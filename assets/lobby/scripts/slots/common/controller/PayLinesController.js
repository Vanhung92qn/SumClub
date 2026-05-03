
(function () {
    var PayLinesController;

    PayLinesController = (function () {
        var instance;

        function PayLinesController() {
        }

        instance = void 0;

        PayLinesController.getInstance = function () {
            if (instance === void 0) {
                instance = this;
            }
            return instance.prototype;
        };

        PayLinesController.prototype.setPayLinesView = function (payLinesView) {
            return this.payLinesView = payLinesView;
        };

        PayLinesController.prototype.hideAllLines = function () {
            return this.payLinesView.hideAllLines();
        };

        PayLinesController.prototype.showAllLines = function () {
            return this.payLinesView.showAllLines();
        };

        PayLinesController.prototype.stopEffect = function () {
            return this.payLinesView.stopEffect();
        };

        PayLinesController.prototype.startEffect = function () {
            return this.payLinesView.startEffect();
        };

        PayLinesController.prototype.playEffect = function (prizeLines, delay) {
            if (prizeLines === null || prizeLines.length === 0) return;
            return this.payLinesView.playEffect(prizeLines, delay);
        };

        PayLinesController.prototype.showLine = function (lineID) {
            return this.payLinesView.showLine(lineID);
        };

        return PayLinesController;

    })();

    cc.PayLinesController = PayLinesController;

}).call(this);
