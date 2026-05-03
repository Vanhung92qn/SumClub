/**
 * Created by Welcome on 5/28/2019.
 */

(function () {
    cc.PKView = cc.Class({
        "extends": cc.Component,
        properties: {
            nodeRoom: cc.Node,
            nodeGame: cc.Node,

            spriteSound: cc.Sprite,
            sfSounds: [cc.SpriteFrame], //0=on, 1=off

            spriteBack: cc.Sprite,
            nodeRegisterLeave: cc.Node,
        },

        onLoad: function () {
            this.isRegisterLeaveRoom = false;

            cc.PKController.getInstance().setPKView(this);

            cc.BalanceController.getInstance().updateBalance(cc.BalanceController.getInstance().getBalance());

            //Check Sound
            this.sound = cc.Tool.getInstance().getItem("@Sound").toString() === 'true';

            this.spriteSound.spriteFrame = this.sound ? this.sfSounds[0] : this.sfSounds[1];

            cc.AudioController.getInstance().enableSound(this.sound);

            //setup xong -> hide di
            this.node.active = false;

            //dang dang ky leaveRoom
            this.isRegisterLeaveRoom = false;
        },

        updateOwnerConnectionStatus: function (status) {
            switch (status) {
                case cc.ConnectionStatus.REGISTER_LEAVE_GAME:
                    this.isRegisterLeaveRoom = true;
                    this.spriteBack.spriteFrame = cc.PKController.getInstance().getAssets().sfBacks[1];
                    this.nodeRegisterLeave.active = true;
                    break;
                case cc.ConnectionStatus.CONNECTED:
                    this.isRegisterLeaveRoom = false;
                    this.spriteBack.spriteFrame = cc.PKController.getInstance().getAssets().sfBacks[0];
                    this.nodeRegisterLeave.active = false;
                    break;
            }
        },

        //huong dan
        helpClicked: function () {
            cc.PKPopupController.getInstance().createHelpHandView();
            cc.AudioController.getInstance().playSound(cc.AudioTypes.CHIP_SELECT);
        },

        //lich su dat cuoc
        historyClicked: function () {
            cc.PKPopupController.getInstance().createHistoryView();
        },

        //bang xep hang dat cuoc
        topClicked: function () {
            cc.PKPopupController.getInstance().createTopView();
        },

        //bieu do chi tiet cac phien
        graphClicked: function () {
            cc.PKPopupController.getInstance().createGraphView();
        },

        soundClicked: function () {
            this.sound = !this.sound;
            cc.Tool.getInstance().setItem("@Sound", this.sound);
            this.spriteSound.spriteFrame = this.sound ? this.sfSounds[0] : this.sfSounds[1];
            cc.AudioController.getInstance().enableSound(this.sound);

            cc.AudioController.getInstance().playSound(cc.AudioTypes.CHIP_SELECT);
        },

        buyInClicked: function () {
            cc.PKController.getInstance().showBuyIn(
                cc.PKController.getInstance().getCurrentRoomVal(),
                false
            );
        },

        backClicked: function () {
            if (this.isRegisterLeaveRoom) {
                cc.PKController.getInstance().sendRequestOnHub(cc.MethodHubName.UNREGISTER_LEAVE_ROOM);
            } else {
                cc.PKController.getInstance().sendRequestOnHub(cc.MethodHubName.REGISTER_LEAVE_ROOM);
            }
        },
		
		backLobby: function () {
            cc.LobbyController.getInstance().destroyDynamicView(null);
			 cc.LobbyController.getInstance().offuserguest(true);
        },
    });
}).call(this);
