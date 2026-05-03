/**
 * Created by Nofear on 6/7/2017.
 */
var miniPokerConfig = require('MiniPokerConfig');
var netConfig = require('NetConfig');

(function () {
    cc.MiniPokerView = cc.Class({
        "extends": cc.Component,
        properties: {
            nodeScale: cc.Node
        },

        onLoad: function () {
            this.animation = this.node.getComponent(cc.Animation);

            //set zIndex
            this.node.zIndex = cc.Config.getInstance().getZINDEX();

            cc.MiniPokerController.getInstance().setMiniPokerView(this);

            var miniPokerNegotiateCommand = new cc.MiniPokerNegotiateCommand;
            miniPokerNegotiateCommand.execute(this);

            this.lastTimeReconnect = (new Date()).getTime();

            this.room50Id = 6;
            this.room30Id = 5;
            this.isScale = false;
        },

        onEnable: function () {
            this.animation.play('openPopup');
        },

        onDestroy: function () {
            if (this.miniPokerHub)
                this.miniPokerHub.disconnect();
            this.unscheduleAllCallbacks();
            cc.PopupController.getInstance().hideBusy();
            if (cc.sys.isNative) {
                cc.loader.releaseResDir('minipoker/prefabs');
                cc.loader.releaseResDir('minipoker/images');
            }
        },

        reconnect: function () {
            // console.log('miniPokerHub reconnect');
            this.lastTimeReconnect = (new Date()).getTime();
            this.miniPokerHub.connect(this, cc.SubdomainName.MiniPokerHub, this.connectionToken, true);
        },

        sendRequestOnHub: function (method, lines, roomId) {
            // console.log('sendRequestOnHub: ' + method);
            switch (method) {
                case cc.MethodHubName.ENTER_LOBBY:
                    this.miniPokerHub.enterLobby();
                    break;
                case cc.MethodHubName.PLAY_NOW:
                    if (!cc.Config.getInstance().getDomainVK().includes(netConfig.HOST)) {
                        this.miniPokerHub.playNow(cc.MiniPokerController.getInstance().getRoomId() <= 3 ? cc.MiniPokerController.getInstance().getRoomId() : this.room30Id);
                    } else {
                        this.miniPokerHub.playNow(cc.MiniPokerController.getInstance().getRoomId() <= 3 ? cc.MiniPokerController.getInstance().getRoomId() : this.room50Id);
                    }
                    break;
                case cc.MethodHubName.SPIN:
                    if (!cc.Config.getInstance().getDomainVK().includes(netConfig.HOST)) {
                        this.miniPokerHub.spin(lines, roomId <= 3 ? roomId : this.room30Id);
                    } else {
                        this.miniPokerHub.spin(lines, roomId <= 3 ? roomId : this.room50Id);
                    }
                    break;
            }
        },

        onMiniPokerNegotiateResponse: function (response) {
            this.connectionToken = response.ConnectionToken;
            this.miniPokerHub = new cc.Hub;
            this.miniPokerHub.connect(this, cc.HubName.MiniPokerHub, response.ConnectionToken);
        },

        onHubMessage: function (response) {

            if (response.M !== undefined && response.M.length > 0) {
                var m = (response.M)[0];
                switch (m.M) {
                    //vao Phong
                    case cc.MethodHubOnName.UPDATE_JACKPOT:
                        var data = m.A[0];
                        var jackpotData = data.split('|');
                        cc.MPJackpotController.getInstance().updateMPJackpot(
                            parseInt(jackpotData[cc.MiniPokerController.getInstance().getRoomId() - 1])
                        );
                        break;

                    //playNow
                    case cc.MethodHubOnName.JOIN_GAME:
                        var data = m.A[0];
                        //cc.MPFreeSpinController.getInstance().showFreeSpin(2);
                        cc.MPJackpotController.getInstance().updateMPJackpot(data.Jackpot);
                        //cho phep SPIN
                        cc.MiniPokerController.getInstance().activateAllButton(true);
                        //reset
                        cc.MPEffectController.getInstance().stopEffect();

                        if (data.EventFreeSpin && data.EventFreeSpin > 0) {
                            cc.MPFreeSpinController.getInstance().showFreeSpin(data.EventFreeSpin);
                            cc.MiniPokerController.getInstance().activateButtonX(false);

                            //freespin la auto chuyen ve X1
                            cc.MiniPokerController.getInstance().setMode(cc.MiniPokerX.X1);
                        } else {
                            cc.MPFreeSpinController.getInstance().hideFreeSpin();
                            cc.MiniPokerController.getInstance().activateButtonX(true);
                        }
                        break;

                    //spin
                    case cc.MethodHubOnName.RESULT_SPIN:
                        var data = m.A[0];

                        //update tien luon
                        cc.BalanceController.getInstance().updateRealBalance(data.Balance);
                        //cc.BalanceController.getInstance().updateBalance(data.Balance);

                        cc.MPSpinController.getInstance().setSpinResponse(data);
                        cc.MPJackpotController.getInstance().updateMPJackpot(data.Jackpot);

                        //Co ket qua -> moi QUAY
                        switch (cc.MiniPokerController.getInstance().getMode()) {
                            case cc.MiniPokerX.X1:
                                cc.MPSpinController.getInstance().startSpinX1();
                                cc.MPSpinController.getInstance().stopSpinX1();
                                break;
                            case cc.MiniPokerX.X3:
                                cc.MPSpinController.getInstance().startSpinX3();
                                cc.MPSpinController.getInstance().stopSpinX3();
                                break;
                        }
                        cc.DDNA.getInstance().spinSummary(cc.GameId.MINI_POKER, cc.MPSpinController.getInstance().checkIsAutoSpin(), data);

                        break;

                    case cc.MethodHubOnName.MESSAGE:
                        var data = m.A[0];
                        if (data.Description) {
                            cc.PopupController.getInstance().showMessage(data.Description);
                        } else if (data.Message) {
                            cc.PopupController.getInstance().showMessage(data.Message);
                        } else {
                            cc.PopupController.getInstance().showMessage(data);
                        }
                        break;
                    case cc.MethodHubOnName.OTHER_DEVICE:
                        // m.A[0] = ma loi , m.A[1] = message
                        //vao phong choi tren thiet bi khac
                        cc.PopupController.getInstance().showPopupOtherDevice( m.A[1], cc.GameId.MINI_POKER);
                        break;
                }
            } else {
                //PING PONG
                if (response.I) {
                    this.miniPokerHub.pingPongResponse(response.I);
                }
            }
        },

        onHubOpen: function () {
            //vao lobby
            this.sendRequestOnHub(cc.MethodHubName.ENTER_LOBBY);

            var self = this;
            cc.director.getScheduler().schedule(function () {
                //goi playnow
                self.sendRequestOnHub(cc.MethodHubName.PLAY_NOW);
            }, this, 1, 0, 0.1, false);

            cc.PopupController.getInstance().hideBusy();
        },

        onHubClose: function () {
            cc.MiniPokerController.getInstance().reset();

            if ((new Date()).getTime() - this.lastTimeReconnect >= netConfig.RECONNECT_TIME * 1000) {
                this.reconnect();
            } else {
                cc.director.getScheduler().schedule(this.reconnect, this, netConfig.RECONNECT_TIME, 0, 0, false);
            }
        },

        onHubError: function () {

        },

        closeClicked: function () {
            cc.MiniPokerController.getInstance().reset();

            this.animation.play('closePopup');
            var self = this;
            var delay = 0.12;
            cc.director.getScheduler().schedule(function () {
                self.animation.stop();
                cc.LobbyController.getInstance().destroyDynamicView(cc.GameId.MINI_POKER);
            }, this, 1, 0, delay, false);
        },

        onScale: function() {
            if (!this.isScale) {
                this.isScale = true;
                this.nodeScale.scaleX = 1.0;
                this.nodeScale.scaleY = 1.0;
            } else {
                this.isScale = false;
                this.nodeScale.scaleX = 0.8;
                this.nodeScale.scaleY = 0.8;
            }
        }
    });
}).call(this);
