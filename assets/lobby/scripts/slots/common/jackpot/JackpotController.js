
(function () {
    var JackpotController;

    JackpotController = (function () {
        var instance;

        function JackpotController() {
        }

        instance = void 0;

        JackpotController.getInstance = function () {
            if (instance === void 0) {
                instance = this;
            }
            return instance.prototype;
        };

        JackpotController.prototype.setJackpotView = function (jackpotView) {
            return this.jackpotView = jackpotView;
        };

        JackpotController.prototype.setJackpotInGameView = function (jackpotInGameView) {
            return this.jackpotInGameView = jackpotInGameView;
        };

        JackpotController.prototype.updateJackpot = function (jackpotData) {
            if (this.jackpotView !== null)
                return this.jackpotView.updateJackpot(jackpotData);
        };

        JackpotController.prototype.updateJackpotInGame = function (jackpot) {
            if (this.jackpotInGameView !== null)
                return this.jackpotInGameView.updateJackpotInGame(jackpot);
        };

        return JackpotController;

    })();

    cc.JackpotController = JackpotController;

}).call(this);
