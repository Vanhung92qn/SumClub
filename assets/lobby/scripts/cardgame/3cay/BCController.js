/**
 * Created by Nofear on 6/21/2017.
 */

(function () {
    var BCController;

    BCController = (function () {
        var instance;

        function BCController() {

        }

        instance = void 0;

        BCController.getInstance = function () {
            if (instance === void 0) {
                instance = this;
            }
            return instance.prototype;
        };


        //SET VIEW
        BCController.prototype.setBCView = function (BCView) {
            return this.BCView = BCView;
        };

        BCController.prototype.setBCAssets = function (BCAssets) {
            return this.BCAssets = BCAssets;
        };

        BCController.prototype.setBCChipPool = function (BCChipPool) {
            return this.BCChipPool = BCChipPool;
        };

        BCController.prototype.setBCCardPool = function (BCCardPool) {
            return this.BCCardPool = BCCardPool;
        };

        BCController.prototype.setBCInfoView = function (BCInfoView) {
            return this.BCInfoView = BCInfoView;
        };

        // Hien thi thong tin chap nhan danh bien
        BCController.prototype.showAcceptedBet = function (data) {
            return this.BCInfoView.showAcceptedBet(data);
        };

        BCController.prototype.setBCBetActionsView = function (BCBetActionsView) {
            return this.BCBetActionsView = BCBetActionsView;
        };

        BCController.prototype.resetTotalFeedChicken = function (accID, star) {
            return this.BCInfoView.resetTotalFeedChicken(accID, star);
        };
        BCController.prototype.hidePlayerStatus = function () {
            return this.BCInfoView.hidePlayerStatus();
        };

        BCController.prototype.setBCResultView = function (BCResultView) {
            return this.BCResultView = BCResultView;
        };

        BCController.prototype.setBCRoomView = function (BCRoomView) {
            return this.BCRoomView = BCRoomView;
        };

        BCController.prototype.setBCCardActionsView = function (BCCardActionsView) {
            return this.BCCardActionsView = BCCardActionsView;
        };
        //Chia bai
        BCController.prototype.moveCards = function () {
            return this.BCCardActionsView.moveCards();
        };
        BCController.prototype.moveCardsActive = function (arrUserPos) {
            return this.BCCardActionsView.moveCardsActive(arrUserPos);
        };
        //Mo bai
        BCController.prototype.openCards = function (times) {
            return this.BCCardActionsView.openCards(times);
        };
        //Thu bai
        BCController.prototype.collectCards = function () {
            return this.BCCardActionsView.collectCards();
        };
        //Tat layout Nan
        BCController.prototype.hideLayoutNan = function () {
            return this.BCCardActionsView.onHideLayoutNan();
        };

        //PROPERTY
        BCController.prototype.updateCurrentBetValue = function (value) {
            if (this.BCBetActionsView)
                return this.BCBetActionsView._updateCurrentBetValue(value);
        };

        BCController.prototype.resetSliderBet = function () {
            if (this.BCBetActionsView)
                return this.BCBetActionsView.resetSliderBet();
        };

        BCController.prototype.enableLayoutBet = function (enable) {
            if (this.BCBetActionsView)
                return this.BCBetActionsView.enableLayoutBet(enable);
        };
        BCController.prototype.setUpUIBetByPharse = function (pharse) {
            if (this.BCBetActionsView)
                return this.BCBetActionsView.setUpUIBetByPharse(pharse);
        };

        BCController.prototype.updateUIActionBet = function (state) {
            if (this.BCBetActionsView)
                return this.BCBetActionsView.updateUIActionBet(state);
        };
        //an hien thi gop ga
        BCController.prototype.enableOnLyFeedChicken = function () {
            if (this.BCBetActionsView)
                return this.BCBetActionsView.enableOnLyFeedChicken();
        };

        BCController.prototype.setBetRoom = function (betRoom) {
            return this.betRoom = betRoom;
        };

        BCController.prototype.getBetRoom = function () {
            return this.betRoom;
        };

        BCController.prototype.setLastBetData = function (lastBetData) {
            return this.lastBetData = lastBetData;
        };

        BCController.prototype.getLastBetData = function () {
            return this.lastBetData;
        };

        BCController.prototype.setSID = function (sID) {
            return this.sID = sID;
        };

        BCController.prototype.getSID = function () {
            return this.sID;
        };


        //ASSETS
        BCController.prototype.getAssets = function () {
            return this.BCAssets;
        };

        BCController.prototype.getWinFont = function () {
            return this.BCAssets.getWinFont();
        };

        BCController.prototype.getBiens = function () {
            return this.BCAssets.getBiens();
        };

        BCController.prototype.getLoseFont = function () {
            return this.BCAssets.getLoseFont();
        };

        BCController.prototype.getCards = function () {
            return this.BCAssets.getCards();
        };

        BCController.prototype.getAvatarDef = function () {
            return this.BCAssets.getAvatarDef();
        };

        //BC VIEW
        BCController.prototype.sendRequestOnHub = function (method, data1, data2) {
            if (this.BCView)
                return this.BCView.sendRequestOnHub(method, data1, data2);
        };

        //INFO
        //HubOn joinGame
        BCController.prototype.joinGame = function (info) {
            return this.BCInfoView.joinGame(info);
        };
        //HubOn playerJoin
        BCController.prototype.playerJoin = function (info) {
            return this.BCInfoView.playerJoin(info);
        };

        //HubOn playerLeave
        BCController.prototype.playerLeave = function (info) {
            this.BCInfoView.playerLeave(info);
            this.BCView.playerLeave(info);
        };

        //HubOn updateConnectionStatus
        BCController.prototype.updateConnectionStatus = function (info) {
            return this.BCInfoView.updateConnectionStatus(info);
        };
        //HubOn showPrize
        BCController.prototype.showPrize = function (result) {
            return this.BCInfoView.showPrize(result);
        };
        //HubOn showAllResult
        BCController.prototype.showAllResult = function (result) {
            return this.BCInfoView.showAllResult(result);
        };

        //HubOn startAnimationTime - chia bai
        BCController.prototype.startAnimationTime = function (currPlayer, dataTime, players) {
            return this.BCInfoView.startAnimationTime(currPlayer, dataTime, players);
        };

        // Cap nhat status cua game
        BCController.prototype.updateStatusGame = function (status) {
            return this.BCInfoView.updateStatusGame(status);
        };

        // Cap nhat status cua player
        BCController.prototype.updatePlayerStatus = function (status) {
            return this.BCInfoView.updatePlayerStatus(status);
        };
        // Cap nhat UI gop ga
        BCController.prototype.updateFeedChickenUI = function (data) {
            return this.BCInfoView.updateFeedChickenUI(data);
        };

        //Cap nhat progress cua chuong
        BCController.prototype.updateProgressOwner = function (timeInfo) {
            return this.BCInfoView.updateProgressOwner(timeInfo);
        };

        // An btn danh bien
        BCController.prototype.hideBtnBien = function () {
            return this.BCInfoView.hideBtnBien();
        };
        // Hien btn danh bien
        BCController.prototype.showBtnBien = function () {
            return this.BCInfoView.showBtnBien();
        };
        // Hien thi btn danh bien cho accId
        BCController.prototype.showBetSideForAccId = function(fromAccId, toAccId, amount) {
            return this.BCInfoView.showBetSideForAccId(fromAccId, toAccId, amount);
        };

        BCController.prototype.stopUpdateProgressOwner = function () {
            return this.BCInfoView.stopUpdateProgressOwner();
        };

        // Lay player theo accId
        BCController.prototype.getHandsCardByAccId = function(accId) {
            return this.BCInfoView.getHandsCardByAccId(accId);
        };


        BCController.prototype.updateChip = function (accID, chip) {
            //neu la owner thi update ca realBal
            if (accID === cc.LoginController.getInstance().getUserId()) {
                cc.BalanceController.getInstance().updateRealBalance(chip);
            }
            return this.BCInfoView.updateChip(accID, chip);
        };

        BCController.prototype.getPositions = function () {
            return this.BCInfoView.getPositions();
        };

        BCController.prototype.updateSessionId = function (sID) {
            return this.BCInfoView.updateSessionId(sID);
        };

        BCController.prototype.updateInfo = function (info, state, time) {
            return this.BCInfoView.updateInfo(info, state, time);
        };

        BCController.prototype.updateBalancePlayers = function(players) {
            return this.BCInfoView.updateBalancePlayers(players);
        };

        BCController.prototype.getIndexUIBetByAccID = function (accID) {
            return this.BCInfoView.getIndexUIBetByAccID(accID);
        };

        BCController.prototype.getIndexUIBetByPosition = function (position) {
            return this.BCInfoView.getIndexUIBetByPosition(position);
        };

        BCController.prototype.getTime = function () {
            return this.BCInfoView.getTime();
        };

        BCController.prototype.playerShowBubbleChat = function (message) {
            return this.BCInfoView.playerShowBubbleChat(message);
        };

        //player vao phong
        BCController.prototype.registerPlayer = function (playerIndex) {
            return this.BCInfoView.registerPlayer(playerIndex);
        };

        //player thoat khoi phong
        BCController.prototype.unRegisterPlayer = function (playerIndex) {
            return this.BCInfoView.unRegisterPlayer(playerIndex);
        };

        //reset UI ket qua (win/lose) sau moi Phien cua tat ca player
        BCController.prototype.resetPlayersResultUI = function () {
            return this.BCInfoView.resetPlayersResultUI();
        };

        //set ket qua cua player
        BCController.prototype.playerResultUI = function (playerIndex, isWin, amount) {
            return this.BCInfoView.playerResultUI(playerIndex, isWin, amount);
        };

        BCController.prototype.updateTimer = function (time) {
            return this.BCInfoView.updateTimer(time);
        };

        //HubOn playerBet
        BCController.prototype.playerBet = function (info) {
            return this.BCInfoView.playerBet(info);
        };


        //INPUT

        BCController.prototype.updateInput = function (state) {
            return this.BCInputView.updateInput(state);
        };

        BCController.prototype.showLastInput = function (info) {
            return this.BCInputView.showLastInput(info);
        };

        BCController.prototype.getPlayerBets = function () {
            return this.BCInputView.getPlayerBets();
        };

        BCController.prototype.playFxDealerPay = function (chipBet) {
            return this.BCInputView.playFxDealerPay(chipBet);
        };

        BCController.prototype.playFxPay = function (chipBet) {
            return this.BCInputView.playFxPay(chipBet);
        };

        BCController.prototype.playFxLost = function (playFxLost) {
            return this.BCInputView.playFxLost(playFxLost);
        };

        BCController.prototype.playFxUserBet = function (playerId, indexBet) {
            return this.BCInputView.playFxUserBet(playerId, indexBet);
        };

        BCController.prototype.resetInput = function () {
            return this.BCInputView.resetInput();
        };

        BCController.prototype.activeAllButtonBet = function (enable) {
            return this.BCInputView.activeAllButtonBet(enable);
        };

        //RESULT
        BCController.prototype.updateResult = function (players, result, originResult, state, openNow) {
            return this.BCResultView.updateResult(players, result, originResult, state, openNow);
        };

        //CHIP POOL
        BCController.prototype.createChip = function () {
            return this.BCChipPool.createChip();
        };

        BCController.prototype.putToPool = function (node) {
            return this.BCChipPool.putToPool(node);
        };

        BCController.prototype.clearPool = function () {
            return this.BCChipPool.clearPool();
        };

        //Card POOL
        BCController.prototype.createCard = function () {
            console.log(this.BCCardPool)
            return this.BCCardPool.createCard();
        };

        BCController.prototype.putCardToPool = function (node) {
            return this.BCCardPool.putToPool(node);
        };

        BCController.prototype.clearCardPool = function () {
            return this.BCCardPool.clearPool();
        };

        // AcceptBet dong y danh bien
        BCController.prototype.getAcceptedBet = function () {
            return this.acceptedBet;
        };
        BCController.prototype.pushAcceptedBet = function (accID) {
            return this.acceptedBet.push(accID);
        };
        BCController.prototype.clearAcceptedBet = function () {
            return this.acceptedBet = [];
        };
        // List danh sach yeu cau danh bien
        BCController.prototype.getRequestBetOther = function () {
            return this.requestBetOther;
        };
        BCController.prototype.pushRequestBetOther = function (accID) {
            return this.requestBetOther.push(accID);
        };
        BCController.prototype.clearRequestBetOther = function () {
            return this.requestBetOther = [];
        };

        // OwnerID (chuong)
        BCController.prototype.setOwnerID = function (id) {
            return this.ownerID = id;
        };
        BCController.prototype.getOwnerID = function () {
            return this.ownerID;
        };


        //Vi tri ngoi cua user
        BCController.prototype.setActivePos = function (arrActivePos) {
            return this.activePos = arrActivePos;
        }
        BCController.prototype.getActivePos = function () {
            return this.activePos;
        }
        // Chat bai
        BCController.prototype.setCardsSuite = function (listSpritCard, suite) {
            switch (suite) {
                case cc.BCCardSuite.BICH:
                    return this.cardsBich = listSpritCard;
                case cc.BCCardSuite.TEP:
                    return this.cardsTep = listSpritCard;
                case cc.BCCardSuite.RO:
                    return this.cardsRo = listSpritCard;
                case cc.BCCardSuite.CO:
                    return this.cardsCo = listSpritCard;

            }
        };
        BCController.prototype.getCardsSuite = function (suite) {
            switch (suite) {
                case cc.BCCardSuite.BICH:
                    return this.cardsBich;
                case cc.BCCardSuite.TEP:
                    return this.cardsTep;
                case cc.BCCardSuite.RO:
                    return this.cardsRo;
                case cc.BCCardSuite.CO:
                    return this.cardsCo;

            }
        };

        BCController.prototype.setChatTep = function (chat) {
            return this.chatTep = chat;
        };
        BCController.prototype.getChatTep = function () {
            return this.chatTep;
        };

        BCController.prototype.setChatRo = function (chat) {
            return this.chatBich = chat;
        };
        BCController.prototype.getChatBich = function () {
            return this.chatBich;
        };

        BCController.prototype.setChatBich = function (chat) {
            return this.chatBich = chat;
        };
        BCController.prototype.getChatBich = function () {
            return this.chatBich;
        };


        //Trang thai nhan bien
        BCController.prototype.setStateReiecvBetSide = function (state) {
            return this.stateReiecvBetSide = state;
        };
        BCController.prototype.getStateReiecvBetSide = function () {
            return this.stateReiecvBetSide;
        };
        return BCController;

    })();

    cc.BCController = BCController;

}).call(this);

