/**
 * Created by Nofear on 6/21/2017.
 */

(function () {
    var AccumulationController;

    AccumulationController = (function () {
        var instance;

        function AccumulationController() {

        }

        instance = void 0;

        AccumulationController.getInstance = function () {
            if (instance === void 0) {
                instance = this;
            }
            return instance.prototype;
        };

        AccumulationController.prototype.setAccumulationView = function (accumulationView) {
            return this.accumulationView = accumulationView;
        };

        AccumulationController.prototype.setAccumulation = function (value, isPointFree) {
            return this.accumulationView.setAccumulation(value, isPointFree);
        };

        AccumulationController.prototype.createPower = function (indexItem) {
            return this.accumulationView.createPower(indexItem);
        };

        AccumulationController.prototype.putPowerToPool = function (nodePower) {
            return this.accumulationView.putPowerToPool(nodePower);
        };

        AccumulationController.prototype.clearPowerPool = function () {
            if (this.accumulationView)
                return this.accumulationView.clearPowerPool();
        };

        return AccumulationController;

    })();

    cc.AccumulationController = AccumulationController;

}).call(this);

