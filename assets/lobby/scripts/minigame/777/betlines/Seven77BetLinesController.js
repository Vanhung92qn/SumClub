
(function () {
    var Seven77BetLinesController;

    Seven77BetLinesController = (function () {
        var instance;

        function Seven77BetLinesController() {
        }

        instance = void 0;

        Seven77BetLinesController.getInstance = function () {
            if (instance === void 0) {
                instance = this;
            }
            return instance.prototype;
        };

        Seven77BetLinesController.prototype.setSeven77BetLinesView = function (seven77BetLinesView) {
            return this.seven77BetLinesView = seven77BetLinesView;
        };

        return Seven77BetLinesController;

    })();

    cc.Seven77BetLinesController = Seven77BetLinesController;

}).call(this);
