/**
 * Created by Nofear on 3/15/2019.
 */

(function () {
    cc.VIPLoanItem = cc.Class({
        "extends": cc.Component,
        properties: {
            spriteIcon: cc.Sprite,
            lbTitle: cc.Label,
            lbRewards: [cc.Label],

            lbDesc: cc.Label,
            nodeClaim: cc.Node,
        },

        onLoad: function () {
            this.spriteBG = this.node.getComponent(cc.Sprite);
            this.btnClaim = this.nodeClaim.getComponent(cc.Button);
            this.vipAssets = cc.AccountController.getInstance().getVipAssets();
        },

        updateIndex: function (itemID) {
            if (itemID % 2 === 0) {
                this.spriteBG.spriteFrame = this.vipAssets.sfBgs[0];
            } else {
                this.spriteBG.spriteFrame = this.vipAssets.sfBgs[1];
            }

        },

        updateItem: function (item) {
            // var loginResponse = cc.LoginController.getInstance().getLoginResponse();

            this.lbTitle.string = 'Vay tiền game';
            this.lbDesc.string = 'Vay tối đa 50% thưởng quý hiện tại';

            if (item.LoanAmount === 0 && item.OldDebt === 0) {
                for (var i = 0; i < this.lbRewards.length; i++) {
                    this.lbRewards[i].string = 'Chưa đủ điều kiện'; //Dưới hạn mức
                }
                this.btnClaim.interactable = false;
            } else {
                for (var i = 0; i < this.lbRewards.length; i++) {
                    if (item.LoanAmount > 0) {
                        this.lbRewards[i].string = 'Vay ' + cc.Tool.getInstance().formatNumber(item.LoanAmount) + ' ' + cc.Config.getInstance().currency();
                    } else {
                        this.lbRewards[i].string = 'Vay';
                    }
                }
                this.btnClaim.interactable = true;
            }

            this.item = item;
        },

        showPopupConfirmLoan: function () {
            var clickEventHandlerBlue = new cc.Component.EventHandler();
            clickEventHandlerBlue.target = this; //This node is the node to which your event handler code component belongs
            clickEventHandlerBlue.component = 'VIPLoanItem';//This is the code file name
            clickEventHandlerBlue.handler = 'confirmLoanClicked';
            //clickEventHandlerBlue.customEventData = '';

            cc.PopupController.getInstance().showPopupOTP(
                'Để vay tiền, bạn cần nhập mã OTP?',
                'Đồng ý',
                clickEventHandlerBlue
            );
        },

        showPopupRefund: function (title) {
            var clickEventHandlerBlue = new cc.Component.EventHandler();
            clickEventHandlerBlue.target = this; //This node is the node to which your event handler code component belongs
            clickEventHandlerBlue.component = 'VIPLoanItem';//This is the code file name
            clickEventHandlerBlue.handler = 'confirmRefundClicked';
            //clickEventHandlerBlue.customEventData = '';

            var clickEventHandlerRed = new cc.Component.EventHandler();
            clickEventHandlerRed.target = this; //This node is the node to which your event handler code component belongs
            clickEventHandlerRed.component = 'VIPLoanItem';//This is the code file name
            clickEventHandlerRed.handler = 'closePopupInfoClicked';

            cc.PopupController.getInstance().showPopup(
                title,
                'Đóng',
                'Hoàn Trả',
                clickEventHandlerRed,
                clickEventHandlerBlue
            );
        },

        onVIPLoanReturnResponse: function (info) {
            cc.PopupController.getInstance().hideBusy();
            cc.PopupController.getInstance().closePopup();
            cc.PopupController.getInstance().showMessage(info.Message);
            cc.BalanceController.getInstance().updateRealBalance(info.Balance);
            cc.BalanceController.getInstance().updateBalance(info.Balance);

            cc.VIPController.getInstance().getLoanInfo(); //lay lai thong tin LOAN
        },

        onVIPLoanProcessResponse: function (info) {
            cc.PopupController.getInstance().hideBusy();
            cc.PopupController.getInstance().closePopup();
            cc.PopupController.getInstance().showMessage(info.Message);
            cc.BalanceController.getInstance().updateRealBalance(info.Balance);
            cc.BalanceController.getInstance().updateBalance(info.Balance);

            cc.VIPController.getInstance().getLoanInfo(); //lay lai thong tin LOAN
        },

        //click
        claimClicked: function () {
            cc.LobbyController.getInstance().createShopView(cc.ShopTab.LOAN);


            //bỏ đi -> chuyển sang Tab Vay tiền (popup Nạp tiền)
            //còn nợ phải trả nợ
            // if (this.item.OldDebt > 0) {
            //     this.showPopupRefund('HOÀN TRẢ\n\n Bạn đang vay hệ thống '
            //         + cc.Tool.getInstance().formatNumber(this.item.OldDebt)
            //         + '.\nBạn cần hoàn trả trước khi vay tiếp.');
            // } else {
            //     this.showPopupConfirmLoan();
            // }
        },

        confirmRefundClicked: function () {
            cc.PopupController.getInstance().showBusy();
            var VIPLoanReturnCommand = new cc.VIPLoanReturnCommand;
            VIPLoanReturnCommand.execute(this);
        },

        confirmLoanClicked: function () {
            cc.PopupController.getInstance().showBusy();
            var otp = cc.PopupController.getInstance().getOTPPopup();
            // if (otp === '') {
            //     cc.PopupController.getInstance().showMessage('Bạn chưa nhập mã OTP.');
            // } else {
                var VIPLoanProcessCommand = new cc.VIPLoanProcessCommand;
                VIPLoanProcessCommand.execute(this, otp);
            // }
        },

        closePopupInfoClicked: function () {
            cc.PopupController.getInstance().closePopup();
        }
    });
}).call(this);
