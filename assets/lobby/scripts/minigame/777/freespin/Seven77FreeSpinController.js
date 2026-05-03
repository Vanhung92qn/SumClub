/**
 * Created by Nofear on 6/21/2017.
 */

(function () {
    var Seven77FreeSpinController;

    Seven77FreeSpinController = (function () {
        var instance;

        function Seven77FreeSpinController() {

        }

        instance = void 0;

        Seven77FreeSpinController.getInstance = function () {
            if (instance === void 0) {
                instance = this;
            }
            return instance.prototype;
        };

        Seven77FreeSpinController.prototype.setSeven77FreeSpinView = function (seven77FreeSpinView) {
            return this.seven77FreeSpinView = seven77FreeSpinView;
        };

        Seven77FreeSpinController.prototype.showFreeSpin = function (amount) {
            this.seven77FreeSpinView.showFreeSpin(amount);
            this.setStateFreeSpin(true);
        };

        Seven77FreeSpinController.prototype.hideFreeSpin = function () {
            this.seven77FreeSpinView.hideFreeSpin();
            this.setStateFreeSpin(false);
        };

        Seven77FreeSpinController.prototype.setStateFreeSpin = function (isFreeSpin) {
            return this.isFreeSpin = isFreeSpin;
        };

        Seven77FreeSpinController.prototype.getStateFreeSpin = function () {
            return this.isFreeSpin;
        };

        return Seven77FreeSpinController;

    })();

    cc.Seven77FreeSpinController = Seven77FreeSpinController;

}).call(this);

