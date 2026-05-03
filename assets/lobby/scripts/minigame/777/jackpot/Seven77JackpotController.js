/**
 * Created by Nofear on 6/21/2017.
 */

(function () {
    var Seven77JackpotController;

    Seven77JackpotController = (function () {
        var instance;

        function Seven77JackpotController() {

        }

        instance = void 0;

        Seven77JackpotController.getInstance = function () {
            if (instance === void 0) {
                instance = this;
            }
            return instance.prototype;
        };

        Seven77JackpotController.prototype.setSeven77JackpotView = function (seven77JackpotView ) {
            return this.seven77JackpotView = seven77JackpotView;
        };

        Seven77JackpotController.prototype.updateSeven77Jackpot = function (amount) {
            return this.seven77JackpotView.updateJackpot(amount);
        };

        return Seven77JackpotController;

    })();

    cc.Seven77JackpotController = Seven77JackpotController;

}).call(this);

