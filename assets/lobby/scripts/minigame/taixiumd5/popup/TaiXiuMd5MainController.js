/**
 * Created by Nofear on 6/21/2017.
 */

(function () {
    var TaiXiuMd5MainController;

    TaiXiuMd5MainController = (function () {
        var instance;

        function TaiXiuMd5MainController() {

        }

        instance = void 0;

        TaiXiuMd5MainController.getInstance = function () {
            if (instance === void 0) {
                instance = this;
            }
            return instance.prototype;
        };

        TaiXiuMd5MainController.prototype.setTaiXiuMd5MainView = function (TaiXiuMd5MainView) {
            return this.TaiXiuMd5MainView = TaiXiuMd5MainView;
        };

        TaiXiuMd5MainController.prototype.createGraphView = function () {
            return this.TaiXiuMd5MainView.createGraphView();
        };

        TaiXiuMd5MainController.prototype.destroyGraphView = function () {
            return this.TaiXiuMd5MainView.destroyGraphView();
        };

        TaiXiuMd5MainController.prototype.createSessionDetailView = function () {
            return this.TaiXiuMd5MainView.createSessionDetailView();
        };

        TaiXiuMd5MainController.prototype.destroySessionDetailView = function () {
            return this.TaiXiuMd5MainView.destroySessionDetailView();
        };

        TaiXiuMd5MainController.prototype.createTopView = function () {
            return this.TaiXiuMd5MainView.createTopView();
        };

        TaiXiuMd5MainController.prototype.destroyTopView = function () {
            return this.TaiXiuMd5MainView.destroyTopView();
        };

        TaiXiuMd5MainController.prototype.createHelpView = function () {
            return this.TaiXiuMd5MainView.createHelpView();
        };

        TaiXiuMd5MainController.prototype.destroyHelpView = function () {
            return this.TaiXiuMd5MainView.destroyHelpView();
        };
		
        TaiXiuMd5MainController.prototype.createRuleView = function () {
            return this.TaiXiuMd5MainView.createRuleView();
        };

        TaiXiuMd5MainController.prototype.destroyRuleView = function () {
            return this.TaiXiuMd5MainView.destroyRuleView();
        };

        TaiXiuMd5MainController.prototype.createHistoryView = function () {
            return this.TaiXiuMd5MainView.createHistoryView();
        };

        TaiXiuMd5MainController.prototype.destroyHistoryView = function () {
            return this.TaiXiuMd5MainView.destroyHistoryView();
        };
		
        TaiXiuMd5MainController.prototype.createJackpotHistoryView = function () {
            return this.TaiXiuMd5MainView.createJackpotHistoryView();
        };

        TaiXiuMd5MainController.prototype.destroyJackpotHistoryView = function () {
            return this.TaiXiuMd5MainView.destroyJackpotHistoryView();
        };
        return TaiXiuMd5MainController;

    })();

    cc.TaiXiuMd5MainController = TaiXiuMd5MainController;

}).call(this);

