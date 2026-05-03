/**
 * Created by Welcome on 5/28/2019.
 */

(function () {
    cc.PKInfoView = cc.Class({
        "extends": cc.Component,
        properties: {
            middleCard: cc.MiddleCard,

            //phien
            lbSID: cc.Label,
            //roomID
            lbRoomID: cc.Label,
            //min Bet
            lbMinBet: cc.Label,

            //thoi gian
            lbTimer: cc.Label,
            //giai doan (đặt cửa, kết quả...)
            lbInfo: cc.Label,
            progressTimer: cc.ProgressBar,

            totalCBet: cc.CBet,

            //players
            players: [cc.PKPlayer],
        },

        onLoad: function () {
            this.cardDemoView = this.node.getComponent(cc.PKCardDemoView);
            this.cardFoldDemoView = this.node.getComponent(cc.PKCardFoldDemoView);

            //Fix so player = 7
            this.maxPlayer = 7;

            this.countPlayer = 0; //so player hien tai
            this.lastTotalBet = 0;

            //vi tri ng choi local (mang luu userID)
            this.positionsUI = [0,0,0,0,0,0,0];
            this.positions = [];
            //vi tri dealer
            this.potPostion = this.totalCBet.node.position;

            //khoi tao totalBet
            this.totalCBet.init();
            this.totalCBet.hideChipBet();

            //Khoi tao san 7 player
            this.players.forEach(function (player) {
                player.init();
                player.pCard.init();
                player.resetPKPlayer();
                player.unRegisterPlayer();
            });

            this.interval = null;
            this.timeBet = 54;
            this.resetTimer();
            cc.PKController.getInstance().setPKInfoView(this);

            this.animInfo = this.lbInfo.node.parent.getComponent(cc.Animation);
        },

        //Ham convert mang vi tri tren server -> vi tri trên local
        convertServerPosToLocalPos: function (positions) {
            //vi tri ng choi tren server
            this.positions = positions;

            //sắp xếp lại
            this.sortPosition();
        },

        //update lai local pos khi co player join game
        updateLocalPosPlayerJoin: function (userID, position) {
            //vi tri ng choi tren server
            this.positions[position] = userID;

            //sắp xếp lại
            this.sortPosition();
        },

        //update lai local pos khi co player leave game
        updateLocalPosPlayerLeave: function (userID) {
            //vi tri ng choi tren server
            for (var i = 0; i < this.maxPlayer; i++) {
                var accID = this.positions[i];
                //set lai userID = 0
                if (accID === userID) {
                    this.positions[i] = 0;
                    break;
                }
            }

            //sắp xếp lại
            this.sortPosition();
        },

        sortPosition: function () {
            //tim ra index cua owner tren server
            var ownerIndex = 0;
            for (var i = 0; i < this.maxPlayer; i++) {
                //tim xem userID cua owner o dau
                if (this.positions[i] === cc.LoginController.getInstance().getUserId()) {
                    ownerIndex = i;
                    break;
                }
            }

            //Săp xep vi tri trên local tu owner -> het
            for (i = ownerIndex; i < this.maxPlayer; i++) {
                this.positionsUI[i - ownerIndex] = this.positions[i];
            }

            //Săp xếp vi tri trên local từ 0 > owner
            for (i = 0; i < ownerIndex; i++) {
                this.positionsUI[i + this.maxPlayer - ownerIndex] = this.positions[i];
            }
        },

        //HubOn - joinGame
        joinGame: function (info) {
            //chuyen vi tri tren server sang local
            this.convertServerPosToLocalPos(info.Positions);

            //lay ve players
            var players = info.Players;

            //khi join game phai unReg het player cu
            for (var i = 0; i < this.maxPlayer; i++) {
                this.players[i].unRegisterPlayer();
            }

            for (var i = 0; i < this.maxPlayer; i++) {
                var accID = this.positionsUI[i];
                //cac vi tri co nguoi choi: accID > 0
                if (accID > 0) {
                    var player =  players[accID];
                    //register player
                    this.registerPlayer(i, player.Account ,player.Chips);
                }
            }

            this.updateRoomId(info.SessionID);
            this.updateMinBet(cc.Tool.getInstance().formatNumber(info.MinBet));

            //reset ban choi
            this.resetTable();
            //tat het UI action
            cc.PKController.getInstance().deActiveAllButton();


            //kiem tra xem player nao dang co action
            if (info.ClientElapsed > 0 && info.GameLoop.CurrentState.AccountID > 0) {
                this.startActions(info.ClientElapsed, info.GameLoop.CurrentState);
            }


            for (var i = 0; i < this.maxPlayer; i++) {
                var accID = this.positionsUI[i];
                //cac vi tri co nguoi choi: accID > 0
                if (accID > 0) {
                    if (players[accID].RegisterLeaveRoom && accID !== cc.LoginController.getInstance().getUserId()) {
                        cc.PKController.getInstance().updateConnectionStatus([accID, cc.ConnectionStatus.REGISTER_LEAVE_GAME]);
                    }

                    this.players[this.getIndexUIBetByAccID(accID)].updatePlayerStatus(players[accID].Status);

                }
            }
        },

        //HubOn - playerJoin
        playerJoin: function (info) {
            //update lai local pos khi co player join moi
            this.updateLocalPosPlayerJoin(info.AccountID, info.Position);

            var index = this.getIndexUIBetByAccID(info.AccountID);

            //register player
            this.registerPlayer(index, info.Account, info.Chips);

            this.players[index].updatePlayerStatus(info.Status);
        },

        //HubOn - playerLeave
        playerLeave: function (info) {
            //dam bao joinGame xong moi xu ly - tranh loi server neu bi
            if (this.positionsUI) {
                var accID = info[0];
                if(this.players[this.getIndexUIBetByAccID(accID)])
                    this.players[this.getIndexUIBetByAccID(accID)].resetPKPlayer();

                //unRegister player
                this.unRegisterPlayer(this.getIndexUIBetByAccID(accID));

                //update lai local pos khi co player leave game
                this.updateLocalPosPlayerLeave(accID);
            }
        },

        //HubOn - updateAccount
        updateAccount: function (info) {
            var accID = info[0].AccountID;
            var playerChips = info[1]; //tong so chip hien tai cua player
            var chips = info[2]; //so chip mua them

            //update chip o UI
            this.players[this.getIndexUIBetByAccID(accID)].updateChip(playerChips);

            //neu la owner moi xu ly them
            if (accID === cc.LoginController.getInstance().getUserId()) {
                //update lai balance sau khi buyIn
                cc.BalanceController.getInstance().updateRealBalance(info[0].Star);
                cc.BalanceController.getInstance().updateBalance(info[0].Star);

                cc.PopupController.getInstance().showMessage('Nạp thêm chip thành công.');
                cc.PKController.getInstance().hideBuyIn();
            }
        },

        //HubOn - updateConnectionStatus
        updateConnectionStatus: function (info) {
            var accID = info[0];
            var status = info[1];
            this.players[this.getIndexUIBetByAccID(accID)].updateConnectionStatus(status);

            //neu la owner dky rời game -> chuyển về chọn phong chơi
            // if (status === cc.ConnectionStatus.REGISTER_LEAVE_GAME && accID === cc.LoginController.getInstance().getUserId()) {
            //     cc.LobbyController.getInstance().destroyDynamicView(null);
            // }
        },

        //HubOn - updatePlayerStatus
        updatePlayerStatus: function (playerStatus) {
            // this.players[0].updatePlayerStatus(playerStatus);
        },

        //HubOn - notifyStartActions
        notifyStartActions: function (info) {
            var time = info[0]; //thoi gian action
            this.startActions(time, info[1]);
        },

        startActions: function (time, info) {
            var userID = info.AccountID;
            var defaultAction = info.DefautAction;
            var actions = info.Actions;

            var index = this.getIndexUIBetByAccID(userID);
            //chay animation dem lui thoi gian cua player
            this.players[index].startTimer(time);

            //neu la owner mới bật UI cho player action
            if (userID === cc.LoginController.getInstance().getUserId()) {
                //set default action
                cc.PKController.getInstance().setDefaultAction(defaultAction);
                //set list cac action
                cc.PKController.getInstance().setActions(actions);
                //bat giao dien theo action
                cc.PKController.getInstance().activeButtonByActions(actions);
            }
        },

        //HubOn - notifyStartActions
        notifyFinishActions: function (info) {
            var userID = info[0];
            var action = info[1];
            var amount = action.Amount; //so tien bet them
            var betInRound = action.BetInRound;
            var info = info[3]; //thong tin khac


            var index = this.getIndexUIBetByAccID(userID);

            //an animation dem lui thoi gian
            this.players[index].hideProgressTimer();

            //Xử lý theo action
            switch (action.Action.toString()) {
                case cc.PKAction.CHECK:
                    this.players[index].updateStatus(cc.PKActionName.CHECK);
                    break;
                case cc.PKAction.BET:
                    this.players[index].updateStatus(cc.PKActionName.BET);
                    this.players[index].subChip(amount);
                    //play fx chip bay ra + update totalChip bet
                    this.showChipBetInRound(index, amount, betInRound);
                    cc.DDNA.getInstance().betSummary(cc.DDNAGame.POKER_TEXAS, amount, cc.PKController.getInstance().getSID());
                    break;
                case cc.PKAction.CALL:
                    this.players[index].updateStatus(cc.PKActionName.CALL);
                    this.players[index].subChip(amount);
                    //play fx chip bay ra + update totalChip bet
                    this.showChipBetInRound(index, amount, betInRound);
                    cc.DDNA.getInstance().betSummary(cc.DDNAGame.POKER_TEXAS, amount, cc.PKController.getInstance().getSID());
                    break;
                case cc.PKAction.RAISE:
                    this.players[index].updateStatus(cc.PKActionName.RAISE);
                    this.players[index].subChip(amount);
                    //play fx chip bay ra + update totalChip bet
                    this.showChipBetInRound(index, amount, betInRound);
                    cc.DDNA.getInstance().betSummary(cc.DDNAGame.POKER_TEXAS, amount, cc.PKController.getInstance().getSID());
                    break;
                case cc.PKAction.FOLD:
                    this.players[index].updateStatus(cc.PKActionName.FOLD);
                    //doi mau player da fold + tat la bai + tat chip dat
                    this.players[index].updateColorByAction(action.Action);
                    this.cardFoldDemoView.drawCardFoldDemo(this.players[index].getCardPosition(), index);
                    break;
                case cc.PKAction.ALL_IN:
                    this.players[index].updateStatus(cc.PKActionName.ALL_IN);
                    this.players[index].subChipAllIn();
                    ///play fx chip bay ra + update totalChip bet
                    this.showChipBetInRound(index, amount, betInRound);
                    cc.DDNA.getInstance().betSummary(cc.DDNAGame.POKER_TEXAS, amount, cc.PKController.getInstance().getSID());
                    break;
            }

            //neu la owner tat UI action
            if (userID === cc.LoginController.getInstance().getUserId()) {
                cc.PKController.getInstance().deActiveAllButton();
            }
        },

        showChipBetInRound: function (index, amount, betInRound) {
            var player = this.players[index];
            player.pCard.cBet.showChipBet(betInRound);
            cc.PKController.getInstance().createChipMoveTo(amount, player.getPlayerPosition(), player.getBetPosition(), 0.1);
            cc.AudioController.getInstance().playSound(cc.AudioTypes.CHIP_BET);
        },

        //HubOn - refund
        refund: function (info) {
            // AccountID, diff (tien thua), chips, Pot
            //cap nhat lai so chip cua player
            this.players[this.getIndexUIBetByAccID(info[0])].updateChip(info[2]);

            //chay animation mo phong hoan tien

            //update lai so totalBet o Pot
        },

        //HubOn - joinGame + notify change phrase
        updateInfo: function (info, state, isJoinGame) {
            var self = this;
            this.updateSessionId(info.CurrentGameLoopID);
            cc.PKController.getInstance().setSID(info.CurrentGameLoopID);
            cc.PKController.getInstance().setCurrentRoomVal(info.MinBet);

            this.countPlayer = info.CountPlayer;

            //check state de xu ly hien thi
            switch (state) {
                //giai doan doi phien moi / chua du nguoi choi
                case cc.PKPhrase.WAITING: //54
                    //reset ban choi
                    this.resetTable();

                    //tat het UI action
                    cc.PKController.getInstance().deActiveAllButton();

                    //lay ra thong tin của cac player trên server
                    var sPlayers = info.Players;

                    //kiem tra xem co du nguoi choi de bat dau ko??
                    if (info.IsEnough) {
                        this.lbInfo.node.parent.active = true;
                        //du nguoi choi dem countdown bat dau game
                        this.lbInfo.string = 'Đợi ván mới...';
                        //this.startTimer(time);

                    } else {
                        //truong hop dang o trang thai waitting + chua du nguoi choi de bat dau
                        this.lbInfo.string = 'Đợi người chơi...';
                        this.lbInfo.node.parent.active = true;
                    }
                    break;

                //vong 1 - bet
                case cc.PKPhrase.PRE_FLOP:
                    this.lbInfo.node.parent.active = false;
                    //lay ra thong tin của cac player trên server
                    var sPlayers = info.Players;
                    this.sPlayers = sPlayers;

                    //remove card chia demo
                    this.cardDemoView.removeCardDemo();
                    this.cardDemoView.playAnimationDealerIdle();

                    //Hiển thi tiền bet
                    //Duyệt qua vị trí của tất cả player trên local
                    for (var i = 0; i < this.maxPlayer; i++) {
                        var userID = this.positionsUI[i];
                        //chỉ xử lý vị trí có player
                        if (userID > 0) {
                            //lưu playerUI
                            var player = this.players[i];
                            //get player info trên server
                            var pInfo = sPlayers[userID];

                            //so tiền bet hiện tại
                            var betInRound = pInfo.BetInRound;
                            //tong bet
                            var totalBet = pInfo.TotalBet;
                            //mang lá bài được chia {CardNumber, CardSuite, OrdinalValue}
                            var cards = pInfo.Cards; //

                            if (betInRound > 0)
                                player.pCard.cBet.showChipBet(betInRound);
                            else
                                player.pCard.cBet.hideChipBet();

                            //hide trang thai
                            player.hideStatus();
                            //update lai chip cua player
                            player.updateChip(pInfo.Chips);

                            //Kiem tra dau la Dealer (D) de show ra
                            if (pInfo.IsDelear) {
                                player.updateRole(cc.PKRole.DEALER);
                            } else {
                                player.updateRole(cc.PKRole.PLAYER);
                            }
                            player.updatePlayerStatus(pInfo.Status);
                        }
                    }

                    //ko phai join game
                    if (!isJoinGame) {
                        //chay animation chia bai cho player
                        this.cardDemoView.drawCardDemo(this.positionsUI, this.getIndexUIBetByAccID(info.GameLoop.Dealer));
                        //set timeout play lai anim idle cua dealer

                        //lay thoi gian chia bai
                        var timeDraw = this.cardDemoView.getTimeDraw(this.countPlayer);

                        //sau khi chia bai xong thi se show card
                        setTimeout (function () {
                            self.cardDemoView.removeCardDemo();
                            self.cardDemoView.playAnimationDealerIdle();
                            //Hiển thị bài của owner
                            //Hiển thị bài của player
                            for (var i = 0; i < self.maxPlayer; i++) {
                                var userID = self.positionsUI[i];
                                //chỉ xử lý vị trí có player
                                if (userID > 0) {
                                    //lưu playerUI
                                    var player = self.players[i];
                                    //get player info trên server
                                    var pInfo = sPlayers[userID];
                                    //mang lá bài được chia {CardNumber, CardSuite, OrdinalValue}
                                    var cards = pInfo.Cards; //
                                    if (pInfo.Status.toString() !== cc.PlayerStatus.VIEWER  && cards.length > 0) {
                                        //Kiêm tra xem có phải ownerID -> lật bài
                                        if (userID === cc.LoginController.getInstance().getUserId()) {
                                            // lật bài
                                            player.pCard.flipCard([cards[0].OrdinalValue, cards[1].OrdinalValue], true);
                                        } else {
                                            // chỉ show bài ko lật
                                            player.pCard.showCard();
                                        }
                                    }
                                }
                            }
                        }, timeDraw + 100);
                    } else {
                        //show bai luon
                        self.cardDemoView.playAnimationDealerIdle();
                        //Hiển thị bài của owner
                        //Hiển thị bài của player
                        for (var i = 0; i < self.maxPlayer; i++) {
                            var userID = self.positionsUI[i];
                            //chỉ xử lý vị trí có player
                            if (userID > 0) {
                                //lưu playerUI
                                var player = self.players[i];
                                //get player info trên server
                                var pInfo = sPlayers[userID];
                                //mang lá bài được chia {CardNumber, CardSuite, OrdinalValue}
                                var cards = pInfo.Cards; //
                                if (pInfo.Status.toString() !== cc.PlayerStatus.VIEWER  && cards.length > 0) {
                                    //Kiêm tra xem có phải ownerID -> lật bài
                                    if (userID === cc.LoginController.getInstance().getUserId()) {
                                        // lật bài
                                        player.pCard.flipCard([cards[0].OrdinalValue, cards[1].OrdinalValue], true);
                                    } else {
                                        // chỉ show bài ko lật
                                        player.pCard.showCard();
                                    }
                                }
                            }
                        }
                    }


                    break;

                //vong 2 - mo 3 la bai
                case cc.PKPhrase.FLOP:
                    this.lbInfo.node.parent.active = false;
                    //lay ra thong tin của cac player trên server
                    var sPlayers = info.Players;

                    //update lai pot + chat animation update pot
                    this.totalCBet.showChipBet(info.GameLoop.Pot); //TempPot

                    //Duyệt qua vị trí của tất cả player trên local
                    for (var i = 0; i < this.maxPlayer; i++) {
                        var userID = this.positionsUI[i];
                        //chỉ xử lý vị trí có player
                        if (userID > 0) {
                            //lưu playerUI
                            var player = this.players[i];
                            //get player info trên server
                            var pInfo = sPlayers[userID];

                            //so tiền bet hiện tại
                            var betInRound = pInfo.BetInRound;
                            //tong bet
                            var totalBet = pInfo.TotalBet;

                            //mang lá bài được chia {CardNumber, CardSuite, OrdinalValue}
                            var cards = pInfo.Cards; //

                            if (isJoinGame) {
                                if (pInfo.Status.toString() !== cc.PlayerStatus.VIEWER && cards.length > 0) {
                                    //Kiêm tra xem có phải ownerID -> lật bài
                                    if (userID === cc.LoginController.getInstance().getUserId()) {
                                        // lật bài
                                        player.pCard.flipCard([cards[0].OrdinalValue, cards[1].OrdinalValue], true);
                                    } else {
                                        // chỉ show bài ko lật
                                        player.pCard.showCard();
                                    }
                                }

                                //Kiem tra dau la Dealer (D) de show ra
                                if (pInfo.IsDelear) {
                                    player.updateRole(cc.PKRole.DEALER);
                                } else {
                                    player.updateRole(cc.PKRole.PLAYER);
                                }
                            } else {
                                if (totalBet > 0 && totalBet > this.sPlayers[userID].TotalBet) {
                                    // chay fx chip bay tu ban ve player
                                    cc.PKController.getInstance().createChipMoveTo(totalBet, player.getBetPosition(), this.potPostion, 0.5);
                                    cc.AudioController.getInstance().playSound(cc.AudioTypes.CHIP_BET);
                                }
                            }

                            if (betInRound > 0)
                                player.pCard.cBet.showChipBet(betInRound);
                            else
                                player.pCard.cBet.hideChipBet();

                            //hide trang thai
                            player.hideStatus();

                            // if (totalBet > 0)
                            //     player.pCard.cBet.showChipBet(totalBet);

                            //update lai chip cua player
                            player.updateChip(pInfo.Chips);
                        }
                    }

                    if (isJoinGame) {
                        //show 3 la bai chung + ko chay anim
                        this.middleCard.forceOpenThreeCard(info.GameLoop.CommunityCards);
                    } else {
                        //show 3 la bai chung
                        this.middleCard.openThreeCard(info.GameLoop.CommunityCards);
                    }

                    this.sPlayers = sPlayers;
                    break;

                //vong 3 - mo la bai 4
                case cc.PKPhrase.TURN:
                    this.lbInfo.node.parent.active = false;
                    //lay ra thong tin của cac player trên server
                    var sPlayers = info.Players;

                    //update lai pot + chat animation update pot
                    this.totalCBet.showChipBet(info.GameLoop.Pot); //TempPot

                    //Duyệt qua vị trí của tất cả player trên local
                    for (var i = 0; i < this.maxPlayer; i++) {
                        var userID = this.positionsUI[i];
                        //chỉ xử lý vị trí có player
                        if (userID > 0) {
                            //lưu playerUI
                            var player = this.players[i];
                            //get player info trên server
                            var pInfo = sPlayers[userID];

                            //so tiền bet hiện tại
                            var betInRound = pInfo.BetInRound;
                            //tong bet
                            var totalBet = pInfo.TotalBet;

                            //mang lá bài được chia {CardNumber, CardSuite, OrdinalValue}
                            var cards = pInfo.Cards; //

                            if (isJoinGame) {
                                if (pInfo.Status.toString() !== cc.PlayerStatus.VIEWER && cards.length > 0) {
                                    //Kiêm tra xem có phải ownerID -> lật bài
                                    if (userID === cc.LoginController.getInstance().getUserId()) {
                                        // lật bài
                                        player.pCard.flipCard([cards[0].OrdinalValue, cards[1].OrdinalValue], true);
                                    } else {
                                        // chỉ show bài ko lật
                                        player.pCard.showCard();
                                    }
                                }

                                //Kiem tra dau la Dealer (D) de show ra
                                if (pInfo.IsDelear) {
                                    player.updateRole(cc.PKRole.DEALER);
                                } else {
                                    player.updateRole(cc.PKRole.PLAYER);
                                }
                            } else {
                                if (totalBet > 0 && totalBet > this.sPlayers[userID].TotalBet) {
                                    // chay fx chip bay tu ban ve player
                                    cc.PKController.getInstance().createChipMoveTo(totalBet, player.getBetPosition(), this.potPostion, 0.5);
                                    cc.AudioController.getInstance().playSound(cc.AudioTypes.CHIP_BET);
                                }
                            }

                            if (betInRound > 0)
                                player.pCard.cBet.showChipBet(betInRound);
                            else
                                player.pCard.cBet.hideChipBet();

                            //hide trang thai
                            player.hideStatus();

                            // if (totalBet > 0)
                            //     player.pCard.cBet.showChipBet(totalBet);

                            //update lai chip cua player
                            player.updateChip(pInfo.Chips);
                        }
                    }

                    if (isJoinGame) {
                        //show 4 la bai chung + ko chay anim
                        this.middleCard.forceOpenThreeCard(info.GameLoop.CommunityCards);
                        this.middleCard.forceOpenNumberFourCard(info.GameLoop.CommunityCards[3]);
                    } else {
                        //show la bai thu 4
                        this.middleCard.forceOpenThreeCard(info.GameLoop.CommunityCards);
                        this.middleCard.openNumberFourCard(info.GameLoop.CommunityCards[3]);
                    }

                    this.sPlayers = sPlayers;

                    break;

                //vong 4 - mo la bai 5
                case cc.PKPhrase.RIVER:
                    this.lbInfo.node.parent.active = false;
                    //lay ra thong tin của cac player trên server
                    var sPlayers = info.Players;

                    //update lai pot + chat animation update pot
                    this.totalCBet.showChipBet(info.GameLoop.Pot); //TempPot

                    //Duyệt qua vị trí của tất cả player trên local
                    for (var i = 0; i < this.maxPlayer; i++) {
                        var userID = this.positionsUI[i];
                        //chỉ xử lý vị trí có player
                        if (userID > 0) {
                            //lưu playerUI
                            var player = this.players[i];
                            //get player info trên server
                            var pInfo = sPlayers[userID];

                            //so tiền bet hiện tại
                            var betInRound = pInfo.BetInRound;
                            //tong bet
                            var totalBet = pInfo.TotalBet;

                            //mang lá bài được chia {CardNumber, CardSuite, OrdinalValue}
                            var cards = pInfo.Cards; //

                            if (isJoinGame) {
                                if (pInfo.Status.toString() !== cc.PlayerStatus.VIEWER && cards.length > 0) {
                                    //Kiêm tra xem có phải ownerID -> lật bài
                                    if (userID === cc.LoginController.getInstance().getUserId()) {
                                        // lật bài
                                        player.pCard.flipCard([cards[0].OrdinalValue, cards[1].OrdinalValue], true);
                                    } else {
                                        // chỉ show bài ko lật
                                        player.pCard.showCard();
                                    }
                                }

                                //Kiem tra dau la Dealer (D) de show ra
                                if (pInfo.IsDelear) {
                                    player.updateRole(cc.PKRole.DEALER);
                                } else {
                                    player.updateRole(cc.PKRole.PLAYER);
                                }
                            } else {
                                if (totalBet > 0 && totalBet > this.sPlayers[userID].TotalBet) {
                                    // chay fx chip bay tu ban ve player
                                    cc.PKController.getInstance().createChipMoveTo(totalBet, player.getBetPosition(), this.potPostion, 0.5);
                                    cc.AudioController.getInstance().playSound(cc.AudioTypes.CHIP_BET);
                                }
                            }

                            if (betInRound > 0)
                                player.pCard.cBet.showChipBet(betInRound);
                            else
                                player.pCard.cBet.hideChipBet();

                            //hide trang thai
                            player.hideStatus();

                            // if (totalBet > 0)
                            //     player.pCard.cBet.showChipBet(totalBet);

                            //update lai chip cua player
                            player.updateChip(pInfo.Chips);
                        }
                    }

                    if (isJoinGame) {
                        //show 5 la bai chung + ko chay anim
                        this.middleCard.forceOpenThreeCard(info.GameLoop.CommunityCards);
                        this.middleCard.forceOpenNumberFourCard(info.GameLoop.CommunityCards[3]);
                        this.middleCard.forceOpenNumberFiveCard(info.GameLoop.CommunityCards[4]);
                    } else {
                        //show la bai thu 5
                        this.middleCard.forceOpenThreeCard(info.GameLoop.CommunityCards);
                        this.middleCard.forceOpenNumberFourCard(info.GameLoop.CommunityCards[3]);
                        this.middleCard.openNumberFiveCard(info.GameLoop.CommunityCards[4]);
                    }

                    this.sPlayers = sPlayers;

                    break;

                //lat bai
                case cc.PKPhrase.SHOW_DOWN:
                    this.lbInfo.node.parent.active = false;
                    //lay ra thong tin của cac player trên server
                    var sPlayers = info.Players;

                    if (info.GameLoop.CommunityCards.length > 0 && info.GameLoop.CommunityCards[0].OrdinalValue >= 0) {
                        //show 5 la bai chung + ko chay anim
                        this.middleCard.forceOpenThreeCard(info.GameLoop.CommunityCards);
                        //phai check do TH chia 3 la xong co player FOLD -> ko co card 4, 5
                        if (info.GameLoop.CommunityCards.length > 3) {
                            this.middleCard.forceOpenNumberFourCard(info.GameLoop.CommunityCards[3]);
                            if (info.GameLoop.CommunityCards.length > 4) {
                                this.middleCard.forceOpenNumberFiveCard(info.GameLoop.CommunityCards[4]);
                            }
                        }
                    }

                    //Duyệt qua vị trí của tất cả player trên local
                    for (var i = 0; i < this.maxPlayer; i++) {
                        var userID = this.positionsUI[i];
                        //chỉ xử lý vị trí có player
                        if (userID > 0) {
                            //lưu playerUI
                            var player = this.players[i];
                            //get player info trên server
                            var pInfo = sPlayers[userID];

                            //tong bet
                            var totalBet = pInfo.TotalBet;

                            //mang lá bài được chia {CardNumber, CardSuite, OrdinalValue}
                            var cards = pInfo.Cards; //

                            if (isJoinGame && cards.length > 0 && cards[0].OrdinalValue >= 0) {
                                if (pInfo.Status.toString() !== cc.PlayerStatus.VIEWER) {
                                    //Kiêm tra xem có phải ownerID -> lật bài
                                    if (userID === cc.LoginController.getInstance().getUserId()) {
                                        // lật bài
                                        player.pCard.flipCard([cards[0].OrdinalValue, cards[1].OrdinalValue], true);
                                    } else {
                                        // chỉ show bài ko lật
                                        player.pCard.showCard();
                                    }
                                }
                                //Kiem tra dau la Dealer (D) de show ra
                                if (pInfo.IsDelear) {
                                    player.updateRole(cc.PKRole.DEALER);
                                } else {
                                    player.updateRole(cc.PKRole.PLAYER);
                                }
                            } else {
                                if (info.GameLoop.CommunityCards.length > 0 && totalBet > 0 && totalBet > this.sPlayers[userID].TotalBet) {
                                    // chay fx chip bay tu ban ve player
                                    cc.PKController.getInstance().createChipMoveTo(totalBet, player.getBetPosition(), this.potPostion, 0.5);
                                    cc.AudioController.getInstance().playSound(cc.AudioTypes.CHIP_BET);
                                }
                            }

                            //an het so tien bet
                            player.pCard.cBet.hideChipBet();



                            //hide trang thai
                            player.hideStatus();

                            //bai cao nhat
                            var hand = pInfo.BestHandInfo.Name; //CardValues[[],[]]

                            //co 2 player ko action -> refund (TH 2 n: player 1: refund = 2000, revenue = 1000; player 2: revenue = -1000)
                            if (info.GameLoop.CommunityCards.length === 0 || hand === 0) {
                                //duoc hoan tra
                                if (pInfo.Result.Revenue > 0) {
                                    player.playerResultUI(true, pInfo.Result.Revenue, hand);
                                    cc.AudioController.getInstance().playSound(cc.AudioTypes.HAND_WIN);

                                    //neu da bet qua vong PRE_FLOP
                                    if (info.GameLoop.CommunityCards.length > 0) {
                                        //hide POT
                                        this.totalCBet.hideChipBet(); //TempPot
                                        // chay fx chip bay tu ban ve player
                                        cc.PKController.getInstance().createChipMoveTo(pInfo.Result.Revenue, this.potPostion, player.getPlayerPosition(), 0.5);
                                        cc.AudioController.getInstance().playSound(cc.AudioTypes.CHIP_BET);
                                    }
                                } else if (pInfo.Result.Revenue < 0) {
                                    player.playerResultUI(false, pInfo.Result.Revenue);
                                }

                                player.updateChip(pInfo.Chips);
                            } else {
                                //neu chua Fold
                                if (!pInfo.IsFold && pInfo.Cards.length > 0) {
                                    var cardIds = [pInfo.Cards[0].OrdinalValue, pInfo.Cards[1].OrdinalValue];
                                    //play fx lat bai neu ko phai la owner
                                    if (userID !== cc.LoginController.getInstance().getUserId()) {
                                        player.pCard.flipCard(cardIds, false);
                                    }

                                    //chi show o bai win
                                    if (pInfo.Result.Revenue > 0) {
                                        //highlight quan bai win
                                        player.pCard.showHighLight(cardIds, pInfo.BestHandInfo.CardValues[0]);
                                    }
                                }


                                //ko phai joinGame hoac joinGame + thoi gian cho con lai phai >= 2s
                                if (!isJoinGame || (isJoinGame && info.ClientElapsed >= 3)) {
                                    setTimeout(function (player, pInfo, hand) {
                                        self.playPlayerResult(player, pInfo, hand);
                                    }, 1500, player, pInfo, hand);
                                } else {
                                    //joinGame muon qua thi play fx luon
                                    this.playPlayerResult(player, pInfo, hand);
                                }

                                //neu la owner
                                if (userID === cc.LoginController.getInstance().getUserId()) {
                                    //play animation hand cao nhat
                                    cc.PKController.getInstance().showResult(hand);

                                }

                                //show la bai chung highlight lay du lieu o player win
                                if (pInfo.Result.Revenue > 0) {
                                    //show la bai highlight o bai chung
                                    this.middleCard.showHighLight(pInfo.BestHandInfo.CardValues[1]);
                                }
                            }
                        }
                    }

                    this.sPlayers = sPlayers;

                    break;

                //sau khi lat bai
                case cc.PKPhrase.AFTER_SHOW_DOWN:

                    break;
            }

            //luu lai state hien tai
            this.currentState = state;
        },

        playPlayerResult: function (player, pInfo, hand) {
            //hide POT
            this.totalCBet.hideChipBet(); //TempPot

            //hien thi so tien thang thua + fx cua player
            if (pInfo.Result.Revenue > 0) {
                //update lai chip cua player
                player.updateChip(pInfo.Chips);
                player.playerResultUI(true, pInfo.Result.Revenue, hand);
                // chay fx chip bay tu ban ve player
                cc.PKController.getInstance().createChipMoveTo(pInfo.Result.Revenue, this.potPostion, player.getPlayerPosition(), 0.5);
                cc.AudioController.getInstance().playSound(cc.AudioTypes.CHIP_BET);
                cc.AudioController.getInstance().playSound(cc.AudioTypes.HAND_WIN);
            } else if (pInfo.Result.Revenue < 0) {
                //update lai chip cua player
                player.updateChip(pInfo.Chips);
                player.playerResultUI(false, pInfo.Result.Revenue);
            } else {
                //update lai chip cua player
                player.updateChip(pInfo.Chips);
            }

            //hide ket qua o giua ban
            cc.PKController.getInstance().hideResult();
        },

        //reset ban choi de bat dau van moi
        resetTable: function () {
            //Duyệt qua vị trí của tất cả player trên local
            for (var i = 0; i < this.maxPlayer; i++) {
                    //lưu playerUI
                    var player = this.players[i];

                    player.resetPKPlayer();

                    player.pCard.cBet.hideChipBet();
                    player.pCard.hideCard();
            }

            //an chip bet
            this.totalCBet.hideChipBet();

            //an het bai chung
            this.middleCard.hideAllCard();

            //an fx ket qua (hand)
            cc.PKController.getInstance().hideResult();

        },

        updateChip: function (accID, chip) {
            this.players[this.getIndexUIBetByAccID(accID)].updateChip(chip);
        },

        getPositions: function () {
            return this.positionsUI;
        },

        //lay ve index bet theo accID
        getIndexUIBetByAccID: function (accID) {
            for (var i = 0; i < this.maxPlayer; i++) {
                if (this.positionsUI[i] === accID) {
                    return i
                }
            }
        },

        //reset UI ket qua (win/lose) sau moi Phien cua tat ca player
        resetPlayersResultUI: function () {
            for (var i = 0; i < this.maxPlayer; i++) {
                this.players[i].resetPlayerResultUI();
            }
        },

        //player vao phong
        registerPlayer: function (playerIndex, info, chips) {
            if(this.players[playerIndex])
                this.players[playerIndex].registerPlayer(info, chips);
        },

        unRegisterPlayer: function (playerIndex) {
            if(this.players[playerIndex])
                this.players[playerIndex].unRegisterPlayer();
        },

        playerShowBubbleChat: function (message) {
            if (cc.ChatRoomController.getInstance().checkIsEmotion(message)) {
                this.players.forEach(function (player) {
                    if (player.lbName.string === cc.Config.getInstance().formatName(message[0], 7)
                    && player.lbSID.string === cc.Config.getInstance().getServiceNameNoFormat(message[2])) {
                        player.showEmotion(cc.ChatRoomController.getInstance().getIndexEmotion(message)
                            , message);
                    }
                });
            } else {
                this.players.forEach(function (player) {
                    if (player.lbName.string === cc.Config.getInstance().formatName(message[0], 7)
                        && player.lbSID.string === cc.Config.getInstance().getServiceNameNoFormat(message[2])) {
                        player.showBubbleChat(message);
                    }
                });
            }

        },

        resetTimer: function () {
            this.isTimer = false;
            this.timer = 0;
            this.currentState = 999;
            if (this.interval !== null) {
                clearInterval(this.interval);
            }

            if (this.lbTimer) {
                this.lbTimer.string = '';
                this.lbTimer.node.parent.active = false;
            }
        },

        startTimer: function (remaining) {
            if (this.interval !== null) {
                clearInterval(this.interval);
            }

            this.lbTimer.node.parent.active = true;

            var self = this;
            this.timer = remaining;
            this.isTimer = true;

            ////update timer UI
            this.updateTimer(remaining);

            this.interval = setInterval(function(){
                if (self.isTimer) {
                    self.timer -= 1;
                    self.updateTimer(self.timer);
                }
            }, 1000);

        },

        updateTimer: function (time) {
            if (this.lbTimer) {
                // var timeInt =  Math.round(time);
                var timeInt =  time;
                this.timeInt = timeInt;

                if (timeInt > 0) {
                    this.lbTimer.string = timeInt;
                } else {
                    this.resetTimer();
                }
            }
        },

        getTime: function () {
            return this.timeInt;
        },

        updateMinBet: function (minBet) {
            this.lbMinBet.string = 'Phòng: ' + minBet;
        },

        updateRoomId: function (roomID) {
            this.lbRoomID.string = 'Bàn: ' + roomID;
        },

        updateSessionId: function (sID) {
            this.lbSID.string = 'Phiên: #' + sID;
        },


    });
}).call(this);
