
var slotsConfig = require('SlotsConfig');

(function () {
    cc.TKBonusGamePickView = cc.Class({
        "extends": cc.Component,
        properties: {
            nodeParentPick: cc.Node,
            //0 = key, 1 = x4, 2 = luck
            sfPrizes: [cc.SpriteFrame],
        },

        onLoad: function () {
            cc.BonusGameController.getInstance().setBonusPickView(this);

            var self = this;
            var listChildren = this.nodeParentPick.children;
            this.spriteSprites = [];
            this.lbiPrizes = [];
            this.animationPrizes = [];
            this.btnPicks = [];

            listChildren.forEach(function (nodePick) {
                self.btnPicks.push(nodePick.getComponent(cc.Button));
                self.spriteSprites.push(nodePick.getComponentInChildren(cc.Sprite));
                self.lbiPrizes.push(nodePick.getComponentInChildren(cc.LabelIncrement));
                self.animationPrizes.push(nodePick.getComponentInChildren(cc.Animation));
            });


            this.getData();
        },

        getData: function () {
            //start timer
            cc.BonusGameController.getInstance().startTimer();

            var bonusResponse = cc.BonusGameController.getInstance().getData();
            var currentStep = bonusResponse.CurrentStep;

            this.key = 1;
            this.multiplierBase = bonusResponse.Multiplier;
            this.multiplier = bonusResponse.Multiplier;

            this.totalStep = bonusResponse.TotalStep;

            cc.BonusGameController.getInstance().updatePickRemaining(this.totalStep - currentStep);

            //Da pick 1 lan roi moi can setup
            if (currentStep >= 1) {
                var position = bonusResponse.Position;
                var bonusData = bonusResponse.BonusData;

                var self = this;
                var indexData = 0;
                //Kiem tra da chon o vi tri nao
                var posStr = position.substring(0, position.length - 1); //cat dau , o cuoi
                var pickPos = cc.Tool.getInstance().convertStringArrayToIntArray(posStr);

                pickPos.forEach(function (pos) {
                    var index = pos - 1;
                    switch (bonusData[indexData].PrizeID) {
                        case cc.BonusPrizeId.P_KEY:
                            //set sprite key
                            self.spriteSprites[index].spriteFrame = self.sfPrizes[0];

                            //them he so nhan (confirm lai)
                            self.key += 1;
                            self.multiplier = self.multiplierBase * self.key;

                            break;
                        case cc.BonusPrizeId.P_X4:
                            //set tien
                            self.lbiPrizes[index].tweenValueto(bonusData[indexData].PrizeValue);
                            self.spriteSprites[index].spriteFrame = self.sfPrizes[1];
                            self.animationPrizes[index].play('showPrize');
                            break;
                        default:
                            //set tien
                            self.lbiPrizes[index].tweenValueto(bonusData[indexData].PrizeValue);
                            self.spriteSprites[index].spriteFrame = self.sfPrizes[2];
                            self.animationPrizes[index].play('showPrize');
                            //lucky
                    }
                    //khoa click o da pick
                    self.btnPicks[index].interactable = false;
                    //remove button da pick
                    self.btnPicks[index] = null;

                    indexData++;
                })
            }

            //update UI he so nhan
            cc.BonusGameController.getInstance().updateMultiplier(this.multiplier);
        },

        updateResultFromLuckyBoard: function () {
            var indexPick = cc.BonusGameController.getInstance().getCurrentPositionPick();
            this.animationPrizes[indexPick].play('showPrize');

            //lay ve so tien pick duoc
            var luckyPrize = cc.BonusGameController.getInstance().getLuckyPrize();
            cc.BonusGameController.getInstance().addTotalWin(luckyPrize);

            //pick o bang lucky xong
            this.checkLastPick();

        },

        checkLastPick: function () {
            var remaining = this.totalStep - cc.BonusGameController.getInstance().getCurrentStep();
            cc.BonusGameController.getInstance().updatePickRemaining(remaining);
            if (remaining > 0) {
                //bat nut QuickPlay len
                cc.BonusGameController.getInstance().activeButtonQuickPlay(true);
                //Mo lai cac cho pick khac
                this.btnPicks.forEach(function (btnPick) {
                    if (btnPick !== null) {
                        btnPick.interactable = true;
                    }
                });
            } else {
                cc.director.getScheduler().schedule(function () {
                    cc.BonusGameController.getInstance().changeView(cc.BonusGameState.RESULT);
                }, this, 0, 0, slotsConfig.TIME_WAIT_LAST_PICK, false);
            }
        },

        pickClicked: function (event, data) {
            var self = this;

            //reset timer
            cc.BonusGameController.getInstance().resetTimer();

            //pick 1 phat -> khoa nut pick
            cc.BonusGameController.getInstance().activeButtonQuickPlay(false);
            //Khoa ca cac cho pick khac
            this.btnPicks.forEach(function (btnPick) {
                if (btnPick !== null) {
                    btnPick.interactable = false;
                }
            });

            //send request Hub
            this.position = parseInt(data.toString());

            //chuyen sang index
            var indexPick = this.position - 1;

            //remove button da pick
            this.btnPicks[indexPick] = null;

            //Lay ve step hien tai
            var currentStep = cc.BonusGameController.getInstance().getCurrentStep();
            currentStep+=1;



            //set lai current step
            cc.BonusGameController.getInstance().setCurrentStep(currentStep);

            //lay du lieu
            var bonusResponse = cc.BonusGameController.getInstance().getData();
            var bonusData = bonusResponse.BonusData[currentStep - 1];

            var prizeId = bonusData.PrizeID;
            var pickValue = bonusData.PrizeValue;

            switch (prizeId) {
                case cc.BonusPrizeId.P_KEY:
                    //GOi len hub
                    cc.RoomController.getInstance().sendRequestOnHub(cc.MethodHubName.PLAY_BONUS, currentStep, this.position);
                    // set sprite key
                    self.spriteSprites[indexPick].spriteFrame = self.sfPrizes[0];

                    //them he so nhan (confirm lai)
                    self.key += 1;
                    self.multiplier = self.multiplierBase * self.key;

                    //update UI he so nhan + da co animation
                    cc.BonusGameController.getInstance().updateMultiplier(self.multiplier);

                    this.checkLastPick(currentStep);
                    break;
                case cc.BonusPrizeId.P_X4:
                    //GOi len hub
                    cc.RoomController.getInstance().sendRequestOnHub(cc.MethodHubName.PLAY_BONUS, currentStep, this.position);
                    //set tien
                    self.lbiPrizes[indexPick].tweenValueto(pickValue);
                    self.spriteSprites[indexPick].spriteFrame = self.sfPrizes[1];
                    self.animationPrizes[indexPick].play('showPrize');

                    cc.BonusGameController.getInstance().addTotalWin(pickValue);

                    this.checkLastPick(currentStep);
                    break;
                default:
                    //ko goi len HUB -> goi ben man lucky
                    //set san tien nhung ko show
                    self.lbiPrizes[indexPick].tweenValueto(pickValue);
                    //set sf cho sprite
                    self.spriteSprites[indexPick].spriteFrame = self.sfPrizes[2];
                    //mo duoc luck
                    //set vi tri pick
                    cc.BonusGameController.getInstance().setCurrentPositionPick(indexPick);
                    //set gia tri lucky
                    cc.BonusGameController.getInstance().setLuckyPrize(pickValue);
                    //mo cua so Lucky
                    cc.BonusGameController.getInstance().changeView(cc.BonusGameState.LUCKY);
            }



        },

    });
}).call(this);
