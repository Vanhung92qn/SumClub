/**
 * Created by Nofear on 6/21/2017.
 */

(function () {
    var X2GameController;

    X2GameController = (function () {
        var instance;

        function X2GameController() {

        }

        instance = void 0;

        X2GameController.getInstance = function () {
            if (instance === void 0) {
                instance = this;
            }
            return instance.prototype;
        };

        X2GameController.prototype.setX2GameView = function (x2GameView) {
            return this.x2GameView = x2GameView;
        };

        X2GameController.prototype.onResultX2Game = function (data) {
            return this.x2GameView.onResultX2Game(data);
        };

        X2GameController.prototype.getBaseValue = function () {
            return this.baseValue;
        };

        X2GameController.prototype.setBaseValue = function (baseValue) {
            return this.baseValue = baseValue;
        };

        X2GameController.prototype.setX2GameData = function (data) {
            return this.x2GameData = data;
        };

        X2GameController.prototype.getX2GameData = function () {
            return this.x2GameData;
        };

        return X2GameController;

    })();

    cc.X2GameController = X2GameController;

}).call(this);

