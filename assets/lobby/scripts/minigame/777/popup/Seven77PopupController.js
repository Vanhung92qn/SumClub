
(function () {
    var Seven77PopupController;

    Seven77PopupController = (function () {
        var instance;

        function Seven77PopupController() {
        }

        instance = void 0;

        Seven77PopupController.getInstance = function () {
            if (instance === void 0) {
                instance = this;
            }
            return instance.prototype;
        };

        Seven77PopupController.prototype.setSeven77PopupView = function (seven77PopupView) {
            return this.seven77PopupView = seven77PopupView;
        };

        Seven77PopupController.prototype.createSessionDetailView = function () {
            this.seven77PopupView.createSessionDetailView();
        };

        Seven77PopupController.prototype.createTopView = function () {
            this.seven77PopupView.createTopView();
        };

        Seven77PopupController.prototype.createBetLinesView = function () {
            this.seven77PopupView.createBetLinesView();
        };

        Seven77PopupController.prototype.createTopView = function () {
            this.seven77PopupView.createTopView();
        };

        Seven77PopupController.prototype.createHistoryView = function () {
            this.seven77PopupView.createHistoryView();
        };

        Seven77PopupController.prototype.createHelpView = function () {
            this.seven77PopupView.createHelpView();
        };

        Seven77PopupController.prototype.destroySessionDetailView = function () {
            this.seven77PopupView.destroySessionDetailView();
        };

        Seven77PopupController.prototype.destroyBetLinesView = function () {
            this.seven77PopupView.destroyBetLinesView();
        };

        Seven77PopupController.prototype.destroyTopView = function () {
            this.seven77PopupView.destroyTopView();
        };

        Seven77PopupController.prototype.destroyHistoryView = function () {
            this.seven77PopupView.destroyHistoryView();
        };

        Seven77PopupController.prototype.destroyHelpView = function () {
            this.seven77PopupView.destroyHelpView();
        };

        return Seven77PopupController;

    })();

    cc.Seven77PopupController = Seven77PopupController;

}).call(this);
