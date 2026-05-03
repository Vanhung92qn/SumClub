/**
 * Created by Nofear on 6/21/2017.
 */

(function () {
    var Seven77Controller;

    Seven77Controller = (function () {
        var instance;

        function Seven77Controller() {

        }

        instance = void 0;

        Seven77Controller.getInstance = function () {
            if (instance === void 0) {
                instance = this;
            }
            return instance.prototype;
        };

        Seven77Controller.prototype.setSeven77View = function (seven77View) {
            return this.seven77View = seven77View;
        };

        Seven77Controller.prototype.setSeven77ButtonView = function (seven77ButtonView) {
            return this.seven77ButtonView = seven77ButtonView;
        };

        Seven77Controller.prototype.sendRequestOnHub = function (method, data1, data2) {
            this.seven77View.sendRequestOnHub(method, data1, data2);
        };

        Seven77Controller.prototype.getRoomId = function () {
            return this.seven77ButtonView.getRoomId();
        };

        Seven77Controller.prototype.getBetValue = function () {
            return this.seven77ButtonView.getBetValue();
        };

        Seven77Controller.prototype.getFastSpin = function () {
            return this.seven77ButtonView.getFastSpin();
        };

        Seven77Controller.prototype.activateAllButton = function (enable) {
            this.seven77ButtonView.activateAllButton(enable);
        };

        Seven77Controller.prototype.activateButtonSelectLines = function (enable) {
            this.seven77ButtonView.activateButtonSelectLines(enable);
        };

        Seven77Controller.prototype.activateButton = function (enable) {
            this.seven77ButtonView.activateButton(enable);
        };

        Seven77Controller.prototype.stopAutoSpin = function () {
            this.seven77ButtonView.stopAutoSpin();
        };

        Seven77Controller.prototype.startSpin = function () {
            this.seven77ButtonView.startSpin();
        };

        Seven77Controller.prototype.reset = function () {

        };

        Seven77Controller.prototype.onScale = function () {
            this.seven77View.onScale();
        };

        return Seven77Controller;

    })();

    cc.Seven77Controller = Seven77Controller;

}).call(this);

