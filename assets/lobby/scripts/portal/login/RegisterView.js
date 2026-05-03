/**
 * Created by Nofear on 3/14/2019.
 */

var netConfig = require('NetConfig');

(function () {
    cc.RegisterView = cc.Class({
        "extends": cc.Component,
        properties: {
            nodeRegister: cc.Node,
            editBoxUsername: cc.EditBox,
            editBoxPassword: cc.EditBox,
            editBoxRePassword: cc.EditBox,

            editBoxPhoneNumber: cc.EditBox, //#KingViet

            editBoxCode: cc.EditBox,

           // lbError: cc.Label,
            imageUrlCaptcha: cc.ImageUrl,

           
          
            animationMenuNation: cc.Animation, //#KingViet
            lbNation: cc.Label, //#KingViet
            spriteNation: cc.Sprite,
        },

        // use this for initialization
        onLoad: function () {
            cc.LoginController.getInstance().setRegisterView(this);
        },

        onEnable: function () {
           // this.lbError.string = '';
            this.editBoxUsername.string = '';

         

            this.editBoxPassword.string = '';
            this.editBoxRePassword.string = '';

           
            this.IsLanding = false;
        },

        getCaptcha: function () {
            var getCaptchaCommand = new cc.GetCaptchaCommand;
            getCaptchaCommand.execute(this);
        },

        showRegister: function (enable) {
            this.nodeRegister.active = enable;
            if (enable) {
                this.getCaptcha();
                var tool = cc.Tool.getInstance();
                if (tool.getItem('@isLanding') !== null) {
                    if (tool.getItem('@isLanding') === 'true') {
                        this.editBoxUsername.string = tool.getItem('@usernameRegis').toString();
                        this.editBoxPassword.string = tool.getItem('@passwordRegis').toString();
                        this.editBoxRePassword.string = tool.getItem('@rePasswordRegis').toString();
                        this.IsLanding = true;
                    }
                }
            }
        },

        backClicked: function () {
            this.showRegister(false);
            cc.LoginController.getInstance().showLogin(true);
        },

        //Response
        onGetCaptchaResponse: function (response) {
            this.imageUrlCaptcha.get('data:image/png;base64,' + cc.Tool.getInstance().removeStr(response[1], '\r\n'));
        },

        onRegisterResponse: function (response) {
            //se set Access Token o day -> de update duoc nick name luon
            if (response.Token) {
                cc.ServerConnector.getInstance().setToken(response.Token);
            }

            cc.LoginController.getInstance().setUserId(response.AccountInfo.AccountID);

            cc.LoginController.getInstance().showNickname(true);
            // cc.DDNA.getInstance().newPlayer();
        },

        selectNationEvent: function(event, data) {
            var index = cc.Config.getInstance().getIndexByNation(data.toString());

            if (this.gameAssets === undefined) {
                this.gameAssets = cc.LobbyController.getInstance().getGameAssets();
            }

            this.spriteNation.spriteFrame = this.gameAssets.sfNations[index];

            this.nationCode = data.toString();
            this.lbNation.string = '+' + data.toString();
            this.animationMenuNation.play('hideDropdownMenu');
        },

        //Click
        openMenuNationClicked: function () {
            this.animationMenuNation.play('showDropdownMenu');
        },

        hideMenuNationClicked: function () {
            this.animationMenuNation.play('hideDropdownMenu');
        },

        createAccountClicked: function () {
            //this.lbError.string = '';
            this.username = this.editBoxUsername.string;
            this.password = this.editBoxPassword.string;
            this.rePassword = this.editBoxRePassword.string;
            this.captcha = this.editBoxCode.string;

            if (this.username === '') {
               // this.lbError.string = 'Vui lòng nhập tên tài khoản';
			   cc.PopupController.getInstance().showMessage('Vui lòng nhập tên tài khoản');
                return;
            }

            if (this.password === '') {
				cc.PopupController.getInstance().showMessage('Vui lòng nhập mật khẩu');
               // this.lbError.string = 'Vui lòng nhập mật khẩu';
                return;
            }

            if (this.rePassword === '') {
				cc.PopupController.getInstance().showMessage('Vui lòng nhập lại mật khẩu');
               // this.lbError.string = 'Nhập lại mật khẩu không khớp';
                return;
            }
			 if (this.rePassword !== this.password) {
				cc.PopupController.getInstance().showMessage('Nhập lại mật khẩu không chính xác');
               // this.lbError.string = 'Nhập lại mật khẩu không khớp';
                return;
            }
            if (this.captcha === '') {
				cc.PopupController.getInstance().showMessage('Vui lòng nhập mã Captcha');
               // this.lbError.string = 'Vui lòng nhập mã xác nhận';
                return;
            }

            cc.Tool.getInstance().setItem('@isLanding', false);

            var registerCommand = new cc.RegisterCommand;
            registerCommand.execute(this);
        },

        refreshCaptchaClicked: function () {
            this.getCaptcha();
        },

       
    });
}).call(this);
