/**
 * Created by Nofear on 6/21/2017.
 */

(function () {
    var TaiXiuMainController;

    TaiXiuMainController = (function () {
        var instance;

        function TaiXiuMainController() {

        }

        instance = void 0;

        TaiXiuMainController.getInstance = function () {
            if (instance === void 0) {
                instance = this;
            }
            return instance.prototype;
        };

        TaiXiuMainController.prototype.setTaiXiuMainView = function (taiXiuMainView) {
            return this.taiXiuMainView = taiXiuMainView;
        };

        TaiXiuMainController.prototype.createGraphView = function () {
            return this.taiXiuMainView.createGraphView();
        };

        TaiXiuMainController.prototype.destroyGraphView = function () {
            return this.taiXiuMainView.destroyGraphView();
        };

        TaiXiuMainController.prototype.createSessionDetailView = function () {
            return this.taiXiuMainView.createSessionDetailView();
        };

        TaiXiuMainController.prototype.destroySessionDetailView = function () {
            return this.taiXiuMainView.destroySessionDetailView();
        };

        TaiXiuMainController.prototype.createTopView = function () {
            return this.taiXiuMainView.createTopView();
        };

        TaiXiuMainController.prototype.destroyTopView = function () {
            return this.taiXiuMainView.destroyTopView();
        };

        TaiXiuMainController.prototype.createHelpView = function () {
            return this.taiXiuMainView.createHelpView();
        };

        TaiXiuMainController.prototype.destroyHelpView = function () {
            return this.taiXiuMainView.destroyHelpView();
        };

        TaiXiuMainController.prototype.createHistoryView = function () {
            return this.taiXiuMainView.createHistoryView();
        };

        TaiXiuMainController.prototype.destroyHistoryView = function () {
            return this.taiXiuMainView.destroyHistoryView();
        };
        TaiXiuMainController.prototype.createJackpotHistoryView = function () {
            return this.taiXiuMainView.createJackpotHistoryView();
        };

        TaiXiuMainController.prototype.destroyJackpotHistoryView = function () {
            return this.taiXiuMainView.destroyJackpotHistoryView();
        };
        return TaiXiuMainController;

    })();

    cc.TaiXiuMainController = TaiXiuMainController;

}).call(this);

