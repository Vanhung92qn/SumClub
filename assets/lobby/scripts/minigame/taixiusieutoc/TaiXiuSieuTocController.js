/**
 * Created by Nofear on 6/21/2017.
 */

(function () {
    var TaiXiuSieuTocController;

    TaiXiuSieuTocController = (function () {
        var instance;

        function TaiXiuSieuTocController() {

        }

        instance = void 0;

        TaiXiuSieuTocController.getInstance = function () {
            if (instance === void 0) {
                instance = this;
            }
            return instance.prototype;
        };

        
        TaiXiuSieuTocController.prototype.setTaiXiuSieuTocPortalView = function (taiXiuPortalView) {
            return this.taiXiuPortalView = taiXiuPortalView;
        };

        TaiXiuSieuTocController.prototype.setTaiXiuSieuTocView = function (taiXiuView) {
            return this.taiXiuView = taiXiuView;
        };

        TaiXiuSieuTocController.prototype.setTaiXiuSieuTocInfoView = function (taiXiuInfoView) {
            return this.taiXiuInfoView = taiXiuInfoView;
        };

        TaiXiuSieuTocController.prototype.setTaiXiuSieuTocResultView = function (taiXiuResultView) {
            return this.taiXiuResultView = taiXiuResultView;
        };

        TaiXiuSieuTocController.prototype.setTaiXiuSieuTocResultEffectView = function (taiXiuResultEffectView) {
            return this.taiXiuResultEffectView = taiXiuResultEffectView;
        };

        TaiXiuSieuTocController.prototype.setTaiXiuSieuTocInputBetView = function (taiXiuInputBetView) {
            return this.taiXiuInputBetView = taiXiuInputBetView;
        };

        TaiXiuSieuTocController.prototype.setTaiXiuSieuTocButtonView = function (taiXiuButtonView) {
            return this.taiXiuButtonView = taiXiuButtonView;
        };

        TaiXiuSieuTocController.prototype.setTaiXiuSieuTocBetView = function (taiXiuBetView) {
            return this.taiXiuBetView = taiXiuBetView;
        };

        TaiXiuSieuTocController.prototype.setTaiXiuSieuTocSessionHistoryView = function (taiXiuSessionHistoryView) {
            return this.taiXiuSessionHistoryView = taiXiuSessionHistoryView;
        };

        TaiXiuSieuTocController.prototype.setTaiXiuSieuTocEventView = function (taiXiuEventView) {
            return this.taiXiuEventView = taiXiuEventView;
        };

        TaiXiuSieuTocController.prototype.setIsOpen = function (isOpen) {
            return this.isOpen = isOpen;
        };

        TaiXiuSieuTocController.prototype.getIsOpen = function () {
            return this.isOpen;
        };

        TaiXiuSieuTocController.prototype.setSID = function (sID) {
            return this.sID = sID;
        };

        TaiXiuSieuTocController.prototype.getSID = function () {
            return this.sID;
        };

        //set ket qua Summon Dragon Event
        TaiXiuSieuTocController.prototype.setEventWinnerResult = function (eventWinnerResult) {
            return this.eventWinnerResult = eventWinnerResult;
        };

        TaiXiuSieuTocController.prototype.getEventWinnerResult = function () {
            return this.eventWinnerResult;
        };

        TaiXiuSieuTocController.prototype.openEndDiaNanView = function () {
            if (this.taiXiuResultView)
                return this.taiXiuResultView.openEndDiaNan();
        };

        //RESET
        TaiXiuSieuTocController.prototype.reset = function () {
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

        TaiXiuSieuTocController.prototype.resetBetAndResultInfo = function () {
            if (this.taiXiuResultEffectView)
                this.taiXiuResultEffectView.reset();

            if (this.taiXiuResultView)
                this.taiXiuResultView.reset();

            if (this.taiXiuBetView)
                this.taiXiuBetView.reset();

            if (this.taiXiuInputBetView)
                this.taiXiuInputBetView.reset();
        };

        TaiXiuSieuTocController.prototype.resetBetInfo = function () {
            if (this.taiXiuBetView)
                this.taiXiuBetView.reset();

            if (this.taiXiuInputBetView)
                this.taiXiuInputBetView.reset();
        };
        //EVENT VIEW
        TaiXiuSieuTocController.prototype.clickUIEventPH = function () {
            if (this.taiXiuEventView)
                return this.taiXiuEventView.clickUIEventPH();
        };

        TaiXiuSieuTocController.prototype.activeEventPH = function (enable) {
            if (this.taiXiuEventView)
                return this.taiXiuEventView.activeEventPH(enable);
        };

        TaiXiuSieuTocController.prototype.setUserCord = function (cordWin, cordLost) {
            if (this.taiXiuEventView)
                return this.taiXiuEventView.setUserCord(cordWin, cordLost);
        };


        //PORTAL VIEW
        //ket noi luc dau chua login
        TaiXiuSieuTocController.prototype.connectHubTx = function () {
            if (this.taiXiuPortalView)
                return this.taiXiuPortalView.connectHubTx();
        };

        //ket noi sau khi da Login
        TaiXiuSieuTocController.prototype.connectHubTxAuthorize = function () {
            if (this.taiXiuPortalView)
                return this.taiXiuPortalView.connectHubTxAuthorize();
        };

        TaiXiuSieuTocController.prototype.disconnectAndLogout = function () {
            if (this.taiXiuPortalView)
                return this.taiXiuPortalView.disconnectAndLogout();
        };

        TaiXiuSieuTocController.prototype.sendRequestOnHub = function (method, data1, data2) {
            if (this.taiXiuPortalView)
                return this.taiXiuPortalView.sendRequestOnHub(method, data1, data2);
        };

        //INFO VIEW
        TaiXiuSieuTocController.prototype.updateInfoView = function (sessionInfo) {
            if (this.taiXiuInfoView)
                return this.taiXiuInfoView.updateInfo(sessionInfo);
        };

        TaiXiuSieuTocController.prototype.updateTimerInfoView = function (time) {
            if (this.taiXiuInfoView)
                return this.taiXiuInfoView.updateTimerInfo(time);
        };

        //SESSION HISTORY VIEW
        TaiXiuSieuTocController.prototype.updateSessionHistory = function (gameHistory) {
            if (this.taiXiuSessionHistoryView)
            return this.taiXiuSessionHistoryView.updateSessionHistory(gameHistory);
        };

        //BUTTON VIEW
        TaiXiuSieuTocController.prototype.lightOnEvent = function () {
            if (this.taiXiuButtonView)
            return this.taiXiuButtonView.lightOnEvent();
        };

        //RESULT EFFECT VIEW
        TaiXiuSieuTocController.prototype.playEffectWin = function (amount) {
            if (this.taiXiuResultEffectView)
            return this.taiXiuResultEffectView.playEffectWin(amount);
        };

        //BET VIEW
        TaiXiuSieuTocController.prototype.updateBetInfoView = function (betInfo) {
            if (this.taiXiuBetView)
                return this.taiXiuBetView.updateBetInfo(betInfo);
        };

        TaiXiuSieuTocController.prototype.getBetSide = function () {
            if (this.taiXiuBetView)
                return this.taiXiuBetView.getBetSide();
        };

        //TAI XIU VIEW
        TaiXiuSieuTocController.prototype.resetPositionTX = function () {
            if (this.taiXiuView)
                return this.taiXiuView.resetPositionTX();
        };

        //RESULT VIEW
        TaiXiuSieuTocController.prototype.getIsBowl = function () {
            if (this.taiXiuResultView)
                return this.taiXiuResultView.getIsBowl();
        };

        TaiXiuSieuTocController.prototype.diceAnimFinish = function () {
            if (this.taiXiuResultView)
            return this.taiXiuResultView.diceAnimFinish();
        };

        TaiXiuSieuTocController.prototype.updateResultView = function (sessionInfo) {
            if (this.taiXiuResultView)
                return this.taiXiuResultView.updateResult(sessionInfo);
        };


        //PROPERTY
        TaiXiuSieuTocController.prototype.setIsNan = function (isNan) {
            return this.isNan = isNan;
        };

        TaiXiuSieuTocController.prototype.getIsNan = function () {
            return this.isNan;
        };

        TaiXiuSieuTocController.prototype.getSessionId = function () {
            return this.sessionId;
        };

        TaiXiuSieuTocController.prototype.setDetailIndex= function (detailIndex) {
            return this.detailIndex = detailIndex;
        };

        TaiXiuSieuTocController.prototype.getDetailIndex = function () {
            return this.detailIndex;
        };

        TaiXiuSieuTocController.prototype.setGameHistory = function (gameHistory) {
            return this.gameHistory = gameHistory;
        };

        TaiXiuSieuTocController.prototype.getGameHistory = function () {
            return this.gameHistory;
        };

        return TaiXiuSieuTocController;

    })();

    cc.TaiXiuSieuTocController = TaiXiuSieuTocController;

}).call(this);

