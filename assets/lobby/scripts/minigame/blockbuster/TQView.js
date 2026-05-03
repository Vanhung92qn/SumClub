/**
 * Created by Nofear on 6/7/2017.
 */

var netConfig = require('NetConfig');

(function () {
    cc.TQView = cc.Class({
        "extends": cc.Component,
        properties: {
            nodeScale: cc.Node
        },

        onLoad: function () {
            this.animation = this.node.getComponent(cc.Animation);

            //set zIndex
            this.node.zIndex = cc.Config.getInstance().getZINDEX();

            cc.TQController.getInstance().setTQView(this);

            this.lastTimeReconnect = (new Date()).getTime();
            this.isScale = true;
        },

        onEnable: function () {
            this.animation.play('openPopup');
            var self = this;
            cc.director.getScheduler().schedule(function () {
                var tqNegotiateCommand = new cc.TQNegotiateCommand;
                tqNegotiateCommand.execute(self);
            }, this, 0, 0, 0.2, false);
        },

        onDestroy: function () {
            if (this.tqHub)
                this.tqHub.disconnect();
            this.unscheduleAllCallbacks();

            if (cc.sys.isNative) {
                cc.loader.releaseResDir('tq/prefabs');
                cc.loader.releaseResDir('tq/images');
            }
            cc.PopupController.getInstance().hideBusy();
        },

        reconnect: function () {
            // console.log('tqHub reconnect');
            this.lastTimeReconnect = (new Date()).getTime();
            this.tqHub.connect(this, cc.HubName.BlockBusterHub, this.connectionToken, true);
        },

        sendRequestOnHub: function (method, roomId) {
            switch (method) {
                case cc.MethodHubName.ENTER_LOBBY:
                    this.tqHub.enterLobby();
                    break;
                case cc.MethodHubName.PLAY_NOW:
                    this.tqHub.playNow(cc.TQController.getInstance().getRoomId());
                    break;
                case cc.MethodHubName.SPIN:
                    this.tqHub.spin(null, roomId);
                    break;
            }
        },

        onTQNegotiateResponse: function (response) {
            this.connectionToken = response.ConnectionToken;
            this.tqHub = new cc.Hub;
            this.tqHub.connect(this, cc.HubName.BlockBusterHub, response.ConnectionToken);
        },

        onHubMessage: function (response) {

            if (response.M !== undefined && response.M.length > 0) {
                var m = (response.M)[0];
                switch (m.M) {
                    //vao Phong
                    case cc.MethodHubOnName.UPDATE_JACKPOT:
                        var data = m.A[0];
                        var jackpotData = data.split('|');
                        var roomIndex = cc.TQController.getInstance().getRoomId() - 1;

                        if(roomIndex === 6) roomIndex = 5;

                        cc.TQJackpotController.getInstance().updateTQJackpot(
                            parseInt(jackpotData[roomIndex])
                        );
                        break;

                    //playNow
                    case cc.MethodHubOnName.JOIN_GAME:
                        var data = m.A[0];
                        if (data.EventFreeSpin && data.EventFreeSpin > 0) {
                            cc.TQFreeSpinController.getInstance().showFreeSpin(data.EventFreeSpin);
                        } else {
                            cc.TQFreeSpinController.getInstance().hideFreeSpin();
                        }

                        cc.TQJackpotController.getInstance().updateTQJackpot(data.Jackpot);
                        //cho phep SPIN
                        cc.TQController.getInstance().activateAllButton(true);
                        cc.TQEffectController.getInstance().stopEffect();
                        break;

                    //spin
                    case cc.MethodHubOnName.RESULT_SPIN:
                        var data = m.A[0];
                        //update tien luon
                        cc.BalanceController.getInstance().updateRealBalance(data.Balance);
                        //cc.BalanceController.getInstance().updateBalance(data.Balance);

                        cc.TQSpinController.getInstance().setSpinResponse(data);
                        cc.TQJackpotController.getInstance().updateTQJackpot(data.Jackpot);

                        if (data.EventFreeSpin && data.EventFreeSpin > 0) {
                            cc.TQFreeSpinController.getInstance().showFreeSpin(data.EventFreeSpin);
                        } else {
                            cc.TQFreeSpinController.getInstance().hideFreeSpin();
                        }

                        //Co ket qua -> moi QUAY
                        cc.TQSpinController.getInstance().startSpin();
                        cc.TQSpinController.getInstance().stopSpin();

                        cc.DDNA.getInstance().spinSummary(cc.GameId.BLOCK_BUSTER, cc.TQSpinController.getInstance().checkIsAutoSpin(), data);
                        break;

                    //su kien
                    case cc.MethodHubOnName.X_BOOM:
                        // totalBoom (Số lượng boom quay đc phiên đó)
                        // xBoom (Được nhân X mấy. X1 ko cần hiển thị)
                        var data = m.A;
                        cc.TQKBController.getInstance().updateBoomInfo(data);
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
                        cc.PopupController.getInstance().showPopupOtherDevice( m.A[1], cc.GameId.BLOCK_BUSTER);
                        break;
                }
            } else {
                //PING PONG
                if (response.I) {
                    this.tqHub.pingPongResponse(response.I);
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
            cc.TQController.getInstance().reset();

            if ((new Date()).getTime() - this.lastTimeReconnect >= netConfig.RECONNECT_TIME * 1000) {
                this.reconnect();
            } else {
                cc.director.getScheduler().schedule(this.reconnect, this, netConfig.RECONNECT_TIME, 0, 0, false);
            }
        },

        onHubError: function () {

        },

        closeClicked: function () {
            cc.TQController.getInstance().reset();

            this.animation.play('closePopup');
            var self = this;
            var delay = 0.12;
            cc.director.getScheduler().schedule(function () {
                self.animation.stop();
                cc.LobbyController.getInstance().destroyDynamicView(cc.GameId.BLOCK_BUSTER);
            }, this, 1, 0, delay, false);
        },

        onScale: function() {
            if (!this.isScale) {
                this.isScale = true;
                this.nodeScale.scaleX = 0.9;
                this.nodeScale.scaleY = 0.9;
            } else {
                this.isScale = false;
                this.nodeScale.scaleX = 0.7;
                this.nodeScale.scaleY = 0.7;
            }
        }

    });
}).call(this);
