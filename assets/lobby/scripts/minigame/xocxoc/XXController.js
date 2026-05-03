/**
 * Created by Nofear on 6/21/2017.
 */

(function () {
    var XXController;

    XXController = (function () {
        var instance;

        function XXController() {

        }

        instance = void 0;

        XXController.getInstance = function () {
            if (instance === void 0) {
                instance = this;
            }
            return instance.prototype;
        };


        //SET VIEW
        XXController.prototype.setXXView = function (xxView) {
            return this.xxView = xxView;
        };

        XXController.prototype.setXXSoiCauView = function (xxSoiCauView) {
            return this.xxSoiCauView = xxSoiCauView;
        };

        XXController.prototype.setXXAssets = function (xxAssets) {
            return this.xxAssets = xxAssets;
        };

        XXController.prototype.setXXChipPool = function (xxChipPool) {
            return this.xxChipPool = xxChipPool;
        };


        XXController.prototype.setXXInfoView = function (xxInfoView) {
            return this.xxInfoView = xxInfoView;
        };

        XXController.prototype.setXXInputView = function (xxInputView) {
            return this.xxInputView = xxInputView;
        };

        XXController.prototype.setXXResultView = function (xxResultView) {
            return this.xxResultView = xxResultView;
        };

        //PROPERTY
        XXController.prototype.setIsNan = function (isNan) {
            return this.isNan = isNan;
        };

        XXController.prototype.getIsNan = function () {
            return this.isNan;
        };

        XXController.prototype.setLastBetData = function (lastBetData) {
            return this.lastBetData = lastBetData;
        };

        XXController.prototype.getLastBetData = function () {
            return this.lastBetData;
        };

        XXController.prototype.setSID = function (sID) {
            return this.sID = sID;
        };

        XXController.prototype.getSID = function () {
            return this.sID;
        };


        //ASSETS
        XXController.prototype.getAssets = function () {
            return this.xxAssets;
        };

        XXController.prototype.getWinFont = function () {
            return this.xxAssets.getWinFont();
        };

        XXController.prototype.getLoseFont = function () {
            return this.xxAssets.getLoseFont();
        };

        XXController.prototype.getChips = function () {
            return this.xxAssets.getChips();
        };

        XXController.prototype.getNans = function () {
            return this.xxAssets.getNans();
        };

        XXController.prototype.getAvatarDef = function () {
            return this.xxAssets.getAvatarDef();
        };

        //XX VIEW
        XXController.prototype.sendRequestOnHub = function (method, data1, data2) {
            if (this.xxView)
                return this.xxView.sendRequestOnHub(method, data1, data2);
        };

        //INFO
        //HubOn joinGame
        XXController.prototype.joinGame = function (info) {
            return this.xxInfoView.joinGame(info);
        };
        //HubOn playerJoin
        XXController.prototype.playerJoin = function (info) {
            return this.xxInfoView.playerJoin(info);
        };

        //HubOn playerLeave
        XXController.prototype.playerLeave = function (info) {
            this.xxInfoView.playerLeave(info);
            this.xxView.playerLeave(info);
        };

        //HubOn updateConnectionStatus
        XXController.prototype.updateConnectionStatus = function (info) {
            return this.xxInfoView.updateConnectionStatus(info);
        };

        XXController.prototype.updatePlayerStatus = function (status) {
            return this.xxInfoView.updatePlayerStatus(status);
        };
        //Cap nhat thong tin nguoi choi hien tai
        XXController.prototype.updateInfoCurrPlayer = function (data) {
            return this.xxInfoView.updateInfoCurrPlayer(data);
        };


        XXController.prototype.updateChip = function (accID, chip) {
            //neu la owner thi update ca realBal
            if (accID === cc.LoginController.getInstance().getUserId()) {
                cc.BalanceController.getInstance().updateRealBalance(chip);
            }
            return this.xxInfoView.updateChip(accID, chip);
        };

        XXController.prototype.getPositions = function () {
            return this.xxInfoView.getPositions();
        };

        XXController.prototype.updateSessionId = function (sID) {
            return this.xxInfoView.updateSessionId(sID);
        };

        XXController.prototype.updateInfo = function (info, state, time) {
            return this.xxInfoView.updateInfo(info, state, time);
        };

        XXController.prototype.getIndexUIBetByAccID = function (accID) {
            return this.xxInfoView.getIndexUIBetByAccID(accID);
        };

        XXController.prototype.getIndexUIBetByPosition = function (position) {
            return this.xxInfoView.getIndexUIBetByPosition(position);
        };

        XXController.prototype.getTime = function () {
            return this.xxInfoView.getTime();
        };

        XXController.prototype.playerShowBubbleChat = function (message) {
            return this.xxInfoView.playerShowBubbleChat(message);
        };

        //player vao phong
        XXController.prototype.registerPlayer = function (playerIndex) {
            return this.xxInfoView.registerPlayer(playerIndex);
        };

        //player thoat khoi phong
        XXController.prototype.unRegisterPlayer = function (playerIndex) {
            return this.xxInfoView.unRegisterPlayer(playerIndex);
        };

        //reset UI ket qua (win/lose) sau moi Phien cua tat ca player
        XXController.prototype.resetPlayersResultUI = function () {
            return this.xxInfoView.resetPlayersResultUI();
        };
        XXController.prototype.totalUserWin = function (amout) {
            return this.xxInfoView.totalUserWin(amout);
        };


        //set ket qua cua player
        XXController.prototype.playerResultUI = function (playerIndex, isWin, amount) {
            return this.xxInfoView.playerResultUI(playerIndex, isWin, amount);
        };

        // HubOn - summaryPlayer
        XXController.prototype.summaryPlayer = function (total) {
            return this.xxInfoView.summaryPlayer(total);
        };
        // HubOn - vipPlayer
        XXController.prototype.vipPlayer = function (dataPlayers) {
            return this.xxInfoView.vipPlayer(dataPlayers);
        };
        // HubOn - winResultVip
        XXController.prototype.winResultVip = function (dataPlayers) {
            return this.xxInfoView.winResultVip(dataPlayers);
        };

        // HubOn - winResult
        XXController.prototype.winResult = function (dataPlayers) {
            return this.xxInfoView.winResult(dataPlayers);
        };

        XXController.prototype.updateTimer = function (time) {
            return this.xxInfoView.updateTimer(time);
        };


        //INPUT
        //HubOn playerBet
        XXController.prototype.playerBet = function (info) {
            return this.xxInputView.playerBet(info);
        };

        XXController.prototype.updateInput = function (state) {
            return this.xxInputView.updateInput(state);
        };

        XXController.prototype.getGateChips = function () {
            return this.xxInputView.getGateChips();
        };


        XXController.prototype.showLastInput = function (info) {
            return this.xxInputView.showLastInput(info);
        };

        XXController.prototype.getPlayerBets = function () {
            return this.xxInputView.getPlayerBets();
        };

        XXController.prototype.playFxDealerPay = function (chipBet) {
            return this.xxInputView.playFxDealerPay(chipBet);
        };

        XXController.prototype.initGateChip = function () {
            return this.xxInputView.initGateChip();
        };


        XXController.prototype.playFxPay = function (chipBet) {
            return this.xxInputView.playFxPay(chipBet);
        };

        XXController.prototype.playFxLost = function (playFxLost) {
            return this.xxInputView.playFxLost(playFxLost);
        };

        XXController.prototype.playFxUserBet = function (playerId, indexBet) {
            return this.xxInputView.playFxUserBet(playerId, indexBet);
        };

        XXController.prototype.resetInput = function () {
            return this.xxInputView.resetInput();
        };

        XXController.prototype.activeAllButtonBet = function (enable) {
            return this.xxInputView.activeAllButtonBet(enable);
        };

        XXController.prototype.clearAllChip = function () {
            return this.xxInputView.clearAllChip();
        };

        //RESULT
        XXController.prototype.updateResult = function (players, result, originResult, state, openNow) {
            return this.xxResultView.updateResult(players, result, originResult, state, openNow);
        };

        //SOI CAU
        XXController.prototype.draw = function (list) {
            return this.xxSoiCauView.draw(list);
        };

        XXController.prototype.resetDraw = function () {
            return this.xxSoiCauView.resetDraw();
        };

        //CHIP POOL
        XXController.prototype.createChip = function () {
            return this.xxChipPool.createChip();
        };

        XXController.prototype.putToPool = function (node) {
            return this.xxChipPool.putToPool(node);
        };

        XXController.prototype.clearPool = function () {
            return this.xxChipPool.clearPool();
        };

        XXController.prototype.updatePositionPlayerUI = function (positions) {
            return this.positionsUI = positions;
        };

        XXController.prototype.getPositionsUI = function () {
            return this.positionsUI;
        };

        XXController.prototype.initLogBet = function () {
            return this.logBet = [];
        };
        XXController.prototype.setLogBet = function (betData) {
            return this.logBet.push(betData);
        };
        XXController.prototype.getLogBet = function () {
            return this.logBet;
        };
        return XXController;

    })();

    cc.XXController = XXController;

}).call(this);

