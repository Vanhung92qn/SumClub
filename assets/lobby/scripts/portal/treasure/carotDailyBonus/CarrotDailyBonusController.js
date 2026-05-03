/**
 * Created by Nofear on 3/14/2019.
 */

(function () {
    var CarrotDailyBonusController;

    CarrotDailyBonusController = (function () {
        var instance;

        function CarrotDailyBonusController() {
        }

        instance = void 0;

        CarrotDailyBonusController.getInstance = function () {
            if (instance === void 0) {
                instance = this;
            }
            return instance.prototype;
        };

        CarrotDailyBonusController.prototype.setCarrotDailyBonusView = function (carrotDailyBonusView) {
            return this.carrotDailyBonusView = carrotDailyBonusView;
        };

        CarrotDailyBonusController.prototype.setCarrotDailyBonusImage = function (carrotDailyBonusImage) {
            return this.carrotDailyBonusImage = carrotDailyBonusImage;
        };

        CarrotDailyBonusController.prototype.getCarrotDailyBonusImage = function () {
            return this.carrotDailyBonusImage;
        };

        CarrotDailyBonusController.prototype.refreshDailyBonus = function () {
            return this.carrotDailyBonusView.refreshDailyBonus();
        };

        return CarrotDailyBonusController;

    })();

    cc.CarrotDailyBonusController = CarrotDailyBonusController;

}).call(this);

