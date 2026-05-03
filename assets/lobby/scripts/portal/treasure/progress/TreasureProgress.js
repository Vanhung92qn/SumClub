/**
 * Created by Nofear on 3/15/2019.
 */


(function () {
    cc.TreasureProgress = cc.Class({
        "extends": cc.Component,
        properties: {
            nodeRoad: cc.Node,
            nodeHP: cc.Node,
            nodeBunny: cc.Node,

            spriteChests: [cc.Sprite],

            spriteBoss: cc.Sprite,
            spriteBossHP: cc.Sprite,

            progress: cc.ProgressBar,
            progressHP: cc.ProgressBar,

            animTooltip: cc.Animation, //anim tooltip so buoc con lai
            lbStepRemaining: cc.Label,
        },

        onLoad: function() {
            cc.TreasureController.getInstance().setTreasureProgress(this);
            this.treasureImage = cc.TreasureController.getInstance().getTreasureImage();
            this.startChestX = -250;
            this.totalLengthRoad = 500;
        },

        initProgress: function (info) {
            this.carrotUserInfo = info.CarrotUserInfo;
            this.carrotUserStages = info.CarrotUserStages;
            this.carrotTreasurePrize = info.CarrotTreasurePrize;

            cc.TreasureController.getInstance().updateCurrentStep(info.CurrentTile);

            // {
            //     "ResponseCode": 1,
            //     "CarrotUserInfo": {
            //     "CurrentCarrot": 0, //carrot hien tai
            //         "TreasureID": 1, //dang o kho bau nao
            //         "StatusTreasure": 0, //trang thai kho bau: 0 = chua nhan duoc, 1 = da vuot qua
            //         "BloodMonster": 0, //mau quai: >0 phai danh boss, =0: duoc phep nhan, <0: phai chon qua vat ly
            //         "InitBloodMonster": 0, //so mau quai ban dau
            //         "Balance": 9958576280, //so du
            //     }
            // }

            var idConvert = this.convertTreasureIdToIndex(this.carrotUserInfo.TreasureID);

            this.updateUIChest(this.carrotUserInfo.TreasureID, idConvert);

            if (this.carrotUserInfo.TreasureID <= 4) {
                this.spriteBoss.spriteFrame = this.treasureImage.sfBoss[0];
                this.spriteBossHP.spriteFrame = this.treasureImage.sfBoss[0];
            } else if (this.carrotUserInfo.TreasureID <= 8) {
                this.spriteBoss.spriteFrame = this.treasureImage.sfBoss[1];
                this.spriteBossHP.spriteFrame = this.treasureImage.sfBoss[1];
            } else {
                this.spriteBoss.spriteFrame = this.treasureImage.sfBoss[2];
                this.spriteBossHP.spriteFrame = this.treasureImage.sfBoss[2];
            }

            //phai danh boss
            if (this.carrotUserInfo.BloodMonster > 0) {
                this.showHPBar();
                this.progressHP.progress = this.carrotUserInfo.BloodMonster / this.carrotUserInfo.InitBloodMonster;
            } else {
                this.showRoadBar();

                for (var i = 0; i < 3; i++) {
                    if (this.carrotUserInfo.TreasureID > 8) {
                        var space = this.carrotUserStages[idConvert + i].Tile / this.carrotUserStages[11].Tile;
                    }  else if (this.carrotUserInfo.TreasureID > 4) {
                        space = this.carrotUserStages[idConvert + i].Tile / this.carrotUserStages[7].Tile;
                    } else {
                        space = this.carrotUserStages[idConvert + i].Tile / this.carrotUserStages[3].Tile;
                    }

                    this.spriteChests[i].node.x = this.startChestX + (space * this.totalLengthRoad);
                }

                // for (var i = 0; i < 4; i++) {
                //     if (this.carrotUserInfo.TreasureID > 8) {
                //         var space = (this.carrotUserStages[idConvert + i].Tile - this.carrotUserStages[7].Tile) / (this.carrotUserStages[11].Tile - this.carrotUserStages[7].Tile);
                //     }  else if (this.carrotUserInfo.TreasureID > 4) {
                //         space = (this.carrotUserStages[idConvert + i].Tile - this.carrotUserStages[3].Tile) / (this.carrotUserStages[7].Tile - this.carrotUserStages[3].Tile);
                //     } else {
                //         space = this.carrotUserStages[idConvert + i].Tile / this.carrotUserStages[3].Tile;
                //     }
                //
                //     this.spriteChests[i].node.x = this.startChestX + (space * this.totalLengthRoad);
                // }

                this.updateCurrentStep(this.currentTile);
            }
        },

        increUIChest: function () {
            this.carrotUserInfo.TreasureID++;

            var idConvert = this.convertTreasureIdToIndex(this.carrotUserInfo.TreasureID);
            this.updateUIChest(this.carrotUserInfo.TreasureID, idConvert);

            cc.TreasureController.getInstance().setTreasureId(this.carrotUserInfo.TreasureID);

            if (this.carrotUserInfo.TreasureID <= 12) {
                cc.TreasureController.getInstance().activeButtonSpin(true);
            }
        },

        updateUIChest: function (treasureID, idConvert) {
            //setup UI ruong
            for (var i = 0; i < 4; i++) {
                if ((treasureID - idConvert) > i + 1) {
                    this.spriteChests[i].spriteFrame = this.treasureImage.sfChests[1];
                } else if ((treasureID - idConvert) === i + 1) {
                    if (i === 3) {
                        this.spriteChests[i].spriteFrame = this.treasureImage.sfChests[2];
                    } else {
                        this.spriteChests[i].spriteFrame = this.treasureImage.sfChests[0];
                    }
                }
                else {
                    if (i === 3) {
                        this.spriteChests[i].spriteFrame = this.treasureImage.sfChests[2];
                    } else {
                        this.spriteChests[i].spriteFrame = this.treasureImage.sfChests[0];
                    }
                }
            }
        },

        updateProgressHP: function (hp) {
            this.bossHP = hp;
            this.progressHP.progress = hp / this.carrotUserInfo.InitBloodMonster;
        },

        updateCurrentStep: function (step) {
            this.currentTile = step;

            if (this.carrotUserInfo.TreasureID > 8) {
                this.progress.progress = this.currentTile / this.carrotUserStages[11].Tile;
            }  else if (this.carrotUserInfo.TreasureID > 4) {
                this.progress.progress = this.currentTile / this.carrotUserStages[7].Tile;
            } else {
                this.progress.progress = this.currentTile / this.carrotUserStages[3].Tile;
            }

            // if (this.carrotUserInfo.TreasureID > 8) {
            //     this.progress.progress = (this.currentTile - this.carrotUserStages[7].Tile) / (this.carrotUserStages[11].Tile - this.carrotUserStages[7].Tile);
            // }  else if (this.carrotUserInfo.TreasureID > 4) {
            //     this.progress.progress = (this.currentTile - this.carrotUserStages[3].Tile) / (this.carrotUserStages[7].Tile - this.carrotUserStages[3].Tile);
            // } else {
            //     this.progress.progress = this.currentTile / this.carrotUserStages[3].Tile;
            // }

            var space = this.totalLengthRoad * this.progress.progress;
            this.nodeBunny.x = this.startChestX + space;
        },

        showRoadBar: function () {
            this.nodeRoad.active = true;
            this.nodeHP.active = false;
        },

        showHPBar: function () {
            this.nodeRoad.active = false;
            this.nodeHP.active = true;
        },

        convertTreasureIdToIndex: function (treasureID) {
            if (treasureID <= 4) {
                var indexConvert = 0;
            } else if (treasureID <= 8) {
                indexConvert = 4;
            } else {
                indexConvert = 8;
            }

            return indexConvert;
        },

        bunnyClicked: function () {
            this.lbStepRemaining.string = cc.Tool.getInstance().formatNumber(this.currentTile) + ' C';

            this.animTooltip.node.x = this.nodeBunny.x;
            this.animTooltip.play('stepTooltip');
        },

        bossClicked: function () {
            this.lbStepRemaining.string = cc.Tool.getInstance().formatNumber(this.bossHP) + ' HP';

            this.animTooltip.node.x = this.spriteBoss.node.x + 50;
            this.animTooltip.play('stepTooltip');
        },

        treasureClicked: function (event, data) {
            var index = parseInt(data.toString());

            var indexConvert = this.convertTreasureIdToIndex(this.carrotUserInfo.TreasureID);

            // var remaining = this.carrotUserStages[index + indexConvert].Tile - this.currentTile;
            var remaining = this.carrotUserStages[index + indexConvert].Tile;

            if (remaining > 0) {
                this.lbStepRemaining.string = cc.Tool.getInstance().formatNumber(remaining) + ' C';

                this.animTooltip.node.x = this.spriteChests[index].node.x;
                this.animTooltip.play('stepTooltip');
            }
        }
    });
}).call(this);
