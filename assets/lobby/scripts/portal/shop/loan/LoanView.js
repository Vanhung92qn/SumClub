/**
 * Created by Nofear on 3/15/2019.
 */

var netConfig = require('NetConfig');

(function () {
    cc.LoanView = cc.Class({
        "extends": cc.Component,
        properties: {
            nodeLock: cc.Node, //node tinh nang VIP bi khoa
            nodeLoan: cc.Node, //node được vay
            nodePay: cc.Node, //node phai trả nợ

            lbLoanAmount: cc.Label, //số tiền đc vay
            lbPayAmount: cc.Label, //số tiền nợ phải trả

            //popup OTP + menu otp
            editBoxOTP: cc.EditBox,
            btnGetOTPs: [cc.Button],
            lbBtnGetOTPs: [cc.Label],
            nodeTeleSafes: [cc.Node],
            animationMenuOTP: cc.Animation,
            lbOTPType: cc.Label,
        },

        onLoad: function () {
            //cac tham so popup OTP
            this.isTimer = false;
            this.timer = 0;
            this.timePerGetOTP = 120;
            this.updateInterval = 1;
            this.updateTimer = 0;
            this.otpType = cc.OTPType.TELE_SAFE;
            this.getTimeOTPPopup();
        },

        onEnable: function () {
            this.getLoanInfo();
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

        onDisable: function () {
            cc.Tool.getInstance().setItem("@TimeGetOTPPopupOTP", Math.round(this.timer));
        },

        onDestroy: function () {
            cc.Tool.getInstance().setItem("@TimeGetOTPPopupOTP", Math.round(this.timer));
        },

        getLoanInfo: function () {
            var getVIPLoanInfoCommand = new cc.GetVIPLoanInfoCommand;
            getVIPLoanInfoCommand.execute(this);
        },

        onGetVIPLoanInfoResponse: function (info) {
            var loanInfor = info.LoanInfor;
            this.loanInfo = loanInfor;

            if (loanInfor) {
                //dang no tien
                if (loanInfor.OldDebt > 0) {
                    this.openPayScreen(loanInfor.OldDebt);
                } else if (loanInfor.LoanAmount > 0) {
                    this.openLoanScreen(loanInfor.LoanAmount);
                } else {
                    //chua kich hoat -> check them cap vip > 3
                    this.openLockScreen();
                }
            } else {
                //chua kich hoat -> check them cap vip > 3
                this.openLockScreen();
            }
        },

        openLockScreen: function () {
            this.nodeLock.active = true;
            this.nodeLoan.active = false;
            this.nodePay.active = false;
        },

        openLoanScreen: function (loanAmount) {
            this.nodeLock.active = false;
            this.nodeLoan.active = true;
            this.nodePay.active = false;

            this.lbLoanAmount.string = cc.Tool.getInstance().formatNumber(loanAmount);
        },

        openPayScreen: function (payAmount) {
            this.nodeLock.active = false;
            this.nodeLoan.active = false;
            this.nodePay.active = true;

            this.lbPayAmount.string = cc.Tool.getInstance().formatNumber(payAmount);
        },

        // ==== OTP ====
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
                this.lbOTPType.string = 'AppSafe';
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

        resetOTP: function () {
            this.editBoxOTP.string = '';
            this.timer = 0;
            cc.Tool.getInstance().setItem("@TimeGetOTPPopupOTP", Math.round(this.timer));
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

    //     this.loanInfo = loanInfor;
    //
    // if (loanInfor) {
    //     //dang no tien
    //     if (loanInfor.OldDebt > 0) {
    //         this.openPayScreen(loanInfor.OldDebt);
    //     } else if (loanInfor.LoanAmount > 0) {
    //         this.openLoanScreen(loanInfor.LoanAmount);

        onVIPLoanReturnResponse: function (info) {
            cc.PopupController.getInstance().hideBusy();
            cc.PopupController.getInstance().closePopup();
            cc.PopupController.getInstance().showMessage(info.Message);
            cc.BalanceController.getInstance().updateRealBalance(info.Balance);
            cc.BalanceController.getInstance().updateBalance(info.Balance);

            this.resetOTP();

            cc.DDNA.getInstance().vipSummary(cc.DDNATransactionName.VIP_LOAN_RETURN, this.loanInfo.OldDebt);

            this.getLoanInfo(); //lay lai thong tin LOAN
        },

        onVIPLoanProcessResponse: function (info) {
            cc.PopupController.getInstance().hideBusy();
            cc.PopupController.getInstance().closePopup();
            cc.PopupController.getInstance().showMessage(info.Message);
            cc.BalanceController.getInstance().updateRealBalance(info.Balance);
            cc.BalanceController.getInstance().updateBalance(info.Balance);

            this.resetOTP();

            cc.DDNA.getInstance().vipSummary(cc.DDNATransactionName.VIP_LOAN, this.loanInfo.LoanAmount);

            this.getLoanInfo(); //lay lai thong tin LOAN
        },

        selectOTPEvent: function(event, data) {
            this.otpType = data.toString() === 'AppSafe' ? cc.OTPType.TELE_SAFE : cc.OTPType.SMS;
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

        openVIPClicked: function () {
            cc.LobbyController.getInstance().destroyShopTopupView();
            cc.LobbyController.getInstance().createAccountView(cc.AccountTab.VIP);
        },

        //vay tien
        loanClicked: function () {
            var otp = this.editBoxOTP.string;
            // if (otp === '') {
            //     cc.PopupController.getInstance().showMessage('Bạn chưa nhập mã OTP.');
            // } else {
                cc.PopupController.getInstance().showBusy();
                var VIPLoanProcessCommand = new cc.VIPLoanProcessCommand;
                VIPLoanProcessCommand.execute(this, otp);
            // }
        },

        //tra nợ
        payClicked: function () {
            cc.PopupController.getInstance().showBusy();
            var VIPLoanReturnCommand = new cc.VIPLoanReturnCommand;
            VIPLoanReturnCommand.execute(this);
        }
    });
}).call(this);
