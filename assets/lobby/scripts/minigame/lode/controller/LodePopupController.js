(function () {
    var LodePopupController;

    LodePopupController = (function () {
        var instance;

        function LodePopupController() {

        }

        instance = void 0;

        LodePopupController.getInstance = function () {
            if (instance === void 0) {
                instance = this;
            }
            return instance.prototype;
        };

        LodePopupController.prototype.setPopupView = function (popupView) {
            return this.lodePopupView = popupView;
        };

        LodePopupController.prototype.createTopView = function () {
            return this.lodePopupView.createTopView();
        };

        LodePopupController.prototype.destroyTopView = function () {
            return this.lodePopupView.destroyTopView();
        };

        LodePopupController.prototype.createHelpView = function () {
            return this.lodePopupView.createHelpView();
        };

        LodePopupController.prototype.destroyHelpView = function () {
            return this.lodePopupView.destroyHelpView();
        };

        LodePopupController.prototype.createHistoryView = function () {
            return this.lodePopupView.createHistoryView();
        };

        LodePopupController.prototype.destroyHistoryView = function () {
            return this.lodePopupView.destroyHistoryView();
        };

        LodePopupController.prototype.createChooseView = function () {
            return this.chooseView =  this.lodePopupView.createChooseView();
        };

        LodePopupController.prototype.destroyChooseView = function () {
            return this.lodePopupView.destroyChooseView();
        };
        LodePopupController.prototype.onOpenChooseNumber = function(type) {
            return this.chooseView.onOpenChooseNumber(type);
        };

        LodePopupController.prototype.setTopView = function (view) {
            return this.topView = view;
        };
        LodePopupController.prototype.getTopOnOpenDate = function (openDate, strDateUI) {
            return this.topView.getTopOnOpenDate(openDate, strDateUI);
        };
        return LodePopupController;

    })();

    cc.LodePopupController = LodePopupController;

}).call(this);
