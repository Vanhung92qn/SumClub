/**
 * Created by Nofear on 3/15/2019.
 */

var netConfig = require('NetConfig');

(function () {
    cc.TreasureView = cc.Class({
        "extends": cc.Component,
        properties: {
            treasurePrizeView: cc.TreasurePrizeView,
            treasureProgress: cc.TreasureProgress,
            treasureVQMMView: cc.TreasureVQMMView,

            animationGame: cc.Animation,
            skeGift: sp.Skeleton,

            bunnyJump: cc.Bunny,
            bunnyFight: cc.Bunny,

            nodeRoad: cc.Node,
            nodeBoss: cc.Node,
            lbCarrot: cc.Label,

            lbTime: cc.Label,
        },

        onLoad: function() {
            cc.TreasureController.getInstance().setTreasureView(this);

            // this.node.zIndex = cc.NoteDepth.POPUP_TREASURE;

            //set zIndex
            this.node.zIndex = cc.Config.getInstance().getZINDEX();

            this.animation = this.node.getComponent(cc.Animation);

            //HUB
            this.interval = null;
            this.lastTimeReconnect = (new Date()).getTime();
            this.connectHub();
            this.currentState = -1;
        },

        onEnable: function () {
            this.animation.play('openPopup');

            // var treasureCarrotUserInfoCommand = new cc.TreasureCarrotUserInfoCommand;
            // treasureCarrotUserInfoCommand.execute(this);

            //check xem co dailybonus ko?
            this.checkPlayFxDailyBonus();
        },

        checkPlayFxDailyBonus: function () {
            if (this.skeGift) {
                //chua nhan -> hien hieu ung
                if (cc.TreasureController.getInstance().getIsDailyBonus() === false) {
                    this.skeGift.clearTracks();
                    this.skeGift.setToSetupPose();
                    this.skeGift.setAnimation(0, 'animation', true);
                } else {
                    //nhan roi -> ko co hieu ung
                    this.skeGift.clearTracks();
                    this.skeGift.setToSetupPose();
                    this.skeGift.setAnimation(2, 'idle', false);
                }
            }
        },

        //==== HUB =========================
        onDestroy: function () {
            if (this.interval !== null) {
                clearInterval(this.interval);
            }
            if (this.hub)
                this.hub.disconnect();

            this.unscheduleAllCallbacks();
            // cc.PKController.getInstance().setPKView(null);
        },

        reset: function () {
            this.isTimer = false;
            this.timer = 0;
            this.currentState = 999;
            if (this.interval !== null) {
                clearInterval(this.interval);
            }
        },

        stopTimer: function () {
            this.isTimer = false;
            if (this.interval !== null) {
                clearInterval(this.interval);
            }
        },

        disconnectAndLogout: function () {
            if (this.hub) {
                this.hub.disconnect();
            }
            this.lastTimeReconnect = (new Date()).getTime();
        },

        connectHub: function () {
            cc.PopupController.getInstance().showBusy();
            var negotiateCommand = new cc.NegotiateCommand;
            negotiateCommand.execute(this, cc.SubdomainName.TREASURE);
        },

        reconnect: function () {
            this.lastTimeReconnect = (new Date()).getTime();
            this.hub.connect(this, cc.HubName.TreasureHub, this.connectionToken, true);
        },

        sendRequestOnHub: function (method, data) {
            if (this.hub === null) return;

            switch (method) {
                case cc.MethodHubName.TREASURE_GET_CARROT_USER_INFO:
                    this.hub.treasureGetCarrotUserInfo();
                    break;
                case cc.MethodHubName.TREASURE_CARROT_USER_GET_TREASURE:
                    this.hub.treasureUserGetTreasure();
                    break;
                case cc.MethodHubName.TREASURE_CARROT_JUMP_SPIN_CREATE:
                    this.hub.treasureCarrotJumpSpinCreate(data);
                    break;
                case cc.MethodHubName.TREASURE_CARROT_JUMP_CREATE_NEXT_DATA:
                    this.hub.treasureCarrotJumpCreateNextData(data);
                    break;
                case cc.MethodHubName.TREASURE_CARROT_FIGHT_SPIN_CREATE:
                    this.hub.treasureCarrotFightSpinCreate(data);
                    break;
            }
        },

        onSlotsNegotiateResponse: function (response) {
            cc.PopupController.getInstance().showBusy();
            this.connectionToken = response.ConnectionToken;
            this.hub = new cc.Hub;
            this.hub.connect(this, cc.HubName.TreasureHub, response.ConnectionToken);
        },

        onHubMessage: function (response) {
            // console.log(response);
            if (response.M !== undefined && response.M.length > 0) {

                //Có case sẽ bắn về > 1 hubOn -> phải duyệt qua mảng HubOn
                for (var i = response.M.length - 1; i >=0; i--) {
                    var m = (response.M)[i];
                    // console.log(m.A[0]);
                    switch (m.M) {
                        //Thong tin su kien
                        case cc.MethodHubOnName.TREASURE_GET_CARROT_USER_INFO_SUCCESS:
                            this.onTreasureCarrotUserInfoResponse(m.A[0]);
                            break;

                        //Nhan kho bau thanh cong
                        case cc.MethodHubOnName.TREASURE_CARROT_USER_GET_TREASURE_SUCCESS:
                            this.onTreasureCarrotUserGetTreasureResponse(m.A[0]);
                            break;

                        //SPIN Jump thanh cong
                        case cc.MethodHubOnName.TREASURE_CARROT_JUMP_SPIN_CREATE_SUCCESS:
                            cc.TreasureController.getInstance().jumpSpinSuccess(m.A[0]);
                            break;

                        //SPIN Boss thanh cong
                        case cc.MethodHubOnName.TREASURE_CARROT_FIGHT_SPIN_CREATE_SUCCESS:
                            cc.TreasureController.getInstance().fightSpinSuccess(m.A[0]);
                            break;

                        case cc.MethodHubOnName.MESSAGE:
                            var data = m.A[0];
                            if (data.Description) {
                                cc.PopupController.getInstance().showMessage(data.Description);
                            } else if (data.Message) {
                                cc.PopupController.getInstance().showMessage(data.Message);
                            } else {
                                cc.PopupController.getInstance().showMessage(data);
                            }
                            break;
                        case cc.MethodHubOnName.OTHER_DEVICE:
                            // m.A[0] = ma loi , m.A[1] = message
                            //vao phong choi tren thiet bi khac
                            cc.PopupController.getInstance().showPopupOtherDevice( m.A[1], cc.GameId.EVENT_TREASURE);
                    }
                }
            } else if (response.R && response.R.AccountID) {
                cc.PopupController.getInstance().hideBusy();
            } else {
                //PING PONG
                if (response.I) {
                    this.hub.pingPongResponse(response.I);
                }
            }
        },

        onHubOpen: function () {
            cc.PopupController.getInstance().hideBusy();
            this.sendRequestOnHub(cc.MethodHubName.TREASURE_GET_CARROT_USER_INFO);
            cc.PopupController.getInstance().showBusy();
        },

        onHubClose: function () {
            // cc.TaiXiuController.getInstance().reset();
            //reconnect
            // console.log((new Date()).getTime() - this.lastTimeReconnect);
            if ((new Date()).getTime() - this.lastTimeReconnect >= netConfig.RECONNECT_TIME * 1000) {
                this.reconnect();
            } else {
                cc.director.getScheduler().schedule(this.reconnect, this, netConfig.RECONNECT_TIME, 0, 0, false);
            }
        },

        onHubError: function () {

        },

        //==== END HUB  =========================

        updateEventTime: function (remaining) {
            if (this.lbTime) {
                this.lbTime.string = remaining;
            }
        },

        bunnyPlayAnimation: function (name) {
            switch (name) {
                case cc.BunnyAnimationName.IDLE:
                    this.bunnyJump.idle();
                    break;
                case cc.BunnyAnimationName.IDLE_BOSS:
                    this.bunnyFight.idle();
                    break;
                // case cc.BunnyAnimationName.JUMP0:
                //     this.bunnyJump.jump();
                //     break;
                // case cc.BunnyAnimationName.JUMP1:
                //     this.bunnyJump.jump();
                //     break;
                // case cc.BunnyAnimationName.JUMP2:
                //     this.bunnyJump.jump();
                //     break;
                // case cc.BunnyAnimationName.JUMP3:
                //     this.bunnyJump.jump();
                //     break;
                case cc.BunnyAnimationName.KICK:
                    this.bunnyFight.kick();
                    break;
                case cc.BunnyAnimationName.WIN:
                    this.bunnyFight.win();
                    break;
            }
        },

        onTreasureCarrotUserInfoResponse: function (response) {
            if (this.treasureProgress === undefined) return;

            cc.TreasureController.getInstance().setTreasureInfoResponse(response);
            // {
            //     "ResponseCode": 1,
            //     "CarrotUserInfo": {
            //         "CurrentCarrot": 0, //carrot hien tai
            //         "TreasureID": 1, //dang o kho bau nao
            //         "StatusTreasure": 0, //trang thai kho bau: 0 = chua nhan duoc, 1 = da vuot qua
            //         "BloodMonster": 0, //mau quai: >0 phai danh boss, =0: duoc phep nhan, <0: phai chon qua vat ly
            //         "InitBloodMonster": 0, //so mau quai ban dau
            //         "Balance": 9958576280, //so du
            //     }
            // }

            cc.TreasureController.getInstance().setTreasureId(response.CarrotUserInfo.TreasureID);
            cc.TreasureController.getInstance().updateCarrot(response.CarrotUserInfo.CurrentCarrot);

            this.treasureProgress.initProgress(response);

            if (response.CarrotUserInfo.GiftID > 0) {
                this.treasurePrizeView.initPrize(response.CarrotTreasurePrize, response.CarrotUserInfo.GiftID - 1);
            } else {
                this.treasurePrizeView.initPrize(response.CarrotTreasurePrize);
            }

            //da dat duoc chest + co the nhan chest
            if (response.CarrotUserInfo.StatusTreasure.toString() === cc.TreasureStatus.NOT_YET_RECEIVED_TIME) {

                //phai chon qua vat ly -> show qua vat ly
                if(response.CarrotUserInfo.BloodMonster < 0) {
                    cc.TreasureController.getInstance().showRoad();
                    cc.LobbyController.getInstance().createTreasureGiftView();
                }
                //phai danh boss
                else if (response.CarrotUserInfo.BloodMonster > 0) {
                    cc.TreasureController.getInstance().updateProgressHP(response.CarrotUserInfo.BloodMonster);
                    cc.TreasureController.getInstance().showBoss();
                }
                //duoc phep nhan
                else {
                    cc.TreasureController.getInstance().showRoad();
                    this.getTreasure();
                }
            } else {
                cc.TreasureController.getInstance().showRoad();
            }

            //Finish Event (da giet BOSS ruong so 12)
            if (response.CarrotUserInfo.TreasureID < 0) {
                this.treasurePrizeView.hidePrize();
                cc.TreasureController.getInstance().activeButtonSpin(false);
            } else {
                //cho phep click button SPIN
                cc.TreasureController.getInstance().activeButtonSpin(true);
            }

            cc.TreasureController.getInstance().activateX();

            cc.TreasureController.getInstance().setPrizeToMushroom(response.CarrotUserInfo.MNextJumpsData, response.CarrotUserInfo.NextTreasureData);

            // setTimeout(function () {
            //     cc.TreasureController.getInstance().hardResetMushroom();
            // }, 200);
        },

        showBoss: function () {
            this.nodeRoad.active = false;
            this.nodeBoss.active = true;
            this.bunnyJump.idleBoss();
            cc.TreasureController.getInstance().bossPlayAnimation(cc.BossAnimationName.IDLE);

            cc.TreasureController.getInstance().hideBossDemo();

            this.animationGame.play('openTreasureJump');
        },

        showRoad: function () {
            this.nodeRoad.active = true;
            this.nodeBoss.active = false;
            this.bunnyJump.idle();

            this.animationGame.play('openTreasureJump');
        },

        getTreasure: function () {
            var treasureCarrotUserGetTreasureCommand = new cc.TreasureCarrotUserGetTreasureCommand;
            treasureCarrotUserGetTreasureCommand.execute(this);
        },

        onTreasureCarrotUserGetTreasureResponse: function (response) {
            // {"ResponseCode":1,"Carrot":1318,"Balance":9958408280,"PrizeValue":20000,"CarrotValue":5}

            var treasureId = cc.TreasureController.getInstance().getTreasureId();
            if (treasureId === 4 || treasureId === 8 || treasureId === 12) {
                var chestType = cc.TreasureChestType.GOLDEN_CHEST;
            } else {
                chestType = cc.TreasureChestType.CHEST;
            }
            //play fx open chest
            cc.TreasureController.getInstance().getTreasureChestView().playFx(chestType, response.PrizeValue, response.CarrotValue);

            cc.DDNA.getInstance().logEventTreasureOpenChest(response.PrizeValue, cc.DDNARewardType.COIN, treasureId);
            cc.DDNA.getInstance().logEventTreasureOpenChest(response.CarrotValue, cc.DDNARewardType.CARROT, treasureId);

            // setTimeout(function () {
            //     cc.TreasureController.getInstance().sendRequestOnHub(cc.MethodHubName.TREASURE_GET_CARROT_USER_INFO);
            // }, 2000);
        },

        updateCarrot: function (carrot) {
            this.lbCarrot.string = carrot;
        },

        getLastBossGift: function () {

        },

        buyMoreCarrotClicked: function () {
            cc.LobbyController.getInstance().createBuyCarrotView();
        },

        dailyBonusClicked: function () {
            cc.LobbyController.getInstance().createCarrotDailyBonusView();
        },

        topClicked: function () {
            // cc.Tool.getInstance().setItem('@startTabEvent', 0);
            // cc.Tool.getInstance().setItem('@startSubTabEvent', 'TOP');
            // cc.LobbyController.getInstance().createEventView();

            cc.LobbyController.getInstance().createTreasureTopView();
        },

        helpClicked: function () {
            // cc.Tool.getInstance().setItem('@startTabEvent', 0);
            // cc.Tool.getInstance().setItem('@startSubTabEvent', 'RULE');
            // cc.LobbyController.getInstance().createEventView();

            cc.LobbyController.getInstance().createTreasureRuleView();
        },

        closeClicked: function () {
            cc.TreasureController.getInstance().refreshPortalTreasureInfo();
            //this.showRegister(false);
            this.animation.play('closePopup');
            var self = this;
            var delay = 0.12;
            cc.director.getScheduler().schedule(function () {
                self.animation.stop();
                cc.LobbyController.getInstance().destroyTreasureView();
            }, this, 1, 0, delay, false);
        },

    });
}).call(this);
