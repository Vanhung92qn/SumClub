/**
 * Created by Nofear on 3/14/2019.
 */

var netConfig = require('NetConfig');

(function () {
    cc.NicknameView = cc.Class({
        "extends": cc.Component,
        properties: {
            nodeNickname: cc.Node,
            editBoxNickname: cc.EditBox,
            animation: cc.Animation,

          // lbError: cc.Label,

            //KingViet
            animationMenuNation: cc.Animation,
            lbNation: cc.Label,
            spriteNation: cc.Sprite,
        },

        // use this for initialization
        onLoad: function () {
            cc.LoginController.getInstance().setNicknameView(this);
        },

        onEnable: function () {
            this.editBoxNickname.string = '';
           // this.lbError.string = '';

            if (cc.Config.getInstance().getDomainVK().includes(netConfig.HOST)) {
                var index = cc.Config.getInstance().getIndexByNation(0);

                if (this.gameAssets === undefined) {
                    this.gameAssets = cc.LobbyController.getInstance().getGameAssets();
                }

                this.spriteNation.spriteFrame = this.gameAssets.sfNations[index];
                this.lbNation.string = 'Chọn quốc gia';
            }
        },

        showNickname: function (enable) {
            this.nodeNickname.active = enable;
            if (enable) {
                this.animation.play('openPopup');
            }
        },

        backClicked: function () {
            this.animation.play('closePopup');
            var self = this;
            var delay = 0.12;
            cc.director.getScheduler().schedule(function () {
                self.animation.stop();
                self.showNickname(false);
            }, this, 1, 0, delay, false);
        },

        //Response
        onUpdateNicknameResponse: function(response) {
            //set token lai sau khi update NickName
            if (response.Token) {
                // console.log('onUpdateNicknameResponse zoo: '  + response.Token);
                cc.ServerConnector.getInstance().setToken(response.Token);
            }

            cc.LoginController.getInstance().setLoginResponse(response.AccountInfo);
            cc.LoginController.getInstance().setNextVPResponse(response.NextVIP);
            cc.LobbyController.getInstance().loginSuccess();
            cc.LobbyController.getInstance().destroyLoginView();
            cc.PopupController.getInstance().showMessage(response.Message, response.ResponseCode);
            //========
            cc.DDNA.getInstance().updateAccountName();
        },

        onUpdateNicknameResponseError: function(response) {
           // this.lbError.string = response.Message;
		    cc.PopupController.getInstance().showMessage(response.Message);
        },

        selectNationEvent: function(event, data) {
            var index = cc.Config.getInstance().getIndexByNation(data.toString());

            if (this.gameAssets === undefined) {
                this.gameAssets = cc.LobbyController.getInstance().getGameAssets();
            }

            this.spriteNation.spriteFrame = this.gameAssets.sfNations[index];

            this.nationCode = data.toString();

            var nationStr = cc.Config.getInstance().getNationByNationCode(data.toString());

            this.lbNation.string = nationStr;
            this.animationMenuNation.play('hideDropdownMenu');
        },

        //Click
        openMenuNationClicked: function () {
            this.animationMenuNation.play('showDropdownMenu');
        },

        hideMenuNationClicked: function () {
            this.animationMenuNation.play('hideDropdownMenu');
        },

        //Click
        updateClicked: function () {
           // this.lbError.string = '';
            this.nickname = this.editBoxNickname.string;

            if (cc.Config.getInstance().getDomainVK().includes(netConfig.HOST)) {
                if (this.lbNation.string === 'Chọn quốc gia') {
                    //this.lbError.string = 'Vui lòng chọn quốc gia';
					 cc.PopupController.getInstance().showMessage('Chọn quốc gia');
                    return;
                }
            }

            if (this.nickname === '') {
                //this.lbError.string = 'Vui lòng nhập tên nhân vật';
				 cc.PopupController.getInstance().showMessage('Vui lòng nhập tên nhân vật');
                return;
            }

            var updateNicknameCommand = new cc.UpdateNicknameCommand;
            updateNicknameCommand.execute(this);
        },
    });
}).call(this);
