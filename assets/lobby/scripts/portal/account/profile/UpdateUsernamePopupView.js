/**
 * Created by Nofear on 3/15/2019.
 */

(function () {
    cc.UpdateUsernamePopupView = cc.Class({
        "extends": cc.Component,
        properties: {
            nodeUpdateInfo: cc.Node,
            nodeSuggestUpdateSecurity: cc.Node,

            editBoxUsername: cc.EditBox,
            editBoxNewPassword: cc.EditBox,
            editBoxRePassword: cc.EditBox,
            editBoxCode: cc.EditBox,

            imageUrlCaptcha: cc.ImageUrl,

            nodeReward: cc.Node,
            lbReward: cc.Label,

            lbError: cc.Label,
        },

        onLoad: function () {
            this.node.zIndex =  cc.NoteDepth.POPUP_PORTAL;
            this.animation = this.node.getComponent(cc.Animation);
        },

        onEnable: function () {
            this.nodeUpdateInfo.active = true;
            this.nodeSuggestUpdateSecurity.active = false;

            this.lbError.string = '';

            var loginResponse = cc.LoginController.getInstance().getLoginResponse();

            if (loginResponse.IsFBReward) {
                var reward = Math.min(1000000, (loginResponse.Balance + loginResponse.SafeBalance));
                this.lbReward.string = cc.Tool.getInstance().formatNumber(reward);
                this.nodeReward.active = true;
            } else {
                this.nodeReward.active = false;
            }


            this.getCaptcha();

            this.animation.play('openPopup');
            // var self = this;
            // cc.director.getScheduler().schedule(function () {
            //
            // }, this, 0, 0, 0.3, false);
        },

        getCaptcha: function () {
            var getCaptchaCommand = new cc.GetCaptchaCommand;
            getCaptchaCommand.execute(this);
        },

        //Response
        onGetCaptchaResponse: function (response) {
            this.imageUrlCaptcha.get('data:image/png;base64,' + cc.Tool.getInstance().removeStr(response[1], '\r\n'));
        },

        //update FB Info thanh cong
        onChangeFBInfoPopupResponse: function (response) {
            cc.PopupController.getInstance().showMessage(response.Message, response.ResponseCode);

            var loginResponse = cc.LoginController.getInstance().getLoginResponse();
            loginResponse.IsUpdatedFB = true;
            cc.LoginController.getInstance().setLoginResponse(loginResponse);

            //bat popup goi y nang cap bao mat neu chua cap nhat
            if (loginResponse.PhoneNumber === null && loginResponse.PhoneSafeNo === null) {
                this.nodeUpdateInfo.active = false;
                this.nodeSuggestUpdateSecurity.active = true;
            } else {
                this.closeClicked();
            }
        },

        onChangeFBInfoPopupResponseError: function (response) {
            this.editBoxCode.string = '';
            this.getCaptcha();
            cc.PopupController.getInstance().showMessageError(response.Message, response.ResponseCode);
        },

        updateFBInfoClicked: function () {
            this.lbError.string = '';

            this.username = this.editBoxUsername.string;
            this.newPass = this.editBoxNewPassword.string;
            this.rePassword = this.editBoxRePassword.string;
            this.captcha = this.editBoxCode.string;

            if (this.username === '') {
                this.lbError.string = 'Vui lòng nhập tên đăng nhập';
                return;
            }

            if (this.newPass === '') {
                this.lbError.string = 'Vui lòng nhập mật khẩu';
                return;
            }

            if (this.rePassword === '') {
                this.lbError.string = 'Vui lòng nhập lại mật khẩu';
                return;
            }

            if (this.rePassword !== this.newPass) {
                this.lbError.string = 'Nhập lại mật khẩu không khớp';
                return;
            }

            if (this.captcha === '') {
                this.lbError.string = 'Vui lòng nhập mã xác nhận';
                return;
            }

            var changeFBInfoPopupCommand = new cc.ChangeFBInfoPopupCommand;
            changeFBInfoPopupCommand.execute(this);
        },

        refreshCaptchaClicked: function () {
            this.getCaptcha();
        },

        updateSecurityClicked: function () {
            var loginResponse = cc.LoginController.getInstance().getLoginResponse();

            //bat popup goi y nang cap bao mat neu chua cap nhat
            if (loginResponse.PhoneNumber === null && loginResponse.PhoneSafeNo === null) {
                cc.LobbyController.getInstance().createAccountView(cc.AccountTab.SECURITY);
            } else if (loginResponse.PhoneNumber === null) {
                cc.LobbyController.getInstance().createAccountView(cc.AccountTab.SECURITY);
            } else if (loginResponse.PhoneSafeNo === null) {
                cc.LobbyController.getInstance().createAccountView(cc.AccountTab.SAFE_PLUS);
            } else {
                cc.LobbyController.getInstance().createAccountView(cc.AccountTab.SECURITY);
            }
            cc.LobbyController.getInstance().destroyPopupUpdateUserPassView();
        },

        closeClicked: function () {
            //this.showRegister(false);
            this.animation.play('closePopup');
            var self = this;
            var delay = 0.12;
            cc.director.getScheduler().schedule(function () {
                self.animation.stop();
                cc.LobbyController.getInstance().destroyPopupUpdateUserPassView();
            }, this, 1, 0, delay, false);
        }
    });
}).call(this);
