/**
 * Created by Nofear on 3/14/2019.
 */

(function () {
    var TopController;

    TopController = (function () {
        var instance;

        function TopController() {
        }

        instance = void 0;

        TopController.getInstance = function () {
            if (instance === void 0) {
                instance = this;
            }
            return instance.prototype;
        };

        TopController.prototype.setTopView = function (topView) {
            return this.topView = topView;
        };

        TopController.prototype.setTopJackpotIconView = function (topJackpotIconView) {
            return this.topJackpotIconView = topJackpotIconView;
        };

        TopController.prototype.getIcon = function (gameId) {
            return this.topJackpotIconView.getIcon(gameId);
        };

        return TopController;

    })();

    cc.TopController = TopController;

}).call(this);

