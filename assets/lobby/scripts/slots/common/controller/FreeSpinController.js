/**
 * Created by Nofear on 3/27/2019.
 */

(function () {
    var FreeSpinController;

    FreeSpinController = (function () {
        var instance;

        function FreeSpinController() {
        }

        instance = void 0;

        FreeSpinController.getInstance = function () {
            if (instance === void 0) {
                instance = this;
            }
            return instance.prototype;
        };

        FreeSpinController.prototype.setFreeSpinView = function (freeSpinView) {
            return this.freeSpinView = freeSpinView;
        };

        FreeSpinController.prototype.activeFreeSpin = function (enable) {
            //ko phai choi thu moi kiem tra
            if (!cc.SpinController.getInstance().getIsPlayTry()) {
                //tat/bat chon dong
                cc.SpinController.getInstance().activeButtonSelectBetLines(!enable);
            }
            return this.freeSpinView.activeFreeSpin(enable);
        };

        FreeSpinController.prototype.updateFreeSpinText = function (totalFreeSpin) {
            return this.freeSpinView.updateFreeSpinText(totalFreeSpin);
        };

        FreeSpinController.prototype.getStickyWild = function () {
            return this.freeSpinView.getStickyWild();
        };

        FreeSpinController.prototype.setStateFreeSpin = function (isFreeSpin) {
            return this.isFreeSpin = isFreeSpin;
        };

        FreeSpinController.prototype.getStateFreeSpin = function () {
            return this.isFreeSpin;
        };

        return FreeSpinController;

    })();

    cc.FreeSpinController = FreeSpinController;

}).call(this);
