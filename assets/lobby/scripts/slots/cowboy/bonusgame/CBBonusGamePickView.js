var slotsConfig = require('SlotsConfig');

(function () {
    cc.CBBonusGamePickView = cc.Class({
        "extends": cc.Component,
        properties: {
            btnPicks: [cc.Button],
            sfMiss: cc.SpriteFrame,
            sfWin: cc.SpriteFrame,
            lbRemaining: cc.Label,
            lbMultiplier: cc.Label
        },

        onLoad: function () {
            var self = this;
            this.sprites = [];
            this.lbiPrizes = [];
            this.btnPicks.forEach(function (btnPick) {
                self.sprites.push(btnPick.node.getChildByName('prize').getComponent(cc.Sprite));
                self.lbiPrizes.push(btnPick.node.getChildByName('label').getComponent(cc.LabelIncrement));
            });
        },
        updateRemain: function (step) {
            this.lbRemaining.string = step;
        },
        updateMultipler: function (multipler) {
            this.lbMultiplier.string = "x"+multipler;
        },

        onEnable: function () {
            //start timer
            cc.BonusGameController.getInstance().startTimer();

            var bonusResponse = cc.BonusGameController.getInstance().getData();
            var currentStep = bonusResponse.CurrentStep;
            this.totalStep = 12 - parseInt(currentStep);
            this.updateRemain(this.totalStep);
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
                    var index = parseInt(pos) - 1;
                    self.btnPicks[index].interactable = false;

                    //remove button da pick
                    self.btnPicks[index] = null;
                    if(parseInt(bonusData[indexData].PrizeValue) > 0) {
                        //bat label ket qua len
                        self.lbiPrizes[index].node.opacity = 255;
                    }
                    //set tien
                    self.lbiPrizes[index].tweenValueto(bonusData[indexData].PrizeValue);

                    self.sprites[index].spriteFrame = (parseInt(bonusData[indexData].PrizeValue) > 0) ? self.sfWin : self.sfMiss;
                    self.sprites[index].sizeMode = cc.RAW;
                    indexData++;
                }, this)
            }
        },

        pickClicked: function (event, data) {
            var self = this;

            cc.AudioController.getInstance().playSound(cc.AudioTypes.BONUS_CLICK);

            //reset timer
            cc.BonusGameController.getInstance().resetTimer();

            //pick 1 phat -> khoa nut pick
            cc.BonusGameController.getInstance().activeButtonQuickPlay(false);
            //Kho ca cac cho pick khac
            this.btnPicks.forEach(function (btnPick) {
                if (btnPick !== null) {
                    btnPick.interactable = false;
                }
            });
            this.updateRemain(--this.totalStep);
            //send request Hub
            this.position = parseInt(data.toString());

            //chuyen sang index
            var indexPick = this.position;

            //remove button da pick
            this.btnPicks[indexPick] = null;

            //Lay ve step hien tai
            var currentStep = cc.BonusGameController.getInstance().getCurrentStep();
            currentStep += 1;

            //GOi len hub
            cc.RoomController.getInstance().sendRequestOnHub(cc.MethodHubName.PLAY_BONUS, currentStep, this.position+1);

            //set lai current step
            cc.BonusGameController.getInstance().setCurrentStep(currentStep);

            //lay du lieu
            var bonusResponse = cc.BonusGameController.getInstance().getData();
            var bonusData = bonusResponse.BonusData;

            var pickValue = bonusData[currentStep - 1].PrizeValue;
            this.updateMultipler(bonusData[currentStep - 1].Multiplier);

            cc.AudioController.getInstance().playSound(cc.AudioTypes.OPEN_CARD);

            //xu ly do hoa khi thang / thua
            if (pickValue > 0) {

                //choi tiep duoc -> Cho Pick tiep
                self.btnPicks.forEach(function (btnPick) {
                    if (btnPick !== null) {
                        btnPick.interactable = true;
                    }

                });
                //bat label ket qua len
                self.lbiPrizes[indexPick].node.opacity = 255;
                //set tien
                self.lbiPrizes[indexPick].tweenValueto(pickValue);

                self.sprites[indexPick].spriteFrame = self.sfWin;
                self.sprites[indexPick].sizeMode = cc.RAW;

                var totalWin = cc.BonusGameController.getInstance().getTotalWin();
                totalWin = totalWin + pickValue;

                //update lai tong so tien thang UI
                cc.BonusGameController.getInstance().updateTotalWin(totalWin);

                cc.AudioController.getInstance().playSound(cc.AudioTypes.BONUS_WIN);

                //bat nut QuickPlay len
                cc.BonusGameController.getInstance().activeButtonQuickPlay(true);
            } else {
                //gan sprite pick truot
                self.sprites[indexPick].spriteFrame = self.sfMiss;
                self.sprites[indexPick].sizeMode = cc.RAW;

                cc.AudioController.getInstance().playSound(cc.AudioTypes.BONUS_MISS);

                //Pick truot -> se tu ban ve UpdateUserBalance -> xu ly tiep o BonusGameView
            }


        },
    });
}).call(this);
