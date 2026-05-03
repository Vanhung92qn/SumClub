/**
 * Created by Nofear on 3/15/2019.
 */

var netConfig = require('NetConfig');

(function () {
    cc.RedeemBankView = cc.Class({
        "extends": cc.Component,
        properties: {
            nodeStep1: cc.Node,
            nodeStep2: cc.Node,
            nodeButtonConfirmRedeem: cc.Node,
            nodeButtonHistory: cc.Node,

            nodeHelp: cc.Node,

            //step1
            lbBalance: cc.Label,
            editBoxValue: cc.EditBox,
            lbFee: cc.Label,
            lbMoney: cc.Label,

            toggleChooseValue: cc.ToggleChooseValue,
            lbSelectedBank: cc.Label,
            animationMenuBank: cc.Animation,

            editBoxBankAccNumber: cc.EditBox,
            editBoxBankAccName: cc.EditBox,

            editBoxOTP: cc.EditBox,
            btnGetOTPs: [cc.Button],
            lbBtnGetOTPs: [cc.Label],
            animationMenuOTP: cc.Animation,
            lbOTPType: cc.Label,
            nodeTeleSafes: [cc.Node],

            btnConfirm: cc.Button,
            lbConfirms: [cc.Label],

            //step2
            editBoxRedeemValue: cc.EditBox,
            lbInfoBank: cc.Label,
            lbInfoBankAccountNumber: cc.Label,
            lbInfoBankAccountName: cc.Label,
            lbInfoValue: cc.Label, //số tiền rút
            lbInfoFee: cc.Label, //phí
            lbInfoMoney: cc.Label, //số tiền thực nhận
            lbInfoValueTitle: cc.Label,

            lbMinimum: cc.Label,
            lbMaximum: cc.Label,
            lbRate: cc.Label,
        },

        onLoad: function () {
            this.isTimer = false;
            this.timer = 0;
            this.timePerGetOTP = 120;
            this.updateInterval = 1;
            this.updateTimer = 0;

            this.otpType = cc.OTPType.TELE_SAFE;

            this.animOpenName = 'showDropdownMenu';
            this.animCloseName = 'hideDropdownMenu';

            // cc.TopupController.getInstance().setTopupView(this);

            // this.editBoxValue.placeholder = 'Số ' + cc.Config.getInstance().currency() + ' muốn rút';
            // this.lbInfoValueTitle.string = 'Số ' + cc.Config.getInstance().currency() + ' rút';

            this.editBoxRedeemValue.placeholder = 'Số ' + cc.Config.getInstance().currency() + ' rút';
            this.lbInfoValueTitle.string = 'Số ' + cc.Config.getInstance().currency() + ' rút:';

            cc.PopupController.getInstance().showBusy();
            this.getListRedeemBank();
        },

        onEnable: function () {
            this.animationMenuBank.node.scaleY = 0;

            this.resetInput();

            this.timer = parseInt(cc.Tool.getInstance().getItem("@TimeGetOTPRedeem"));
            this.processTimeOTPButton();
            this.editBoxOTP.string = '';

            //3s click confirm 1 lan
            this.isTimerConfirm = false;
            this.timerConfirm = 0;
            this.timePerConfirm = 3;
            this.processTimeConfirm();

            this.nodeStep1.active = true;
            this.nodeStep2.active = false;
            this.nodeHelp.active = false;

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

            this.lbBalance.string = cc.Tool.getInstance().formatNumber(loginResponse.Balance);
        },

        onDisable: function () {
            cc.Tool.getInstance().setItem("@TimeGetOTPRedeem", Math.round(this.timer));
        },

        onDestroy: function () {
            cc.Tool.getInstance().setItem("@TimeGetOTPRedeem", Math.round(this.timer));
        },

        update: function (dt) {
            if (this.isTimer) {
                this.timer -= dt;
                this.updateTimer += dt;

                if (this.updateTimer < this.updateInterval) return; // we don't need to do the math every frame
                this.updateTimer = 0;
                this.processTimeOTPButton();
            }

            if (this.isTimerConfirm) {
                this.timerConfirm -= dt;

                this.processTimeConfirm();
            }
        },

        getListRedeemBank: function () {
            var getListRedeemBankCommand = new cc.GetListRedeemBankCommand;
            getListRedeemBankCommand.execute(this);
        },

        onGetListRedeemBankResponse: function (response) {
            cc.BankController.getInstance().setResponseRedeemBanks(response);
            this.rate = response.Rate;
            this.min = response.Min;
            this.max = response.Max;

            this.lbMinimum.string = cc.Tool.getInstance().formatNumber(response.Min) + ' ' + cc.Config.getInstance().currency();
            this.lbMaximum.string = cc.Tool.getInstance().formatNumber(response.Max) + ' ' + cc.Config.getInstance().currency();
            this.lbRate.string = 'Rút 100.000' + ' ' +  cc.Config.getInstance().currency() + ' nhận được '+ cc.Tool.getInstance().formatNumber(Math.round(100000 * response.Rate)) +' đ';

            // {
            //     "ResponseCode": 1,
            //     "Rate": 1.25,
            //     "Banks": [
            //         "VPbank",
            //         "Vietcombank",
            //         "Techcombank",
            //         "Agribank",
            //         "ACB",
            //         "Vietinbank",
            //         "BIDV",
            //         "MB"
            //     ]
            // }

            var list = response.Banks;

            this.toggleChooseValue.resetListChooseValue();

            var self = this;
            var posY = -35;// Vi tri dau tien cua Item -> fix bug
            var index = 0;
            list.forEach(function (bank) {
                self.toggleChooseValue.initializeToggleChooseValue(
                    self,
                    "RedeemBankView",
                    "selectBankEvent",
                    bank,
                    bank,
                    posY
                );
                if (index === 0) {
                    self.setLBSelectedBank(bank);
                }
                index++;

                //Moi phan tu cac nhau 50 (do ko dung layout de fix bug)
                posY -= 50;
            })
        },

        activeTimeOTPButton: function () {
            this.isTimer = true;
            this.updateTimer = 1;
            this.timer = this.timePerGetOTP;
        },

        activeTimeConfirm: function () {
            this.isTimerConfirm = true;
            this.timerConfirm = this.timePerConfirm;
        },

        processTimeConfirm: function () {
            if (this.timerConfirm <= 0) {
                this.isTimerConfirm = false;
                this.btnConfirm.interactable = true;

                this.lbConfirms.forEach(function (lbConfirm) {
                    lbConfirm.string = 'Rút';
                });
            } else {
                var self = this;
                var time = Math.round(self.timerConfirm);
                this.isTimerConfirm = true;
                this.btnConfirm.interactable = false;
                this.lbConfirms.forEach(function (lbConfirm) {
                    lbConfirm.string = time;
                });
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

        resetScale: function () {
            this.animationMenuBank.node.scaleY = 0;
            this.animationMenuBank.node.opacity = 255;
        },

        restoreScale: function () {
            this.animationMenuBank.node.scaleY = 1;
            this.animationMenuBank.node.opacity = 0;
        },

        resetInput: function () {
            if (this.editBoxValue) {
                this.editBoxValue.string = '';
                this.editBoxOTP.string = '';
                this.editBoxBankAccName.string = '';
                this.editBoxBankAccNumber.string = '';
                this.lbMoney.string = '0';
                this.lbFee.string = '0';

                this.nodeButtonConfirmRedeem.active = true;
                this.nodeButtonHistory.active = false;
            }
        },

        setLBSelectedBank: function (value) {
            this.lbSelectedBank.string = value;
        },

        selectBank: function (value) {
            this.bankType = value;
        },

        onGetOTPResponse: function (response) {
            if (response !== null && response.Message) {
                cc.PopupController.getInstance().showMessage(response.Message);
            } else {
                cc.PopupController.getInstance().showMessage('Lấy OTP thành công.');
            }
        },

        onGetOTPResponseError: function (response) {
            if (response !== null)
                cc.PopupController.getInstance().showMessageError(response.Message, response.ResponseCode);
        },

        onRedeemBankResponse: function (response) {
            if (response !== null) {
                cc.PopupController.getInstance().showMessage(response.Message);
            }

            var loginResponse = cc.LoginController.getInstance().getLoginResponse();
            this.lbBalance.string = cc.Tool.getInstance().formatNumber(loginResponse.Balance);

            this.resetInput();

            this.nodeButtonConfirmRedeem.active = false;
            this.nodeButtonHistory.active = true;

            cc.LobbyController.getInstance().refreshAccountInfo();
        },

        onRedeemBankResponseError: function (response) {
            if (response !== null) {
                if (response.Description)
                    cc.PopupController.getInstance().showMessageError(response.Description);
                else
                    cc.PopupController.getInstance().showMessageError(response.Message, response.ResponseCode);
            }
            //nap that bai thi reset OTP
            this.editBoxOTP.string = '';
        },

        selectBankEvent: function(event, data) {
            this.selectBank(data.toString());
            this.setLBSelectedBank(data.toString());
            this.animationMenuBank.play(this.animCloseName);
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

        onEditingValueChanged: function () {
            var val = cc.Tool.getInstance().removeDot(this.editBoxValue.string);
            this.editBoxValue.string = cc.Tool.getInstance().formatNumber(val);
            // this.lbFee.string = cc.Tool.getInstance().formatNumber(val * 0.05);
            this.lbMoney.string = cc.Tool.getInstance().formatNumber(Math.round(val * this.rate));
        },

        onEditingValueDidEnd: function () {
            var val = cc.Tool.getInstance().removeDot(this.editBoxValue.string);
            this.editBoxValue.string = cc.Tool.getInstance().formatNumber(val);
            // this.lbFee.string = cc.Tool.getInstance().formatNumber(val * 0.05);
            this.lbMoney.string = cc.Tool.getInstance().formatNumber(Math.round(val * this.rate));
        },

        openMenuBankClicked: function () {
            this.animationMenuBank.play(this.animOpenName);
        },

        hideMenuBankClicked: function () {
            this.animationMenuBank.play(this.animCloseName);
        },

        chooseBankClicked: function (event, data) {
            this.selectBank(data.toString());
            this.setLBSelectedBank(data.toString());
        },

        getOTPClicked: function () {
            var getOTPCommand = new cc.GetOTPCommand;
            getOTPCommand.execute(this, '', this.otpType);
            this.activeTimeOTPButton();
        },

        historyClicked: function () {
            cc.LobbyController.getInstance().createHistoryView(cc.HistoryTab.BANK);
        },

        continueClicked: function () {
            this.nodeStep1.active = true;
            this.nodeStep2.active = false;

            this.resetInput();
        },

        redeemClicked: function () {
            this.amount = cc.Tool.getInstance().removeDot(this.editBoxValue.string);

            if (this.editBoxValue.string === '') {
                cc.PopupController.getInstance().showMessage('Vui lòng nhập số tiền muốn rút.');
                return;
            }

            if (this.editBoxBankAccNumber.string === '') {
                cc.PopupController.getInstance().showMessage('Vui lòng nhập số tài khoản.');
                return;
            }

            if (this.editBoxBankAccName.string === '') {
                cc.PopupController.getInstance().showMessage('Vui lòng nhập tên tài khoản.');
                return;
            }

            if (this.amount > this.max) {
                cc.PopupController.getInstance().showMessage('Số ' + cc.Config.getInstance().currency() + ' rút tối đa là ' + cc.Tool.getInstance().formatNumber(this.max));
                return;
            }

            if (this.amount < this.min) {
                cc.PopupController.getInstance().showMessage('Số ' + cc.Config.getInstance().currency() + ' rút tối thiểu là '  + cc.Tool.getInstance().formatNumber(this.min));
                return;
            }

            this.nodeStep1.active = false;
            this.nodeStep2.active = true;
            this.nodeButtonConfirmRedeem.active = true;
            this.nodeButtonHistory.active = false;

            this.lbInfoBank.string = this.lbSelectedBank.string;
            this.lbInfoBankAccountNumber.string = this.editBoxBankAccNumber.string;
            this.lbInfoBankAccountName.string = this.editBoxBankAccName.string;
            this.lbInfoValue.string = cc.Tool.getInstance().formatNumber(this.amount) + ' ' + cc.Config.getInstance().currency();
            this.lbInfoFee.string = '0';
            this.lbInfoMoney.string = cc.Tool.getInstance().formatNumber(Math.round(this.amount * this.rate)) + ' đ';
        },

        confirmRedeemClicked: function () {
            this.otp = this.editBoxOTP.string;

            // if (this.otp === '') {
            //     cc.PopupController.getInstance().showMessage('Vui lòng nhập mã OTP.');
            //     return;
            // }

            if (cc.BalanceController.getInstance().getBalance() < this.amount) {
                cc.PopupController.getInstance().showMessage('Số dư không đủ để thực hiện giao dịch.');
                return;
            }

            cc.PopupController.getInstance().showBusy();
            var redeemBankCommand = new cc.RedeemBankCommand;
            redeemBankCommand.execute(this);

            this.activeTimeConfirm();
            // this.resetInput();
        },

        helpClicked: function () {
            this.nodeHelp.active = true;
        },

        closeHelpClicked: function () {
            this.nodeHelp.active = false;
        },
    });
}).call(this);
