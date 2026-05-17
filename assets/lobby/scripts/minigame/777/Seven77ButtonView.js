/**
 * Created by Nofear on 6/7/2017.
 */

var gameMessage = require('GameMessage');

(function () {
    cc.Seven77ButtonView = cc.Class({
        "extends": cc.Component,
        properties: {
            seven77Image: cc.Seven77Image, //chua spriteFrame

            btn100: cc.Button,
            btn1000: cc.Button,
            btn5000: cc.Button,
            btn10000: cc.Button,

            btnFastSpin: cc.Button,
            btnAutoSpin: cc.Button,

            btnSpin: cc.Button,

            btnSelectLines: cc.Button,

            btnScale: cc.Button,
            spriteScaleIcon: [cc.SpriteFrame] 
        },

        onLoad: function () {
            cc.Seven77Controller.getInstance().setSeven77ButtonView(this);

            this.betValues = [100, 1000, 5000, 10000];

            this.sprite100 = this.btn100.node.getComponent(cc.Sprite);
            this.sprite1000 = this.btn1000.node.getComponent(cc.Sprite);
            this.sprite5000 = this.btn5000.node.getComponent(cc.Sprite);
            this.sprite10000 = this.btn10000.node.getComponent(cc.Sprite);

            this.lb100 = this.btn100.node.getComponentInChildren(cc.Label);
            this.lb1000 = this.btn1000.node.getComponentInChildren(cc.Label);
            this.lb5000 = this.btn5000.node.getComponentInChildren(cc.Label);
            this.lb10000 = this.btn10000.node.getComponentInChildren(cc.Label);

            this.spriteFastSpin = this.btnFastSpin.node.getComponent(cc.Sprite);
            this.spriteAutoSpin = this.btnAutoSpin.node.getComponent(cc.Sprite);
            this.spriteSpin = this.btnSpin.node.getComponent(cc.Sprite);
            this.spriteButtonScale = this.btnScale.node.getComponent(cc.Sprite);

            //default x1
            this.roomId = cc.Seven77RoomId.Room_100;

            this.isFastSpin = false;
            this.isAutoSpin = false;
            this.isScale = false;

            this.isFreeSpinMode = false;

            this.animation = this.node.getComponent(cc.Animation);

            this.processUIByRoomId();

            //mac dinh vao phong khoa nut den khi goi PlayNow thanh cong
            this.activateAllButton(false);
        },

        activateAllButton: function (enable) {
            this.btnFastSpin.interactable = enable;
            this.btnAutoSpin.interactable = enable;
            this.activateButton(enable);
        },

        activateButton: function (enable) {
            this.spriteSpin.spriteFrame = enable ? this.seven77Image.sfSpins[0] : this.seven77Image.sfSpins[1];

            this.btnSpin.interactable = enable;
            this.btnSelectLines.interactable = enable;

            this.btn100.interactable = enable;
            this.btn1000.interactable = enable;
            this.btn10000.interactable = enable;
        },

        activateButtonSelectLines: function (enable) {
            this.isFreeSpinMode = !enable;
            // this.btnSelectLines.interactable = enable;
        },

        processUIByRoomId: function () {
            this.sprite100.spriteFrame = this.seven77Image.sfChipsOff[0];
            this.sprite1000.spriteFrame = this.seven77Image.sfChipsOff[1];
            this.sprite5000.spriteFrame = this.seven77Image.sfChipsOff[2];
            this.sprite10000.spriteFrame = this.seven77Image.sfChipsOff[3];
            switch (this.roomId) {
                case cc.Seven77RoomId.Room_100:
                    this.sprite100.spriteFrame = this.seven77Image.sfChipsOn[0];
                    break;
                case cc.Seven77RoomId.Room_1000:
                    this.sprite1000.spriteFrame = this.seven77Image.sfChipsOn[1];
                    break;
                case cc.Seven77RoomId.Room_5000:
                    this.sprite5000.spriteFrame = this.seven77Image.sfChipsOn[2];
                    break;
                case cc.Seven77RoomId.Room_10000:
                    this.sprite10000.spriteFrame = this.seven77Image.sfChipsOn[3];
                    break;
            }
        },

        getBetValue: function () {
            return this.betValues[this.roomId - 1];
        },

        getRoomId: function () {
            return this.roomId;
        },

        getFastSpin: function () {
            return this.isFastSpin;
        },

        stopAutoSpin: function () {
            this.isAutoSpin = false;
            this.processAutoSpin();
        },

        startSpin: function () {
            if (cc.Seven77SpinController.getInstance().getBetLinesText() === '') {
                cc.PopupController.getInstance().showMessage(gameMessage.YOU_NOT_CHOOSE_BET_LINES);
                return;
            }

            //ko du so du
            if (!cc.Seven77FreeSpinController.getInstance().getStateFreeSpin()) {
                if (cc.BalanceController.getInstance().getBalance() < (this.betValues[this.roomId - 1] * cc.Seven77SpinController.getInstance().getTotalLines())) {
                    cc.PopupController.getInstance().showMessage(gameMessage.BALANCE_NOT_ENOUGH_SPIN);
                    //tat autoSpin
                    this.stopAutoSpin();
                    return;
                }
            }

            var self = this;
            //Khoa Click cac button chuc nang
            self.activateButton(false);

            //request len hub
            cc.Seven77Controller.getInstance().sendRequestOnHub(
                cc.MethodHubName.SPIN,
                cc.Seven77SpinController.getInstance().getBetLinesText(),
                self.roomId,
            );

            //cc.Seven77SpinController.getInstance().startSpin();
        },

        processAutoSpin: function () {
            if (this.isAutoSpin) {
                this.spriteAutoSpin.spriteFrame = this.seven77Image.sfAutoSpins[0];
            } else {
                this.spriteAutoSpin.spriteFrame = this.seven77Image.sfAutoSpins[1];
            }
            cc.Seven77SpinController.getInstance().autoSpin(this.isAutoSpin);
        },

        roomClicked: function (event, data) {
            if (this.isAutoSpin) {
                cc.PopupController.getInstance().showMessage(gameMessage.MP_CANT_SWITCH_ROOM_AUTO_SPIN);
                return;
            }

            if (cc.Seven77SpinController.getInstance().getSpining()) {
                cc.PopupController.getInstance().showMessage(gameMessage.MP_CANT_SWITCH_ROOM_SPINNING);
                return;
            }

            this.roomId = parseInt(data.toString());
            this.processUIByRoomId();

            cc.Seven77Controller.getInstance().sendRequestOnHub(cc.MethodHubName.PLAY_NOW);
        },

        fastSpinClicked: function () {
            this.isFastSpin = !this.isFastSpin;
            if (this.isFastSpin) {
                this.spriteFastSpin.spriteFrame = this.seven77Image.sfFastSpins[0];
            } else {
                this.spriteFastSpin.spriteFrame = this.seven77Image.sfFastSpins[1];
            }
        },

        autoSpinClicked: function () {
            if (cc.Seven77SpinController.getInstance().getBetLinesText() === '') {
                cc.PopupController.getInstance().showMessage(gameMessage.YOU_NOT_CHOOSE_BET_LINES);
                return;
            }

            if (!this.isAutoSpin) {
                if (!cc.Seven77FreeSpinController.getInstance().getStateFreeSpin()) {
                    //ko du so du
                    if (cc.BalanceController.getInstance().getBalance() < (this.betValues[this.roomId - 1] * cc.Seven77SpinController.getInstance().getTotalLines())) {
                        cc.PopupController.getInstance().showMessage(gameMessage.BALANCE_NOT_ENOUGH_SPIN);
                        return;
                    }
                }
            }

            this.isAutoSpin = !this.isAutoSpin;
            this.processAutoSpin();
        },

        spinClicked: function () {
            this.startSpin();
        },

        helpClicked: function () {
            cc.Seven77PopupController.getInstance().createHelpView();
        },

        topClicked: function () {
            cc.Seven77PopupController.getInstance().createTopView();
        },

        historyClicked: function () {
            cc.Seven77PopupController.getInstance().createHistoryView();
        },

        betLinesClicked: function () {
            if (this.isFreeSpinMode) {
                cc.PopupController.getInstance().showMessage('Bạn không thể chọn dòng khi quay miễn phí');
                return;
            }
            cc.Seven77PopupController.getInstance().createBetLinesView();
        },

        scaleClick: function () {
            cc.Seven77Controller.getInstance().onScale();
            if (!this.isScale) {
                this.spriteButtonScale.spriteFrame = this.spriteScaleIcon[0];
                this.isScale = true;
            } else {
                this.spriteButtonScale.spriteFrame = this.spriteScaleIcon[1];
                this.isScale = false;
            }
        },
    });
}).call(this);
