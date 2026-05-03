
(function () {
    var TQPopupController;

    TQPopupController = (function () {
        var instance;

        function TQPopupController() {
        }

        instance = void 0;

        TQPopupController.getInstance = function () {
            if (instance === void 0) {
                instance = this;
            }
            return instance.prototype;
        };

        TQPopupController.prototype.setTQPopupView = function (tqPopupView) {
            return this.tqPopupView = tqPopupView;
        };

        TQPopupController.prototype.createSessionDetailView = function () {
            this.tqPopupView.createSessionDetailView();
        };

        TQPopupController.prototype.createTopView = function () {
            this.tqPopupView.createTopView();
        };

        TQPopupController.prototype.createBetLinesView = function () {
            this.tqPopupView.createBetLinesView();
        };

        TQPopupController.prototype.createTopView = function () {
            this.tqPopupView.createTopView();
        };

        TQPopupController.prototype.createHistoryView = function () {
            this.tqPopupView.createHistoryView();
        };

        TQPopupController.prototype.createHelpView = function () {
            this.tqPopupView.createHelpView();
        };

        TQPopupController.prototype.destroySessionDetailView = function () {
            this.tqPopupView.destroySessionDetailView();
        };

        TQPopupController.prototype.destroyBetLinesView = function () {
            this.tqPopupView.destroyBetLinesView();
        };

        TQPopupController.prototype.destroyTopView = function () {
            this.tqPopupView.destroyTopView();
        };

        TQPopupController.prototype.destroyHistoryView = function () {
            this.tqPopupView.destroyHistoryView();
        };

        TQPopupController.prototype.destroyHelpView = function () {
            this.tqPopupView.destroyHelpView();
        };

        return TQPopupController;

    })();

    cc.TQPopupController = TQPopupController;

}).call(this);
