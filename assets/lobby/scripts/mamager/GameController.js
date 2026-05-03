/**
 * Created by Nofear on 6/21/2017.
 */

(function () {
    var GameController;

    GameController = (function () {
        var instance;

        function GameController() {

        }

        instance = void 0;

        GameController.getInstance = function () {
            if (instance === void 0) {
                instance = this;
            }
            return instance.prototype;
        };

        GameController.prototype.setGameView = function (gameView) {
            return this.gameView = gameView;
        };

        GameController.prototype.portalNegotiate = function () {
            return this.gameView.portalNegotiate();
        };

        return GameController;

    })();

    cc.GameController = GameController;

}).call(this);

