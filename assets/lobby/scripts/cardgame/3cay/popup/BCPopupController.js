(function () {
    var BCPopupController;

    BCPopupController = (function () {
        var instance;

        function BCPopupController() {
        }

        instance = void 0;

        BCPopupController.getInstance = function () {
            if (instance === void 0) {
                instance = this;
            }
            return instance.prototype;
        };

        BCPopupController.prototype.setBCPopupView = function (BCPopupView) {
            return this.BCPopupView = BCPopupView;
        };
        BCPopupController.prototype.getBCPopupView = function () {
            return this.BCPopupView;
        };

        BCPopupController.prototype.createHelpView = function () {
            return this.BCPopupView.createHelpView();
        };

        BCPopupController.prototype.destroyHelpView = function () {
            return this.BCPopupView.destroyHelpView();
        };
        BCPopupController.prototype.openPopupAsk = function () {
            return this.BCPopupView.onOpenPopup();
        };

        BCPopupController.prototype.onClosePopupAsk = function () {
            return this.BCPopupView.onClosePopup();
        };
        BCPopupController.prototype.onShowSellOwner = function () {
            return this.BCPopupView.onShowSellOwner();
        };

        BCPopupController.prototype.onShowBuyOwner = function (nickName, time) {
            return this.BCPopupView.onShowBuyOwner(nickName, time);
        };

        BCPopupController.prototype.showBuyResult = function (message) {
            return this.BCPopupView.showBuyResult(message);
        };

        return BCPopupController;

    })();

    cc.BCPopupController = BCPopupController;

}).call(this);
