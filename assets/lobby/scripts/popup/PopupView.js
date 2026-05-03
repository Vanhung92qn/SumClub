/**
 * Created by Nofear on 6/7/2017.
 */

var netConfig = require('NetConfig');

(function () {

    cc.PopupView = cc.Class({
        "extends": cc.Component,
        properties: {
            nodeBusy: cc.Node,

            //popup dang message
            nodeMessage: cc.Node,
            spriteMessage: cc.Sprite,
            lbMessage: cc.Label,

            //popup co button
            nodePopup: cc.Node,
            lbContentInfo: cc.Label,
            buttonRed: cc.Button,
            buttonBlue: cc.Button,

            //popup OTP
            nodePopupOTP: cc.Node,
            lbContentInfoOTP: cc.Label,
            buttonBlueOTP: cc.Button,
            lbBlueOTPs: [cc.Label],

            //popup OTP + menu otp
            editBoxOTP: cc.EditBox,
            btnGetOTPs: [cc.Button],
            lbBtnGetOTPs: [cc.Label],
            nodeTeleSafes: [cc.Node],
            animationMenuOTP: cc.Animation,
            lbOTPType: cc.Label,

            //message mini
            nodeMini: cc.Node,
            lbMiniMessage: cc.Label,

            lbReds: [cc.Label],
            lbBlues: [cc.Label],

            sfMessageError: cc.SpriteFrame,
            sfMessageInfo: cc.SpriteFrame,

            //sprite icon
            //spriteIcon: cc.Sprite,
        },

        onLoad: function () {
            //if (this.spriteIcon)
                //this.spriteIcon.spriteFrame = cc.LobbyController.getInstance().getGameAssets().icons[cc.Config.getInstance().getIndexIcon(cc.Config.getInstance().getServiceId())];

            this.nodeMessage.opacity = 0;
            this.isLostConnection = false;
            this.isRegLogin = false;
            this.isOtherDevice = false;
            this.isRequireLocation = false;

            //cac tham so popup OTP
            this.isTimer = false;
            this.timer = 0;
            this.timePerGetOTP = 120;
            this.updateInterval = 1;
            this.updateTimer = 0;
            this.otpType = cc.OTPType.TELE_SAFE;
        },

        update: function (dt) {
            if (this.isTimer) {
                this.timer -= dt;
                this.updateTimer += dt;

                if (this.updateTimer < this.updateInterval) return; // we don't need to do the math every frame
                this.updateTimer = 0;
                this.processTimeOTPButton();
            }
        },

        init: function () {
            this.animationPopup = this.nodePopup.getComponent(cc.Animation);
            this.animationPopupOTP = this.nodePopupOTP.getComponent(cc.Animation);

            this.animation = this.node.getComponent(cc.Animation);
            this.node.zIndex = cc.NoteDepth.POPUP_SYSTEM;
        },

        activeTimeOTPButton: function () {
            this.isTimer = true;
            this.updateTimer = 1;
            this.timer = this.timePerGetOTP;
        },

        getTimeOTPPopup: function () {
            this.timer = parseInt(cc.Tool.getInstance().getItem("@TimeGetOTPPopupOTP"));
            this.processTimeOTPButton();
            var loginResponse = cc.LoginController.getInstance().getLoginResponse();

            //#KingViet
            if (cc.Config.getInstance().getDomainVK().includes(netConfig.HOST)) {
                this.nodeTeleSafes.forEach(function (nodeTeleSafe) {
                    nodeTeleSafe.active = false;
                });
                this.otpType = cc.OTPType.TELE_SAFE;
                this.lbOTPType.string = 'App OTP';
            } else {
                if (loginResponse.PhoneSafeNo === null) {
                    this.nodeTeleSafes.forEach(function (nodeTeleSafe) {
                        nodeTeleSafe.active = false;
                    });
                    this.otpType = cc.OTPType.SMS;
                    this.lbOTPType.string = 'SMS';
                }
            }
        },

        processTimeOTPButton: function () {
            if (this.timer <= 0) {
                this.isTimer = false;
                this.btnGetOTPs.forEach(function (btnGetOTP) {
                    btnGetOTP.interactable = true;
                });
                this.lbBtnGetOTPs.forEach(function (lbBtnGetOTP) {
                    lbBtnGetOTP.string = 'LẤY OTP';
                });
            } else {
                this.isTimer = true;
                var timeBtn = this.timer;
                this.btnGetOTPs.forEach(function (btnGetOTP) {
                    btnGetOTP.interactable = false;
                });
                this.lbBtnGetOTPs.forEach(function (lbBtnGetOTP) {
                    lbBtnGetOTP.string = Math.round(timeBtn);
                });
            }
        },

        showBusy: function () {
            this.nodeBusy.active = true;
        },

        hideBusy: function () {
            this.nodeBusy.active = false;
        },

        showMessage: function (message, code) {
            this.spriteMessage.spriteFrame = this.sfMessageInfo;
            this.showMess(message, code);
        },

        showMessageError: function (message, code) {
            this.spriteMessage.spriteFrame = this.sfMessageError;
            this.showMess(message, code);
        },

        showMess: function (message, code) {
            if (message) {
                this.lbMessage.string = message;
            } else if (message) {
                this.lbMessage.string = 'Đã có lỗi xảy ra';
            } else {
                this.lbMessage.string = 'Đã có lỗi xảy ra (' + code + ')';
            }
            this.nodeMessage.opacity = 0;
            this.nodeMessage.active = true;
            this.animation.stop('openPopupFade');
            this.animation.play('openPopupFade', 0);
        },

        showPopupOTP: function (content, titleButtonBlue, clickEventHandlerBlue) {
            if (this.nodePopupOTP.active) return;

            this.getTimeOTPPopup();

            this.lbContentInfoOTP.string = content;

            this.lbBlueOTPs.forEach(function (lbBlueOTP) {
                lbBlueOTP.string = titleButtonBlue;
            });
            this.buttonBlueOTP.clickEvents = [];
            this.buttonBlueOTP.clickEvents.push(clickEventHandlerBlue);

            this.buttonBlueOTP.node.active = true;

            this.nodePopupOTP.active = true;
            this.animationPopupOTP.play('openPopup');
        },

        showPopup: function (content, titleButtonRed, titleButtonBlue, clickEventHandlerRed, clickEventHandlerBlue) {
            if (this.nodePopup.active) return;

            this.lbContentInfo.string = content;
            this.lbReds.forEach(function (lbRed) {
                lbRed.string = titleButtonRed;
            });
            this.lbBlues.forEach(function (lbBlue) {
                lbBlue.string = titleButtonBlue;
            });
            this.buttonRed.clickEvents = [];
            this.buttonBlue.clickEvents = [];
            this.buttonRed.clickEvents.push(clickEventHandlerRed);
            this.buttonBlue.clickEvents.push(clickEventHandlerBlue);

            this.buttonRed.node.active = true;
            this.buttonBlue.node.active = true;

            this.nodePopup.active = true;
            this.animationPopup.play('openPopup');
        },

        showPopupSimple: function (content, titleButton, clickEventHandler) {
            if (this.nodePopup.active) return;

            this.lbContentInfo.string = content;

            this.lbBlues.forEach(function (lbBlue) {
                lbBlue.string = titleButton;
            });

            this.buttonBlue.clickEvents.push(clickEventHandler);

            this.buttonRed.node.active = false;
            this.buttonBlue.node.active = true;

            this.nodePopup.active = true;
            this.animationPopup.play('openPopup');
        },

        showPopupLostConnection: function () {
            // console.log('showPopupLostConnection');
            if (this.isLostConnection) return;
            this.isLostConnection = true;

            var clickEventHandlerBlue = new cc.Component.EventHandler();
            clickEventHandlerBlue.target = this; //This node is the node to which your event handler code component belongs
            clickEventHandlerBlue.component = 'PopupView';//This is the code file name
            clickEventHandlerBlue.handler = 'cancelTryClicked';
            //clickEventHandlerBlue.customEventData = '';

            var clickEventHandlerRed = new cc.Component.EventHandler();
            clickEventHandlerRed.target = this; //This node is the node to which your event handler code component belongs
            clickEventHandlerRed.component = 'PopupView';//This is the code file name
            clickEventHandlerRed.handler = 'tryClicked';

            cc.PopupController.getInstance().showPopup(
                'Bạn vừa mất kết nối vui lòng thử lại',
                'Huỷ',
                'Thử lại',
                clickEventHandlerRed,
                clickEventHandlerBlue
            );
        },

        showPopupRequireLogin: function (message) {
            // console.log('showPopupRequireLogin');
            if (this.isRegLogin) return;
            this.isRegLogin = true;

            var clickEventHandler = new cc.Component.EventHandler();
            clickEventHandler.target = this; //This node is the node to which your event handler code component belongs
            clickEventHandler.component = 'PopupView';//This is the code file name
            clickEventHandler.handler = 'openLoginClicked';

            cc.PopupController.getInstance().showPopupSimple(
                message,
                'Đồng ý',
                clickEventHandler
            );
        },

        showPopupOtherDevice: function (message, gameId) {
            this.gameId = gameId;

            // console.log('showPopupOtherDevice');
            if (this.isOtherDevice) return;
            this.isOtherDevice = true;

            var clickEventHandler = new cc.Component.EventHandler();
            clickEventHandler.target = this; //This node is the node to which your event handler code component belongs
            clickEventHandler.component = 'PopupView';//This is the code file name
            clickEventHandler.handler = 'quitRoomClicked';

            cc.PopupController.getInstance().showPopupSimple(
                message,
                'Đồng ý',
                clickEventHandler
            );
        },

        //Popup yeu cau bat cho phep track Location -> choi game bai
        showPopupRequireEnableLocation: function () {
            if (this.isRequireLocation) return;
            this.isRequireLocation = true;

            var clickEventHandlerBlue = new cc.Component.EventHandler();
            clickEventHandlerBlue.target = this; //This node is the node to which your event handler code component belongs
            clickEventHandlerBlue.component = 'PopupView';//This is the code file name
            clickEventHandlerBlue.handler = 'openSettingsClicked';
            //clickEventHandlerBlue.customEventData = '';

            var clickEventHandlerRed = new cc.Component.EventHandler();
            clickEventHandlerRed.target = this; //This node is the node to which your event handler code component belongs
            clickEventHandlerRed.component = 'PopupView';//This is the code file name
            clickEventHandlerRed.handler = 'cancelSettingsClicked';

            cc.PopupController.getInstance().showPopup(
                'Để tiếp tục chơi game bạn cần cấp quyền thu thập thông tin vị trí.',
                'Bỏ qua',
                'Cài đặt',
                clickEventHandlerRed,
                clickEventHandlerBlue
            );
        },

        isShowPopupRequireEnableLocation: function () {
            return this.isRequireLocation;
        },

        closePopupRequireEnableLocation: function () {
            if (this.isRequireLocation) {
                this.closePopup();
            }
        },

        showMiniMessage: function (message) {
            this.lbMiniMessage.string = message;

            this.nodeMini.opacity = 0;
            this.nodeMini.active = true;
            this.animation.stop('openMessageFade');
            this.animation.play('openMessageFade', 0);
        },

        closePopup: function () {
            if (this.nodePopupOTP.active) {
                // cc.Tool.getInstance().setItem("@TimeGetOTPPopupOTP", Math.round(this.timer));
                cc.Tool.getInstance().setItem("@TimeGetOTPPopupOTP", 0);
            }
            this.isTimer = 0;
            this.editBoxOTP.string = '';

            this.nodeBusy.active = false;
            this.nodePopup.active = false;
            this.nodePopupOTP.active = false;
            this.nodeMessage.active = false;
            this.nodeMini.active = false;

            this.isLostConnection = false;
            this.isRequireLocation = false;
            this.isRegLogin = false;
            this.isOtherDevice = false;

            this.animationPopup.play('closePopup');
        },

        getOTPPopup: function () {
            return this.editBoxOTP.string;
        },

        isShowPopup: function () {
            return !!(this.nodePopupOTP.active || this.nodePopup.active || this.nodeBusy.active || this.nodeMessage);
        },

        // ==== OTP ====
        onGetOTPResponse: function (response) {
            if (response.Message) {
                cc.PopupController.getInstance().showMessage(response.Message);
            } else {
                cc.PopupController.getInstance().showMessage('Lấy OTP thành công');
            }
        },

        onGetOTPResponseError: function (response) {
            cc.PopupController.getInstance().showMessageError(response.Message, response.ResponseCode);
        },

        selectOTPEvent: function(event, data) {
            this.otpType = data.toString() === 'App OTP' ? cc.OTPType.TELE_SAFE : cc.OTPType.SMS;
            this.lbOTPType.string = data.toString();
            this.animationMenuOTP.play('hideDropdownMenu');
        },

        openMenuOTPClicked: function () {
            this.animationMenuOTP.play('showDropdownMenu');
        },

        hideMenuOTPClicked: function () {
            this.animationMenuOTP.play('hideDropdownMenu');
        },

        getOTPClicked: function () {
            this.activeTimeOTPButton();
            var getOTPCommand = new cc.GetOTPCommand;
            getOTPCommand.execute(this, '', this.otpType);
        },
        // ==== OTP ====

        cancelTryClicked: function () {
            this.closePopup();
        },

        tryClicked: function () {
            if (cc.sys.isNative) {
                cc.PopupController.getInstance().showBusy();
                cc.director.loadScene('lobby');
            } else {
                location.reload(); //document.location.reload()
            }
        },

        openLoginClicked: function () {
            if (cc.sys.isNative) {
                cc.PopupController.getInstance().showBusy();
                cc.director.loadScene('lobby');
            } else {
                location.reload(); //document.location.reload()
            }
        },

        quitRoomClicked: function () {
            //thoat khoi phong dang choi - do dang tai khoan choi tren thiet bi khac
            cc.LobbyController.getInstance().destroyDynamicView(this.gameId);
            this.closePopup();
        },

        //Game Bài
        openSettingsClicked: function () {
            cc.LocationController.getInstance().openSettings();
            this.closePopup();
        },

        cancelSettingsClicked: function () {
            this.closePopup();
        },

        closeClicked: function () {
            this.closePopup();
        }
    });
}).call(this);
