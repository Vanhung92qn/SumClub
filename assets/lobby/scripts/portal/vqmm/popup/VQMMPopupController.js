
(function () {
    var VQMMPopupController;

    VQMMPopupController = (function () {
        var instance;

        function VQMMPopupController() {
        }

        instance = void 0;

        VQMMPopupController.getInstance = function () {
            if (instance === void 0) {
                instance = this;
            }
            return instance.prototype;
        };

        VQMMPopupController.prototype.setVQMMPopupView = function (vqmmPopupView) {
            return this.vqmmPopupView = vqmmPopupView;
        };

        VQMMPopupController.prototype.createCaptchaView = function () {
            this.vqmmPopupView.createCaptchaView();
        };

        VQMMPopupController.prototype.createTopView = function () {
            this.vqmmPopupView.createTopView();
        };

        VQMMPopupController.prototype.createHistoryView = function () {
            this.vqmmPopupView.createHistoryView();
        };

        VQMMPopupController.prototype.createHelpView = function () {
            this.vqmmPopupView.createHelpView();
        };

        VQMMPopupController.prototype.destroyTopView = function () {
            this.vqmmPopupView.destroyTopView();
        };

        VQMMPopupController.prototype.destroyHistoryView = function () {
            this.vqmmPopupView.destroyHistoryView();
        };

        VQMMPopupController.prototype.destroyHelpView = function () {
            this.vqmmPopupView.destroyHelpView();
        };

        return VQMMPopupController;

    })();

    cc.VQMMPopupController = VQMMPopupController;

}).call(this);
