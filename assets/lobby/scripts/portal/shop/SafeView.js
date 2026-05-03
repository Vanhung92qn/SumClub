/**
 * Created by Nofear on 3/15/2019.
 */

var netConfig = require('NetConfig');
var helper      = require('Helper');
(function () {
    cc.SafeView = cc.Class({
        "extends": cc.Component,
        properties: {
            availableBalance: cc.Label,
            freezeBalance: cc.Label,
            editBoxFreezeValue: cc.EditBox,
        },

        onLoad: function () {
            this.freezeBalance.string = '0';
            this.availableBalance.string = '0';
            this.animation = this.node.getComponent(cc.Animation);
            this.editBoxFreezeValue.placeholder = 'Nhập Số Tiền';
        },

        onEnable: function () {
			 //this.animation.play('openPopup');
            //this.editBoxFreezeValue.string = '';
            //this.editBoxOpenValue.string = '';
            var getBalanceCommand = new cc.GetBalanceCommand;
            getBalanceCommand.execute(this);
            var loginResponse = cc.LoginController.getInstance().getLoginResponse();
        },
        onDisable: function () {
         
        },

        onDestroy: function () {
        
        },

        onEditingFreezeValueChanged: function () {
            var val = cc.Tool.getInstance().removeDot(this.editBoxFreezeValue.string);
            this.editBoxFreezeValue.string = helper.numberWithCommas(val);
        },

        onEditingOpenValueChanged: function () {
            var val = cc.Tool.getInstance().removeDot(this.editBoxOpenValue.string);
            this.editBoxOpenValue.string = helper.numberWithCommas(val);
        },

        onGetBalanceResponse: function (response) {
            this.availableBalance.string = helper.numberWithCommas(response.balance);
            this.freezeBalance.string = helper.numberWithCommas(response.safebalance);
        },

        onDepositResponse: function (response) {
            this.editBoxFreezeValue.string = '';
            cc.PopupController.getInstance().showMessage('Đóng băng thành công');
            this.availableBalance.string = helper.numberWithCommas(response.AccountSafeInfo.Balance);
            this.freezeBalance.string = helper.numberWithCommas(response.AccountSafeInfo.SafeBalance);

            cc.LobbyController.getInstance().refreshAccountInfo();
        },

        onWithdrawResponse: function (response) {
            //this.editBoxOpenValue.string = '';
			this.editBoxFreezeValue.string = '';
            //this.editBoxOTP.string = '';
            cc.PopupController.getInstance().showMessage('Mở băng thành công');
            this.availableBalance.string = helper.numberWithCommas(response.AccountSafeInfo.Balance);
            this.freezeBalance.string = helper.numberWithCommas(response.AccountSafeInfo.SafeBalance);

            cc.LobbyController.getInstance().refreshAccountInfo();
        },

        freezeClicked: function () {
            this.amount = cc.Tool.getInstance().removeDot(this.editBoxFreezeValue.string);
            if (this.amount === '') {
                cc.PopupController.getInstance().showMessage('Vui lòng nhập số tiền đóng băng');
                return;
            }

            var depositCommand = new cc.DepositCommand;
            depositCommand.execute(this);
        },
        
        openClicked: function () {
            this.amount = cc.Tool.getInstance().removeDot(this.editBoxFreezeValue.string);
            this.otp = '12345';

            if (this.amount === '') {
                cc.PopupController.getInstance().showMessage('Vui lòng nhập số tiền mở băng');
                return;
            }
            var withdrawCommand = new cc.WithdrawCommand;
            withdrawCommand.execute(this);
        }
    });
}).call(this);
