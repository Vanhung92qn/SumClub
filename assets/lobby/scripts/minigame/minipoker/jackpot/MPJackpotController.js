/**
 * Created by Nofear on 6/21/2017.
 */

(function () {
    var MPJackpotController;

    MPJackpotController = (function () {
        var instance;

        function MPJackpotController() {

        }

        instance = void 0;

        MPJackpotController.getInstance = function () {
            if (instance === void 0) {
                instance = this;
            }
            return instance.prototype;
        };

        MPJackpotController.prototype.setMPJackpotView = function (mpJackpotView ) {
            return this.mpJackpotView = mpJackpotView;
        };

        MPJackpotController.prototype.updateMPJackpot = function (amount) {
            this.jackpot = amount;
            return this.mpJackpotView.updateJackpot(amount);
        };

        MPJackpotController.prototype.refreshMPJackpot = function () {
            return this.mpJackpotView.updateJackpot(this.jackpot);
        };

        return MPJackpotController;

    })();

    cc.MPJackpotController = MPJackpotController;

}).call(this);

