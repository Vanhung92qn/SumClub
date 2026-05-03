/**
 * Created by Nofear on 6/21/2017.
 */

(function () {
    var TaiXiuController;

    TaiXiuController = (function () {
        var instance;

        function TaiXiuController() {

        }

        instance = void 0;

        TaiXiuController.getInstance = function () {
            if (instance === void 0) {
                instance = this;
            }
            return instance.prototype;
        };

        
        TaiXiuController.prototype.setTaiXiuPortalView = function (taiXiuPortalView) {
            return this.taiXiuPortalView = taiXiuPortalView;
        };

        TaiXiuController.prototype.setTaiXiuView = function (taiXiuView) {
            return this.taiXiuView = taiXiuView;
        };

        TaiXiuController.prototype.setTaiXiuInfoView = function (taiXiuInfoView) {
            return this.taiXiuInfoView = taiXiuInfoView;
        };

        TaiXiuController.prototype.setTaiXiuResultView = function (taiXiuResultView) {
            return this.taiXiuResultView = taiXiuResultView;
        };

        TaiXiuController.prototype.setTaiXiuResultEffectView = function (taiXiuResultEffectView) {
            return this.taiXiuResultEffectView = taiXiuResultEffectView;
        };

        TaiXiuController.prototype.setTaiXiuInputBetView = function (taiXiuInputBetView) {
            return this.taiXiuInputBetView = taiXiuInputBetView;
        };

        TaiXiuController.prototype.setTaiXiuButtonView = function (taiXiuButtonView) {
            return this.taiXiuButtonView = taiXiuButtonView;
        };

        TaiXiuController.prototype.setTaiXiuBetView = function (taiXiuBetView) {
            return this.taiXiuBetView = taiXiuBetView;
        };

        TaiXiuController.prototype.setTaiXiuSessionHistoryView = function (taiXiuSessionHistoryView) {
            return this.taiXiuSessionHistoryView = taiXiuSessionHistoryView;
        };

        TaiXiuController.prototype.setTaiXiuEventView = function (taiXiuEventView) {
            return this.taiXiuEventView = taiXiuEventView;
        };

        TaiXiuController.prototype.setIsOpen = function (isOpen) {
            return this.isOpen = isOpen;
        };

        TaiXiuController.prototype.getIsOpen = function () {
            return this.isOpen;
        };

        TaiXiuController.prototype.setSID = function (sID) {
            return this.sID = sID;
        };

        TaiXiuController.prototype.getSID = function () {
            return this.sID;
        };

        //set ket qua Summon Dragon Event
        TaiXiuController.prototype.setEventWinnerResult = function (eventWinnerResult) {
            return this.eventWinnerResult = eventWinnerResult;
        };

        TaiXiuController.prototype.getEventWinnerResult = function () {
            return this.eventWinnerResult;
        };

        TaiXiuController.prototype.openEndDiaNanView = function () {
            if (this.taiXiuResultView)
                return this.taiXiuResultView.openEndDiaNan();
        };

        //RESET
        TaiXiuController.prototype.reset = function () {
            if (this.taiXiuPortalView)
                this.taiXiuPortalView.reset();

            if (this.taiXiuInfoView)
                this.taiXiuInfoView.reset();

            if (this.taiXiuResultView)
                this.taiXiuResultView.reset();

            if (this.taiXiuBetView)
                this.taiXiuBetView.reset();

            if (this.taiXiuInputBetView)
                this.taiXiuInputBetView.reset();

            if (this.taiXiuResultEffectView)
                this.taiXiuResultEffectView.reset();
        };

        TaiXiuController.prototype.resetBetAndResultInfo = function () {
            if (this.taiXiuResultEffectView)
                this.taiXiuResultEffectView.reset();

            if (this.taiXiuResultView)
                this.taiXiuResultView.reset();

            if (this.taiXiuBetView)
                this.taiXiuBetView.reset();

            if (this.taiXiuInputBetView)
                this.taiXiuInputBetView.reset();
        };

        TaiXiuController.prototype.resetBetInfo = function () {
            if (this.taiXiuBetView)
                this.taiXiuBetView.reset();

            if (this.taiXiuInputBetView)
                this.taiXiuInputBetView.reset();
        };
        //EVENT VIEW
        TaiXiuController.prototype.clickUIEventPH = function () {
            if (this.taiXiuEventView)
                return this.taiXiuEventView.clickUIEventPH();
        };

        TaiXiuController.prototype.activeEventPH = function (enable) {
            if (this.taiXiuEventView)
                return this.taiXiuEventView.activeEventPH(enable);
        };

        TaiXiuController.prototype.setUserCord = function (cordWin, cordLost) {
            if (this.taiXiuEventView)
                return this.taiXiuEventView.setUserCord(cordWin, cordLost);
        };


        //PORTAL VIEW
        //ket noi luc dau chua login
        TaiXiuController.prototype.connectHubTx = function () {
            if (this.taiXiuPortalView)
                return this.taiXiuPortalView.connectHubTx();
        };

        //ket noi sau khi da Login
        TaiXiuController.prototype.connectHubTxAuthorize = function () {
            if (this.taiXiuPortalView)
                return this.taiXiuPortalView.connectHubTxAuthorize();
        };

        TaiXiuController.prototype.disconnectAndLogout = function () {
            if (this.taiXiuPortalView)
                return this.taiXiuPortalView.disconnectAndLogout();
        };

        TaiXiuController.prototype.sendRequestOnHub = function (method, data1, data2) {
            if (this.taiXiuPortalView)
                return this.taiXiuPortalView.sendRequestOnHub(method, data1, data2);
        };

        //INFO VIEW
        TaiXiuController.prototype.updateInfoView = function (sessionInfo) {
            if (this.taiXiuInfoView)
                return this.taiXiuInfoView.updateInfo(sessionInfo);
        };

        TaiXiuController.prototype.updateTimerInfoView = function (time) {
            if (this.taiXiuInfoView)
                return this.taiXiuInfoView.updateTimerInfo(time);
        };

        //SESSION HISTORY VIEW
        TaiXiuController.prototype.updateSessionHistory = function (gameHistory) {
            if (this.taiXiuSessionHistoryView)
            return this.taiXiuSessionHistoryView.updateSessionHistory(gameHistory);
        };

        //BUTTON VIEW
        TaiXiuController.prototype.lightOnEvent = function () {
            if (this.taiXiuButtonView)
            return this.taiXiuButtonView.lightOnEvent();
        };

        //RESULT EFFECT VIEW
        TaiXiuController.prototype.playEffectWin = function (amount) {
            if (this.taiXiuResultEffectView)
            return this.taiXiuResultEffectView.playEffectWin(amount);
        };

        //BET VIEW
        TaiXiuController.prototype.updateBetInfoView = function (betInfo) {
            if (this.taiXiuBetView)
                return this.taiXiuBetView.updateBetInfo(betInfo);
        };

        TaiXiuController.prototype.getBetSide = function () {
            if (this.taiXiuBetView)
                return this.taiXiuBetView.getBetSide();
        };

        //TAI XIU VIEW
        TaiXiuController.prototype.resetPositionTX = function () {
            if (this.taiXiuView)
                return this.taiXiuView.resetPositionTX();
        };

        //RESULT VIEW
        TaiXiuController.prototype.getIsBowl = function () {
            if (this.taiXiuResultView)
                return this.taiXiuResultView.getIsBowl();
        };

        TaiXiuController.prototype.diceAnimFinish = function () {
            if (this.taiXiuResultView)
            return this.taiXiuResultView.diceAnimFinish();
        };

        TaiXiuController.prototype.updateResultView = function (sessionInfo) {
            if (this.taiXiuResultView)
                return this.taiXiuResultView.updateResult(sessionInfo);
        };


        //PROPERTY
        TaiXiuController.prototype.setIsNan = function (isNan) {
            return this.isNan = isNan;
        };

        TaiXiuController.prototype.getIsNan = function () {
            return this.isNan;
        };

        TaiXiuController.prototype.getSessionId = function () {
            return this.sessionId;
        };

        TaiXiuController.prototype.setDetailIndex= function (detailIndex) {
            return this.detailIndex = detailIndex;
        };

        TaiXiuController.prototype.getDetailIndex = function () {
            return this.detailIndex;
        };

        TaiXiuController.prototype.setGameHistory = function (gameHistory) {
            return this.gameHistory = gameHistory;
        };

        TaiXiuController.prototype.getGameHistory = function () {
            return this.gameHistory;
        };

        return TaiXiuController;

    })();

    cc.TaiXiuController = TaiXiuController;

}).call(this);

