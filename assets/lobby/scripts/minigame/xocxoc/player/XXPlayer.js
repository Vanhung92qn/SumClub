/**
 * Created by Welcome on 5/28/2019.
 */

(function () {
    cc.XXPlayer = cc.Class({
        "extends": cc.Component,
        properties: {
            lbSID: cc.Label,
            lbName: cc.Label,
            nickName: ""
        },

        onLoad: function () {
            //animation
            this.animation = this.node.getComponent(cc.Animation);
            //node emotion
            var nodeChat = this.node.getChildByName('chat');
            this.nodeEmotion = nodeChat.getChildByName('emotion');
            this.nodeBubble = nodeChat.getChildByName('bubble');
            //skeleton Emotion
            this.skeEmotion = this.nodeEmotion.getComponent(sp.Skeleton);
            //label Chat
            this.lbBubbleChat = this.nodeBubble.getComponentInChildren(cc.Label);
            nodeChat.active = false;

            //avatar cua player
            this.avatar = this.node.getComponentInChildren(cc.Avatar);
            //node win/lose cua player
            this.nodeWin = this.node.getChildByName('win');
            this.nodeLose = this.node.getChildByName('lose');

            //lbWin cua player
            this.lbWin = this.node.getComponentInChildren(cc.Label);
            //anim lbWin cua player
            this.animLbWin = this.node.getComponentInChildren(cc.Animation);

            //node thong tin player (name + chip)
            this.nodeInfo = this.node.getChildByName('ava_money');
            //lbChip cua player
            this.lbChip = this.nodeInfo.getChildByName('lbChip').getComponent(cc.LabelIncrement);
            //lbName cua player
            // this.lbName = this.nodeInfo.getChildByName('lbName').getComponent(cc.Label);

            this.nodeInfo.active = false;

        },

        //reset lai UI ket qua
        resetPlayerResultUI: function () {
            this.nodeWin.active = false;
            this.nodeLose.active = false;
            this.lbWin.node.active = false;
        },

        //set ket qua cho player
        playerResultUI: function (isWin, amount) {
            this.nodeWin.active = false;
            this.nodeLose.active = false;

            //set gia tri
            if (isWin) {
                this.nodeWin.active = true;
                this.lbWin.string = '+' + cc.Tool.getInstance().formatNumber(amount);
                this.lbWin.font = cc.XXController.getInstance().getWinFont();
            } else {
                this.nodeLose.active = true;
                this.lbWin.string = cc.Tool.getInstance().formatNumber(amount);
                this.lbWin.font = cc.XXController.getInstance().getLoseFont();
            }

            //play fx thang / thua
            this.lbWin.node.active = true;
            this.lbWin.node.scaleY = 0;
            this.animLbWin.play('xxWin');
        },
        updateChip: function (chip) {
            this.lbChip.tweenValueto(chip);
        },

        //player vao phong
        registerPlayer: function (accountInfo) {
            var avatarID = accountInfo.Avatar;
            if (avatarID <= 0) {
                avatarID = 1;
            }
            this.nickName = accountInfo.NickName;

            //set avatar
            this.avatar.setAvatar(cc.AccountController.getInstance().getAvatarImage(avatarID));

            //set name
            // this.lbName.string = accountInfo.NickName;
            if (accountInfo.ServiceID) {
                this.lbSID.string = ""; // cc.Config.getInstance().getServiceNameNoFormat(accountInfo.ServiceID)
                //set name
                this.lbName.string = cc.Config.getInstance().formatName(accountInfo.NickName, 7);
            } else {
                this.lbSID.string = '';
                //set name
                this.lbName.string = cc.Config.getInstance().formatName(accountInfo.NickName, 10);
            }


            //set chip
            this.lbChip.tweenValueto(accountInfo.Balance);

            //bat node thong tin
            this.nodeInfo.active = true;
        },

        //player roi phong
        unRegisterPlayer: function () {
            //set = avatar def
            this.avatar.setAvatar( cc.LobbyController.getInstance().getGameAssets().avatarDef);
            //tat node thong tin
            this.nodeInfo.active = false;
        },

        updateConnectionStatus: function (status) {
            switch (status) {
                case cc.ConnectionStatus.DISCONNECTED:
                    break;
                case cc.ConnectionStatus.CONNECTED:
                    break;
            }
        },

        updatePlayerStatus: function (playerStatus) {
            this.playerStatus = playerStatus.toString();
            if (playerStatus.toString() === cc.PlayerStatus.INGAME) {
                this.node.opacity = 255;
            } else {
                this.node.opacity = 150;
            }
        },

        showEmotion: function (index, message) {
            this.nodeBubble.active = false;
            this.nodeEmotion.active = true;

            this.skeEmotion.clearTracks();
            this.skeEmotion.setToSetupPose();

            //fix loi server cam chat sexy
            if (index === 15) {
                this.skeEmotion.setAnimation(index, '16-extreme-sexy-girl', true);
            } else {
                this.skeEmotion.setAnimation(index, message[1], true);
            }

            this.animation.play('showBubbleChat');
        },

        showBubbleChat: function (message) {
            this.nodeBubble.active = true;
            this.nodeEmotion.active = false;

            this.lbBubbleChat.string = message[1];

            this.animation.play('showBubbleChat');
        }
    });
}).call(this);
