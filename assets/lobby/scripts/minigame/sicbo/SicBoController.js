/**
 * Created by Nobita on 01/11/2022.
 */

(function () {
    let SicBoController;

    SicBoController = (function () {
        let instance;

        function SicBoController() {
            this.sumaryAllSideBet = 0;
        }

        instance = void 0;

        SicBoController.getInstance = function () {
            if (instance === void 0) {
                instance = this;
            }

            return instance.prototype;
        }

        //Set
        SicBoController.prototype.setSicBoPortalView = function (sicboPortalView) {
            return this.sicboPortalView = sicboPortalView;
        };

        SicBoController.prototype.setSicBoView = function (sicboView) {
            return this.sicboView = sicboView;
        }

        SicBoController.prototype.setSicBoInfoView = function (sicboInfoView) {
            return this.sicboInfoView = sicboInfoView;
        };

        SicBoController.prototype.setSicBoResultView = function (sicboResultView) {
            return this.sicboResultView = sicboResultView;
        };

        SicBoController.prototype.setSicBoInputView = function (sicboInputView) {
            return this.sicboInputView = sicboInputView;
        };

        SicBoController.prototype.setSID = function (sID) {
            return this.sID = sID;
        };

        //HubOn summaryPlayer
        SicBoController.prototype.updatePlayersInGame = function (data) {
            if (this.sicboInfoView)
                return this.sicboInfoView.updatePlayersInGame(data);
        };

        //HubOn summaryPlayer
        SicBoController.prototype.nFormatter = function (data) {
            if (this.sicboInfoView)
                return this.sicboInfoView.nFormatter(data);
        };

        //SICBO VIEW
        SicBoController.prototype.connectHubSicBo = function () {
            if (this.sicboView)
                return this.sicboView.connectHubSicBo();
        };

        //ket noi sau khi da Login
        SicBoController.prototype.connectHubSicBoAuthorize = function () {
            if (this.sicboView)
                return this.sicboView.connectHubSicBoAuthorize();
        };

        SicBoController.prototype.disconnectAndLogout = function () {
            if (this.sicboView)
                return this.sicboView.disconnectAndLogout();
        };

        SicBoController.prototype.sendRequestOnHub = function (method, data1, data2) {
            if (this.sicboView)
                return this.sicboView.sendRequestOnHub(method, data1, data2);
        };

        //HubOn showResult
        SicBoController.prototype.winResult = function (result) {
            if (this.sicboInfoView)
                return this.sicboInfoView.winResult(result);
        };

        SicBoController.prototype.setWinResult = function (result) {
            return this.winResultResponse = result;
        };

        SicBoController.prototype.getWinResult = function () {
            return this.winResultResponse;
        };

        SicBoController.prototype.setWinVipResult = function (result) {
            return this.winVipResultResponse = result;
        };

        SicBoController.prototype.getWinVipResult = function () {
            return this.winVipResultResponse;
        };

        SicBoController.prototype.setTotalWinResult = function (result) {
            return this.totalWinResultResponse = result;
        };

        SicBoController.prototype.getTotalWinResult = function () {
            return this.totalWinResultResponse;
        };

        //HubOn winResultVip
        SicBoController.prototype.winResultVip = function (result) {
            if (this.sicboInfoView)
                return this.sicboInfoView.winResultVip(result);
        };

        SicBoController.prototype.updateTotalUserWin = function (amount) {
            if (this.sicboInfoView)
                return this.sicboInfoView.updateTotalUserWin(amount);
        };

        //Hien thi message chat
        SicBoController.prototype.playerShowBubbleChat = function (message) {
            if (this.sicboInfoView)
                return this.sicboInfoView.playerShowBubbleChat(message);
        };

        //Cap nhat thong tin player
        SicBoController.prototype.updatePlayersUI = function (data) {
            if (this.sicboInfoView)
                return this.sicboInfoView.updatePlayersUI(data);
        };

        //Cap nhat thong tin nguoi choi hien tai
        SicBoController.prototype.updatePlayerInfor = function (data) {
            if (this.sicboInfoView)
                return this.sicboInfoView.updatePlayerInfor(data);
        };

        //Cap nhat balance
        SicBoController.prototype.updateBalanceCurrPlayer = function (balance) {
            if (this.sicboInfoView)
                return this.sicboInfoView.updateBalanceCurrPlayer(balance);
        };

        //Cap nhat balance cua player khac
        SicBoController.prototype.updateBalancePlayer = function (data) {
            if (this.sicboInfoView)
                return this.sicboInfoView.updateBalancePlayer(data);
        };

        //INFO VIEW

        SicBoController.prototype.updateResultLastSession = function (data) {
            if (this.sicboInfoView)
                return this.sicboInfoView.updateResultLastSession(data);
        }

        SicBoController.prototype.updateTotalBet = function (data) {
            if (this.sicboInfoView)
                return this.sicboInfoView.updateTotalBet(data);
        };

        SicBoController.prototype.updateTimerInfoView = function (time) {
            if (this.sicboInfoView)
                return this.sicboInfoView.updateTimerInfo(time);
        };

        SicBoController.prototype.onNotifyChangePhrase = function (data) {
            if (this.sicboInfoView)
                return this.sicboInfoView.onNotifyChangePhrase(data);
        };

        //RESULT VIEW
        SicBoController.prototype.onShowResult = function (result) {
            if (this.sicboResultView)
                return this.sicboResultView.onShowResult(result);
        };
        SicBoController.prototype.setDicesResult = function (result) {
            if (this.sicboResultView)
                return this.sicboResultView.setDicesResult(result);
        };

        //RESET
        SicBoController.prototype.resetBetAndResultInfo = function () {

        };

        SicBoController.prototype.resetBetInfo = function () {

        };

        SicBoController.prototype.openEndDiaNanView = function () {
            if (this.sicboInfoView)
                return this.sicboInfoView.openEndDiaNan();
        };
		
        //player vao phong
        SicBoController.prototype.registerPlayer = function (playerIndex) {
            if (this.sicboInfoView)
                return this.sicboInfoView.registerPlayer(playerIndex);
        };

        //reset UI ket qua (win/lose) sau moi Phien cua tat ca player
        SicBoController.prototype.resetPlayersResultUI = function () {
            return this.sicboInfoView.resetPlayersResultUI();
        };

        //set ket qua cua player
        SicBoController.prototype.playerResultUI = function (playerIndex, amount) {
            return this.sicboInfoView.playerResultUI(playerIndex, amount);
        };
		
        //player thoat khoi phong
        SicBoController.prototype.unRegisterPlayer = function (playerIndex) {
            if (this.sicboInfoView)
                return this.sicboInfoView.unRegisterPlayer(playerIndex);
        };


        SicBoController.prototype.onBet = function (betSide) {
            return this.sicboInputView.onBet(betSide);
        };

        //Enable cac cua bet
        SicBoController.prototype.enableClickBet = function (enable) {
            return this.sicboInputView.enableClickBet(enable);
        };

        //Disable button bet lai
        SicBoController.prototype.disableBetAgain = function (isDisable) {
            return this.sicboInputView.disableBetAgain(isDisable);
        };

        //Set CurrentState
        SicBoController.prototype.setCurrentState = function (state) {
            return this.currentState = state;
        };
        //Get CurrentState
        SicBoController.prototype.getCurrentState = function () {
            return this.currentState;
        };

        //Set Nan
        SicBoController.prototype.setIsNan = function (isNan) {
            return this.isNan = isNan;
        };
        //Get Nan
        SicBoController.prototype.getIsNan = function () {
            return this.isNan;
        };
		
        //Hien thi message chat
        // SicBoController.prototype.playerShowBubbleChat = function (message) {
            // return this.sicboInfoView.playerShowBubbleChat(message);
        // };

        //ChipView
        SicBoController.prototype.setChipsView = function (chipsView) {
            return this.sicboChipsView = chipsView;
        };

        //Assets
        SicBoController.prototype.setAssetView = function (assetsView) {
            return this.sicboAssetsView = assetsView;
        };

        SicBoController.prototype.getAssetView = function () {
            return this.sicboAssetsView;
        };

        SicBoController.prototype.getSfNan = function (isNan) {
            return this.sicboAssetsView.getSfNan(isNan);
        };
		
        SicBoController.prototype.createChip = function (type) {
            return this.sicboAssetsView.createChip(type);
        };

        //Luu chip vao pool
        SicBoController.prototype.putChipToPool = function (nodeChip, betValue) {
            return this.sicboAssetsView.putChipToPool(nodeChip, betValue);
        };

        //Clear pools
        SicBoController.prototype.clearPools = function () {
            return this.sicboAssetsView.clearPools();
        };

        //Di chuyen chip
        SicBoController.prototype.moveChipBet = function (betValue, betSide, type, accID) {
            if (this.sicboChipsView)
                return this.sicboChipsView.moveChipBet(betValue, betSide, type, accID);
        };

        //Lay lai chip thua
        SicBoController.prototype.getChipsLose = function (sideLose, isTie) {
            if (this.sicboChipsView)
                return this.sicboChipsView.getChipsLose(sideLose, isTie);
        };
        //Tra chip thang
        SicBoController.prototype.refundChips = function (sideWin) {
            if (this.sicboChipsView)
                return this.sicboChipsView.refundChips(sideWin);
        };

        //ClearAllChip
        SicBoController.prototype.clearAllChips = function () {
            if (this.sicboChipsView)
                return this.sicboChipsView.clearAllChips();
        };

        //Khoi tao lai param chip
        SicBoController.prototype.initParamChips = function () {
            if (this.sicboChipsView)
                return this.sicboChipsView.initParamChips();
        };

        //Update chip khi vao game
        SicBoController.prototype.updateChipForBetSession = function (data) {
            if (this.sicboChipsView)
                return this.sicboChipsView.updateChipForBetSession(data);
        };

        SicBoController.prototype.clearBetLog = function (sessionID) {
            this.betLog = this.betLog.filter(log => log.sessionID > (sessionID - 1));
        };
        SicBoController.prototype.getBetLogBySessionID = function (sessionID) {
            return this.betLog.filter(log => log.sessionID == sessionID - 1);
        };
        //Set betBlog
        SicBoController.prototype.setBetLog = function (betInfo) {
            return this.betLog.push(betInfo);
        };
        //Lay thong tin betLog
        SicBoController.prototype.getBetLog = function () {
            return this.betLog;
        };
        //Khoi tao/ reset betLog
        SicBoController.prototype.initBetLog = function () {
            return this.betLog = [];
        };

        //Set betBlog
        SicBoController.prototype.setChipWin = function (chip, chipType, positionEnd) {
            return this.chipsWin.push([chip, chipType, positionEnd]);
        };
        //Lay thong tin chipWin
        SicBoController.prototype.getChipsWin = function () {
            return this.chipsWin;
        };
        //Khoi tao/ reset chipWin
        SicBoController.prototype.initChipsWin = function () {
            return this.chipsWin = [];
        };

        //Set betBlogSession
        SicBoController.prototype.setBetLogSession = function (sessionId) {
            return this.betLogSession = sessionId;
        };
        //Lay thong tin betLogSession
        SicBoController.prototype.getBetLogSession = function () {
            return this.betLogSession;
        };

        //Cap nhat position Player
        SicBoController.prototype.updatePositionPlayerUI = function (positions) {
            return this.positionsUI = positions;
        };
        SicBoController.prototype.positionPlayerUI = function () {
            return this.positionsUI;
        };

        SicBoController.prototype.setSicBoBetView = function (sicboBetView) {
            this.sicboBetView = sicboBetView;
        }
        //Hien thi hieu ung thang cua cua bet
        SicBoController.prototype.playAnimationWin = function (sideWin) {
            return this.sicboBetView.playAnimationWin(sideWin);
        };

        //Stop hien thi hieu ung thang

        SicBoController.prototype.stopAnimationWin = function () {
            return this.sicboBetView.stopAnimationWin();
        };

        SicBoController.prototype.onBet = function (betValue, betSide) {
            return this.sicboBetView.onBet(betValue, betSide);
        }

        SicBoController.prototype.updateTotalUserBetSide = function (betValue, betSide) {
            this.sumaryAllSideBet += betValue;
            return this.sicboBetView.updateTotalUserBetSide(betValue, betSide);
        }
		
        SicBoController.prototype.updateBetOfAccount = function (betValue) {
            return this.sicboInfoView.updateBetOfAccount(betValue);
        };
		
        SicBoController.prototype.resetUserBets = function () {
            this.sumaryAllSideBet = 0;
            return this.sicboBetView.resetUserBets();
        }

        SicBoController.prototype.getSumaryAllSideBet = function () {
            return this.sumaryAllSideBet;
        }

        //Soi cau
        SicBoController.prototype.setSoiCauView = function (soiCauView) {
            this.soiCauView = soiCauView;
        }

        SicBoController.prototype.initListSoiCau = function (data) {
            return this.soiCauView.initListSoiCau(data);
        }
		
		//Menu
        SicBoController.prototype.setSicBoMenuView = function (sicBoMenuView) {
            return this.sicBoMenuView = sicBoMenuView;
        };
		
		SicBoController.prototype.destroyTopView = function () {
            return this.sicBoMenuView.destroyTopView();
        };
		
		SicBoController.prototype.destroyHelpView = function () {
            return this.sicBoMenuView.destroyHelpView();
        };
		
		SicBoController.prototype.destroyHistoryView = function () {
            return this.sicBoMenuView.destroyHistoryView();
        };
		
		SicBoController.prototype.destroyGroupUserView = function () {
            return this.sicBoMenuView.destroyGroupUserView();
        };
		
		SicBoController.prototype.destroyGraphView = function () {
            return this.sicBoMenuView.destroyGraphView();
        };
		
        SicBoController.prototype.createView = function (prefab, posY) {
            var nodeView = cc.instantiate(prefab);
            nodeView.parent = this.sicboView.node;
            if (posY) {
                nodeView.setPosition(0, posY);
            } else {
                nodeView.setPosition(0, 0);
            }

            return nodeView;
        };

        // ─────────────────────────────────────────────────────────────
        //  4 BONUS VIEWS port từ S86 cũ (Q3=B): Event / SessionHistory /
        //  ResultEffect / JackpotHistory + SessionDetail (popup)
        // ─────────────────────────────────────────────────────────────

        // -- SicBoEventView (component, mount trên SicBoView.prefab) --
        SicBoController.prototype.setSicBoEventView = function (view) {
            return this.sicBoEventView = view;
        };
        SicBoController.prototype.activeEventPH = function (enable) {
            if (this.sicBoEventView) return this.sicBoEventView.activeEventPH(enable);
        };
        SicBoController.prototype.setUserCord = function (cordWin, cordLost) {
            if (this.sicBoEventView) return this.sicBoEventView.setUserCord(cordWin, cordLost);
        };

        // -- SicBoSessionHistoryView (strip lich su phien duoi cung) --
        SicBoController.prototype.setSicBoSessionHistoryView = function (view) {
            return this.sicBoSessionHistoryView = view;
        };
        SicBoController.prototype.updateSessionHistory = function (sicbogameHistory) {
            if (this.sicBoSessionHistoryView) return this.sicBoSessionHistoryView.updateSessionHistory(sicbogameHistory);
        };

        // -- SicBoResultEffectView (anim text +amount khi thang) --
        SicBoController.prototype.setSicBoResultEffectView = function (view) {
            return this.sicBoResultEffectView = view;
        };
        SicBoController.prototype.playEffectWin = function (amount) {
            if (this.sicBoResultEffectView) return this.sicBoResultEffectView.playEffectWin(amount);
        };
        SicBoController.prototype.resetEffectWin = function () {
            if (this.sicBoResultEffectView) return this.sicBoResultEffectView.reset();
        };

        // -- Game history cache (dung cho SessionHistory + SessionDetail) --
        SicBoController.prototype.setGameHistory = function (history) {
            return this.sicbogameHistory = history;
        };
        SicBoController.prototype.getGameHistory = function () {
            return this.sicbogameHistory;
        };
        SicBoController.prototype.setDetailIndex = function (idx) {
            return this.detailIndex = idx;
        };
        SicBoController.prototype.getDetailIndex = function () {
            return this.detailIndex || 0;
        };
        SicBoController.prototype.getBetSide = function () {
            return this.betSide;
        };
        SicBoController.prototype.setBetSide = function (side) {
            return this.betSide = side;
        };

        // -- SicBoJackpotHistoryView popup (load tu prefab bonus) --
        SicBoController.prototype.createJackpotHistoryView = function () {
            // TODO_MOUNT_BONUS_VIEW: gan prefab SicBoJackpotHistoryView vao
            // sicBoMenuView.prefabJackpotHistoryView (qua Cocos editor),
            // hoac copy pattern destroyHistoryView trong SicBoMenuView.
            if (this.sicBoMenuView && this.sicBoMenuView.createJackpotHistoryView) {
                return this.sicBoMenuView.createJackpotHistoryView();
            }
        };
        SicBoController.prototype.destroyJackpotHistoryView = function () {
            if (this.sicBoMenuView && this.sicBoMenuView.destroyJackpotHistoryView) {
                return this.sicBoMenuView.destroyJackpotHistoryView();
            }
        };

        // -- SicBoSessionDetailView popup --
        SicBoController.prototype.createSessionDetailView = function (posY) {
            // TODO_MOUNT_BONUS_VIEW: gan prefab SicBoSessionDetailView vao
            // sicBoMenuView.prefabSessionDetailView (qua Cocos editor).
            if (this.sicBoMenuView && this.sicBoMenuView.createSessionDetailView) {
                return this.sicBoMenuView.createSessionDetailView(posY);
            }
        };
        SicBoController.prototype.destroySessionDetailView = function () {
            if (this.sicBoMenuView && this.sicBoMenuView.destroySessionDetailView) {
                return this.sicBoMenuView.destroySessionDetailView();
            }
        };

        return SicBoController;


    })();

    cc.SicBoController = SicBoController;
}).call(this);