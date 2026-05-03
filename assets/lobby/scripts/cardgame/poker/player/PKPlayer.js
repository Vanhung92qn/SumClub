/**
 * Created by Welcome on 5/28/2019.
 */

(function () {
    cc.PKPlayer = cc.Class({
        "extends": cc.CPlayer,
        properties: {
            skeletonWin: sp.Skeleton,

            //thoi gian cho danh
            progressBar: cc.ProgressBar,
            //trang thai trong van choi (CHECK, RAISE, ...)
            lbStatus: cc.Label,
            //so tien win/lose
            lbWin: cc.Label,

            lbName: cc.Label,
            lbSID: cc.Label,

            //D, S, B
            spriteRole: cc.Sprite,
            //node bao dang register roi phong
            nodeRegisterLeave: cc.Node,

            pCard: cc.PlayerCard,
        },

        update: function (dt) {
            if (this.isTimer) {
                if (this.remaining > 0) {
                    this.remaining -= dt;
                    this.updateProgressTimer(this.remaining);
                } else {
                    this.hideProgressTimer();
                }
            }
        },

        //lay vi tri cua player
        getPlayerPosition: function () {
            if (this.playerPosition)
                return this.playerPosition;
            else
                return this.playerPosition = this.node.position;
        },

        //lay vi tri chip cua player bet
        getBetPosition: function () {
            if (this.betPosition)
                return this.betPosition;
            else
                return this.betPosition = this.pCard.node.position;
        },

        //lay vi tri chip cua player bet
        getCardPosition: function () {
            if (this.cardPosition)
                return this.cardPosition;
            else
                return this.cardPosition = cc.v2(this.pCard.node.x + 61, this.pCard.node.y + 40);
        },

        //Cập nhật màu node player theo action
        updateColorByAction: function (action) {
            if (action.toString() === cc.PKAction.FOLD) {
                this.pCard.cBet.hideChipBet();
                this.pCard.hideCard();
            } else {

            }
        },

        //override - set ket qua cho player
        playerResultUI: function (isWin, amount, hand) {
            if (amount === 0) return;

            this.nodeWin.active = false;
            this.nodeLose.active = false;

            //set gia tri
            if (isWin) {
                this.nodeWin.active = true;
                this.lbWin.string = '+' + cc.Tool.getInstance().formatNumberKTX(amount);
                this.lbWin.font = cc.PKController.getInstance().getAssets().bmfWin;

                var animName = cc.PKController.getInstance().getAnimNameByHand(hand);
                var animIndex = cc.PKController.getInstance().getAnimIndexByHand(hand);
                this.skeletonWin.clearTracks();
                this.skeletonWin.setToSetupPose();
                this.skeletonWin.setAnimation(animIndex, animName, true);
            } else {
                this.nodeLose.active = true;
                this.lbWin.string = cc.Tool.getInstance().formatNumberKTX(amount);
                this.lbWin.font = cc.PKController.getInstance().getAssets().bmfLose;

            }

            //play fx thang / thua
            this.lbWin.node.active = true;
            this.lbWin.node.scaleY = 0;
            this.animLbWin.play('xxWin');
        },

        //reset lai
        resetPKPlayer: function () {
            this.progressBar.progress = 0;
            this.isTimer = false;
            this.lbStatus.node.parent.active = false;
            this.spriteRole.node.active = false;
            this.nodeRegisterLeave.active = false;
            this.resetPlayerResultUI();
            this.pCard.cBet.hideChipBet();
            this.pCard.hideCard();
        },

        //bat dau dem thoi gian o player
        startTimer: function (remaining) {
            this.remaining = remaining;
            this.isTimer = true;
            this.updateProgressTimer(remaining);
        },

        //update progressUI thoi gian cho player xu ly
        updateProgressTimer: function (remaining) {
            this.progressBar.progress = remaining / 14; //thoi gian doi nay lay tu backend
        },

        //ket thuc dem time
        hideProgressTimer: function () {
            this.progressBar.progress = 0;
            this.isTimer = false;
        },

        //update trang thai player
        updateStatus: function (status) {
            this.lbStatus.node.parent.active = true;
            this.lbStatus.string = status;
        },

        //ẩn trang thai player
        hideStatus: function (status) {
            this.lbStatus.node.parent.active = false;
        },

        updateConnectionStatus: function (status) {
            switch (status) {
                case cc.ConnectionStatus.DISCONNECTED:
                    //ko xu ly
                    break;
                case cc.ConnectionStatus.REGISTER_LEAVE_GAME:
                    this.nodeRegisterLeave.active = true;
                    break;
                case cc.ConnectionStatus.CONNECTED:
                    this.nodeRegisterLeave.active = false;
                    break;
            }
        },

        updatePlayerStatus: function (playerStatus) {
            if (playerStatus.toString() === cc.PlayerStatus.INGAME) {
                this.node.opacity = 255;
            } else {
                this.node.opacity = 150; //NOT_INGAME //VIEWER //WAITING
            }
        },

        //update sprite Role cua player
        updateRole: function (role) {
            switch (role) {
                case cc.PKRole.DEALER:
                    this.spriteRole.node.active = true;
                    this.spriteRole.spriteFrame = cc.PKController.getInstance().getAssets().sfDealer;
                    break;
                case cc.PKRole.BIG:
                    this.spriteRole.node.active = true;
                    this.spriteRole.spriteFrame = cc.PKController.getInstance().getAssets().sfBig;
                    break;
                case cc.PKRole.SMALL:
                    this.spriteRole.node.active = true;
                    this.spriteRole.spriteFrame = cc.PKController.getInstance().getAssets().sfSmall;
                    break;
                case cc.PKRole.PLAYER:
                    this.spriteRole.node.active = false;
                    break;
                default:
                    this.spriteRole.node.active = false;
            }
        },

        //show icon thong bao player dang ky roi phong
        showRegisterLeave: function () {
            this.nodeRegisterLeave.active = true;
        },

        //hide icon thong bao player dang ky roi phong
        hideRegisterLeave: function () {
            this.nodeRegisterLeave.active = false;
        }
    });
}).call(this);
