/**
 * Created by Nofear on 3/15/2019.
 */


(function () {
    cc.AvatarView = cc.Class({
        "extends": cc.Component,
        properties: {
            nodeInfo: cc.Node,

            nodeSelect: cc.Node,
            nodeAvatarParent: cc.Node,
        },


        onLoad: function() {
            this.animation = this.node.getComponent(cc.Animation);
        },

        // use this for initialization
        onEnable: function () {
            this.loginResponse = cc.LoginController.getInstance().getLoginResponse();
            this.currentAvatarId = this.loginResponse.AvatarID;
            this.nodeAvatars = this.nodeAvatarParent.children;
            this.nodeSelect.position = this.nodeAvatars[this.currentAvatarId].position;
            this.animation.play('openPopup');
        },

        setAvatarID: function(id) {
            this.avatarID = id;
        },

        onUpdateAvatarResponse: function (response) {
            cc.PopupController.getInstance().showMessage(response.Message);
            this.currentAvatarId = this.avatarID;
            this.loginResponse.AvatarID = this.avatarID;
            cc.LoginController.getInstance().setLoginResponse(this.loginResponse);

            this.nodeInfo.active = true;
            this.node.active = false;

            cc.AccountController.getInstance().refreshAvatar();
            cc.LobbyController.getInstance().refreshAvatar();
        },

        onUpdateAvatarResponseError: function (response) {
            cc.PopupController.getInstance().showMessageError(response.Message, response.ResponseCode);
        },

        //clicked
        selectAvatarClicked: function (event, data) {
            //console.log(event);
            this.avatarID = parseInt(data.toString());
            this.nodeSelect.position = this.nodeAvatars[this.avatarID].position;
        },

        updateAvatarClicked: function () {
            /*
            if (this.currentAvatarId === this.avatarID) {
                cc.PopupController.getInstance().showMessage('Vui lòng chọn avatar khác với avatar hiện tại');
            }*/

            var updateAvatarCommand = new cc.UpdateAvatarCommand;
            updateAvatarCommand.execute(this);
        },

         //Click
         backClicked: function () {
            //this.showRegister(false);
            this.animation.play('closePopup');
            var self = this;
            var delay = 0.12;
            cc.director.getScheduler().schedule(function () {
                self.animation.stop();
                self.node.active = false;
            }, this, 1, 0, delay, false);
        },
    });
}).call(this);
