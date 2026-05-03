
(function () {
    var PKPopupController;

    PKPopupController = (function () {
        var instance;

        function PKPopupController() {
        }

        instance = void 0;

        PKPopupController.getInstance = function () {
            if (instance === void 0) {
                instance = this;
            }
            return instance.prototype;
        };

        PKPopupController.prototype.setPKPopupView = function (pkPopupView) {
            return this.pkPopupView = pkPopupView;
        };

        PKPopupController.prototype.createHelpView = function () {
            return this.pkPopupView.createHelpView();
        };

        PKPopupController.prototype.destroyHelpView = function () {
            return this.pkPopupView.destroyHelpView();
        };

        PKPopupController.prototype.createHelpHandView = function () {
            return this.pkPopupView.createHelpHandView();
        };

        PKPopupController.prototype.destroyHelpHandView = function () {
            return this.pkPopupView.destroyHelpHandView();
        };


        return PKPopupController;

    })();

    cc.PKPopupController = PKPopupController;

}).call(this);
