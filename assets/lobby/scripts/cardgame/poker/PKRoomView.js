/**
 * Created by Welcome on 5/28/2019.
 */

var netConfig = require('NetConfig');
// var Types = require('Types');

(function () {
    cc.PKRoomView = cc.Class({
        "extends": cc.Component,
        properties: {
            nodeRoom: cc.Node,
            nodeGame: cc.Node,

            //chat
            nodeParentChat: cc.Node,
            prefabChat: cc.Prefab,
        },

        onLoad: function () {
            cc.PKController.getInstance().setPKRoomView(this);

            this.node.zIndex = cc.NoteDepth.CARD_GAME;

            // var id0 = Types.Card.fromId(0);
            // console.log('id0: ', id0.toString());

            cc.ChatRoomController.getInstance().setHubView(this);

            this.interval = null;

            this.lastTimeReconnect = (new Date()).getTime();

            this.connectHub();

            this.currentState = -1;

            //id send playNow
            this.idPlayNow = 0;

            //dang dang ky leaveRoom
            this.isRegisterLeaveRoom = false;

            var nodeChat = cc.instantiate(this.prefabChat);
            this.nodeParentChat.addChild(nodeChat);
        },


        onDestroy: function () {
            cc.LobbyJackpotController.getInstance().pauseUpdateJackpot(false);

            if (this.interval !== null) {
                clearInterval(this.interval);
            }
            if (this.hub)
                this.hub.disconnect();

            this.unscheduleAllCallbacks();
            cc.PKController.getInstance().setPKView(null);

            if (cc.sys.isNative) {
                cc.loader.releaseResDir('poker/prefabs');
                cc.loader.releaseResDir('poker/images');
            }
        },

        reset: function () {
            this.isTimer = false;
            this.timer = 0;
            this.currentState = 999;
            if (this.interval !== null) {
                clearInterval(this.interval);
            }
        },

        stopTimer: function () {
            this.isTimer = false;
            if (this.interval !== null) {
                clearInterval(this.interval);
            }
        },

        disconnectAndLogout: function () {
            if (this.hub) {
                this.hub.disconnect();
            }
            this.lastTimeReconnect = (new Date()).getTime();
        },

        connectHub: function () {
            cc.PopupController.getInstance().showBusy();
            var negotiateCommand = new cc.NegotiateCommand;
            negotiateCommand.execute(this, cc.SubdomainName.TEXAS_POKER);
        },

        reconnect: function () {
            this.lastTimeReconnect = (new Date()).getTime();
            this.hub.connect(this, cc.HubName.TexasPokerHub, this.connectionToken, true);
        },

        //data1 = amount
        //data2 = gate
        sendRequestOnHub: function (method, data1, data2, data3) {
            switch (method) {
                case cc.MethodHubName.ENTER_LOBBY:
                    this.hub.enterLobby();
                    break;
                case cc.MethodHubName.PLAY_NOW:
                    this.idPlayNow = this.hub.getRecentID();
                    this.hub.playNowCardGame(data1, data2, data3);
                    break;
                case cc.MethodHubName.BET:
                    this.hub.bet(data1, data2);
                    break;
                case cc.MethodHubName.REGISTER_LEAVE_ROOM:
                    this.hub.registerLeaveRoom();
                    break;
                case cc.MethodHubName.UNREGISTER_LEAVE_ROOM:
                    this.hub.unRegisterLeaveRoom();
                    break;

                case cc.MethodHubName.BUY_IN:
                    this.hub.buyIn(data1, data2, data3);
                    break;
                case cc.MethodHubName.REGISTER_AUTO:
                    this.hub.registerAuto(data1);
                    break;
                case cc.MethodHubName.FLIP_CARDS:
                    this.hub.flipCards();
                    break;

                case cc.MethodHubName.SEND_MESSAGE:
                    this.hub.sendRoomMessage(data1);
                    break;
            }
        },

        onSlotsNegotiateResponse: function (response) {
            cc.PopupController.getInstance().showBusy();
            this.connectionToken = response.ConnectionToken;
            this.hub = new cc.Hub;
            this.hub.connect(this, cc.HubName.TexasPokerHub, response.ConnectionToken);
        },

        onHubMessage: function (response) {
            if (response.M !== undefined && response.M.length > 0) {

                //Có case sẽ bắn về > 1 hubOn -> phải duyệt qua mảng HubOn
                for (var i = response.M.length - 1; i >=0; i--) {
                    var m = (response.M)[i];
                    switch (m.M) {
                        //thoi gian + trang thai phien
                        case cc.MethodHubOnName.START_ACTION_TIMER:
                            var data = m.A;
                            cc.PKController.getInstance().updateInfo(data[0], data[2], false);
                            cc.PKController.getInstance().updateResult(data[0].Players, data[0].GameLoop.Result, data[0].GameLoop.OriginResult, data[2]);
                            cc.PKController.getInstance().updateInput(data[2]);
                            break;

                        //nguoi choi roi ban
                        case cc.MethodHubOnName.PLAYER_LEAVE:
                            cc.PKController.getInstance().playerLeave(m.A);
                            break;

                        //cap nhat trang thai cua nguoi choi
                        case cc.MethodHubOnName.UPDATE_CONNECTION_STATUS:
                            var accID = m.A[0];
                            var status = m.A[1];

                            if (accID === cc.LoginController.getInstance().getUserId()) {
                                //PKView
                                cc.PKController.getInstance().updateOwnerConnectionStatus(status);
                            }

                            //InfoView
                            cc.PKController.getInstance().updateConnectionStatus(m.A);
                            break;

                        //cập nhật lại trạng thái player
                        case cc.MethodHubOnName.UPDATE_PLAYER_STATUS:
                            cc.PKController.getInstance().updatePlayerStatus(m.A[0]);
                            break;

                        //vao phong
                        case cc.MethodHubOnName.JOIN_GAME:
                            //bat phong game
                            this.nodeRoom.active = false;
                            this.nodeGame.active = true;
                            cc.LobbyController.getInstance().activeNodeTopBar(false);

                            var data = m.A[0];
                            var info = m.A[1];

                            cc.PKController.getInstance().joinGame(data);

                            cc.PKController.getInstance().updateInfo(data, data.GameLoop.Phrase, true);

                            // if (data.GameLoop.Phrase === cc.State.BETTING || data.GameLoop.Phrase === cc.State.OPEN_PLATE) {
                            //     //tái hiện lại các cửa đã đặt
                            //     cc.PKController.getInstance().showLastInput(data);
                            // }

                            //UnRegister roi phong
                            this.sendRequestOnHub(cc.MethodHubName.UNREGISTER_LEAVE_ROOM);

                            //hide popup buyIn
                            cc.PKController.getInstance().hideBuyIn();
                            cc.PopupController.getInstance().hideBusy();
                            break;

                        //nguoi choi khac vao phong
                        case cc.MethodHubOnName.PLAYER_JOIN:
                            var data = m.A[0];
                            cc.PKController.getInstance().playerJoin(data);
                            break;

                        //thong tin nguoi choi dat cuoc
                        case cc.MethodHubOnName.PLAYER_BET:
                            var data = m.A;
                            cc.PKController.getInstance().playerBet(data);
                            break;

                        //thong bao khi dat cuoc
                        case cc.MethodHubOnName.PLAYER_MESSAGE:
                            cc.PopupController.getInstance().showMessage( m.A[0]);
                            break;

                        //thong bao
                        case cc.MethodHubOnName.MESSAGE:
                            cc.PopupController.getInstance().showMessage( m.A[0]);
                            break;

                        //nhan message chat
                        case cc.MethodHubOnName.RECEIVE_MESSAGE:
                            cc.ChatRoomController.getInstance().addChatContent(m.A);
                            cc.PKController.getInstance().playerShowBubbleChat(m.A);
                            break;

                        //FIX BUG
                        case 'recieveMessage':
                            cc.ChatRoomController.getInstance().addChatContent(m.A);
                            cc.PKController.getInstance().playerShowBubbleChat(m.A);
                            break;

                        case cc.MethodHubOnName.UPDATE_ROOM_TIME:
                            cc.PKController.getInstance().updateTimer(m.A[0]);
                            break;

                        //thông báo không đủ tiền yêu cầu nạp chips
                        case cc.MethodHubOnName.BUY_MANUAL:
                            cc.PKController.getInstance().hideBuyIn();
                            cc.PopupController.getInstance().showMessage(m.A);
                            break;

                        //cập nhật số chips của người chơi khi nạp chips thành công
                        case cc.MethodHubOnName.UPDATE_ACCOUNT:
                            //hide popup buyIn
                            cc.PKController.getInstance().updateAccount(m.A);
                            break;

                        //thông báo đăng ký chơi tự động thành công
                        case cc.MethodHubOnName.PLAYER_CHECK_AUTO:
                            break;

                        //Doi phrase
                        case cc.MethodHubOnName.NOTIFY_CHANGE_PHRASE:
                            var data = m.A[0];
                            var info = m.A[1];
                            cc.PKController.getInstance().updateInfo(data, data.GameLoop.Phrase, false);
                            break;

                        //bắt đầu hành động của người chơi
                        case cc.MethodHubOnName.NOTIFY_START_ACTIONS:
                            cc.PKController.getInstance().notifyStartActions(m.A);
                            break;

                        //kết thúc hành động của người chơi
                        case cc.MethodHubOnName.NOTIFY_FINISH_ACTIONS:
                            cc.PKController.getInstance().notifyFinishActions(m.A);

                            break;

                        //thông báo khi đặt cược
                        case cc.MethodHubOnName.PLAYER_FLIP_CARDS:
                            break;

                        //trả lại tiền cho người chơi đặt cao nhất
                        case cc.MethodHubOnName.REFUND:
                            break;

                    }
                }
            } else if (response.R && response.R.AccountID) {
                cc.PopupController.getInstance().hideBusy();
            }  else if (response.R && response.I === this.idPlayNow.toString()) {
                this.idPlayNow = 0;
                cc.PopupController.getInstance().hideBusy();

            } else {
                //PING PONG
                if (response.I) {
                    this.hub.pingPongResponse(response.I);
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
                var message = info[1];
                cc.PopupController.getInstance().showMessage(message);
                this.nodeRoom.active = true;
                this.nodeGame.active = false;

                cc.LobbyController.getInstance().activeNodeTopBar(true);
                cc.PKController.getInstance().hideBuyIn();
            }
        },

        //huong dan
        helpClicked: function () {
            cc.PKPopupController.getInstance().createHelpView();
            cc.AudioController.getInstance().playSound(cc.AudioTypes.CHIP_SELECT);
        },

        //bang xep hang dat cuoc
        topClicked: function () {
            cc.PKPopupController.getInstance().createTopView();
        },
		backLobby: function () {
            cc.LobbyController.getInstance().destroyDynamicView(null);
			 cc.LobbyController.getInstance().offuserguest(true);
        },

        backClicked: function () {
          //back ve PORTAL
            cc.AudioController.getInstance().playSound(cc.AudioTypes.CHIP_SELECT);
        },

        joinRoomClicked: function (event, data) {
            //sau khi enterLobby
            cc.PKController.getInstance().showBuyIn(parseInt(data.toString()), true);
        },

        chatClicked: function () {
            cc.ChatRoomController.getInstance().showChat();
        },
    });
}).call(this);
