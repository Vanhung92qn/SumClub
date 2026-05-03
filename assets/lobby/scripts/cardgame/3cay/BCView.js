/**
 * Created by Welcome on 5/28/2019.
 */

var netConfig = require('NetConfig');

(function () {
    cc.BCView = cc.Class({
        "extends": cc.Component,
        properties: {
            spriteSound: cc.Sprite,
            sfSounds: [cc.SpriteFrame], //0=on, 1=off
            spriteBack: cc.Sprite,
            nodeRegisterLeave: cc.Node,
            nodeChooseRoomView: cc.Node,
            nodeMainRoomView: cc.Node,

            //chat
            nodeParentChat: cc.Node,
            prefabChat: cc.Prefab,
        },

        onLoad: function () {
            cc.BCController.getInstance().setBCView(this);
            cc.ChatRoomController.getInstance().setHubView(this);
            this.hubName = cc.HubName.ThreeCardsHub;
            this.subDomainName = cc.SubdomainName.THREE_CARDS;
            this.interval = null;
            this.isActiveChat = false;
            this.lastTimeReconnect = (new Date()).getTime();
            this.currentState = -1;

            //id send playNow
            this.idPlayNow = 0;

            //check jonGame
            this.currAccId = null;

            //dang dang ky leaveRoom
            this.isRegisterLeaveRoom = false;

            this.connectHub();
            this.enableChooseRoom(true);

            var nodeChat = cc.instantiate(this.prefabChat);
            this.nodeParentChat.addChild(nodeChat);
        },

        // set gia tri bet cho room
        setBetRoom: function (room, betRoom) {
            let bRoom = parseInt(betRoom);
            cc.BCController.getInstance().setBetRoom(bRoom);
            cc.BCController.getInstance().updateCurrentBetValue(0);
            this.sendRequestOnHub(cc.MethodHubName.PLAY_NOW);
            this.enableChooseRoom(false);
        },

        enableChooseRoom: function (enable) {
            this.nodeChooseRoomView.active = enable;
            this.nodeMainRoomView.active = !enable;

            cc.LobbyController.getInstance().activeNodeTopBar(enable);
        },

        start: function () {
            //Check Sound
            this.sound = cc.Tool.getInstance().getItem("@Sound").toString() === 'true';

            this.spriteSound.spriteFrame = this.sound ? this.sfSounds[0] : this.sfSounds[1];

            cc.AudioController.getInstance().enableSound(this.sound);
            // cc.AudioController.getInstance().enableSound(false);
        },

        onEnable: function () {
            cc.BalanceController.getInstance().updateBalance(cc.BalanceController.getInstance().getBalance());
        },

        onDestroy: function () {
            cc.LobbyJackpotController.getInstance().pauseUpdateJackpot(false);

            if (this.interval !== null) {
                clearInterval(this.interval);
            }
            if (this.BCHub)
                this.BCHub.disconnect();

            this.unscheduleAllCallbacks();
            cc.BCController.getInstance().setBCView(null);

            if (cc.sys.isNative) {
                cc.loader.releaseResDir('3cay/prefabs');
                cc.loader.releaseResDir('3cay/images');
            }
        },

        disconnectAndLogout: function () {
            if (this.BCHub) {
                this.BCHub.disconnect();
            }
            this.lastTimeReconnect = (new Date()).getTime();
        },

        connectHub: function () {
            cc.PopupController.getInstance().showBusy();
            var negotiateCommand = new cc.NegotiateCommand;
            negotiateCommand.execute(this, this.subDomainName);
        },

        reconnect: function () {
            this.lastTimeReconnect = (new Date()).getTime();
            this.BCHub.connect(this, this.hubName, this.connectionToken, true);
        },

        //data1 = amount
        //data2 = gate
        sendRequestOnHub: function (method, data1, data2) {
            switch (method) {
                case cc.MethodHubName.ENTER_LOBBY:
                    this.BCHub.enterLobby();
                    break;
                case cc.MethodHubName.PLAY_NOW:
                    //this.idPlayNow = this.BCHub.getRecentID();
                    let minBet = cc.BCController.getInstance().getBetRoom();
                    this.BCHub.playNow(minBet);
                    break;
                case cc.MethodHubName.BET: // Dat chuong
                    this.BCHub.bet(data1);
                    break;
                case cc.MethodHubName.REGISTER_LEAVE_ROOM: // Dang ky roi ban
                    this.BCHub.registerLeaveRoom();
                    break;
                case cc.MethodHubName.UNREGISTER_LEAVE_ROOM: // Huy DK roi ban
                    this.BCHub.unRegisterLeaveRoom();
                    break;
                case cc.MethodHubName.SEND_MESSAGE:
                    this.BCHub.sendRoomMessage(data1);
                    break;
                case cc.MethodHubName.SELL_OWNER: // Ban chuong
                    this.BCHub.sellOwner(data1);
                    break;
                case cc.MethodHubName.BUY_OWNER: // Mua chuong
                    this.BCHub.buyOwner();
                    break;
                case cc.MethodHubName.BET_OTHERS: // Danh bien
                    this.BCHub.betOther(data1, data2);
                    break;
                case cc.MethodHubName.ACCEPT_BET: // Nhan bien
                    this.BCHub.acceptBet(data1, data2);
                    break;
                case cc.MethodHubName.FEED_CHICKEN: // Gop ga
                    this.BCHub.feedChicken();
                    break;
                case cc.MethodHubName.FLIP: // Mo bai
                    this.BCHub.flip();
                    break;
            }
        },

        onSlotsNegotiateResponse: function (response) {
            cc.PopupController.getInstance().showBusy();
            this.connectionToken = response.ConnectionToken;
            this.BCHub = new cc.Hub;
            this.BCHub.connect(this, this.hubName, response.ConnectionToken);
        },

        onHubMessage: function (response) {
            if (response.M !== undefined && response.M.length > 0) {
                var m = (response.M)[0];

                switch (m.M) {
                    //nguoi choi roi ban
                    case cc.MethodHubOnName.PLAYER_LEAVE:
                        let playerID = m.A[0];
                        if(playerID == cc.LoginController.getInstance().getUserId()) {
                            this.nodeRegisterLeave.active = false;
                            // Reset lai trang thai bet
                            cc.BCController.getInstance().resetSliderBet();
                            this.spriteBack.spriteFrame = cc.BCController.getInstance().getAssets().sfBacks[0];
                            this.isRegisterLeaveRoom = false;
                        }
                        cc.BCController.getInstance().playerLeave(m.A);
                        break;

                    //cap nhat trang thai cua nguoi choi
                    case cc.MethodHubOnName.UPDATE_CONNECTION_STATUS:
                        cc.BCController.getInstance().updateConnectionStatus(m.A);
                        break;

                    //vao phong
                    case cc.MethodHubOnName.JOIN_GAME:

                        var data = m.A[0];
                        var info = m.A[1];
                        cc.BCController.getInstance().setStateReiecvBetSide(false);
                        // Khoi tao list dong y danh bien
                        cc.BCController.getInstance().clearAcceptedBet();
                        // Khoi tao list yeu cau danh bien
                        cc.BCController.getInstance().clearRequestBetOther();

                        if (this.currAccId == null) {
                            this.setBetRoom(null, m.A[0].MinBet);
                        } else {
                            cc.BCController.getInstance().setBetRoom(m.A[0].MinBet);
                            cc.BCController.getInstance().joinGame(data);
                            //this.enableChooseRoom(false);
                            //cc.BCController.getInstance().updateStatusGame(data.GameLoop.Phrase);
                            cc.BCController.getInstance().updateProgressOwner(info);
                            //update trang thai player
                            //cc.BCController.getInstance().updatePlayerStatus(m.A[2]);
                            cc.BCController.getInstance().updateInfo(data, data.GameLoop.Phrase);
                            //UnRegister roi phong
                            this.sendRequestOnHub(cc.MethodHubName.UNREGISTER_LEAVE_ROOM);

                            cc.PopupController.getInstance().hideBusy();
                        }
                        // console.log("JOIN_GAME", m.A);
                        break;
                    // Doi chuong
                    case cc.MethodHubOnName.CHANGE_OWNER:
                        // console.log('CHANGE_OWNER', m.A);
                        cc.BCController.getInstance().setOwnerID(m.A[0]);
                        break;
                    //nguoi choi khac vao phong
                    case cc.MethodHubOnName.PLAYER_JOIN:
                        var data = m.A[0];
                        // console.log("PLAYER_JOIN", m.A);
                        cc.BCController.getInstance().playerJoin(data);
                        break;

                    //thong tin nguoi choi dat cuoc
                    case cc.MethodHubOnName.UPDATE_BETTING:
                        let listUpdate = response.M;
                        listUpdate.forEach(function(m){
                            var data = m.A;
                            // console.log("UPDATE_BETTING", m.A)
                            if(m.A[0].AccountID == cc.LoginController.getInstance().getUserId()) {
                                // Cap nhat lai layout bet
                                cc.BCController.getInstance().showBtnBien();

                                cc.DDNA.getInstance().betSummary(cc.DDNAGame.BA_CAY, data[1], cc.BCController.getInstance().getSID());
                            }
                            // Cap nhat thong tin nguoi choi dat cuoc
                            cc.BCController.getInstance().playerBet(data);
                        });

                        break;

                    //Thong bao khong du tien
                    case cc.MethodHubOnName.BUY_MANUAL:
                        // console.log("BUY_MANUAL", m.A)
                        this.enableChooseRoom(true);
                        cc.PopupController.getInstance().showMessage(m.A[0]);
                        break;

                    //thong bao khi dat cuoc
                    case cc.MethodHubOnName.PLAYER_MESSAGE:
                        cc.PopupController.getInstance().showMessage(m.A[0]);
                        break;

                    //Danh bien
                    case cc.MethodHubOnName.BET_OTHER:
                        // cap nhat trang thai danh bien
                        let fromAccId = m.A[0];
                        let toAccId = m.A[1];
                        let amount = m.A[2];
                        // Kiem tra trang thai nhan bien
                        // Neu true thi tu dong accept bet other
                        let isAutoAccept = cc.BCController.getInstance().getStateReiecvBetSide();
                        if(isAutoAccept) {
                            if(toAccId == cc.LoginController.getInstance().getUserId()) {
                                cc.BCController.getInstance().sendRequestOnHub(cc.MethodHubName.ACCEPT_BET, fromAccId, true);
                            }else {
                                // Hien thi btn danh bien cho toAccId thay
                                cc.BCController.getInstance().showBetSideForAccId(fromAccId, toAccId, amount);
                            }
                        }else {
                            // Hien thi btn danh bien cho toAccId thay
                            cc.BCController.getInstance().showBetSideForAccId(fromAccId, toAccId, amount);
                        }

                        // Neu nhan dc yeu cau bet va trang thai chua nhan bien
                        if(cc.LoginController.getInstance().getUserId() == toAccId && !isAutoAccept) {
                            cc.BCController.getInstance().pushRequestBetOther(fromAccId);
                        }

                        // console.log("BET_OTHER", m.A);
                        break;

                    //Dong y Danh bien
                    case cc.MethodHubOnName.ACCEPTED_BET:
                        // cap nhat trang thai dong y danh bien
                        cc.BCController.getInstance().showAcceptedBet(m.A);
                        // console.log("ACCEPTED_BET", m.A)
                        break;

                    //Nuoi ga
                    case cc.MethodHubOnName.FEED_CHICKEN:
                        // cap nhat thong tin nuoi ga
                        cc.BCController.getInstance().updateFeedChickenUI(m.A);
                        break;

                    //Trang thai game
                    case cc.MethodHubOnName.START_GAME:
                        // Khoi tao list dong y danh bien
                        cc.BCController.getInstance().clearAcceptedBet();
                        // Khoi tao list yeu cau danh bien
                        cc.BCController.getInstance().clearRequestBetOther();
                        // An lb Player Status
                        cc.BCController.getInstance().hidePlayerStatus();

                        cc.BCController.getInstance().setStateReiecvBetSide(false);
                        cc.BCController.getInstance().collectCards();
                        // reset trang thai bet
                        cc.BCController.getInstance().isBetted = false;
                        cc.BCController.getInstance().updateInfo(m.A[0], cc.BCState.WAITING);
                        // Reset trang thai ban dau game
                        // An popup neu mo
                        if (cc.BCPopupController.getInstance().getBCPopupView().isOpenPopup) {
                            cc.BCPopupController.getInstance().onClosePopupAsk();
                        }

                        // Cap nhat progress chuong
                        let timeInfo = m.A[1];
                        cc.BCController.getInstance().updateProgressOwner(timeInfo);
                        // console.log("START_GAME", m.A);
                        break;

                    //Trang thai betting
                    case cc.MethodHubOnName.START_BETTING_TIME:
                        cc.BCController.getInstance().updateInfo(m.A[0], cc.BCState.BETTING);
                        // Cap nhat progress chuong
                        cc.BCController.getInstance().updateProgressOwner(m.A[1]);

                        // console.log("START_BETTING_TIME", m.A)
                        break;

                    //Chia bai
                    case cc.MethodHubOnName.START_ANIMATION_TIME:
                        let dataInfo = m.A[0];
                        let dataTime = m.A[1];
                        // Lay data cua user hien tai
                        let currAccId = cc.LoginController.getInstance().getUserId();
                        let currPlayer = cc.BCController.getInstance().getHandsCardByAccId(currAccId);
                        let currHandCard = dataInfo.Players[currAccId].Hand;
                        currPlayer.showCards(currHandCard, false);

                        //Kiem tra player gop ga, neu == 1 thi tra lai tien gop ga cho player
                        let chickenLogs = dataInfo.GameLoop.FedChickenLogs;
                        let dataPlayers = dataInfo.Players;
                        if(chickenLogs.length == 0 ||  chickenLogs.length == 1) {
                            // kiem tra player hien tai co bet ga hay khong neu true thi hoan lai chip
                            let currentID = cc.LoginController.getInstance().getUserId();

                            let lstAccounts = Object.values(dataPlayers);


                            //Hoan chip lai tren player khac
                            lstAccounts.forEach(function(player) {
                                if(player.FedChicken) {
                                    cc.BCController.getInstance().resetTotalFeedChicken(player.AccountID, player.Account.Star);
                                }
                            });
                            // hoan chip lai cho current player
                            let currPlayerFedChicken = dataPlayers[currentID].FedChicken;
                            if(currPlayerFedChicken) {
                                cc.BCController.getInstance().resetTotalFeedChicken(currentID, dataPlayers[currentID].Account.Star);
                            }
                        }

                        /*if(chickenLogs.length == 1) {
                         cc.BCController.getInstance().resetTotalFeedChicken(chickenLogs[0]);
                         }*/

                        cc.BCController.getInstance().updateInfo(m.A[0], cc.BCState.DEALER);

                        // Dung progress chuong
                        cc.BCController.getInstance().stopUpdateProgressOwner();

                        if(cc.game.isPaused())
                            return;
                        cc.BCController.getInstance().startAnimationTime(currPlayer, dataTime, dataInfo.Players);

                        // console.log("START_ANIMATION_TIME", m.A)
                        break;

                    //Mo bai
                    case cc.MethodHubOnName.SHOW_ALL_RESULT:
                        cc.BCController.getInstance().updateInfo(m.A[0], cc.BCState.FINISH);
                        // console.log("SHOW_ALL_RESULT", m.A)
                        cc.BCController.getInstance().showAllResult(m.A[0]);
                        // cc.BCController.getInstance().hideLayoutNan();

                        // Cap nhat progress chuong
                        let timeInfoEnd = m.A[1];
                        cc.BCController.getInstance().updateProgressOwner(timeInfoEnd);
                        break;
                    //Hien thi ket qua
                    case cc.MethodHubOnName.SHOW_PRIZE:
                        //cc.BCController.getInstance().updateStatusGame(m.A);
                        let result = m.A[0].ResultList;
                        // console.log("SHOW_PRIZE", m.A);
                        cc.BCController.getInstance().showPrize(result);
                        break;
                    //Ket thuc phien
                    case cc.MethodHubOnName.UPDATE_SESSION:
                        // console.log("UPDATE_SESSION", m.A)
                        cc.BCController.getInstance().updateInfo(m.A[0], cc.BCState.FINISH);
                        //update lai balance user
                        cc.BCController.getInstance().updateBalancePlayers(m.A[0].Players)
                        break;
                    //Hoi mua chuong
                    case cc.MethodHubOnName.ASK_OTHER_TO_BUY:

                        // console.log("ASK_OTHER_TO_BUY", m.A)
                        let nickName = cc.LoginController.getInstance().getNickname();
                        let playerAsk = m.A[1];
                        let time = m.A[0].Time;
                        let servicePrefix = cc.Config.getInstance().getServiceNameNoFormat(m.A[3]);
                        if(nickName != playerAsk) {
                            let strName = `<color=#FCFF00>${playerAsk}</c>`;
                            cc.BCPopupController.getInstance().onShowBuyOwner(strName, time);
                        }
                        break;
                    //Hoi ban chuong
                    case cc.MethodHubOnName.ASK_TO_SELL:
                        //cc.BCController.getInstance().updateStatusGame(m.A);
                        // console.log("ASK_TO_SELL", m.A)
                        cc.BCPopupController.getInstance().onShowSellOwner();
                        //cc.BCController.getInstance().collectCards();
                        break;

                    //Mo Bai
                    case cc.MethodHubOnName.FLIP_CARDS:
                        let playerIdFliped = m.A[0];
                        let playerFliped = cc.BCController.getInstance().getHandsCardByAccId(playerIdFliped);
                        playerFliped.showCards(m.A[1], true);
                        //Mo bai cua player
                        break;
                    //thong bao
                    case cc.MethodHubOnName.MESSAGE:
                        if(!cc.game.isPaused())
                            cc.PopupController.getInstance().showMessage(m.A[0]);
                        break;
                    case cc.MethodHubOnName.BUY_OWNER_SUCCESS:
                        let accID = m.A[0];
                        let accNickName = m.A[1];
                        let serviceID = m.A[2];
                        let resultBuy = m.A[3];
                        let servicePrefixSuccess = cc.Config.getInstance().getServiceNameNoFormat(serviceID);
                        let success = "Mua Chương thành công!";

                        let isCurrentPlayer  = accID == cc.LoginController.getInstance().getUserId()
                        // Thong bao cho player hien tai mua khong thanh cong
                        if( resultBuy == false && isCurrentPlayer) {
                            success = `Mua Chương không thành công!`;
                            cc.PopupController.getInstance().showMessage(success);
                            //cc.BCPopupController.getInstance().showBuyResult(success);
                        }
                        if(resultBuy) {
                            // Neu là player hien tai thong bao thanh cong
                            // Nguoc lai thong bao cho player khac da co nguoi mua thanh cong
                            if(isCurrentPlayer) {
                                cc.PopupController.getInstance().showMessage(success);
                                // cc.BCPopupController.getInstance().showBuyResult(success);
                            }else {
                                let strNameBuySuccess = `<color=#FCFF00>${accNickName} </c> mua Chương thành công!`;
                                cc.BCPopupController.getInstance().showBuyResult(strNameBuySuccess);
                            }

                        }


                        break;
                    //nhan message chat
                    case cc.MethodHubOnName.RECEIVE_MESSAGE:
                        // console.log('RECEIVE_MESSAGE: ',m.A)
                        cc.ChatRoomController.getInstance().addChatContent(m.A);
                        cc.BCController.getInstance().playerShowBubbleChat(m.A);
                        break;
                    case cc.MethodHubOnName.UPDATE_ROOM_TIME:
                        cc.BCController.getInstance().updateTimer(m.A[0]);
                        break;

                }
            } else if (response.R && response.R.AccountID) {
                this.currAccId = response.R.AccountID;
                //sau khi enterLobby
                //cc.PopupController.getInstance().showBusy();
                cc.PopupController.getInstance().hideBusy();

            } else {
                //PING PONG
                if (response.I) {
                    this.BCHub.pingPongResponse(response.I);
                }
            }
        },

        onHubOpen: function () {
            cc.PopupController.getInstance().hideBusy();
            this.sendRequestOnHub(cc.MethodHubName.ENTER_LOBBY);
            cc.PopupController.getInstance().showBusy();
        },

        onHubClose: function () {
            // cc.TaiXiuController.getInstance().reset();
            //reconnect
            // console.log((new Date()).getTime() - this.lastTimeReconnect);
            if ((new Date()).getTime() - this.lastTimeReconnect >= netConfig.RECONNECT_TIME * 1000) {
                this.reconnect();
            } else {
                cc.director.getScheduler().schedule(this.reconnect, this, netConfig.RECONNECT_TIME, 0, 0, false);
            }
        },

        onHubError: function () {

        },

        //HubOn
        playerLeave: function (info) {
            var accID = info[0];
            if (accID === cc.LoginController.getInstance().getUserId()) {
                this.enableChooseRoom(true);
                var message = info[1];
                // cc.LobbyController.getInstance().destroyDynamicView(null);
                cc.PopupController.getInstance().showMessage(message)
            }
        },

        //huong dan
        helpClicked: function () {
            cc.BCPopupController.getInstance().createHelpView();
        },

        soundClicked: function () {
            this.sound = !this.sound;
            cc.Tool.getInstance().setItem("@Sound", this.sound);
            this.spriteSound.spriteFrame = this.sound ? this.sfSounds[0] : this.sfSounds[1];
            cc.AudioController.getInstance().enableSound(this.sound);
        },
        backLobby: function () {
            cc.LobbyController.getInstance().destroyDynamicView(null);
			 cc.LobbyController.getInstance().offuserguest(true);
        },
        backClicked: function () {

            this.isRegisterLeaveRoom = !this.isRegisterLeaveRoom;
            if (this.isRegisterLeaveRoom) {
                this.sendRequestOnHub(cc.MethodHubName.REGISTER_LEAVE_ROOM);
                this.nodeRegisterLeave.active = true;
                this.spriteBack.spriteFrame = cc.BCController.getInstance().getAssets().sfBacks[1];
            } else {
                this.sendRequestOnHub(cc.MethodHubName.UNREGISTER_LEAVE_ROOM);
                this.nodeRegisterLeave.active = false;
                this.spriteBack.spriteFrame = cc.BCController.getInstance().getAssets().sfBacks[0];
            }
        },

        chatClicked: function () {
            cc.ChatRoomController.getInstance().showChat();
        },
    });
}).call(this);
