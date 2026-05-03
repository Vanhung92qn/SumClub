/**
 * Created by Welcome on 5/28/2019.
 */

(function () {
    cc.CPlayer = cc.Class({
        "extends": cc.Component,
        properties: {

        },

        init: function () {
            this.isTimer = false;
            this.remaining = 0;

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
            // this.lbWin = this.node.getComponentInChildren(cc.Label);
            //anim lbWin cua player
            this.animLbWin = this.node.getComponentInChildren(cc.Animation);

            //node thong tin player (name + chip)
            this.nodeInfo = this.node.getChildByName('ava_money');
            //lbChip cua player
            this.lbChip = this.nodeInfo.getChildByName('lbChip').getComponent(cc.LabelIncrement);

            this.nodeInfo.active = false;

        },

        //reset lai UI ket qua
        resetPlayerResultUI: function () {
            this.nodeWin.active = false;
            this.nodeLose.active = false;
            this.lbWin.node.active = false;
        },

        updateChip: function (chip) {
            //luu lai so chip
            this.chips = chip;
            this.lbChip.tweenValueto(chip);
        },

        subChip: function (amount) {
            this.chips -= amount;
            this.lbChip.tweenValueto(this.chips);
        },

        subChipAllIn: function () {
            this.chips = 0;
            this.lbChip.tweenValueto(this.chips);
        },

        //player vao phong
        registerPlayer: function (accountInfo, chips) {
            var avatarID = accountInfo.Avatar;
            if (avatarID <= 0) {
                avatarID = 1;
            }

            //set avatar
            if (cc.AccountController.getInstance().getAvatarImage(avatarID))
                this.avatar.setAvatar(cc.AccountController.getInstance().getAvatarImage(avatarID));




            if (accountInfo.ServiceID) {
                this.lbSID.string = cc.Config.getInstance().getServiceNameNoFormat(accountInfo.ServiceID);
                //set name
                this.lbName.string = cc.Config.getInstance().formatName(accountInfo.NickName, 7);
            } else {
                this.lbSID.string = '';
                //set name
                this.lbName.string = cc.Config.getInstance().formatName(accountInfo.NickName, 10);
            }

            //set chip
            this.lbChip.tweenValueto(chips); //accountInfo.Star

            //bat node thong tin
            this.nodeInfo.active = true;
            this.node.opacity = 255;
        },

        //player roi phong
        unRegisterPlayer: function () {
            //set = avatar def
            if (cc.LobbyController.getInstance().getGameAssets()) {
                this.avatar.setAvatar(cc.LobbyController.getInstance().getGameAssets().avatarDef);
            }
            //tat node thong tin
            this.nodeInfo.active = false;
            // this.node.opacity = 0;
        },

        updateConnectionStatus: function (status) {
            switch (status) {
                case cc.ConnectionStatus.DISCONNECTED:
                case cc.ConnectionStatus.REGISTER_LEAVE_GAME:
                    this.node.opacity = 150;
                    break;
                case cc.ConnectionStatus.CONNECTED:
                    if (this.playerStatus === cc.PlayerStatus.INGAME)
                        this.node.opacity = 255;
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

            // //fix loi server cam chat sexy
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
