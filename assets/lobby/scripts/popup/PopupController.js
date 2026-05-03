/**
 * Created by Nofear on 6/21/2017.
 */

(function () {
    var PopupController;

    PopupController = (function () {
        var instance;

        function PopupController() {
        }

        instance = void 0;

        PopupController.getInstance = function () {
            if (instance === void 0) {
                instance = this;
            }
            return instance.prototype;
        };

        PopupController.prototype.setPopupView = function (popupView) {
            return this.popupView = popupView;
        };

        PopupController.prototype.setPopupSlotsView = function (popupSlotsView) {
            return this.popupSlotsView = popupSlotsView;
        };

        PopupController.prototype.showSlotsMessage = function (message) {
            return this.popupSlotsView.showSlotsMessage(message);
        };

        PopupController.prototype.showSlotsWin = function (message) {
            return this.popupSlotsView.showSlotsWin(message);
        };

        PopupController.prototype.init = function () {
            return this.popupView.init();
        };

        PopupController.prototype.init = function () {
            return this.popupView.init();
        };

        PopupController.prototype.showBusy = function () {
            return this.popupView.showBusy();
        };

        PopupController.prototype.hideBusy = function () {
            return this.popupView.hideBusy();
        };

        PopupController.prototype.isShowPopup = function () {
            return this.popupView.isShowPopup();
        };

        PopupController.prototype.getOTPPopup = function () {
            return this.popupView.getOTPPopup();
        };

        PopupController.prototype.showMessage = function (message, code) {
            return this.popupView.showMessage(message, code);
        };

        PopupController.prototype.showMessageError = function (message, code) {
            return this.popupView.showMessageError(message, code);
        };

        PopupController.prototype.showPopupOTP = function (content, titleButtonBlue, clickEventHandlerBlue) {
            return this.popupView.showPopupOTP(content, titleButtonBlue, clickEventHandlerBlue);
        };

        PopupController.prototype.showPopup = function (content, titleButtonRed, titleButtonBlue, clickEventHandlerRed, clickEventHandlerBlue) {
            return this.popupView.showPopup(content, titleButtonRed, titleButtonBlue, clickEventHandlerRed, clickEventHandlerBlue);
        };

        PopupController.prototype.showPopupSimple = function (content, titleButton, clickEventHandler) {
            return this.popupView.showPopupSimple(content, titleButton, clickEventHandler);
        };

        PopupController.prototype.showPopupLostConnection = function () {
            return this.popupView.showPopupLostConnection();
        };

        PopupController.prototype.showPopupRequireLogin = function (message) {
            return this.popupView.showPopupRequireLogin(message);
        };

        PopupController.prototype.showPopupOtherDevice = function (message, gameId) {
            return this.popupView.showPopupOtherDevice(message, gameId);
        };

        PopupController.prototype.showMiniMessage = function (message) {
            return this.popupView.showMiniMessage(message);
        };

        PopupController.prototype.showPopupRequireEnableLocation = function () {
            return this.popupView.showPopupRequireEnableLocation();
        };

        PopupController.prototype.closePopupRequireEnableLocation = function () {
            return this.popupView.closePopupRequireEnableLocation();
        };

        PopupController.prototype.isShowPopupRequireEnableLocation = function () {
            return this.popupView.isShowPopupRequireEnableLocation();
        };


        PopupController.prototype.closePopup = function () {
            return this.popupView.closePopup();
        };


        return PopupController;

    })();

    cc.PopupController = PopupController;

}).call(this);

