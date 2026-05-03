/**
 * Created by Welcome on 5/28/2019.
 */
const TWEEN = cc.tween;
(function () {
    cc.BCInfoView = cc.Class({
        "extends": cc.Component,
        properties: {
            //phien
            lbSID: cc.Label,
            //roomID
            lbRoomID: cc.Label,
            //roomID
            lbTableId: cc.Label,
            //giai doan (đặt cửa, kết quả...)
            lbInfo: cc.Label,

            lbPlayerStatus: cc.Label,

            //players
            BCPlayers: [cc.BCPlayer],

            //sprite card back
            spriteCardBack: cc.SpriteFrame,

            dealer: sp.Skeleton,
            // tong tien gop ga
            lbTotalFeedChicken: cc.LabelIncrement,

            //Nan bai
            fatBackCard: cc.Sprite,
            fatFirstCard: cc.Sprite,
            fatSecondCard: cc.Sprite,
            fatThirdCard: cc.Sprite,

            //layout Nan
            layoutNan: cc.Node,
            lbTimeNan: cc.Label,

            //Popup Win
            popUpWin: cc.Node
        },

        onLoad: function () {
            this.interval = null;
            cc.BCController.getInstance().setBCInfoView(this);

            this.maxPlayer = this.BCPlayers.length;

            this.animInfo = this.lbInfo.node.parent.getComponent(cc.Animation);
            this.activeLayoutNan(false);
            this.currentState = null;
            this.currPlayer = null;
            this.currentStateHide = null;
            this.timeHide = 0;
            this.intervalHide = null;

            cc.game.on(cc.game.EVENT_SHOW, function () {
                // Hien thi bai theo trang thai state
                switch (this.currentState) {
                    case cc.BCState.WAITING:
                    case cc.BCState.BETTING:
                        this.activeCardPlayersWhenGameActive(true, false, true);
                        break;
                    case cc.BCState.DEALER:
                        this.activeCardPlayersWhenGameActive(true, true, true);
                        break;
                    case cc.BCState.FLIP:
                    case cc.BCState.FINISH:
                        this.activeCardPlayersWhenGameActive(true, true, true);
                        break;
                }
            }, this);

        },
        // cho viec chuyen tab
        activeCardPlayersWhenGameActive: function (active, isOpacity, isShowBack) {
            this.positionsUI.forEach(function (accID) {
                if (accID > 0) {
                    let pl = this.BCPlayers[this.getIndexUIBetByAccID(accID)];

                    pl.cardFirst.active = active;
                    pl.cardSecond.active = active;
                    pl.cardThird.active = active;
                    if (isOpacity) {
                        pl.cardFirst.opacity = 255;
                        pl.cardSecond.opacity = 255;
                        pl.cardThird.opacity = 255;
                    } else {
                        pl.cardFirst.opacity = 0;
                        pl.cardSecond.opacity = 0;
                        pl.cardThird.opacity = 0;
                    }
                    if (isShowBack) {
                        pl.cardFirst.spriteFrame = this.spriteCardBack;
                        pl.cardSecond.spriteFrame = this.spriteCardBack;
                        pl.cardThird.spriteFrame = this.spriteCardBack;
                    }

                }
            }, this);
        },
        hidePlayerStatus: function () {
            this.lbPlayerStatus.node.active = false;
        },

        //HubOn - joinGame
        joinGame: function (info) {
            // set chuong
            cc.BCController.getInstance().setOwnerID(info.OwnerID);
            // update hien thi layout bet
            cc.BCController.getInstance().enableLayoutBet(true);

            //lay ve mang vi tri player
            this.positions = info.Positions;

            this.countPlayer = 0;
            //luu vi tri player tren UI
            this.positionsUI = [0, 0, 0, 0, 0, 0, 0];

            //tim index của owner
            this.onwerIndex = 0;

            //gan vi tri Owner
            this.positionsUI[this.countPlayer] = cc.LoginController.getInstance().getUserId();

            this.countPlayer++;
            for (var i = 0; i < this.maxPlayer; i++) {
                var accID = this.positions[i];
                //add vi tri cac accID khac vao position tren UI
                if (accID > 0 && accID !== cc.LoginController.getInstance().getUserId()) {
                    this.positionsUI[this.countPlayer] = accID;
                    this.countPlayer++;
                }
            }

            //Cap nhat thong tin bet
            //GameLoop
            let gameLooop = info.GameLoop;
            let betLogs = gameLooop.BetLogs;
            let betOhters = gameLooop.BetOtherLogs;
            let feedChickenLogs = gameLooop.FedChickenLogs;
            //update chicken bet log
            if (feedChickenLogs.length > 0) {
                let betRoom = cc.BCController.getInstance().getBetRoom();
                this.lbTotalFeedChicken.tweenValueto(betRoom * feedChickenLogs.length);
            }
            let pharse = gameLooop.Phrase;
            let timeElapse = gameLooop.Elapsed;

            //lay ve players
            var players = info.Players;

            for (var i = 0; i < this.maxPlayer; i++) {
                var accID = this.positions[i];
                //cac vi tri co nguoi choi: accID > 0
                if (accID > 0) {
                    this.registerPlayer(this.getIndexUIBetByAccID(accID), players[accID].Account, players[accID].Status);
                    //Kiem tra trang thai cua player neu la viewer thi thong bao cho van moi, an layout bet
                    if (accID == cc.LoginController.getInstance().getUserId()) {
                        if (players[accID].Status == 0) {
                            if (this.countPlayer > 1) {
                                this.lbPlayerStatus.node.active = true;
                            }
                            this.lbPlayerStatus.string = "CHỜ VÁN MỚI";
                            let currPlayer = this.BCPlayers[this.getIndexUIBetByAccID(accID)];

                            //active bai
                            currPlayer.cardFirst.active = true;
                            currPlayer.cardSecond.active = true;
                            currPlayer.cardThird.active = true;

                            currPlayer.cardFirst.opacity = 0;
                            currPlayer.cardSecond.opacity = 0;
                            currPlayer.cardThird.opacity = 0;
                            currPlayer.setAvatarBlur();

                            // Hien thi layout bet theo pharse
                            cc.BCController.getInstance().updateUIActionBet(cc.BCState.WAITING);
                        } else {
                            // Hien thi layout bet theo pharse
                            cc.BCController.getInstance().updateUIActionBet(pharse);
                        }

                    }
                }
            }

            this.updateRoomId(info.SessionID);


            // Cap nhat trang thai game
            this.updateStatusGame(pharse);
            //get list accID
            let lstAcc = Object.keys(betLogs);
            if (lstAcc.length > 0) {
                for (let i = 0; i < lstAcc.length; i++) {
                    let accID = parseInt(lstAcc[i]);
                    let betValue = betLogs[accID];

                    // update neu betValue > 0
                    let playerBet = this.BCPlayers[this.getIndexUIBetByAccID(accID)];
                    // update icon chuong
                    if (accID == info.OwnerID) {
                        playerBet.activeChuong(true);
                    }
                    //active bai
                    playerBet.cardFirst.active = true;
                    playerBet.cardSecond.active = true;
                    playerBet.cardThird.active = true;
                    let handCard = players[accID].Hand;
                    //Mo bai
                    switch (pharse) {
                        case cc.BCState.BETTING:
                            // console.log('BETTING ko mo bai')
                            playerBet.cardFirst.active = false;
                            playerBet.cardSecond.active = false;
                            playerBet.cardThird.active = false;
                            break;
                        case cc.BCState.DEALER:
                            // console.log('DEALER ko mo bai')
                            playerBet.cardFirst.spriteFrame = this.spriteCardBack;
                            playerBet.cardSecond.spriteFrame = this.spriteCardBack;
                            playerBet.cardThird.spriteFrame = this.spriteCardBack;
                            break;
                        case cc.BCState.FLIP:
                            // console.log('FLIP mo bai')
                            playerBet.showCards(handCard, true);
                            break;
                        case cc.BCState.FINISH:
                            // console.log('FINISH mo bai')
                            playerBet.showCards(handCard, true);
                            break;
                    }
                    if (betValue > 0) {
                        // hien thi tien bet
                        playerBet.showLogBet(betValue);
                    }
                }
            }
        },

        //HubOn - playerJoin
        playerJoin: function (info) {
            for (var i = 0; i < this.maxPlayer; i++) {
                var accID = this.positionsUI[i];
                if (accID === 0) {
                    this.positionsUI[i] = info.Account.AccountID;
                    let status = info.Status;
                    this.registerPlayer(i, info.Account, status);
                    break;
                }
            }
        },

        //HubOn - playerLeave
        playerLeave: function (info) {
            //dam bao joinGame xong moi xu ly - tranh loi server neu bi
            if (this.positionsUI) {
                var accID = parseInt(info[0]);
                if (accID == cc.LoginController.getInstance().getUserId()) {
                    this.lbTotalFeedChicken.tweenValueto(0);
                    // Reset lai het vi tri cua user
                    for (let i = 0; i < this.maxPlayer; i++) {
                        let accID = this.positionsUI[i];
                        if (accID > 0) {
                            this.unRegisterPlayer(this.getIndexUIBetByAccID(accID));
                            this.positionsUI[i] = 0;
                        }
                    }
                } else {
                    this.unRegisterPlayer(this.getIndexUIBetByAccID(accID));

                    var index = -1;
                    for (var i = 0; i < this.maxPlayer; i++) {
                        if (accID === this.positionsUI[i]) {
                            index = i;
                            break;
                        }
                    }
                    this.positionsUI[index] = 0;
                }

            }
        },
        //HubOn - startAnimationTime - chia bai
        startAnimationTime: function (currPlayer, dataTime, players) {

            //dam bao joinGame xong moi xu ly - tranh loi server neu bi
            let activePos = []; // Vi tri active
            if (this.positionsUI) {
                // lay nhung vi tri co user
                for (let i = 0; i < this.positionsUI.length; i++) {
                    let accID = this.positionsUI[i];
                    if (accID > 0) {
                        // kiem tra status cua player
                        // neu status INGAME moi chia bai
                        let isPlayerINGAME = players[accID].Status == 1;
                        if (isPlayerINGAME)
                            activePos.push(i);
                    }
                }
                // xap xep lai thu tu
                activePos.reverse();
                this.currPlayer = currPlayer;
                cc.BCController.getInstance().setActivePos(activePos);
                let isCurrINGAME = players[cc.LoginController.getInstance().getUserId()].Status == 1;
                let sqMoveCard = cc.sequence([
                    cc.delayTime(0),
                    cc.callFunc(function () {
                        this.moveCardsActive(activePos, dataTime.Time, isCurrINGAME);
                    }, this)
                ]);

                this.node.runAction(sqMoveCard);

            }
        },

        //HubOn: updateFeedChickenUI
        updateFeedChickenUI: function (data) {
            let accId = data[0];
            let feedChickenValue = data[1];
            let player = this.BCPlayers[this.getIndexUIBetByAccID(accId)];
            let betRoom = cc.BCController.getInstance().getBetRoom();
            player.playerFetChicken(betRoom);
            this.lbTotalFeedChicken.tweenValueto(feedChickenValue);
        },

        //update balance cho player
        updateBalancePlayers: function (players) {
            let lstAccId = Object.keys(players);
            for (let i = 0; i < lstAccId.length; i++) {
                let acc = players[lstAccId[i]].Account;
                let accId = acc.AccountID;
                let star = acc.Star;
                let player = this.BCPlayers[this.getIndexUIBetByAccID(accId)];
                player.updateChip(star);
                if (accId == cc.LoginController.getInstance().getUserId()) {
                    cc.BalanceController.getInstance().updateRealBalance(star)
                }
            }
        },

        //chia bai theo tung vi tri active cua user
        moveCardsActive: function (arrPosActive, times, isCurrINGAME) {
            this.dealerStartSlideCard();
            let nodesFirst = [];
            let nodesSecond = [];
            let nodesThird = [];
            for (let i = 0; i < arrPosActive.length; i++) {

                this.BCPlayers[arrPosActive[i]].isOpened = false;

                let cdF = this.BCPlayers[arrPosActive[i]].cardFirst;
                let cdS = this.BCPlayers[arrPosActive[i]].cardSecond;
                let cdT = this.BCPlayers[arrPosActive[i]].cardThird;

                cdF.getComponent(cc.Sprite).spriteFrame = this.spriteCardBack;
                cdS.getComponent(cc.Sprite).spriteFrame = this.spriteCardBack;
                cdT.getComponent(cc.Sprite).spriteFrame = this.spriteCardBack;

                nodesFirst.push(cdF);
                nodesSecond.push(cdS);
                nodesThird.push(cdT);
            }
            this.nodesCardActive = [...nodesFirst, ...nodesSecond, ...nodesThird];
            this.moveCards(this.nodesCardActive, times, isCurrINGAME);
            setTimeout(function () {
                this.dealerStopSlideCard();
                // Hien thi layout Nan
            }.bind(this), 600)
        },
        // Lay player theo accID
        getHandsCardByAccId: function (accId) {
            return this.BCPlayers[this.getIndexUIBetByAccID(accId)];
        },

        // Cap nhat trang thai phong choi
        updateStatusGame: function (state) {
            if (this.currentState == state)
                return;
            this.currentState = state;
            let strState = "";
            switch (state) {
                case cc.BCState.WAITING:
                case cc.BCState.CONFIRM:
                    strState = "CHỜ VÁN MỚI";
                    break;
                case cc.BCState.BETTING:
                    strState = "ĐẶT CƯỢC";
                    break;
                case cc.BCState.DEALER:
                    strState = "CHIA BÀI";
                    break;
                case cc.BCState.FLIP:
                case cc.BCState.FINISH:
                    strState = "KẾT QUẢ";
                    break;
            }
            this.lbInfo.getComponent(cc.Animation).play('change_status');
            this.lbInfo.string = strState;
        },
        // Start Animation dealer chia bai
        dealerStartSlideCard: function () {
            this.dealer.clearTracks();
            this.dealer.setToSetupPose();
            this.dealer.setAnimation(0, 'deal', true);
        },
        //Stop Animation dealer chia bai
        dealerStopSlideCard: function () {
            this.dealer.clearTracks();
            this.dealer.setToSetupPose();
            this.dealer.setAnimation(0, 'animation', true);
        },

        // Chia bai
        moveCards: function (nodesCard, times, isCurrINGAME) {
            var loop = 0;
            for (let i = 0; i < nodesCard.length; i++) {
                let node = nodesCard[i];
                //let spriteFrameBack = node.getComponent(cc.SpriteAtlas).getSpriteFrame('B');

                node.getComponent(cc.Sprite).spriteFrame = this.spriteCardBack;
                node.opacity = 0;
                cc.AudioController.getInstance().playSound(cc.AudioTypes.MOVE_CARD);
                TWEEN(node)
                // The defference delay should only eval once
                    .delay(i * 0.05)
                    // repeat 1000 times
                    .repeat(1,
                        TWEEN()
                        // first reset node properties
                            .call(function () {
                                node.getComponent(cc.Sprite).spriteFrame = this.spriteCardBack;

                            }.bind(this))
                            .set({opacity: 0, active: true, scale: 0.5, rotation: 90, x: -10, y: 112})
                            .to(0.3, {
                                opacity: 255,
                                rotation: node.rotation,
                                scale: node.scale,
                                x: node.x,
                                y: node.y,
                                width: node.width,
                                height: node.height
                            }, {ease: 'quintIn'})
                    ).call(function () {
                    loop++;
                    if (loop == nodesCard.length && isCurrINGAME) {

                        let sequenceCountTime = cc.sequence([
                            cc.delayTime(1.5),
                            cc.callFunc(function () {
                                    this.activeLayoutNan(true, times);
                                }.bind(this)
                            )]);

                        this.node.runAction(sequenceCountTime);

                        // setTimeout(function () {
                        //     this.activeLayoutNan(true, times);
                        // }.bind(this), 1500)
                    }
                }.bind(this))
                    .start()
            }
        },

        //An/Hien layout Nan
        activeLayoutNan: function (isActive, times) {
            this.layoutNan.active = isActive;
            if (isActive) {
                this.lbTimeNan.string = (--times) + "s";

                let sequenceCountTime = cc.sequence([
                    cc.delayTime(1),
                    cc.callFunc(function () {
                            this.lbTimeNan.string = (--times) + "s";
                            if (times == 0) {
                                clearInterval(this.timeNan);
                                this.onHideLayoutNan();
                            }
                        }.bind(this)
                    )]).repeat(times);

                this.node.runAction(sequenceCountTime);

                // Lay danh sach bai cua current player

                this.fatFirstCard.spriteFrame = this.currPlayer.getSprite(this.currPlayer.cardFirst);
                this.fatSecondCard.spriteFrame = this.currPlayer.getSprite(this.currPlayer.cardSecond);
                this.fatThirdCard.spriteFrame = this.currPlayer.getSprite(this.currPlayer.cardThird);

            }

        },

        // An layout nan
        onHideLayoutNan: function () {
            this.layoutNan.active = false;
            this.fatBackCard.node.active = true;
            this.resetCardFat(this.fatBackCard);
            this.resetCardFat(this.fatFirstCard);
            this.resetCardFat(this.fatSecondCard);
            this.resetCardFat(this.fatThirdCard);

            //Play animation lat bai
            /* for (let i = 0; i < this.nodesCardActive.length; i++) {
                 let node = this.nodesCardActive[i];
                 node.getComponent(cc.Animation).play('mo_bai');
             }*/

        },

        onOpenCard: function () {
            cc.BCController.getInstance().sendRequestOnHub(cc.MethodHubName.FLIP);
            this.onHideLayoutNan();
        },

        // reset trang thai ban dau
        resetCardFat: function (node) {
            node.node.position = cc.v2(0, 0);
        },
        //HubOn - updateConnectionStatus
        updateConnectionStatus: function (info) {
            if (this.positionsUI) {
                var accID = info[0];
                var status = info[1];
                this.BCPlayers[this.getIndexUIBetByAccID(accID)].updateConnectionStatus(status);

                //neu la owner dky rời game -> tắt game
                // if (status === cc.BCConnectionStatus.REGISTER_LEAVE_GAME && accID === cc.LoginController.getInstance().getUserId()) {
                //     cc.LobbyController.getInstance().destroyDynamicView(null);
                // }
            }
        },

        //HubOn - updatePlayerStatus
        updatePlayerStatus: function (playerStatus) {
            if (this.positionsUI) {
                this.BCPlayers[0].updatePlayerStatus(playerStatus);
            }
        },

        //HubOn - showPrize
        showPrize: function (result) {
            /*
             "AccountId": 100000120,
              "Change": 0,
              "Sum": 4,
              "IsChickenKiller": false,
              "OwnerText": ""
             */
            for (let i = 0; i < result.length; i++) {
                let accID = result[i].AccountId;
                let sum = result[i].Sum;
                let isChickenKiller = result[i].IsChickenKiller;
                let isWin = parseInt(result[i].Change) > 0;

                let money = result[i].Change;
                let player = this.BCPlayers[this.getIndexUIBetByAccID(accID)];
                let isOwner = accID == cc.BCController.getInstance().getOwnerID();
                let isCurrentPlayer = accID == cc.LoginController.getInstance().getUserId();
                let ownerText = result[i].OwnerText;

                let isBigWin = (ownerText == cc.BCOwnerState.WIN_ALL);
                let isPhatLuong = (ownerText == cc.BCOwnerState.LOSE_ALL);
                if (isCurrentPlayer && isBigWin && !cc.game.isPaused()) {
                    this.showPopupWin(true);
                }
                player.playerResultUI(isWin, money, sum, isChickenKiller, isOwner, isCurrentPlayer, isPhatLuong, isBigWin);
                if (isChickenKiller) {
                    this.lbTotalFeedChicken.tweenValueto(0);
                }
            }

        },

        // hien thi popup an tat
        showPopupWin: function (isShow) {
            this.popUpWin.active = isShow;
            if (isShow) {
                this.popUpWin.getComponent(cc.Animation).play('openPopup');

                let sequenceCountTime = cc.sequence([
                    cc.delayTime(3),
                    cc.callFunc(function () {
                            this.popUpWin.active = false;
                        }.bind(this)
                    )]);

                this.node.runAction(sequenceCountTime);

                // setTimeout(function () {
                //     this.popUpWin.active = false;
                // }.bind(this), 3000)
            }

        },
        //HubOn - showAllResult
        showAllResult: function (result) {
            let players = result.Players;
            for (let i = 0; i < this.maxPlayer; i++) {
                let accID = this.positionsUI[i];
                //cac vi tri co nguoi choi: accID > 0
                if (accID > 0) {
                    let playerUI = this.BCPlayers[this.getIndexUIBetByAccID(accID)];
                    playerUI.showCards(players[accID].Hand, true);
                }
            }
        },

        //HubOn - PlayerBet
        playerBet: function (info) {
            //dam bao joinGame xong moi xu ly - tranh loi server neu bi
            if (this.positionsUI) {
                let accInfo = info[0];
                let betValue = info[1];
                let player = this.BCPlayers[this.getIndexUIBetByAccID(accInfo.AccountID)];
                //update balance current player
                if (cc.LoginController.getInstance().getUserId() == accInfo.AccountID) {
                    cc.BalanceController.getInstance().updateRealBalance(accInfo.Star)
                }
                player.updateBetUI(betValue, accInfo.Star);
            }
        },

        updateChip: function (accID, chip) {
            this.BCPlayers[this.getIndexUIBetByAccID(accID)].updateChip(chip);
        },

        getPositions: function () {
            return this.positionsUI;
        },

        //lay ve index bet theo accID
        getIndexUIBetByAccID: function (accID) {
            var indexBet = -1;
            for (var i = 0; i < this.maxPlayer; i++) {
                if (this.positionsUI[i] === accID) {
                    indexBet = i;
                    break;
                }
            }
            return indexBet;
        },
        // Start progress player cho Chuong
        updateProgressOwner: function (infoTime) {

            // reset trang thai progress
            for (let i = 0; i < this.maxPlayer; i++) {
                let accID = this.positionsUI[i];
                //cac vi tri co nguoi choi: accID > 0
                if (accID > 0) {
                    let playerUI = this.BCPlayers[this.getIndexUIBetByAccID(accID)];
                    playerUI.resetProgressOwner();
                }
            }

            // lay vi tri player theo Chuong
            let ownerId = cc.BCController.getInstance().getOwnerID();
            this.BCPlayers[this.getIndexUIBetByAccID(ownerId)].updateProgressOwner(infoTime);
        },
        // Stop progress player cho Chuong
        stopUpdateProgressOwner: function () {
            // lay vi tri player theo Chuong
            let ownerId = cc.BCController.getInstance().getOwnerID();
            this.BCPlayers[this.getIndexUIBetByAccID(ownerId)].stopUpdateProgressOwner();
        },
        //lay ve index bet theo accID
        getIndexUIBetByPosition: function (pos) {
            var indexBet = pos;

            if (indexBet > this.onwerIndex) {
                //map lai theo UI
                indexBet += this.onwerIndex;

                if (indexBet >= this.maxPlayer) {
                    indexBet -= (this.maxPlayer - 1);
                }
            } else if (indexBet < this.onwerIndex) {
                //map lai theo UI
                indexBet -= this.onwerIndex;
                if (indexBet < 0) {
                    indexBet = (this.maxPlayer + indexBet);
                }
            } else {
                indexBet = 0;
            }

            // console.log('getIndexUIBetByPosition: ' + indexBet);
            return indexBet;
        },

        //reset UI ket qua (win/lose) sau moi Phien cua tat ca player
        resetPlayersResultUI: function () {
            this.lbTotalFeedChicken.setValue(0);
            for (var i = 0; i < this.maxPlayer; i++) {
                this.BCPlayers[i].resetPlayerResultUI();
            }
        },
        // Reset lai trang thai tong bet ga ve 0
        resetTotalFeedChicken: function (accId, star) {
            let playerFeedChicken = this.BCPlayers[this.getIndexUIBetByAccID(accId)];

            if(!cc.game.isPaused()) {
                playerFeedChicken.playerGetWin();
            }

            this.lbTotalFeedChicken.tweenValueto(0);
            playerFeedChicken.showValueChickenBack(star);
            // Cap nhat lai so du cua player hien tai
            if (accId == cc.LoginController.getInstance().getUserId()) {
                cc.BalanceController.getInstance().updateRealBalance(star)
            }
        },
        showBtnBien: function () {
            let count = 0;
            this.positionsUI.map(accId => {
                if (accId > 0)
                    count++;
            });
            // khong hien thi neu player hien tai la Chuong
            if (cc.LoginController.getInstance().getUserId() == cc.BCController.getInstance().getOwnerID()) {
                return;
            }
            // Hien thi danh bien
            if (count > 2) {
                for (let i = 0; i < this.maxPlayer; i++) {
                    let accID = this.positionsUI[i];
                    //cac vi tri co nguoi choi: accID > 0
                    if (accID > 0 && accID != cc.LoginController.getInstance().getUserId() && accID != cc.BCController.getInstance().getOwnerID()) {
                        let playerUI = this.BCPlayers[this.getIndexUIBetByAccID(accID)];
                        if (playerUI)
                            playerUI.showBtnBien(true);
                    }
                }
            } else {
                cc.BCController.getInstance().enableOnLyFeedChicken();
            }

        },
        showBetSideForAccId: function (fromAccId, toAccId, amount) {
            amount = parseInt(amount);
            let type = (amount == cc.BCController.getInstance().getBetRoom()) ? cc.BCBetSide.MIN_BET : cc.BCBetSide.MAX_BET;

            //Hien thi accept bet cho player dc bet
            if (cc.LoginController.getInstance().getUserId() == toAccId) {
                let playerUI = this.BCPlayers[this.getIndexUIBetByAccID(fromAccId)];
                playerUI.showBtnBienType(type, fromAccId);
            }

            // Hien thi cho accept cho user hien tai
            if (cc.LoginController.getInstance().getUserId() == fromAccId) {
                let playerUI = this.BCPlayers[this.getIndexUIBetByAccID(toAccId)];
                playerUI.showConfirmAcceptBetOther(type);
            }
        },
        hideBtnBien: function () {
            for (let i = 0; i < this.maxPlayer; i++) {
                let accID = this.positionsUI[i];
                //cac vi tri co nguoi choi: accID > 0
                if (accID > 0) {
                    let playerUI = this.BCPlayers[this.getIndexUIBetByAccID(accID)];
                    if (playerUI)
                        playerUI.showBtnBien(false);
                }
            }
        },
        //set ket qua cua player
        playerResultUI: function (playerIndex, isWin, amount) {
            this.BCPlayers[playerIndex].playerResultUI(isWin, amount);
        },

        //player vao phong
        registerPlayer: function (playerIndex, info, status) {
            this.BCPlayers[playerIndex].registerPlayer(info, status);
        },

        unRegisterPlayer: function (playerIndex) {
            this.BCPlayers[playerIndex].unRegisterPlayer();
        },

        playerShowBubbleChat: function (message) {
            if (cc.ChatRoomController.getInstance().checkIsEmotion(message)) {
                this.BCPlayers.forEach(function (BCPlayer) {
                    let playerNickName = (BCPlayer.lbName.string).trim();
                    let servicePrefix = cc.Config.getInstance().getServiceNameNoFormat(message[2]);
                    let nickName = servicePrefix + message[0];
                    if (nickName === playerNickName) {

                        BCPlayer.showEmotion(cc.ChatRoomController.getInstance().getIndexEmotion(message)
                            , message);
                    }
                });
            } else {
                this.BCPlayers.forEach(function (BCPlayer) {
                    let playerNickName = (BCPlayer.lbName.string).trim();
                    let servicePrefix = cc.Config.getInstance().getServiceNameNoFormat(message[2]);
                    let nickName = servicePrefix + message[0];
                    if (nickName === playerNickName) {
                        BCPlayer.showBubbleChat(message);
                    }
                });
            }

        },


        updateRoomId: function (roomID) {
            this.lbRoomID.string = ': ' + roomID;
        },
        updateTableId: function (tableID) {
            this.lbTableId.string = ': ' + tableID;
        },
        updateSessionId: function (sID) {
            this.lbSID.string = ': #' + sID;
        },

        showAcceptedBet: function (data) {
            /*
            let currId = data[0]; // player accept
            let fromAccId = data[1]; // player bet
            let accepted = data[2];
            let value = data[3];

            // hien thi icon accept bien cua fromAccID
            // Hien thi neu currId = accId
            if (currId == cc.LoginController.getInstance().getUserId() && accepted) {
                cc.BCController.getInstance().pushAcceptedBet(fromAccId);
                let fromPlayer = this.BCPlayers[this.getIndexUIBetByAccID(currId)];
                //Hien thi tien dat bien
                fromPlayer.showBetSideValue(value);
                // An thong tin danh bien
                fromPlayer.hideBtnBien();
            }
            if (fromAccId == cc.LoginController.getInstance().getUserId() && accepted) {
                cc.BCController.getInstance().pushAcceptedBet(currId);
                let fromPlayer = this.BCPlayers[this.getIndexUIBetByAccID(fromAccId)];
                //Hien thi tien dat bien
                fromPlayer.showBetSideValue(value);
                // An thong tin danh bien
                fromPlayer.hideBtnBien();
            }

            */

            let fromAccId = data[0]; // player dong y danh bien
            let toAccId = data[1]; // player yeu cau danh bien
            let accepted = data[2];
            let value = data[3];

            // Hien thi neu currId = accId
            if (fromAccId == cc.LoginController.getInstance().getUserId() && accepted) {
                cc.BCController.getInstance().pushAcceptedBet(toAccId);
                let fromPlayer = this.BCPlayers[this.getIndexUIBetByAccID(toAccId)];
                //Hien thi tien dat bien
                fromPlayer.showBetSideValue(value);
                // An thong tin danh bien
                fromPlayer.hideBtnBien();
            }
            if (toAccId == cc.LoginController.getInstance().getUserId() && accepted) {
                cc.BCController.getInstance().pushAcceptedBet(fromAccId);
                let toPlayer = this.BCPlayers[this.getIndexUIBetByAccID(fromAccId)];
                //Hien thi tien dat bien
                toPlayer.showBetSideValue(value);
                // An thong tin danh bien
                toPlayer.hideBtnBien();
            }

        },
        updateInfo: function (info, state, time) {
            let roomId = cc.Tool.getInstance().formatNumber(cc.BCController.getInstance().getBetRoom());
            this.updateRoomId(roomId);
            this.updateTableId(info.SessionID);
            if (info.CurrentGameLoopID != -1)
                this.updateSessionId(info.CurrentGameLoopID);
            //check state de xu ly hien thi
            switch (state) {
                //giai doan dat cuoc
                case cc.BCState.BETTING: //1
                    if (this.currentState !== state) {
                        this.updateSessionId(info.CurrentGameLoopID);
                        cc.BCController.getInstance().setSID(info.CurrentGameLoopID);
                        //Kiem tra trang thai cua current player neu in game moi chuyen
                        let currId = cc.LoginController.getInstance().getUserId();
                        let statusCurrPlayer = info.Players[currId].Status;

                        if(statusCurrPlayer == 1) {
                            cc.BCController.getInstance().updateUIActionBet(cc.BCState.BETTING);
                        }else {
                            cc.BCController.getInstance().updateUIActionBet(cc.BCState.WAITING);
                        }

                        //this.resetPlayersResultUI();
                        this.updateStatusGame(cc.BCState.BETTING);
                    }
                    break;
                //giai doan chia bai
                case cc.BCState.DEALER: //2
                    if (this.currentState !== state) {
                        cc.BCController.getInstance().updateUIActionBet(cc.BCState.DEALER);
                        // An btn Danh bien
                        this.hideBtnBien();
                        this.updateStatusGame(cc.BCState.DEALER);
                    }
                    break;
                //giai doan ket qua
                case cc.BCState.FINISH: //4
                    if (this.currentState !== state) {
                        cc.BCController.getInstance().updateUIActionBet(cc.BCState.FINISH);
                        this.updateSessionId(info.CurrentGameLoopID);
                        cc.BCController.getInstance().setSID(info.CurrentGameLoopID);
                        this.updateStatusGame(cc.BCState.FINISH);
                    }
                    break;
                //giai doan cho phien moi
                case cc.BCState.WAITING: // -1
                    if (this.currentState !== state) {
                        //this.updateSessionId(info.CurrentGameLoopID);
                        cc.BCController.getInstance().setSID(info.CurrentGameLoopID);
                        this.resetPlayersResultUI();

                        //cap nhat chuong
                        cc.BCController.getInstance().setOwnerID(info.OwnerID);
                        // Cap nhat icon chuong
                        let ownerPlayer = this.BCPlayers[this.getIndexUIBetByAccID(info.OwnerID)];
                        ownerPlayer.activeChuong(true);

                        this.updateStatusGame(cc.BCState.WAITING);
                        cc.BCController.getInstance().updateUIActionBet(cc.BCState.WAITING);
                    }
                    break;
            }

            //luu lai state hien tai
            this.currentState = state;
        },
    });
}).call(this);
