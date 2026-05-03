/**
 * Created by Nofear on 6/21/2017.
 */

(function () {
    var TQController;

    TQController = (function () {
        var instance;

        function TQController() {

        }

        instance = void 0;

        TQController.getInstance = function () {
            if (instance === void 0) {
                instance = this;
            }
            return instance.prototype;
        };

        TQController.prototype.setTQView = function (tqView) {
            return this.tqView = tqView;
        };

        TQController.prototype.setTQButtonView = function (tqButtonView) {
            return this.tqButtonView = tqButtonView;
        };

        TQController.prototype.sendRequestOnHub = function (method, data1, data2) {
            this.tqView.sendRequestOnHub(method, data1, data2);
        };

        TQController.prototype.getRoomId = function () {
            return this.tqButtonView.getRoomId();
        };

        TQController.prototype.getBetValue = function () {
            return this.tqButtonView.getBetValue();
        };

        TQController.prototype.getFastSpin = function () {
            return this.tqButtonView.getFastSpin();
        };

        TQController.prototype.activateAllButton = function (enable) {
            this.tqButtonView.activateAllButton(enable);
        };

        TQController.prototype.activateButton = function (enable) {
            this.tqButtonView.activateButton(enable);
        };

        TQController.prototype.stopAutoSpin = function () {
            this.tqButtonView.stopAutoSpin();
        };

        TQController.prototype.startSpin = function () {
            this.tqButtonView.startSpin();
        };

        TQController.prototype.reset = function () {

        };

        TQController.prototype.onScale = function () {
            this.tqView.onScale();
        };

        return TQController;

    })();

    cc.TQController = TQController;

}).call(this);

