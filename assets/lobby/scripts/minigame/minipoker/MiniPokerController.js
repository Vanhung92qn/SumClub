/**
 * Created by Nofear on 6/21/2017.
 */

(function () {
    var MiniPokerController;

    MiniPokerController = (function () {
        var instance;

        function MiniPokerController() {

        }

        instance = void 0;

        MiniPokerController.getInstance = function () {
            if (instance === void 0) {
                instance = this;
            }
            return instance.prototype;
        };

        MiniPokerController.prototype.setMiniPokerView = function (miniPokerView) {
            return this.miniPokerView = miniPokerView;
        };

        MiniPokerController.prototype.setMiniPokerButtonView = function (miniPokerButtonView) {
            return this.miniPokerButtonView = miniPokerButtonView;
        };

        MiniPokerController.prototype.setMiniPokerPopupView = function (miniPokerPopupView) {
            return this.miniPokerPopupView = miniPokerPopupView;
        };

        MiniPokerController.prototype.sendRequestOnHub = function (method, data1, data2) {
            this.miniPokerView.sendRequestOnHub(method, data1, data2);
        };

        MiniPokerController.prototype.getMode = function () {
            return this.miniPokerButtonView.getMode();
        };

        MiniPokerController.prototype.getRoomId = function () {
            return this.miniPokerButtonView.getRoomId();
        };

        MiniPokerController.prototype.getFastSpin = function () {
            return this.miniPokerButtonView.getFastSpin();
        };

        MiniPokerController.prototype.activateAllButton = function (enable) {
            this.miniPokerButtonView.activateAllButton(enable);
        };

        MiniPokerController.prototype.activateButton = function (enable) {
            this.miniPokerButtonView.activateButton(enable);
        };

        MiniPokerController.prototype.activateButtonX = function (enable) {
            this.miniPokerButtonView.activateButtonX(enable);
        };

        MiniPokerController.prototype.setMode = function (mode) {
            this.miniPokerButtonView.setMode(mode);
        };

        MiniPokerController.prototype.stopAutoSpin = function () {
            this.miniPokerButtonView.stopAutoSpin();
        };

        MiniPokerController.prototype.startSpin = function () {
            this.miniPokerButtonView.startSpin();
        };

        MiniPokerController.prototype.createTopView = function () {
            this.miniPokerPopupView.createTopView();
        };

        MiniPokerController.prototype.createHistoryView = function () {
            this.miniPokerPopupView.createHistoryView();
        };

        MiniPokerController.prototype.createHelpView = function () {
            this.miniPokerPopupView.createHelpView();
        };

        MiniPokerController.prototype.destroyTopView = function () {
            this.miniPokerPopupView.destroyTopView();
        };

        MiniPokerController.prototype.destroyHistoryView = function () {
            this.miniPokerPopupView.destroyHistoryView();
        };

        MiniPokerController.prototype.destroyHelpView = function () {
            this.miniPokerPopupView.destroyHelpView();
        };

        MiniPokerController.prototype.reset = function () {

        };

        MiniPokerController.prototype.onScale = function () {
            this.miniPokerView.onScale();
        };

        return MiniPokerController;

    })();

    cc.MiniPokerController = MiniPokerController;

}).call(this);

