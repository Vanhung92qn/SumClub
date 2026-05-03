/**
 * Created by Nofear on 3/14/2019.
 */

(function () {
    var TopupController;

    TopupController = (function () {
        var instance;

        function TopupController() {
        }

        instance = void 0;

        TopupController.getInstance = function () {
            if (instance === void 0) {
                instance = this;
            }
            return instance.prototype;
        };

        TopupController.prototype.setTopupView = function (topupView) {
            return this.topupView = topupView;
        };

        TopupController.prototype.resetScale = function () {
            return this.topupView.resetScale();
        };

        TopupController.prototype.restoreScale = function () {
            return this.topupView.restoreScale();
        };

        TopupController.prototype.refreshListCard = function () {
            return this.topupView.refreshListCard();
        };

        return TopupController;

    })();

    cc.TopupController = TopupController;

}).call(this);

