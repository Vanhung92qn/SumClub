
var slotsConfig = require('ThuongHaiConfig');

(function () {
    cc.THBonusGamePickView = cc.Class({
        "extends": cc.Component,
        properties: {
            btnPicks: [cc.Button],
            lbiPrizes: [cc.LabelIncrement],
            lbMultipliers: [cc.Label],
            spriteBGPrizes: [cc.Sprite],
            nodeEffects: [cc.Node],
            animationPicks: [cc.Animation],
            sfPicks: [cc.SpriteFrame], //0 = close, 1 = open value, 2 = open key
        },

        onEnable: function () {
            cc.BonusGameController.getInstance().setBonusPickView(this);

            var self = this;

            this.spritePicks = [];
            //this.animationPicks = [];

            this.btnPicks.forEach(function (btnPick) {
                self.spritePicks.push(btnPick.node.getComponentInChildren(cc.Sprite));
                // self.animationPicks.push(btnPick.node.getComponentInChildren(cc.Animation));

            });

            this.getData();
        },

        getData: function () {
            //start timer
            cc.BonusGameController.getInstance().startTimer();

            var bonusResponse = cc.BonusGameController.getInstance().getData();
            var currentStep = bonusResponse.CurrentStep;

            this.multiplierBase = bonusResponse.Multiplier;

            this.totalStep = bonusResponse.TotalStep;

            this.remaining = cc.BonusGameController.getInstance().getPickRemaining();
            this.key = cc.BonusGameController.getInstance().getKey();

            this.multiplier = this.multiplierBase * this.key;

            //update UI he so nhan
            cc.BonusGameController.getInstance().updateMultiplier(this.multiplier);
        },

        checkLastPick: function (indexPick, prizeId) {

            if (prizeId !== cc.BonusPrizeId.P_KEY) {
                //ko phai key thi giam 1 luot
                this.remaining -= 1;
            }
            cc.BonusGameController.getInstance().updatePickRemaining(this.remaining);

            //stop animation
            this.spritePicks[indexPick].spriteFrame = this.sfPicks[0];
            this.animationPicks[indexPick].node.opacity = 0;
            this.nodeEffects[indexPick].active = false;

            if (this.remaining > 0) {
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

            //tat het fx xoay xoay khi mo duoc Key
            this.nodeEffects.forEach(function (nodeEffect) {
                nodeEffect.active = false;
            });

            //send request Hub
            this.position = parseInt(data.toString());

            //chuyen sang index
            var indexPick = this.position - 1;

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

                    self.spritePicks[indexPick].spriteFrame = self.sfPicks[2];

                    //set gia tri
                    self.lbiPrizes[indexPick].node.active = false;
                    self.lbMultipliers[indexPick].node.active = true;
                    self.spriteBGPrizes[indexPick].enabled = false;
                    self.animationPicks[indexPick].play('pickBonus');
                    self.nodeEffects[indexPick].active = true;

                    //them he so nhan (confirm lai)
                    self.key += 1;
                    self.multiplier = self.multiplierBase * self.key;

                    self.lbMultipliers[indexPick].string = 'x' + self.multiplier;

                    //update UI he so nhan + da co animation
                    cc.BonusGameController.getInstance().updateMultiplier(self.multiplier);

                    cc.director.getScheduler().schedule(function () {
                        self.checkLastPick(indexPick, prizeId);
                    }, self, 0, 0, 1.51, false);
                    break;
                default:
                    //GOi len hub
                    cc.RoomController.getInstance().sendRequestOnHub(cc.MethodHubName.PLAY_BONUS, currentStep, this.position);

                    self.spritePicks[indexPick].spriteFrame = self.sfPicks[1];

                    //set tien
                    self.lbiPrizes[indexPick].node.active = true;
                    self.lbMultipliers[indexPick].node.active = false;
                    self.spriteBGPrizes[indexPick].enabled = true;
                    self.lbiPrizes[indexPick].tweenValue(0, pickValue);
                    self.animationPicks[indexPick].play('pickBonus');

                    cc.BonusGameController.getInstance().addTotalWin(pickValue);

                    cc.director.getScheduler().schedule(function () {
                        self.checkLastPick(indexPick, prizeId);
                    }, self, 0, 0, 1.51, false);
                    break;
            }



        },

    });
}).call(this);
