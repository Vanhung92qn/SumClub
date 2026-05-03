/**
 * Created by Nofear on 3/15/2019.
 */

var netConfig = require('NetConfig');

(function () {
    cc.TransferView = cc.Class({
        "extends": cc.Component,
        properties: {
            lbBalance: cc.Label,
            lbValueTransfer: cc.Label,

            editBoxNickNameReceive: cc.EditBox,
            editBoxValueTransfer: cc.EditBox,
            editBoxReason: cc.EditBox,
            editBoxOTP: cc.EditBox,

            editBoxExchangeRate: cc.EditBox,//KingViet

            btnGetOTPs: [cc.Button],
            lbBtnGetOTPs: [cc.Label],

            nodeIsAgency: cc.Node,

            //menu otp
            nodeTeleSafes: [cc.Node],

            animationMenuOTP: cc.Animation,
            lbOTPType: cc.Label,
            audioClickRut: cc.AudioSource,
        },

        onLoad: function () {
            cc.TransferController.getInstance().setTransferView(this);
            this.isTimer = false;
            this.timer = 0;
            this.timePerGetOTP = 120;
            this.updateInterval = 1;
            this.updateTimer = 0;
            this.otpType = cc.OTPType.TELE_GRAM;

            this.editBoxValueTransfer.placeholder = 'Số ' + cc.Config.getInstance().currency() + ' chuyển';        
        },

        onEnable: function () {
            this.resetInput();
            this.lbValueTransfer.string = 'Số ' + cc.Config.getInstance().currency() + ' cần chuyển: 0';

            this.timer = parseInt(cc.Tool.getInstance().getItem("@TimeGetOTPTransfer"));
            this.processTimeOTPButton();

            var loginResponse = cc.LoginController.getInstance().getLoginResponse();
            this.lbBalance.string = 'Số dư: ' + cc.Tool.getInstance().formatNumber(loginResponse.Balance);

            var nickNameAgency = cc.Tool.getInstance().getItem('@nickNameAgency');
            this.editBoxNickNameReceive.string = nickNameAgency;
            var checkAgency = cc.ShopController.getInstance().checkNickNameAgency(nickNameAgency);
            this.isAgency = checkAgency;
            this.nodeIsAgency.active = checkAgency;

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
                    this.otpType = cc.OTPType.TELE_GRAM;
                    this.lbOTPType.string = 'OTP TELE';
                }
            }
        },


        onDisable: function () {
            cc.Tool.getInstance().setItem("@TimeGetOTPTransfer", Math.round(this.timer));
        },

        onDestroy: function () {
            cc.Tool.getInstance().setItem("@TimeGetOTPTransfer", Math.round(this.timer));
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

        resetInput: function () {
            this.editBoxValueTransfer.string = '';
            if (this.editBoxExchangeRate) {
                this.editBoxExchangeRate.string = '';
            }
            this.editBoxNickNameReceive.string = '';
            this.editBoxReason.string = '';
           this.editBoxOTP.string = '';
            this.lbValueTransfer.string = 'Số ' + cc.Config.getInstance().currency() + ' cần chuyển: 0';
        },

        activeTimeOTPButton: function () {
            this.isTimer = true;
            this.updateTimer = 1;
            this.timer = this.timePerGetOTP;
        },

        processTimeOTPButton: function () {
            if (this.timer <= 0) {
                this.isTimer = false;
                this.btnGetOTPs.forEach(function (btnGetOTP) {
                    btnGetOTP.interactable = true;
                });
                this.lbBtnGetOTPs.forEach(function (lbBtnGetOTP) {
                    lbBtnGetOTP.string = 'Lấy OTP';
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

        onUserTransferResponse: function (response) {
            this.timer = 0;
            cc.Tool.getInstance().setItem("@TimeGetOTPTransfer", Math.round(this.timer));
            this.processTimeOTPButton();

            this.lbBalance.string = 'Số dư: ' + cc.Tool.getInstance().formatNumber(response.Balance);
            this.resetInput();

            var loginResponse = cc.LoginController.getInstance().getLoginResponse();
            loginResponse.Balance = response.Balance;
            cc.LoginController.getInstance().setLoginResponse(loginResponse);
            cc.LobbyController.getInstance().refreshAccountInfo();

            cc.PopupController.getInstance().showMessage(response.Message);
        },

        onUserTransferResponseError: function (response) {
            if(response.ResponseCode == 200){
                this.timer = 0;
                cc.Tool.getInstance().setItem("@TimeGetOTPTransfer", Math.round(this.timer));
                this.processTimeOTPButton();
                this.resetInput();
            }else{
                cc.PopupController.getInstance().showMessageError(response.Message, response.ResponseCode);
            }
        },

        onEditingNickNameReceiveChanged: function () {
            var checkAgency = cc.ShopController.getInstance().checkNickNameAgency(this.editBoxNickNameReceive.string);
            this.isAgency = checkAgency;
            this.nodeIsAgency.active = checkAgency;
        },

        onEditingValueChanged: function () {
            var val = cc.Tool.getInstance().removeDot(this.editBoxValueTransfer.string);
            this.editBoxValueTransfer.string = cc.Tool.getInstance().formatNumber(val);
            this.lbValueTransfer.string = 'Số ' + cc.Config.getInstance().currency() + ' cần chuyển: ' + this.editBoxValueTransfer.string;
        },

        onEditingValueDidEnd: function () {
            var val = cc.Tool.getInstance().removeDot(this.editBoxValueTransfer.string);
            this.editBoxValueTransfer.string = cc.Tool.getInstance().formatNumber(val);
            this.lbValueTransfer.string = 'Số ' + cc.Config.getInstance().currency() + ' cần chuyển: ' + this.editBoxValueTransfer.string;
        },

        selectOTPEvent: function(event, data) {
            this.otpType = "";
            if(data.toString() === 'App OTP'){
                this.otpType = cc.OTPType.TELE_SAFE;
            }else if(data.toString() === 'OTP TELE'){
                this.otpType = cc.OTPType.TELE_GRAM;
            }else{
                this.otpType = cc.OTPType.SMS;
            }
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
        
        confirmTransferClicked: function () {
            this.nickName = this.editBoxNickNameReceive.string.toLowerCase();
            this.amount = cc.Tool.getInstance().removeDot(this.editBoxValueTransfer.string);
            this.reason = this.editBoxReason.string;
            this.otp = this.editBoxOTP.string;
            if (this.editBoxExchangeRate) {
                this.exchangeRate = this.editBoxExchangeRate.string;
            }

            if (this.nickName === '') {
                cc.PopupController.getInstance().showMessage('Vui lòng nhập NickName người nhận');
                return;
            }

            if (this.amount === '') {
                cc.PopupController.getInstance().showMessage('Vui lòng nhập số ' + cc.Config.getInstance().currency() + ' cần chuyển');
                return;
            }

            //nếu là ĐL và cổng VK thì check
            if (cc.Config.getInstance().getDomainVK().includes(netConfig.HOST) && this.isAgency) {
                if (this.editBoxExchangeRate && this.editBoxExchangeRate.string === '') {
                    cc.PopupController.getInstance().showMessage('Vui lòng nhập chính xác tỷ giá bán cho Đại Lý');
                    return;
                }
            } else {

            }

            if (this.reason === '') {
                cc.PopupController.getInstance().showMessage('Vui lòng nhập lý do chuyển');
                return;
            }

            // if (this.otp === '') {
            //     cc.PopupController.getInstance().showMessage('Vui lòng nhập mã OTP');
            //     return;
            // }

            cc.PopupController.getInstance().showBusy();
            var userTransferCommand = new cc.UserTransferCommand;
            userTransferCommand.execute(this);
            this.audioClickRut.loop = false;
            this.audioClickRut.play();
        },

        agencyListClicked: function () {
            cc.ShopController.getInstance().activeTab(cc.ShopTab.AGENCY);
        }, 
        
        bindNickName: function (nickName) {        
            this.editBoxNickNameReceive.string = nickName;
            var checkAgency = cc.ShopController.getInstance().checkNickNameAgency(nickName);
            this.isAgency = checkAgency;
            this.nodeIsAgency.active = checkAgency;
        }
    });
}).call(this);
