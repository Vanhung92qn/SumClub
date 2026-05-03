/**
 * Created by Nofear on 6/21/2017.
 */

(function () {
    var MINIController;

    MINIController = (function () {
        var instance;

        function MINIController() {

        }

        instance = void 0;

        MINIController.getInstance = function () {
            if (instance === void 0) {
                instance = this;
            }
            return instance.prototype;
        };

        MINIController.prototype.setMiniView = function (miniView) {
            return this.miniView = miniView;
        };

        MINIController.prototype.updateTimerTx = function (timer, txState) {
            return this.miniView.updateTimerTx(timer, txState);
        };

        MINIController.prototype.updateTimerTxMd5 = function (timer, txState) {
            return this.miniView.updateTimerTxMd5(timer, txState);
        };
		
        MINIController.prototype.updateInfoTx = function (info, txState) {
            return this.miniView.updateInfoTx(info, txState);
        };
		
        MINIController.prototype.updateInfoTxMd5 = function (info, txState) {
            return this.miniView.updateInfoTxMd5(info, txState);
        };

        MINIController.prototype.openClicked = function () {
            return this.miniView.openClicked();
        };

        return MINIController;

    })();

    cc.MINIController = MINIController;

}).call(this);
