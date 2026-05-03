
(function () {
    var XXPopupController;

    XXPopupController = (function () {
        var instance;

        function XXPopupController() {
        }

        instance = void 0;

        XXPopupController.getInstance = function () {
            if (instance === void 0) {
                instance = this;
            }
            return instance.prototype;
        };

        XXPopupController.prototype.setXXPopupView = function (xxPopupView) {
            return this.xxPopupView = xxPopupView;
        };

        XXPopupController.prototype.createSessionDetailView = function () {
            return this.xxPopupView.createSessionDetailView();
        };

        XXPopupController.prototype.destroySessionDetailView = function () {
            return this.xxPopupView.destroySessionDetailView();
        };

        XXPopupController.prototype.createTopView = function () {
            return this.xxPopupView.createTopView();
        };

        XXPopupController.prototype.destroyTopView = function () {
            return this.xxPopupView.destroyTopView();
        };

        XXPopupController.prototype.createHelpView = function () {
            return this.xxPopupView.createHelpView();
        };

        XXPopupController.prototype.destroyHelpView = function () {
            return this.xxPopupView.destroyHelpView();
        };

        XXPopupController.prototype.createHistoryView = function () {
            return this.xxPopupView.createHistoryView();
        };

        XXPopupController.prototype.destroyHistoryView = function () {
            return this.xxPopupView.destroyHistoryView();
        };

        XXPopupController.prototype.createGroupUserView = function () {
            return this.xxPopupView.createGroupUserView();
        };
        XXPopupController.prototype.destroyGroupUserView = function () {
            return this.xxPopupView.destroyGroupUserView();
        };

        //property
        XXPopupController.prototype.setDetailIndex = function (detailIndex) {
            return this.detailIndex = detailIndex;
        };

        XXPopupController.prototype.getDetailIndex = function () {
            return this.detailIndex;
        };


        XXPopupController.prototype.setGameHistory = function (gameHistory) {
            return this.gameHistory = gameHistory;
        };

        XXPopupController.prototype.getGameHistory = function () {
            return this.gameHistory;
        };

        return XXPopupController;

    })();

    cc.XXPopupController = XXPopupController;

}).call(this);
