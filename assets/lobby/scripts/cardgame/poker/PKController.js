/**
 * Created by Nofear on 6/21/2017.
 */

(function () {
    var PKController;

    PKController = (function () {
        var instance;

        function PKController() {

        }

        instance = void 0;

        PKController.getInstance = function () {
            if (instance === void 0) {
                instance = this;
            }
            return instance.prototype;
        };


        //SET VIEW
        PKController.prototype.setPKRoomView = function (RoomView) {
            return this.RoomView = RoomView;
        };


        PKController.prototype.setPKView = function (View) {
            return this.View = View;
        };

        PKController.prototype.setPKAssets = function (Assets) {
            return this.Assets = Assets;
        };

        PKController.prototype.setPKChipPool = function (ChipPool) {
            return this.ChipPool = ChipPool;
        };

        PKController.prototype.setCardDemoPool = function (CardDemoPool) {
            return this.CardDemoPool = CardDemoPool;
        };

        PKController.prototype.setCardFoldDemoPool = function (CardFoldDemoPool) {
            return this.CardFoldDemoPool = CardFoldDemoPool;
        };

        PKController.prototype.setPKInfoView = function (InfoView) {
            return this.InfoView = InfoView;
        };

        PKController.prototype.setPKInputView = function (InputView) {
            return this.InputView = InputView;
        };

        PKController.prototype.setPKResultView = function (ResultView) {
            return this.ResultView = ResultView;
        };

        PKController.prototype.setPKBuyInView = function (BuyInView) {
            return this.BuyInView = BuyInView;
        };

        //PROPERTY
        PKController.prototype.setIsNan = function (isNan) {
            return this.isNan = isNan;
        };

        PKController.prototype.getIsNan = function () {
            return this.isNan;
        };

        PKController.prototype.setLastBetData = function (lastBetData) {
            return this.lastBetData = lastBetData;
        };

        PKController.prototype.getLastBetData = function () {
            return this.lastBetData;
        };

        PKController.prototype.setSID = function (sID) {
            return this.sID = sID;
        };

        PKController.prototype.getSID = function () {
            return this.sID;
        };

        PKController.prototype.setActions = function (actions) {
            return this.actions = actions;
        };

        PKController.prototype.getActions = function () {
            return this.actions;
        };

        PKController.prototype.setDefaultAction = function (defaultAction) {
            return this.defaultAction = defaultAction;
        };

        PKController.prototype.getDefaultAction = function () {
            return this.defaultAction;
        };

        PKController.prototype.setCurrentRoomVal = function (currentRoomVal) {
            return this.currentRoomVal = currentRoomVal;
        };

        PKController.prototype.getCurrentRoomVal = function () {
            return this.currentRoomVal;
        };

        //ASSETS
        PKController.prototype.getAssets = function () {
            return this.Assets;
        };

        PKController.prototype.getWinFont = function () {
            return this.Assets.getWinFont();
        };

        PKController.prototype.getLoseFont = function () {
            return this.Assets.getLoseFont();
        };

        PKController.prototype.getChips = function () {
            return this.Assets.getChips();
        };

        PKController.prototype.getNans = function () {
            return this.Assets.getNans();
        };

        PKController.prototype.getAvatarDef = function () {
            return this.Assets.getAvatarDef();
        };

        //XX VIEW
        PKController.prototype.sendRequestOnHub = function (method, data1, data2, data3) {
            if (this.RoomView)
                return this.RoomView.sendRequestOnHub(method, data1, data2, data3);
        };

        //updateOwnerConnectionStatus
        PKController.prototype.updateOwnerConnectionStatus = function (status) {
            return this.View.updateOwnerConnectionStatus(status);
        };

        //INFO
        //HubOn joinGame
        PKController.prototype.joinGame = function (info) {
            return this.InfoView.joinGame(info);
        };
        //HubOn playerJoin
        PKController.prototype.playerJoin = function (info) {
            return this.InfoView.playerJoin(info);
        };

        //HubOn playerLeave
        PKController.prototype.playerLeave = function (info) {
            this.InfoView.playerLeave(info);
            this.RoomView.playerLeave(info);
        };

        //HubOn updateConnectionStatus
        PKController.prototype.updateConnectionStatus = function (info) {
            return this.InfoView.updateConnectionStatus(info);
        };

        //HubOn updatePlayerStatus
        PKController.prototype.updatePlayerStatus = function (status) {
            return this.InfoView.updatePlayerStatus(status);
        };

        //HubOn updateAccount
        PKController.prototype.updateAccount = function (info) {
            return this.InfoView.updateAccount(info);
        };

        //HubOn notifyStartActions
        PKController.prototype.notifyStartActions = function (info) {
            return this.InfoView.notifyStartActions(info);
        };

        //HubOn notifyFinishActions
        PKController.prototype.notifyFinishActions = function (info) {
            return this.InfoView.notifyFinishActions(info);
        };

        //HubOn refund
        PKController.prototype.refund = function (info) {
            return this.InfoView.refund(info);
        };

        PKController.prototype.updateChip = function (accID, chip) {
            //neu la owner thi update ca realBal
            if (accID === cc.LoginController.getInstance().getUserId()) {
                cc.BalanceController.getInstance().updateRealBalance(chip);
            }
            return this.InfoView.updateChip(accID, chip);
        };

        PKController.prototype.getPositions = function () {
            return this.InfoView.getPositions();
        };

        PKController.prototype.updateSessionId = function (sID) {
            return this.InfoView.updateSessionId(sID);
        };

        PKController.prototype.updateInfo = function (info, state, isJoinGame) {
            return this.InfoView.updateInfo(info, state, isJoinGame);
        };

        PKController.prototype.getIndexUIBetByAccID = function (accID) {
            return this.InfoView.getIndexUIBetByAccID(accID);
        };

        PKController.prototype.getTime = function () {
            return this.InfoView.getTime();
        };

        PKController.prototype.playerShowBubbleChat = function (message) {
            return this.InfoView.playerShowBubbleChat(message);
        };

        //player vao phong
        PKController.prototype.registerPlayer = function (playerIndex) {
            return this.InfoView.registerPlayer(playerIndex);
        };

        //player thoat khoi phong
        PKController.prototype.unRegisterPlayer = function (playerIndex) {
            return this.InfoView.unRegisterPlayer(playerIndex);
        };

        //reset UI ket qua (win/lose) sau moi Phien cua tat ca player
        PKController.prototype.resetPlayersResultUI = function () {
            return this.InfoView.resetPlayersResultUI();
        };

        //set ket qua cua player
        PKController.prototype.playerResultUI = function (playerIndex, isWin, amount) {
            return this.InfoView.playerResultUI(playerIndex, isWin, amount);
        };

        PKController.prototype.updateTimer = function (time) {
            return this.InfoView.updateTimer(time);
        };


        //INPUT
        //HubOn playerBet
        PKController.prototype.playerBet = function (info) {
            return this.InputView.playerBet(info);
        };

        PKController.prototype.updateInput = function (state) {
            return this.InputView.updateInput(state);
        };

        PKController.prototype.showLastInput = function (info) {
            return this.InputView.showLastInput(info);
        };

        PKController.prototype.getPlayerBets = function () {
            return this.InputView.getPlayerBets();
        };

        PKController.prototype.playFxDealerPay = function (chipBet) {
            return this.InputView.playFxDealerPay(chipBet);
        };

        PKController.prototype.playFxPay = function (chipBet) {
            return this.InputView.playFxPay(chipBet);
        };

        PKController.prototype.playFxLost = function (playFxLost) {
            return this.InputView.playFxLost(playFxLost);
        };

        PKController.prototype.playFxUserBet = function (playerId, indexBet) {
            return this.InputView.playFxUserBet(playerId, indexBet);
        };

        PKController.prototype.resetInput = function () {
            return this.InputView.resetInput();
        };

        PKController.prototype.activeButtonByActions = function (actions) {
            return this.InputView.activeButtonByActions(actions);
        };

        PKController.prototype.deActiveAllButton = function () {
            return this.InputView.deActiveAllButton();
        };

        //RESULT
        PKController.prototype.showResult = function (hand) {
            return this.ResultView.showResult(hand);
        };

        PKController.prototype.hideResult = function () {
            return this.ResultView.hideResult();
        };


        //BUYIN
        PKController.prototype.showBuyIn = function (roomVal, isPlayNow) {
            return this.BuyInView.showBuyIn(roomVal, isPlayNow);
        };

        PKController.prototype.hideBuyIn = function () {
            return this.BuyInView.hideBuyIn();
        };


        //CHIP POOL
        PKController.prototype.createChip = function () {
            return this.ChipPool.createChip();
        };

        PKController.prototype.putToPool = function (node) {
            return this.ChipPool.putToPool(node);
        };

        PKController.prototype.clearPool = function () {
            return this.ChipPool.clearPool();
        };

        PKController.prototype.createChipMoveTo = function (amount, start, end, time) {
            return this.ChipPool.createChipMoveTo(amount, start, end, time);
        };

        PKController.prototype.getCardDemoPool = function () {
            return this.CardDemoPool;
        };

        PKController.prototype.getCardFoldDemoPool = function () {
            return this.CardFoldDemoPool;
        };

        //config
        PKController.prototype.getAnimNameByHand = function (hand) {
            switch (hand) {
                case cc.PKHand.ROYAL_FLUSH:
                case cc.PKHand.STRAIGHT_FLUSH:
                    return 'tps';
                case cc.PKHand.FOUR_OF_A_KIND:
                    return 'tquy';
                case cc.PKHand.FULL_HOUSE:
                    return 'culu';
                case cc.PKHand.FLUSH:
                    return 'thung';
                case cc.PKHand.STRAIGHT:
                    return 'sanh';
                case cc.PKHand.THREE_OF_A_KIND:
                    return 'xam';
                case cc.PKHand.TWO_PAIRS:
                    return '2doi';
                case cc.PKHand.PAIR:
                    return '1doi';
                case cc.PKHand.HIGH_CARD:
                    return 'baiCao';
                default:
                    return 'yThang';
            }
        };

        PKController.prototype.getAnimIndexByHand = function (hand) {
            switch (hand) {
                case cc.PKHand.ROYAL_FLUSH:
                case cc.PKHand.STRAIGHT_FLUSH:
                    return 6;
                case cc.PKHand.FOUR_OF_A_KIND:
                    return 7;
                case cc.PKHand.FULL_HOUSE:
                    return 3;
                case cc.PKHand.FLUSH:
                    return 5;
                case cc.PKHand.STRAIGHT:
                    return 4;
                case cc.PKHand.THREE_OF_A_KIND:
                    return 8;
                case cc.PKHand.TWO_PAIRS:
                    return 1;
                case cc.PKHand.PAIR:
                    return 0;
                case cc.PKHand.HIGH_CARD:
                    return 2;
                default:
                    return 9;
            }
        };

        return PKController;

    })();

    cc.PKController = PKController;

}).call(this);

