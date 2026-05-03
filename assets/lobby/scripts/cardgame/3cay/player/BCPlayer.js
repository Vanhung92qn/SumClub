/**
 * Created by Welcome on 5/28/2019.
 */

(function () {
    cc.BCPlayer = cc.Class({
        "extends": cc.Component,
        properties: {
            cardFirst: cc.Node,
            cardSecond: cc.Node,
            cardThird: cc.Node,
            nodeBetInfo: cc.Node
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
            this.lbWin = this.node.getChildByName("lbWin").getComponent(cc.Label);
            //anim lbWin cua player
            this.animLbWin = this.node.getComponentInChildren(cc.Animation);

            //node thong tin player (name + chip)
            this.nodeInfo = this.node.getChildByName('ava_money');
            //lbChip cua player
            this.lbChip = this.nodeInfo.getChildByName('lbChip').getComponent(cc.LabelIncrement);
            //lbName cua player
            this.lbName = this.nodeInfo.getChildByName('lbName').getComponent(cc.Label);

            this.nodeInfo.active = false;
            //nodeChuong cua player
            this.nodeChuong = this.node.getChildByName('nodeChuong');

            //nodeOut cua player
            this.nodeOut = this.node.getChildByName('nodeOut');

            //nodeChuong cua player
            this.nodeGa = this.node.getChildByName('nodeGa');

            //nodeBien active cua player
            this.nodeBien = this.node.getChildByName('nodeBien');
            //node dat bien cho tung player
            this.nodeBien1 = this.node.getChildByName('nodeBien1');

            this.lbNodeBien1 = this.nodeBien1.getChildByName('lbBien').getComponent(cc.Label);

            this.nodeBien2 = this.node.getChildByName('nodeBien2');
            this.lbNodeBien2 = this.nodeBien2.getChildByName('lbBien').getComponent(cc.Label);

            this.lbBienValue = this.nodeBien.getChildByName('lbBien').getComponent(cc.Label);

            this.lbDiem = this.node.getChildByName('lbDiem').getComponent(cc.Label);

            //node chicken Win
            this.nodeChickenWin = this.node.getChildByName('chickenWin');

            //node time progress
            this.nodeTimeProgress = this.node.getChildByName('timeprogress').getComponent(cc.ProgressBar);


            // spriteFrame nodeBien
            this.spNodeBien1 = this.nodeBien1.getComponent(cc.Sprite);
            this.spNodeBien2 = this.nodeBien2.getComponent(cc.Sprite);

            //Khoi tao UI
            this.initUI();

            this.interval = null;

            this.accId = null;
            this.fromAccId = null;

            //Set gia tri danh bien
            this.valBien1 = cc.BCController.getInstance().getBetRoom();
            this.valBien2 = 2 * this.valBien1;
        },

        onDestroy: function() {
            if (this.interval !== null) {
                clearInterval(this.interval);
            }
        },

        setDefaultSpNodeBien: function () {

            this.spNodeBien1 = this.nodeBien1.getComponent(cc.Sprite);
            this.spNodeBien2 = this.nodeBien2.getComponent(cc.Sprite);

            this.spNodeBien1.spriteFrame = cc.BCController.getInstance().getBiens()[0];
            this.spNodeBien2.spriteFrame = cc.BCController.getInstance().getBiens()[0];

            let button1 = this.nodeBien1.getComponent(cc.Button);
            let button2 = this.nodeBien2.getComponent(cc.Button);
            if (button1) {
                button1.interactable = true;
                button2.interactable = true;
            }
            // this.nodeBien1.getComponent(cc.Button).interactable = true;
            // this.nodeBien2.getComponent(cc.Button).interactable = true;
        },
        updateProgressOwner: function (timeInfo) {
            if(!this.nodeTimeProgress)
                return;

            if (this.interval !== null) {
                clearInterval(this.interval);
            }

            let time = timeInfo.Time;
            let totalTime = timeInfo.TotalTime;
            if (time == 0 && totalTime == 0) {
                return;
            }
            this.nodeTimeProgress.node.active = true;
            this.speed = (time < totalTime) ? totalTime - time : time;
            this.nodeTimeProgress.progress = time / totalTime;

            this.interval = setInterval(function () {
                let progress = this.nodeTimeProgress.progress;
                progress -= 0.01 / this.speed;
                if (progress < 0)
                    progress = 0;
                this.nodeTimeProgress.progress = progress;
            }.bind(this), 10);
        },
        resetProgressOwner: function() {
            if (this.interval !== null) {
                clearInterval(this.interval);
            }
            this.nodeTimeProgress.node.active = false;
        },
        stopUpdateProgressOwner: function () {
            this.nodeTimeProgress.node.active = false;
        },
        formatValueRoom: function (value) {
            if (value >= 1000) {
                value = (value / 1000) + "K";

            }
            return value;

        },
        initUI: function () {

            //cap nhat thong tin bet side
            let roomValue = parseInt(cc.BCController.getInstance().getBetRoom());
            let strBet1 = this.formatValueRoom(roomValue);
            let strBet2 = this.formatValueRoom(roomValue * 2);

            this.lbNodeBien1.string = strBet1;
            this.lbNodeBien2.string = strBet2;

            this.setDefaultSpNodeBien();

            // progress player
            this.nodeTimeProgress.node.active = false;
            // icon chuong
            this.nodeChuong.active = false;
            // icon ga
            this.nodeGa.active = false;
            this.nodeChickenWin.active = false;
            // Diem
            this.lbDiem.node.active = false;

            // Bien
            this.nodeBien.active = false;
            this.nodeBien1.active = false;
            this.nodeBien2.active = false;

            this.nodeOut.active = false;
            this.nodeBetInfo.active = false;
            // thong tin bet player
            this.nodeInfo.active = false;
            // lb thang/thua
            this.lbWin.node.active = false;
            //reset trang thai mo
            this.isOpened = false;
            this.isShowBien = false;
            this.avatar.setAvatar(cc.BCController.getInstance().getAvatarDef());
        },
        //reset lai UI ket qua
        resetPlayerResultUI: function () {
            // Anim
            this.nodeWin.active = false;
            this.nodeLose.active = false;
            // Ga
            this.nodeGa.active = false;
            this.nodeChickenWin.active = false;
            // Diem
            this.lbDiem.node.active = false;
            // Bien
            this.nodeBien.active = false;

            this.nodeBien1.active = false;
            this.nodeBien2.active = false;

            // icon chuong
            this.nodeChuong.active = false;

            // lb thang/thua
            this.lbWin.node.active = false;
            // thong tin bet
            this.nodeBetInfo.active = false;
            // icon thoat
            this.nodeOut.active = false;
            // reset trang thai mo bai
            this.isOpened = false;
            this.isShowBien = false;

            this.nodeChuong.active = false;
            this.setDefaultSpNodeBien();

            this.avatar.node.opacity = 255;
            //update chuong
            /*let ownerId = cc.BCController.getInstance().getOwnerID();

            if(ownerId == cc.LoginController.getInstance().getUserId()) {
                this.nodeChuong.active = true;
            }*/
        },
        setAvatarBlur: function(){
            this.avatar.node.opacity = 150;
        },
        //set ket qua cho player
        playerResultUI: function (isWin, amount, sum, chickenWin, isOwner, isCurrentPlayer, isPhatLuong, isBigWin) {
            this.nodeWin.active = false;
            this.nodeLose.active = false;
            this.nodeChickenWin.active = chickenWin;
            if (chickenWin && !cc.game.isPaused()) {
                this.playerGetWin(amount);
            }
            amount = Math.abs(amount);
            let strWin = cc.Tool.getInstance().formatNumber(amount);
            //set gia tri
            if (isWin) {
                this.lbWin.node.active = true;
                if (isOwner && !isCurrentPlayer && isBigWin) {
                    this.nodeWin.active = true;
                }
                strWin = "+" + strWin;
                this.lbWin.font = cc.BCController.getInstance().getWinFont();
                this.lbDiem.font = cc.BCController.getInstance().getWinFont();

                this.lbWin.string = strWin;
                this.lbWin.node.getComponent(cc.Animation).play('showMoney');
            } else {
                if (isOwner && isPhatLuong) {
                    this.nodeLose.active = true;
                }
                if(isOwner && amount > 0) {
                    strWin = "-" + strWin;
                    this.lbWin.node.active = true;
                    this.lbWin.string = strWin;
                    this.lbWin.font = cc.BCController.getInstance().getLoseFont();
                    this.lbWin.node.getComponent(cc.Animation).play('showMoney');
                }
                // Thua ko hien thi tru tien
                // this.lbWin.font = cc.BCController.getInstance().getLoseFont();
                this.lbDiem.font = cc.BCController.getInstance().getLoseFont();
            }

            this.lbDiem.node.active = true;
            this.lbDiem.string = sum;

        },

        showValueChickenBack: function(star) {
            let amount = cc.BCController.getInstance().getBetRoom();
            let strWin = "+"+cc.Tool.getInstance().formatNumber(amount);
            this.lbWin.font = cc.BCController.getInstance().getWinFont();
            this.lbWin.string = strWin;
            this.lbWin.node.getComponent(cc.Animation).play('showMoney');
            this.lbChip.tweenValueto(star);
            this.nodeGa.active = false;
        },

        updateChip: function (chip) {
            this.lbChip.tweenValueto(chip);
        },

        //player vao phong
        registerPlayer: function (accountInfo, status) {

            this.valBien1 = cc.BCController.getInstance().getBetRoom();
            this.valBien2 = 2 * this.valBien1;

            // hien thi ai la chuong
            if (accountInfo.AccountID == cc.BCController.getInstance().getOwnerID()) {
                this.nodeChuong.active = true;
            }
            this.accId = accountInfo.AccountID;
            var avatarID = accountInfo.Avatar;
            if (avatarID <= 0) {
                avatarID = 1;
            }
            if(status == 1) {
                this.avatar.node.opacity = 255;
            }else {
                this.avatar.node.opacity = 150;
            }
            //set avatar
            this.avatar.setAvatar(cc.AccountController.getInstance().getAvatarImage(avatarID));

            //set name
            //let strService = cc.Config.getInstance().getServiceNameNoFormat(accountInfo.ServiceID);

            this.lbName.string = accountInfo.NickName; // strService +
            //set chip
            this.lbChip.tweenValueto(accountInfo.Star);
            //bat node thong tin
            this.nodeInfo.active = true;
            this.node.opacity = 255;

            // reset trang thai mo bai
            this.isOpened = false;
            this.isShowBien = false;
        },

        //player roi phong
        unRegisterPlayer: function () {
            //reset trang thai ban dau
            this.initUI();
            // Anim
            this.nodeWin.active = false;
            this.nodeLose.active = false;

            this.cardFirst.active = false;
            this.cardSecond.active = false;
            this.cardThird.active = false;

        },

        updateConnectionStatus: function (status) {
            switch (status) {
                case cc.BCConnectionStatus.DISCONNECTED:
                    this.node.opacity = 150;
                    break;
                case cc.BCConnectionStatus.REGISTER_LEAVE_GAME:
                    this.node.opacity = 255;
                    this.nodeOut.active = true;
                    break;
                case cc.BCConnectionStatus.CONNECTED:
                    // if (this.playerStatus === cc.BCPlayerStatus.INGAME)
                    this.nodeOut.active = false;
                    this.node.opacity = 255;
                    break;
            }
        },

        updatePlayerStatus: function (playerStatus) {
            this.playerStatus = playerStatus.toString();
            if (playerStatus.toString() === cc.BCPlayerStatus.INGAME) {
                this.node.opacity = 255;
            } else {
                this.node.opacity = 150;
            }
        },
        //Mo bai
        showCards: function (hand, isOpen) {

            this.cardFirst.active = true;
            this.cardSecond.active = true;
            this.cardThird.active = true;

            this.cardFirst.opacity = 255;
            this.cardSecond.opacity = 255;
            this.cardThird.opacity = 255;

            let handCards = hand.HandCards;
            let listSpiteCard = [];
            for (let i = 0; i < handCards.length; i++) {
                let cardValue = handCards[i];
                let spriteCard = this.getSpriteCard(cardValue.CardNumber, cardValue.CardSuite);
                listSpiteCard.push(spriteCard);
            }
            this.setSpirteCard(this.cardFirst, listSpiteCard[0]);
            this.setSpirteCard(this.cardSecond, listSpiteCard[1]);
            this.setSpirteCard(this.cardThird, listSpiteCard[2]);

            if (isOpen && !this.isOpened) {
                this.isOpened = true;
                this.callOpenCard(this.cardFirst);
                this.callOpenCard(this.cardSecond);
                this.callOpenCard(this.cardThird);
            }

        },
        //event danh bien 1
        onBetSide1: function () {
            let money = parseInt(this.valBien1);
            this.betSide(money, cc.BCBetSide.MIN_BET);
        },
        //event danh bien 2
        onBetSide2: function () {
            let money = parseInt(this.valBien2);
            this.betSide(money, cc.BCBetSide.MAX_BET);
        },
        betSide: function (money, type) {

            // kiem tra da bet chuong chua, neu chua thong bao
            let isBetted = cc.BCController.getInstance().isBetted;
            if (!isBetted) {
                cc.PopupController.getInstance().showMessage('Chưa cược Chương!');
                return;
            }
            if (!this.checkBalance(money))
                return;

            this.showConfirmAcceptBetOther(type);

           /* this.showBtnBien(false);

            switch (type) {
                case cc.BCBetSide.MIN_BET:
                    this.nodeBien1.active = true;
                    this.nodeBien1.getComponent(cc.Button).interactable = false;
                    this.nodeBien1.getComponent(cc.Sprite).spriteFrame = cc.BCController.getInstance().getBiens()[1];
                    break;
                case cc.BCBetSide.MAX_BET:
                    this.nodeBien2.active = true;
                    this.nodeBien2.getComponent(cc.Button).interactable = false;
                    this.nodeBien2.getComponent(cc.Sprite).spriteFrame = cc.BCController.getInstance().getBiens()[1];
                    break;
            }*/
            // Neu hien danh bien thi goi chap nhan bien
            if (this.isShowBien) {
                cc.BCController.getInstance().sendRequestOnHub(cc.MethodHubName.ACCEPT_BET, this.fromAccId, true);
            } else {
                cc.BCController.getInstance().sendRequestOnHub(cc.MethodHubName.BET_OTHERS, this.accId, money);
            }

        },
        // Hien thi tien dat bien
        showBetSideValue: function (value) {
            this.nodeBien.active = true;
            this.lbBienValue.string = this.formatValueRoom(value);
        },
        // Kiem tra so du
        checkBalance: function (money) {
            if (money > cc.BalanceController.getInstance().getBalance()) {
                cc.PopupController.getInstance().showMessage('Số dư không đủ.');
                return false;
            }
            return true;
        },

        setSpirteCard: function (nodeCard, spriteCard) {
            nodeCard.getComponent(cc.BCCardItem).spriteCard = spriteCard;
        },
        getSprite: function (nodeCard) {
            return nodeCard.getComponent(cc.BCCardItem).spriteCard;
        },
        callOpenCard: function (node) {
            node.getComponent(cc.Animation).play('mo_bai');
        },

        getSpriteCard: function (cardNumber, cardSuite) {
            let suite = cc.BCController.getInstance().getCardsSuite(cardSuite);
            return suite[cardNumber - 1];
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
        },

        playerFetChicken: function (money) {
            this.nodeGa.active = true;
            this.lbWin.node.active = true;
            this.lbWin.node.getComponent(cc.Animation).play('showMoney');
            this.lbWin.string = `-${this.formatMoney(money)}`;
            this.lbWin.font = cc.BCController.getInstance().BCAssets.getLoseFont();

            for(let i = 0; i<= 9; i++) {
                cc.director.getScheduler().schedule(function () {
                    this.moveChip();
                }.bind(this), this, 0, 1, 0.08*i, false);
            }


        },
        moveChip: function () {
            let chip = cc.BCController.getInstance().BCChipPool.createChip();
            chip.parent = this.node.parent;
            chip.position = this.node.position;
            chip.getComponent(cc.BCChipItem).moveTo(cc.v2(0, 45));
        },
        playerGetWin: function (money) {
            /* this.lbWin.node.active = true;
             this.lbWin.node.getComponent(cc.Animation).play('showMoney');
             this.lbWin.string = `+${this.formatMoney(money)}`;*/
            for(let i = 0; i<= 9; i++) {
                cc.director.getScheduler().schedule(function () {
                    let chip = cc.BCController.getInstance().BCChipPool.createChip();
                    chip.parent = this.node.parent;
                    chip.position = cc.v2(0, 45);
                    chip.getComponent(cc.BCChipItem).moveTo(this.node.position);
                }.bind(this), this, 0, 1, 0.08*i, false);
            }

        },

        //cap nhat tien bet cua player
        updateBetUI: function (betValue, star) {
            this.lbChip.tweenValueto(star);
            this.nodeBetInfo.active = true;
            let lbBet = this.nodeBetInfo.getComponentInChildren(cc.Label);
            lbBet.string = this.formatMoney(betValue);

            this.lbWin.node.active = true;
            this.lbWin.string = `-${this.formatMoney(betValue)}`;
            this.lbWin.font = cc.BCController.getInstance().BCAssets.getLoseFont();
            this.lbWin.node.getComponent(cc.Animation).play('showMoney');

        },
        // Hien thi bet log cua player
        showLogBet: function (betValue) {
            this.nodeBetInfo.active = true;
            let lbBet = this.nodeBetInfo.getComponentInChildren(cc.Label);
            lbBet.string = this.formatMoney(betValue);
        },
        //Hien thi button danh bien
        showBtnBien: function (isShow) {
            if (isShow && this.isShowBien)
                return;

            let roomValue = parseInt(cc.BCController.getInstance().getBetRoom());
            let strBet1 = this.formatValueRoom(roomValue);
            let strBet2 = this.formatValueRoom(roomValue * 2);

            this.lbNodeBien1.string = strBet1;
            this.lbNodeBien2.string = strBet2;

            this.nodeBien1.active = isShow;
            this.nodeBien2.active = isShow;
        },

        hideBtnBien: function () {
            this.nodeBien1.active = false;
            this.nodeBien2.active = false;
        },

        showBtnBienType: function (type, fromAccId) {
            if (type == cc.BCBetSide.MIN_BET) {
                this.nodeBien1.active = true;
                this.nodeBien1.getComponent(cc.Button).interactable = true;
                this.spNodeBien1.spriteFrame = cc.BCController.getInstance().getBiens()[1];
                this.nodeBien2.active = false;
            } else {
                this.nodeBien2.active = true;
                this.spNodeBien2.spriteFrame = cc.BCController.getInstance().getBiens()[1];
                this.nodeBien2.getComponent(cc.Button).interactable = true;
                this.nodeBien1.active = false;
            }
            this.fromAccId = fromAccId;
            this.isShowBien = true;
        },

        showConfirmAcceptBetOther: function(type){
            this.showBtnBien(false);

            switch (type) {
                case cc.BCBetSide.MIN_BET:
                    this.nodeBien1.active = true;
                    this.nodeBien1.getComponent(cc.Button).interactable = false;
                    this.nodeBien1.getComponent(cc.Sprite).spriteFrame = cc.BCController.getInstance().getBiens()[1];
                    break;
                case cc.BCBetSide.MAX_BET:
                    this.nodeBien2.active = true;
                    this.nodeBien2.getComponent(cc.Button).interactable = false;
                    this.nodeBien2.getComponent(cc.Sprite).spriteFrame = cc.BCController.getInstance().getBiens()[1];
                    break;
            }
        },
        // Hien thi icon chuong
        activeChuong: function (isActive) {
            this.nodeChuong.active = isActive;
        },
        formatMoney: function (money) {
            return cc.Tool.getInstance().formatNumber(money);
        }


    });
}).call(this);
