/**
 * Created by Nofear on 3/15/2019.
 */
var SPIN_TIME = 2;

(function () {
    cc.TreasureVQMMView = cc.Class({
        "extends": cc.Component,
        properties: {
            //boost
            nodeBoost: cc.Node,
            nodeHandleBoost: cc.Node,
            sliderBoost: cc.Slider,
            spriteBoosts: [cc.Sprite], //sprite boost bao nhieu? x?
            labelBoosts: [cc.Label], //he so nhan o popup chon boost

            //vqmm
            nodeXs: [cc.Node],
            nodeSword: cc.Node,
            spriteVQMM: cc.Sprite,
            nodeVQMMJump: cc.Node,
            nodeVQMMFight: cc.Node,
            lbPrizes: [cc.Label],
            lbFightBoosts: [cc.Label], //he so x vong quay danh boss

            nodeParentX: cc.Node,
            labelX: cc.Label,
            lbCarrot: cc.Label, //so carrot hien tai
            lbCarrot2: cc.Label, //so carrot hien tai

            treasureAutoSpin: cc.TreasureAutoSpin,
            nodeStopAutoSpin: cc.Node,
            btnSpin: cc.Button,
            btnFast: cc.Button,
            btnBuy: cc.Button,
        },

        //1-50	x1, x3, x5
        // 51-200	x3, x5, x10
        // 201 - 500	x5, x10, x20
        // 501 trở lên	x10, x20, x100

        onLoad: function() {
            cc.TreasureController.getInstance().setTreasureVQMMView(this);

            this.animBoostPopup = this.nodeBoost.getComponent(cc.Animation);

            this.countPrizeBig = 12;
            this.bigRotation = 360 / this.countPrizeBig;
            this.bigStartRotMin = -10;
            this.bigStartRotMax = 10;

            this.isAutoSpin = false; //tu dong quay
            this.isSpining = false; //dang quay

            this.isSpinJump = true;
            this.indexBoost = 0;
            this.boosts = [5, 10, 20]; //mang he so boost
            this.vqmmJumps = [15,1,10,3,8,5,12,2,10,3,8,5]; //gia tri cac giai vong quay Jump
            this.vqmmFights = [90,5,15,45,15,5,15,5,15,45,15,5]; //gia tri cac giai vong quay Fight
            //mamg cac he so x
            this.multis = [1,3,5,10,20,100];
            this.multi = 1;

            // this.nodeXs = [];
            //lay ve danh sach cac node X
            // this.nodeXs = this.nodeParentX.children;

            //mang luu spruteBG cua cac gia tri X
            this.spriteBGXs = [];

            var self = this;
            this.nodeXs.forEach(function (node) {
                self.spriteBGXs.push(node.getComponent(cc.Sprite));
            });

            this.treasureImage = cc.TreasureController.getInstance().getTreasureImage();

            // this.activateX(this.multi);

            this.sliderBoost.node.on(cc.Node.EventType.TOUCH_END, this.TouchEnd, this);
            this.nodeHandleBoost.on(cc.Node.EventType.TOUCH_END, this.TouchEnd, this);
            this.sliderBoost.node.on(cc.Node.EventType.TOUCH_CANCEL, this.TouchEnd, this);
            this.nodeHandleBoost.on(cc.Node.EventType.TOUCH_CANCEL, this.TouchEnd, this);

        },

        updateVQMM: function (isJump) {
            this.isSpinJump = isJump;

            if (isJump) {
                this.nodeVQMMJump.active = true;
                this.nodeVQMMFight.active = false;
                this.spriteVQMM.spriteFrame = this.treasureImage.sfVQMMs[0];
                this.nodeSword.active = false;
            } else {
                this.nodeVQMMJump.active = false;
                this.nodeVQMMFight.active = true;
                this.spriteVQMM.spriteFrame = this.treasureImage.sfVQMMs[1];
                this.nodeSword.active = true;
            }
        },

        updateCarrot: function (carrot) {
            if (this.lbCarrot) {
                this.lbCarrot.string = carrot;
            }

            if (this.lbCarrot2) {
                this.lbCarrot2.string = carrot;
            }
        },

        TouchEnd: function () {
            var progress = this.sliderBoost.progress;
            if (progress < 0.33) {
                this.sliderBoost.progress = 0;
                this.indexBoost = 0;
            } else if (progress < 0.66) {
                this.sliderBoost.progress = 0.5;
                this.indexBoost = 1;
            } else {
                this.sliderBoost.progress = 1;
                this.indexBoost = 2;
            }
        },

        //kich hoat quay nhanh
        activateX: function () {
            var self = this;

            if (this.multi === 1) {
                this.nodeXs.forEach(function (node) {
                    node.active = false;
                });

                var index = 0;
                this.lbPrizes.forEach(function (lbPrize) {
                    lbPrize.string = self.vqmmJumps[index] * self.multi;
                    index++;
                });

                this.lbFightBoosts.forEach(function (lbBoost) {
                    lbBoost.string = '';
                });


                this.labelX.string = 'NHANH';
            } else {

                this.nodeXs.forEach(function (node) {
                    node.active = true;
                });

                this.spriteBGXs.forEach(function (spriteBG) {
                    spriteBG.spriteFrame = self.treasureImage.sfMultis[self.multis.indexOf(self.multi)];
                });

                //setup gia tri boost hien thi
                index = 0;
                this.labelBoosts.forEach(function (lbBoost) {
                    lbBoost.string = 'X' + self.boosts[index];
                    index++;
                });

                this.lbFightBoosts.forEach(function (lbBoost) {
                    lbBoost.string = self.multi === 1 ? '' : ('X' + self.multi);
                });

                this.labelX.string = 'X' + this.multi;

                index = 0;
                this.lbPrizes.forEach(function (lbPrize) {
                    lbPrize.string = self.vqmmJumps[index] * self.multi;
                    index++;
                })
            }

            this.spinFastID = this.multis.indexOf(this.multi) + 1;
            // cc.TreasureController.getInstance().sendRequestOnHub(cc.MethodHubName.TREASURE_CARROT_JUMP_CREATE_NEXT_DATA, this.spinFastID);
            //gan UI so ca rot can de Spin
            // this.lbCarrot.string = multi;
            // this.lbCarrot2.string = multi;

            cc.TreasureController.getInstance().reSetPrizeToMushroom();
        },

        //response - SPIN jump
        onTreasureCarrotJumpSpinCreateResponse: function (response) {
            this.response = response;
            cc.TreasureController.getInstance().setJumpData(response.MJumpsData.split(';'));
            cc.TreasureController.getInstance().setJumpIndex(0);

            //set HasTreasure
            cc.TreasureController.getInstance().setTreasureId(response.TreasureID);

            // {
            //     "ResponseCode": 1,
            //     "JumpStepID": 1,
            //     "TotalJumpStep": 1,
            //     "TreasureID": 1,
            //     "BloodMonster": 0,
            //     "HasTreasure": false,
            //     "SpinID": 226,
            //     "TotalPrizeValue": 0,
            //     "TotalCarrotValue": 0,
            //     "Balance": 9957491280,
            //     "Carrot": 1575,
            //     "MJumpsData": "1,6,0,0",
            //     "PrizesData": ""
            // }

            this.spinVQMM();


            var prize = null;
            var prizeType = null;
            //lay gia tri
            var prizeData = response.PrizesData.split(',');

            //coin
            if (prizeData[2] > 0) {
                prize = prizeData[2];
                prizeType = cc.DDNARewardType.COIN;
            }
            //carrot
            else if (prizeData[3] > 0) {
                prize = prizeData[3];
                prizeType = cc.DDNARewardType.CARROT;
            }

            cc.DDNA.getInstance().logEventTreasureSpin(this.multi, parseInt(prize), prizeType);
        },

        //response - SPIN fight
        onTreasureCarrotFightSpinCreateResponse: function (response) {
            this.response = response;
            // {
            //     "ResponseCode": 1,
            //     "TotalFightStep": 1, //tong buoc danh
            //     "Symbol": 2, //Bieu tuong xac dinh vao o nao trong VQMM (1,2,3,4)
            //     "BloodMonster": 19985, //Mau Quai
            //     "SpinID": 283,
            //     "Carrot": 199997,
            //     "FightsData": "10,2,15" //FightID, Symbol, LostBlood
            // }

            this.spinVQMM();
            cc.DDNA.getInstance().logEventTreasureSpin(this.multi, null, null);
        },

        spinVQMM: function () {
            var response = this.response;

            //lay ve index tren vong quay
            if (this.isSpinJump) {
                var indexVQMM = this.vqmmJumps.indexOf(response.TotalJumpStep);
            } else {
                var lostBlood = parseInt(response.FightsData.split(',')[2].toString());
                indexVQMM = this.vqmmFights.indexOf(lostBlood / this.multi);
            }

            //tinh goc cua giai thuong - vong to
            var rotationMax = this.bigStartRotMax + (-this.bigRotation * indexVQMM);
            var rotationMin = this.bigStartRotMin + (-this.bigRotation * indexVQMM);
            var rotation = Math.floor((Math.random() * (rotationMax - rotationMin) + rotationMin));

            //set goc ket thuc
            this.nodeParentX.rotation = rotation;

            //quay
            this.nodeParentX.stopAllActions();
            this.nodeParentX.runAction(cc.rotateBy(SPIN_TIME, 1800).easing(cc.easeQuadraticActionOut()));

            var self = this;

            //play fx sau khi QUAY xong
            cc.director.getScheduler().schedule(function () {
                self.playFxGame();
            }, this, 0, 0, SPIN_TIME, false);
        },

        getMultiProcess: function (){
            if (this.multi >= 100) {
                var multiProcess = 10;
            } else if (this.multi >= 20) {
                multiProcess = 8;
            } else if (this.multi >= 10) {
                multiProcess = 6;
            } else {
                multiProcess = this.multi;
            }
            return multiProcess;
        },

        //play Fx
        playFxGame: function () {
            var self = this;
            var response = this.response;

            //SPIN Jump
            if (this.isSpinJump) {
                //lay du lieu
                var jumpData = response.MJumpsData.split(';');

                var totalStep = jumpData.length;

                var multiProcess = this.getMultiProcess();

                //chay animation bunny jump
                cc.TreasureController.getInstance().jump(totalStep, multiProcess);
            }
            //SPIN Fight
            else {
                //lay ve mau cua BOSS
                var bossHP = response.BloodMonster;

                cc.TreasureController.getInstance().setSymbol(response.Symbol);

                //chay animation danh boss
                cc.TreasureController.getInstance().attackBoss(response.FightsData.split(',')[2], bossHP);
                cc.TreasureController.getInstance().bunnyPlayAnimation(cc.BunnyAnimationName.KICK);

                //neu BOSS chet -> sau 1s play Fx BOSS chet + ăn mừng
                if (bossHP <= 0) {
                    setTimeout(function () {
                        cc.TreasureController.getInstance().bunnyPlayAnimation(cc.BunnyAnimationName.WIN);
                        cc.TreasureController.getInstance().bossPlayAnimation(cc.BossAnimationName.DEAD);
                    }, 500);
                }

                setTimeout(function () {
                    self.spinFinish();
                }, 500);
            }
        },

        activeButtonSpin: function (enabled) {
            //bat lai button
            this.btnSpin.interactable = enabled;
            this.btnFast.interactable = enabled;
            this.btnBuy.interactable = enabled;
        },

        //SPIN xong -> hoan thanh tat ca cac fx -> co the SPIN tiep)
        spinFinish: function () {

            var response = this.response;
            if (response === null) return;

            //update so Carrot
            cc.TreasureController.getInstance().updateCarrot(response.Carrot);

            //SPIN Jump
            if (this.isSpinJump) {
                //update lai so du
                cc.BalanceController.getInstance().updateBalance(response.Balance);

                //set tong so buoc
                cc.TreasureController.getInstance().addStep(response.TotalJumpStep * this.multi);

                //dat duoc kho bau
                if (response.HasTreasure) {
                    //phai chon qua vat ly -> show qua vat ly
                    if(response.BloodMonster < 0) {
                        //hien thi boss demo
                        cc.TreasureController.getInstance().showBossDemo(
                            cc.TreasureController.getInstance().getBossIndex()
                        );

                        //hien thi boss
                        setTimeout(function () {
                            cc.LobbyController.getInstance().createTreasureGiftView();
                        }, 2500);
                        // this.activeButtonSpin();
                    }
                    //phai danh boss
                    else if (response.BloodMonster > 0) {
                        var self = this;

                        //hien thi boss demo
                        cc.TreasureController.getInstance().showBossDemo(
                            cc.TreasureController.getInstance().getBossIndex()
                        );

                        //hien thi boss
                        setTimeout(function () {
                            // cc.TreasureController.getInstance().updateProgressHP(response.BloodMonster);
                            // cc.TreasureController.getInstance().showHPBar();
                            // cc.TreasureController.getInstance().showBoss();
                            // self.activeButtonSpin();

                            cc.TreasureController.getInstance().sendRequestOnHub(cc.MethodHubName.TREASURE_GET_CARROT_USER_INFO);
                        }, 2500);
                    }
                    //duoc phep nhan
                    else {
                        //Fx ruong bay len
                        cc.TreasureItemController.getInstance().createNode(null, cc.TreasureItemType.CHEST, 1);

                        //send Hub nhan kho bau
                        setTimeout(function () {
                            cc.TreasureController.getInstance().sendRequestOnHub(cc.MethodHubName.TREASURE_CARROT_USER_GET_TREASURE);
                        }, 1000);
                    }

                    //gap CHEST -> tat AUTO SPIN neu dang bat
                    if (this.isAutoSpin) {
                        this.stopAutoSpin();
                    }
                } else {
                    var treasureId = cc.TreasureController.getInstance().getTreasureId();

                    if (treasureId > 0 && treasureId <= 12) {
                        this.activeButtonSpin(true);
                        //check AUTO SPIN -> SPIN
                        if (this.isAutoSpin) {
                            this.callSpin();
                        }
                    } else {
                        this.activeButtonSpin(false);
                    }
                }
                cc.TreasureController.getInstance().setPrizeToMushroom(response.MNextJumpsData, response.NextTreasureData);
            }
            //SPIN Fight
            else {
                cc.TreasureController.getInstance().updateProgressHP(response.BloodMonster);

                if (response.BloodMonster > 0) {
                    this.activeButtonSpin(true);
                    //check AUTO SPIN -> SPIN
                    if (this.isAutoSpin) {
                        this.callSpin();
                    }
                } else {
                    //BOSS da chet
                    setTimeout(function () {
                        //send Hub nhan kho bau
                        cc.TreasureController.getInstance().sendRequestOnHub(cc.MethodHubName.TREASURE_CARROT_USER_GET_TREASURE);
                    }, 1500);

                    //BOSS chet -> tat AUTO SPIN neu dang bat
                    if (this.isAutoSpin) {
                        this.stopAutoSpin();
                    }
                }
            }

            //SPIN xong reset lai trang thai
            this.isSpining = false;

        },

        callSpin: function () {
            if (cc.TreasureController.getInstance().getCarrot() < this.multi) {
                cc.PopupController.getInstance().showMessage('Cà rốt không đủ.');
                if (this.isAutoSpin) {
                    this.stopAutoSpin();
                }
                return;
            }

            cc.TreasureController.getInstance().subCarrot(this.multi);

            this.isSpining = true;

            this.spinFastID = this.multis.indexOf(this.multi) + 1;

            this.activeButtonSpin(false);

            if (this.isSpinJump) {
                cc.TreasureController.getInstance().sendRequestOnHub(cc.MethodHubName.TREASURE_CARROT_JUMP_SPIN_CREATE, this.spinFastID);
            } else {
                cc.TreasureController.getInstance().sendRequestOnHub(cc.MethodHubName.TREASURE_CARROT_FIGHT_SPIN_CREATE, this.spinFastID);
            }
        },

        activeAutoSpin: function () {
            //danh dau trang thai autoSpin
            this.isAutoSpin = true;

            //active button stop auto spin
            this.nodeStopAutoSpin.active = true;

            //tat HOLD TO SPIN
            this.treasureAutoSpin.isActive = true;

            //neu dang ko SPIN thi call SPIN luon
            if (!this.isSpining) {
                this.callSpin();
            }
        },

        //dung tu quay
        stopAutoSpin: function () {
            //reset lai trang thai
            this.isAutoSpin = false;

            //bat HOLD TO SPIN
            this.treasureAutoSpin.isActive = true;

            //tat button STOP
            this.nodeStopAutoSpin.active = false;
        },

        //dung tu quay
        stopAutoSpinClicked: function () {
            this.stopAutoSpin();
        },

        //quay vong quay mm
        spinClicked: function () {
            this.callSpin();
        },

        //open menu chon quay nhanh
        openMenuBoostClicked: function () {
            this.boosts = cc.TreasureController.getInstance().getArrayBoost();

            //setup gia tri boost hien thi
            for (var i = 0; i < 3; i++) {
                this.spriteBoosts[i].spriteFrame = this.treasureImage.sfBGBoosts[this.multis.indexOf(this.boosts[i])];
                this.labelBoosts[i].string = 'X' + this.boosts[i];
            }

            this.nodeBoost.active = true;
            this.animBoostPopup.play('openPopup');
        },

        closeMenuBoostClicked: function () {
            this.animBoostPopup.play('closePopup');
            var self = this;
            var delay = 0.12;
            cc.director.getScheduler().schedule(function () {
                self.animBoostPopup.stop();
                self.nodeBoost.active = false;
            }, this, 1, 0, delay, false);

            //huy boost
            this.multi = 1;
            this.activateX();
        },

        //chon quay nhanh X ?
        boostClicked: function () {
            this.animBoostPopup.play('closePopup');
            var self = this;
            var delay = 0.12;
            cc.director.getScheduler().schedule(function () {
                self.animBoostPopup.stop();
                self.nodeBoost.active = false;
            }, this, 1, 0, delay, false);

            this.multi = this.boosts[this.indexBoost];

            this.activateX();
        }
    });
}).call(this);
