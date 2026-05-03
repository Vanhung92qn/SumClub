
(function () {
    var TQPayLinesController;

    TQPayLinesController = (function () {
        var instance;

        function TQPayLinesController() {
        }

        instance = void 0;

        TQPayLinesController.getInstance = function () {
            if (instance === void 0) {
                instance = this;
            }
            return instance.prototype;
        };

        TQPayLinesController.prototype.setTQPayLinesView = function (tqPayLinesView) {
            return this.tqPayLinesView = tqPayLinesView;
        };

        TQPayLinesController.prototype.hideAllLines = function () {
            return this.tqPayLinesView.hideAllLines();
        };

        TQPayLinesController.prototype.showAllLines = function () {
            return this.tqPayLinesView.showAllLines();
        };

        TQPayLinesController.prototype.stopEffect = function () {
            return this.tqPayLinesView.stopEffect();
        };

        TQPayLinesController.prototype.startEffect = function () {
            return this.tqPayLinesView.startEffect();
        };

        TQPayLinesController.prototype.playEffect = function (prizeLines, delay) {
            if (prizeLines === null || prizeLines.length === 0) return;
            return this.tqPayLinesView.playEffect(prizeLines, delay);
        };

        TQPayLinesController.prototype.showLine = function (lineID) {
            return this.tqPayLinesView.showLine(lineID);
        };

        return TQPayLinesController;

    })();

    cc.TQPayLinesController = TQPayLinesController;

}).call(this);
