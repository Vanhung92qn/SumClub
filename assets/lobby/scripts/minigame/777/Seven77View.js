/**
 * Created by Nofear on 6/7/2017.
 */

var netConfig = require('NetConfig');

(function () {
    cc.Seven77View = cc.Class({
        "extends": cc.Component,
        properties: {
            nodeScale: cc.Node
        },

        onLoad: function () {
            this.animation = this.node.getComponent(cc.Animation);

            //set zIndex
            this.node.zIndex = cc.Config.getInstance().getZINDEX();

            // console.log(' this.node.zIndex 777 : ' + this.node.zIndex);

            cc.Seven77Controller.getInstance().setSeven77View(this);

            var seven77NegotiateCommand = new cc.Seven77NegotiateCommand;
            seven77NegotiateCommand.execute(this);

            this.lastTimeReconnect = (new Date()).getTime();
            this.isScale = false;
        },

        onEnable: function () {
            this.animation.play('openPopup');
            cc.PopupController.getInstance().showBusy();
        },

        onDestroy: function () {
            if (this.seven77Hub)
                this.seven77Hub.disconnect();
            this.unscheduleAllCallbacks();

            if (cc.sys.isNative) {
                cc.loader.releaseResDir('777/prefabs');
                cc.loader.releaseResDir('777/images');
            }
            cc.PopupController.getInstance().hideBusy();
        },

        reconnect: function () {
            // console.log('seven77Hub reconnect');
            this.lastTimeReconnect = (new Date()).getTime();
            this.seven77Hub.connect(this, cc.HubName.Seven77Hub, this.connectionToken, true);
        },

        sendRequestOnHub: function (method, lines, roomId) {
            // console.log('sendRequestOnHub: ' + method);
            switch (method) {
                case cc.MethodHubName.ENTER_LOBBY:
                    this.seven77Hub.enterLobby();
                    break;
                case cc.MethodHubName.PLAY_NOW:
                    this.seven77Hub.playNow(cc.Seven77Controller.getInstance().getRoomId());
                    break;
                case cc.MethodHubName.SPIN:
                    this.seven77Hub.spin(lines, roomId);
                    break;
            }
        },

        onSeven77NegotiateResponse: function (response) {
            this.connectionToken = response.ConnectionToken;
            this.seven77Hub = new cc.Hub;
            this.seven77Hub.connect(this, cc.HubName.Seven77Hub, response.ConnectionToken);
        },

        onHubMessage: function (response) {

            if (response.M !== undefined && response.M.length > 0) {
                var m = (response.M)[0];
                switch (m.M) {
                    //vao Phong
                    case cc.MethodHubOnName.UPDATE_JACKPOT:
                        var data = m.A[0];
                        var jackpotData = data.split('|');
                        cc.Seven77JackpotController.getInstance().updateSeven77Jackpot(
                            parseInt(jackpotData[cc.Seven77Controller.getInstance().getRoomId() - 1])
                        );
                        break;

                    //playNow
                    case cc.MethodHubOnName.JOIN_GAME:
                        var data = m.A[0];

                        cc.Seven77JackpotController.getInstance().updateSeven77Jackpot(data.Jackpot);
                        //cho phep SPIN
                        cc.Seven77Controller.getInstance().activateAllButton(true);
                        cc.Seven77EffectController.getInstance().stopEffect();
                        // cc.Seven77SpinController.getInstance().randomAllIcon();

                        if (data.EventFreeSpin && data.EventFreeSpin > 0) {
                            cc.Seven77FreeSpinController.getInstance().showFreeSpin(data.EventFreeSpin);
                            cc.Seven77Controller.getInstance().activateButtonSelectLines(false);
                        } else {
                            cc.Seven77FreeSpinController.getInstance().hideFreeSpin();
                            cc.Seven77Controller.getInstance().activateButtonSelectLines(true);
                        }
                        break;

                    //spin
                    case cc.MethodHubOnName.RESULT_SPIN:
                        var data = m.A[0];
                        //update tien luon
                        cc.BalanceController.getInstance().updateRealBalance(data.Balance);
                        //cc.BalanceController.getInstance().updateBalance(data.Balance);

                        cc.Seven77SpinController.getInstance().setSpinResponse(data);
                        cc.Seven77JackpotController.getInstance().updateSeven77Jackpot(data.Jackpot);

                        //Co ket qua -> moi goi QUAY
                        cc.Seven77SpinController.getInstance().startSpin();
                        cc.Seven77SpinController.getInstance().stopSpin();

                        cc.DDNA.getInstance().spinSummary(cc.GameId.SEVEN77, cc.Seven77SpinController.getInstance().checkIsAutoSpin(), data);
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
                        cc.PopupController.getInstance().showPopupOtherDevice( m.A[1], cc.GameId.SEVEN77);
                        break;
                }
            } else {
                //PING PONG
                if (response.I) {
                    this.seven77Hub.pingPongResponse(response.I);
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
            cc.Seven77Controller.getInstance().reset();

            if ((new Date()).getTime() - this.lastTimeReconnect >= netConfig.RECONNECT_TIME * 1000) {
                this.reconnect();
            } else {
                cc.director.getScheduler().schedule(this.reconnect, this, netConfig.RECONNECT_TIME, 0, 0, false);
            }
        },

        onHubError: function () {

        },

        closeClicked: function () {
            cc.Seven77Controller.getInstance().reset();

            this.animation.play('closePopup');
            var self = this;
            var delay = 0.12;
            cc.director.getScheduler().schedule(function () {
                self.animation.stop();
                cc.LobbyController.getInstance().destroyDynamicView(cc.GameId.SEVEN77);
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
