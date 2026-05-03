/**
 * Created by Nofear on 3/14/2019.
 */

(function () {
    var VQMMController;

    VQMMController = (function () {
        var instance;

        function VQMMController() {
        }

        instance = void 0;

        VQMMController.getInstance = function () {
            if (instance === void 0) {
                instance = this;
            }
            return instance.prototype;
        };

        VQMMController.prototype.setVQMMView = function (vqmmView) {
            return this.vqmmView = vqmmView;
        };

        VQMMController.prototype.spinVQMM = function () {
            return this.vqmmView.spinVQMM();
        };

        VQMMController.prototype.stopVQMM = function () {
            return this.vqmmView.stopVQMM();
        };

        VQMMController.prototype.setVQMMSpinResponse = function (spinResponse) {
            return this.spinResponse = spinResponse;
        };

        VQMMController.prototype.getVQMMSpinResponse = function () {
            return this.spinResponse;
        };

        return VQMMController;

    })();

    cc.VQMMController = VQMMController;

}).call(this);

