

(function () {
    cc.TKBonusGameLuckyBoardView = cc.Class({
        "extends": cc.Component,
        properties: {
            nodeParentLucky: cc.Node,
            //0 = chua pick, 1 = pick roi
            sfPrizes: [cc.SpriteFrame],
        },

        onLoad: function () {
            var self = this;
            var listChildren = this.nodeParentLucky.children;
            this.spriteSprites = [];
            this.lbiPrizes = [];
            this.animationPrizes = [];
            this.btnPicks = [];

            listChildren.forEach(function (nodePick) {
                self.btnPicks.push(nodePick.getComponent(cc.Button));
                self.spriteSprites.push(nodePick.getComponentInChildren(cc.Sprite));
                self.lbiPrizes.push(nodePick.getComponentInChildren(cc.LabelIncrement));
                self.animationPrizes.push(nodePick.getComponentInChildren(cc.Animation));
            })
        },

        onEnable: function () {
            //reset timer
            cc.BonusGameController.getInstance().resetTimer();
            this.resetBoard();
        },

        resetBoard: function () {
            var self = this;
            var index = 0;
            //thay sprite chua mo + bat button + set sprite opacity = 0;
            this.spriteSprites.forEach(function (spriteSprite) {
                spriteSprite.spriteFrame = self.sfPrizes[0];
                self.btnPicks[index].interactable = true;
                self.lbiPrizes[index].node.opacity = 0;
                index++;
            });
        },

        openChestClicked: function (event, data) {

            var currentStep = cc.BonusGameController.getInstance().getCurrentStep();
            var position = cc.BonusGameController.getInstance().getCurrentPositionPick() + 1;
            //GOi len hub
            cc.RoomController.getInstance().sendRequestOnHub(cc.MethodHubName.PLAY_BONUS, currentStep, position);
            //reset timer
            cc.BonusGameController.getInstance().resetTimer();
            //tat het cac button pick
            this.btnPicks.forEach(function (btnPick) {
                btnPick.interactable = false;
            });

            //send request Hub
            var indexPick = parseInt(data.toString()) - 1;
            //doi sprite da pick
            this.spriteSprites[indexPick].spriteFrame = this.sfPrizes[1];


            //lay ve so tien pick duoc
            var luckyPrize = cc.BonusGameController.getInstance().getLuckyPrize();
            //set tien
            this.lbiPrizes[indexPick].tweenValueto(luckyPrize);
            //chay animation
            this.animationPrizes[indexPick].play('bonusPickLuck');


            cc.director.getScheduler().schedule(function () {
                cc.BonusGameController.getInstance().changeView(cc.BonusGameState.PICK);
                cc.BonusGameController.getInstance().updateResultFromLuckyBoard();
            }, this, 0, 0, 1.5, false);
        },

    });
}).call(this);
