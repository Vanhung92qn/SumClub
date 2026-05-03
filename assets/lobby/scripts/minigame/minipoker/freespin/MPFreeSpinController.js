/**
 * Created by Nofear on 6/21/2017.
 */

(function () {
    var MPFreeSpinController;

    MPFreeSpinController = (function () {
        var instance;

        function MPFreeSpinController() {

        }

        instance = void 0;

        MPFreeSpinController.getInstance = function () {
            if (instance === void 0) {
                instance = this;
            }
            return instance.prototype;
        };

        MPFreeSpinController.prototype.setMPFreeSpinView = function (mpFreeSpinView) {
            return this.mpFreeSpinView = mpFreeSpinView;
        };

        MPFreeSpinController.prototype.showFreeSpin = function (amount) {
            this.mpFreeSpinView.showFreeSpin(amount);
            this.setStateFreeSpin(true);
        };

        MPFreeSpinController.prototype.hideFreeSpin = function () {
            this.mpFreeSpinView.hideFreeSpin();
            this.setStateFreeSpin(false);
        };

        MPFreeSpinController.prototype.setStateFreeSpin = function (isFreeSpin) {
            return this.isFreeSpin = isFreeSpin;
        };

        MPFreeSpinController.prototype.getStateFreeSpin = function () {
            return this.isFreeSpin;
        };

        return MPFreeSpinController;

    })();

    cc.MPFreeSpinController = MPFreeSpinController;

}).call(this);

