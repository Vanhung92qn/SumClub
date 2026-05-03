/**
 * Created by Nofear on 6/7/2017.
 */
var slotsConfig = require('TQConfig');
var gameMessage = require('GameMessage');

(function () {
    cc.TQButtonView = cc.Class({
        "extends": cc.Component,
        properties: {
            tqImage: cc.TQImage, //chua spriteFrame

            btn1000: cc.Button,
            btn2000: cc.Button,
            btn5000: cc.Button,
            btn10000: cc.Button,
            btn30000: cc.Button,
            // btn100000: cc.Button,

            btnFastSpin: cc.Button,
            btnAutoSpin: cc.Button,

            btnSpin: cc.Button,
            btnScale: cc.Button,
            spriteScaleIcon: [cc.SpriteFrame] 
        },

        onLoad: function () {
            cc.TQController.getInstance().setTQButtonView(this);

            this.betValues = [1000, 2000, 5000, 10000, 30000, 50000, 100000];

            this.sprite1000 = this.btn1000.node.getComponentInChildren(cc.Sprite);
            this.sprite2000 = this.btn2000.node.getComponentInChildren(cc.Sprite);
            this.sprite5000 = this.btn5000.node.getComponentInChildren(cc.Sprite);
            this.sprite10000 = this.btn10000.node.getComponentInChildren(cc.Sprite);
            this.sprite30000 = this.btn30000.node.getComponentInChildren(cc.Sprite);
            // this.sprite100000 = this.btn100000.node.getComponentInChildren(cc.Sprite);

            this.lb1000 = this.btn1000.node.getComponentInChildren(cc.Label);
            this.lb2000 = this.btn2000.node.getComponentInChildren(cc.Label);
            this.lb5000 = this.btn5000.node.getComponentInChildren(cc.Label);
            this.lb10000 = this.btn10000.node.getComponentInChildren(cc.Label);
            this.lb30000 = this.btn30000.node.getComponentInChildren(cc.Label);
            // this.lb100000 = this.btn100000.node.getComponentInChildren(cc.Label);

            this.spriteFastSpin = this.btnFastSpin.node.getComponent(cc.Sprite);
            this.spriteAutoSpin = this.btnAutoSpin.node.getComponent(cc.Sprite);
            this.spriteSpin = this.btnSpin.node.getComponent(cc.Sprite);
            this.spriteButtonScale = this.btnScale.node.getComponent(cc.Sprite);

            //default x1
            this.roomId = cc.TQRoomId.Room_1000;

            this.isFastSpin = false;
            this.isAutoSpin = false;
            this.isScale = true;

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
            this.spriteSpin.spriteFrame = enable ? this.tqImage.sfSpins[0] : this.tqImage.sfSpins[1];

            this.btnSpin.interactable = enable;

            this.btn1000.interactable = enable;
            this.btn2000.interactable = enable;
            this.btn5000.interactable = enable;
            this.btn10000.interactable = enable;
            this.btn30000.interactable = enable;
        },

        processUIByRoomId: function () {
            this.sprite1000.spriteFrame = this.tqImage.sfChips[1];
            this.sprite2000.spriteFrame = this.tqImage.sfChips[1];
            this.sprite5000.spriteFrame = this.tqImage.sfChips[1];
            this.sprite10000.spriteFrame = this.tqImage.sfChips[1];
            this.sprite30000.spriteFrame = this.tqImage.sfVipChips[1];
            // this.sprite100000.spriteFrame = this.tqImage.sfVipChips[1];
            switch (this.roomId) {
                case cc.TQRoomId.Room_1000:
                    this.sprite1000.spriteFrame = this.tqImage.sfChips[0];
                    break;
                case cc.TQRoomId.Room_2000:
                    this.sprite2000.spriteFrame = this.tqImage.sfChips[0];
                    break;
                case cc.TQRoomId.Room_5000:
                    this.sprite5000.spriteFrame = this.tqImage.sfChips[0];
                    break;
                case cc.TQRoomId.Room_10000:
                    this.sprite10000.spriteFrame = this.tqImage.sfChips[0];
                    break;
                case cc.TQRoomId.Room_30000:
                    this.sprite30000.spriteFrame = this.tqImage.sfVipChips[0];
                    break;
                case cc.TQRoomId.Room_50000:
                    break;
                case cc.TQRoomId.Room_100000:
                    // this.sprite100000.spriteFrame = this.tqImage.sfVipChips[0];
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
            if (cc.TQSpinController.getInstance().getBetLinesText() === '') {
                cc.PopupController.getInstance().showMessage(gameMessage.YOU_NOT_CHOOSE_BET_LINES);
                return;
            }

            if (!cc.TQFreeSpinController.getInstance().getStateFreeSpin()) {
                //ko du so du
                if (cc.BalanceController.getInstance().getBalance() < this.betValues[this.roomId - 1]) {
                    cc.PopupController.getInstance().showMessage(gameMessage.BALANCE_NOT_ENOUGH_SPIN);
                    //tat autoSpin
                    this.stopAutoSpin();
                    return;
                }
            }


            if (this.isFastSpin) {
                var duration = slotsConfig.TIME_SPIN_FAST;
            } else {
                var duration = slotsConfig.TIME_SPIN_NORMAL;
            }

            if (!this.isAutoSpin) {
                this.action = cc.rotateBy (duration, -360 * duration);
                this.action.easing(cc.easeInOut(2.0));
            }

            var self = this;
            //Khoa Click cac button chuc nang
            self.activateButton(false);

            //request len hub
            cc.TQController.getInstance().sendRequestOnHub(
                cc.MethodHubName.SPIN,
                self.roomId,
            );

        },

        processAutoSpin: function () {
            if (this.isAutoSpin) {
                this.spriteAutoSpin.spriteFrame = this.tqImage.sfAutoSpins[0];
            } else {
                this.spriteAutoSpin.spriteFrame = this.tqImage.sfAutoSpins[1];
            }
            cc.TQSpinController.getInstance().autoSpin(this.isAutoSpin);
        },

        roomClicked: function (event, data) {
            if (this.isAutoSpin) {
                cc.PopupController.getInstance().showMessage(gameMessage.MP_CANT_SWITCH_ROOM_AUTO_SPIN);
                return;
            }

            if (cc.TQSpinController.getInstance().getSpining()) {
                cc.PopupController.getInstance().showMessage(gameMessage.MP_CANT_SWITCH_ROOM_SPINNING);
                return;
            }

            this.roomId = parseInt(data.toString());
            this.processUIByRoomId();

            cc.TQController.getInstance().sendRequestOnHub(cc.MethodHubName.PLAY_NOW);
        },

        fastSpinClicked: function () {
            this.isFastSpin = !this.isFastSpin;
            if (this.isFastSpin) {
                this.spriteFastSpin.spriteFrame = this.tqImage.sfFastSpins[0];
            } else {
                this.spriteFastSpin.spriteFrame = this.tqImage.sfFastSpins[1];
            }
        },

        autoSpinClicked: function () {
            if (cc.TQSpinController.getInstance().getBetLinesText() === '') {
                cc.PopupController.getInstance().showMessage(gameMessage.YOU_NOT_CHOOSE_BET_LINES);
                return;
            }

            if (!this.isAutoSpin) {
                if (!cc.TQFreeSpinController.getInstance().getStateFreeSpin()) {
                    //ko du so du
                    if (cc.BalanceController.getInstance().getBalance() < this.betValues[this.roomId - 1]) {
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
            cc.TQPopupController.getInstance().createHelpView();
        },

        topClicked: function () {
            cc.TQPopupController.getInstance().createTopView();
        },

        historyClicked: function () {
            cc.TQPopupController.getInstance().createHistoryView();
        },

        betLinesClicked: function () {
            cc.TQPopupController.getInstance().createBetLinesView();
        },

        scaleClick: function () {
            cc.TQController.getInstance().onScale();
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
