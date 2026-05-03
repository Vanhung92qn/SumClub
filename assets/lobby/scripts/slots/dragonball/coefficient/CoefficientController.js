/**
 * Created by Nofear on 6/21/2017.
 */

(function () {
    var CoefficientController;

    CoefficientController = (function () {
        var instance;

        function CoefficientController() {

        }

        instance = void 0;

        CoefficientController.getInstance = function () {
            if (instance === void 0) {
                instance = this;
            }
            return instance.prototype;
        };

        CoefficientController.prototype.setCoefficientView = function (coefficientView) {
            return this.coefficientView = coefficientView;
        };

        CoefficientController.prototype.setMultiplier = function (multiplier) {
            return this.coefficientView.setMultiplier(multiplier);
        };

        return CoefficientController;

    })();

    cc.CoefficientController = CoefficientController;

}).call(this);

