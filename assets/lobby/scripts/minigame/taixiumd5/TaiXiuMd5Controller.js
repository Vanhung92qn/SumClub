/**
 * Created by Nofear on 6/21/2017.
 */

(function () {
    var TaiXiuMd5Controller;

    TaiXiuMd5Controller = (function () {
        var instance;

        function TaiXiuMd5Controller() {

        }

        instance = void 0;

        TaiXiuMd5Controller.getInstance = function () {
            if (instance === void 0) {
                instance = this;
            }
            return instance.prototype;
        };
        
        TaiXiuMd5Controller.prototype.setTaiXiuMd5PortalView = function (taiXiuMd5PortalView) {
            return this.taiXiuMd5PortalView = taiXiuMd5PortalView;
        };
		
        TaiXiuMd5Controller.prototype.setTaiXiuMd5View = function (taiXiuMd5View) {
            return this.taiXiuMd5View = taiXiuMd5View;
        };

        TaiXiuMd5Controller.prototype.setTaiXiuMd5InfoView = function (taiXiuMd5InfoView) {
            return this.taiXiuMd5InfoView = taiXiuMd5InfoView;
        };

        TaiXiuMd5Controller.prototype.setTaiXiuMd5ResultView = function (taiXiuMd5ResultView) {
            return this.taiXiuMd5ResultView = taiXiuMd5ResultView;
        };

        TaiXiuMd5Controller.prototype.setTaiXiuMd5ResultEffectView = function (taiXiuMd5ResultEffectView) {
            return this.taiXiuMd5ResultEffectView = taiXiuMd5ResultEffectView;
        };

        TaiXiuMd5Controller.prototype.setTaiXiuMd5InputBetView = function (taiXiuMd5InputBetView) {
            return this.taiXiuMd5InputBetView = taiXiuMd5InputBetView;
        };

        TaiXiuMd5Controller.prototype.setTaiXiuMd5ButtonView = function (taiXiuMd5ButtonView) {
            return this.taiXiuMd5ButtonView = taiXiuMd5ButtonView;
        };

        TaiXiuMd5Controller.prototype.setTaiXiuMd5BetView = function (taiXiuMd5BetView) {
            return this.taiXiuMd5BetView = taiXiuMd5BetView;
        };

        TaiXiuMd5Controller.prototype.setTaiXiuMd5SessionHistoryView = function (taiXiuMd5SessionHistoryView) {
            return this.taiXiuMd5SessionHistoryView = taiXiuMd5SessionHistoryView;
        };

        TaiXiuMd5Controller.prototype.setTaiXiuMd5EventView = function (taiXiuMd5EventView) {
            return this.taiXiuMd5EventView = taiXiuMd5EventView;
        };

        TaiXiuMd5Controller.prototype.setIsOpen = function (isOpen) {
            return this.isOpen = isOpen;
        };

        TaiXiuMd5Controller.prototype.getIsOpen = function () {
            return this.isOpen;
        };

        TaiXiuMd5Controller.prototype.setSID = function (sID) {
            return this.sID = sID;
        };

        TaiXiuMd5Controller.prototype.getSID = function () {
            return this.sID;
        };

        //set ket qua Summon Dragon Event
        TaiXiuMd5Controller.prototype.setEventWinnerResult = function (md5eventWinnerResult) {
            return this.md5eventWinnerResult = md5eventWinnerResult;
        };

        TaiXiuMd5Controller.prototype.getEventWinnerResult = function () {
            return this.md5eventWinnerResult;
        };

        TaiXiuMd5Controller.prototype.openEndDiaNanView = function () {
          if (this.taiXiuMd5ResultView)
           return this.taiXiuMd5ResultView.openEndDiaNan();
        };

        //RESET
        TaiXiuMd5Controller.prototype.reset = function () {
            if (this.taiXiuMd5PortalView)
                this.taiXiuMd5PortalView.reset();

            if (this.taiXiuMd5InfoView)
                this.taiXiuMd5InfoView.reset();

            if (this.taiXiuMd5ResultView)
                this.taiXiuMd5ResultView.reset();

            if (this.taiXiuMd5BetView)
                this.taiXiuMd5BetView.reset();

            if (this.taiXiuMd5InputBetView)
                this.taiXiuMd5InputBetView.reset();

            if (this.taiXiuMd5ResultEffectView)
                this.taiXiuMd5ResultEffectView.reset();
        };

        TaiXiuMd5Controller.prototype.resetBetAndResultInfo = function () {
            if (this.taiXiuMd5ResultEffectView)
                this.taiXiuMd5ResultEffectView.reset();

            if (this.taiXiuMd5ResultView)
                this.taiXiuMd5ResultView.reset();

            if (this.taiXiuMd5BetView)
                this.taiXiuMd5BetView.reset();

            if (this.taiXiuMd5InputBetView)
                this.taiXiuMd5InputBetView.reset();
        };

        TaiXiuMd5Controller.prototype.resetBetInfo = function () {
            if (this.taiXiuMd5BetView)
                this.taiXiuMd5BetView.reset();

            if (this.taiXiuMd5InputBetView)
                this.taiXiuMd5InputBetView.reset();
        };
        //EVENT VIEW
        TaiXiuMd5Controller.prototype.clickUIEventPH = function () {
            if (this.taiXiuMd5EventView)
                return this.taiXiuMd5EventView.clickUIEventPH();
        };

        TaiXiuMd5Controller.prototype.activeEventPH = function (enable) {
            if (this.taiXiuMd5EventView)
                return this.taiXiuMd5EventView.activeEventPH(enable);
        };

        TaiXiuMd5Controller.prototype.setUserCord = function (cordWin, cordLost) {
            if (this.taiXiuMd5EventView)
                return this.taiXiuMd5EventView.setUserCord(cordWin, cordLost);
        };


        //PORTAL VIEW
        //ket noi luc dau chua login
        TaiXiuMd5Controller.prototype.connectHubTxMd5 = function () {
            if (this.taiXiuMd5PortalView)
                return this.taiXiuMd5PortalView.connectHubTxMd5();
        };

        //ket noi sau khi da Login
        TaiXiuMd5Controller.prototype.connectHubTxMd5Authorize = function () {
            if (this.taiXiuMd5PortalView)
                return this.taiXiuMd5PortalView.connectHubTxMd5Authorize();
        };

        TaiXiuMd5Controller.prototype.disconnectAndLogout = function () {
            if (this.taiXiuMd5PortalView)
                return this.taiXiuMd5PortalView.disconnectAndLogout();
        };

        TaiXiuMd5Controller.prototype.sendRequestOnHub = function (method, data1, data2) {
            if (this.taiXiuMd5PortalView)
                return this.taiXiuMd5PortalView.sendRequestOnHub(method, data1, data2);
        };

        //INFO VIEW
        TaiXiuMd5Controller.prototype.updateInfoView = function (md5sessionInfo) {
            if (this.taiXiuMd5InfoView)
                return this.taiXiuMd5InfoView.updateInfo(md5sessionInfo);
        };

        TaiXiuMd5Controller.prototype.updateTimerInfoView = function (time) {
            if (this.taiXiuMd5InfoView)
                return this.taiXiuMd5InfoView.updateTimerInfo(time);
        };

        //SESSION HISTORY VIEW
        TaiXiuMd5Controller.prototype.updateSessionHistory = function (md5gameHistory) {
            if (this.taiXiuMd5SessionHistoryView)
            return this.taiXiuMd5SessionHistoryView.updateSessionHistory(md5gameHistory);
        };

        //BUTTON VIEW
        TaiXiuMd5Controller.prototype.lightOnEvent = function () {
            if (this.taiXiuMd5ButtonView)
            return this.taiXiuMd5ButtonView.lightOnEvent();
        };

        //RESULT EFFECT VIEW
        TaiXiuMd5Controller.prototype.playEffectWin = function (amount) {
            if (this.taiXiuMd5ResultEffectView)
            return this.taiXiuMd5ResultEffectView.playEffectWin(amount);
        };

        //BET VIEW
        TaiXiuMd5Controller.prototype.updateBetInfoView = function (betInfo) {
            if (this.taiXiuMd5BetView)
                return this.taiXiuMd5BetView.updateBetInfo(betInfo);
        };

        TaiXiuMd5Controller.prototype.getBetSide = function () {
            if (this.taiXiuMd5BetView)
                return this.taiXiuMd5BetView.getBetSide();
        };

        //TAI XIU VIEW
        TaiXiuMd5Controller.prototype.resetPositionTX = function () {
            if (this.taiXiuMd5View)
                return this.taiXiuMd5View.resetPositionTX();
        };

        //RESULT VIEW
        TaiXiuMd5Controller.prototype.getIsBowl = function () {
            if (this.taiXiuMd5ResultView)
                return this.taiXiuMd5ResultView.getIsBowl();
        };
		
        TaiXiuMd5Controller.prototype.getIsDia = function () {
            if (this.taiXiuMd5ResultView)
                return this.taiXiuMd5ResultView.getIsDia();
        };
		
        TaiXiuMd5Controller.prototype.playAnimation = function (md5sessionInfo) {
          //  if (this.taiXiuMd5ResultView)
          //  return this.taiXiuMd5ResultView.playAnimation(md5sessionInfo);
        };

        TaiXiuMd5Controller.prototype.playAnimFinish = function () {
            if (this.taiXiuMd5ResultView)
            return this.taiXiuMd5ResultView.playAnimFinish();
        };
		
        TaiXiuMd5Controller.prototype.playAnimationAndSetResult = function (md5sessionInfo) {
            if (this.taiXiuMd5ResultView)
            return this.taiXiuMd5ResultView.playAnimationAndSetResult(md5sessionInfo);
        };
		
        TaiXiuMd5Controller.prototype.diceAnimFinish = function () {
            if (this.taiXiuMd5ResultView)
            return this.taiXiuMd5ResultView.diceAnimFinish();
        };

        TaiXiuMd5Controller.prototype.updateResultView = function (md5sessionInfo) {
            if (this.taiXiuMd5ResultView)
                return this.taiXiuMd5ResultView.updateResult(md5sessionInfo);
        };

        //PROPERTY
        TaiXiuMd5Controller.prototype.setIsNan = function (isNan) {
            return this.isNan = isNan;
        };

        TaiXiuMd5Controller.prototype.getIsNan = function () {
            return this.isNan;
        };

        TaiXiuMd5Controller.prototype.getSessionId = function () {
            return this.sessionId;
        };

        TaiXiuMd5Controller.prototype.setDetailIndex= function (detailIndex) {
            return this.detailIndex = detailIndex;
        };

        TaiXiuMd5Controller.prototype.getDetailIndex = function () {
            return this.detailIndex;
        };

        TaiXiuMd5Controller.prototype.setGameHistory = function (md5gameHistory) {
            return this.md5gameHistory = md5gameHistory;
        };

        TaiXiuMd5Controller.prototype.getGameHistory = function () {
            return this.md5gameHistory;
        };
        return TaiXiuMd5Controller;

    })();

    cc.TaiXiuMd5Controller = TaiXiuMd5Controller;

}).call(this);

