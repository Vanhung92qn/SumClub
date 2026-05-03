
(function () {
    var Seven77PayLinesController;

    Seven77PayLinesController = (function () {
        var instance;

        function Seven77PayLinesController() {
        }

        instance = void 0;

        Seven77PayLinesController.getInstance = function () {
            if (instance === void 0) {
                instance = this;
            }
            return instance.prototype;
        };

        Seven77PayLinesController.prototype.setSeven77PayLinesView = function (seven77PayLinesView) {
            return this.seven77PayLinesView = seven77PayLinesView;
        };

        Seven77PayLinesController.prototype.hideAllLines = function () {
            return this.seven77PayLinesView.hideAllLines();
        };

        Seven77PayLinesController.prototype.showAllLines = function () {
            return this.seven77PayLinesView.showAllLines();
        };

        Seven77PayLinesController.prototype.stopEffect = function () {
            return this.seven77PayLinesView.stopEffect();
        };

        Seven77PayLinesController.prototype.startEffect = function () {
            return this.seven77PayLinesView.startEffect();
        };

        Seven77PayLinesController.prototype.playEffect = function (prizeLines, delay) {
            if (prizeLines === null || prizeLines.length === 0) return;
            return this.seven77PayLinesView.playEffect(prizeLines, delay);
        };

        Seven77PayLinesController.prototype.showLine = function (lineID) {
            return this.seven77PayLinesView.showLine(lineID);
        };

        return Seven77PayLinesController;

    })();

    cc.Seven77PayLinesController = Seven77PayLinesController;

}).call(this);
