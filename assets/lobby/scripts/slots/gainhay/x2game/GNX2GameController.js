/**
 * Created by Nofear on 6/21/2017.
 */

(function () {
    var GNX2GameController;

    GNX2GameController = (function () {
        var instance;

        function GNX2GameController() {

        }

        instance = void 0;

        GNX2GameController.getInstance = function () {
            if (instance === void 0) {
                instance = this;
            }
            return instance.prototype;
        };

        GNX2GameController.prototype.setX2GameView = function (x2GameView) {
            return this.x2GameView = x2GameView;
        };

        GNX2GameController.prototype.onResultX2Game = function (data) {
            return this.x2GameView.onResultX2Game(data);
        };

        GNX2GameController.prototype.getBaseValue = function () {
            return this.baseValue;
        };

        GNX2GameController.prototype.setBaseValue = function (baseValue) {
            return this.baseValue = baseValue;
        };

        GNX2GameController.prototype.setX2GameData = function (data) {
            return this.x2GameData = data;
        };

        GNX2GameController.prototype.getX2GameData = function () {
            return this.x2GameData;
        };

        return GNX2GameController;

    })();

    cc.GNX2GameController = GNX2GameController;

}).call(this);

