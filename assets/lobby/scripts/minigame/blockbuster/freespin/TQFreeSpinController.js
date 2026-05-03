/**
 * Created by Nofear on 6/21/2017.
 */

(function () {
    var TQFreeSpinController;

    TQFreeSpinController = (function () {
        var instance;

        function TQFreeSpinController() {

        }

        instance = void 0;

        TQFreeSpinController.getInstance = function () {
            if (instance === void 0) {
                instance = this;
            }
            return instance.prototype;
        };

        TQFreeSpinController.prototype.setTQFreeSpinView = function (tqFreeSpinView) {
            return this.tqFreeSpinView = tqFreeSpinView;
        };

        TQFreeSpinController.prototype.showFreeSpin = function (amount) {
            this.tqFreeSpinView.showFreeSpin(amount);
            this.setStateFreeSpin(true);
        };

        TQFreeSpinController.prototype.hideFreeSpin = function () {
            this.tqFreeSpinView.hideFreeSpin();
            this.setStateFreeSpin(false);
        };

        TQFreeSpinController.prototype.setStateFreeSpin = function (isFreeSpin) {
            return this.isFreeSpin = isFreeSpin;
        };

        TQFreeSpinController.prototype.getStateFreeSpin = function () {
            return this.isFreeSpin;
        };

        return TQFreeSpinController;

    })();

    cc.TQFreeSpinController = TQFreeSpinController;

}).call(this);

