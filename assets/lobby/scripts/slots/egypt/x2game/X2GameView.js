/**
 * Created by Nofear on 3/26/2019.
 */
var slotsConfig = require('SlotsConfig');
var gameMessage = require('GameMessage');

(function () {
    cc.X2GameView = cc.Class({
        "extends": cc.Component,
        properties: {
            lbiLastWin: cc.LabelIncrement,
            lbiX2: cc.LabelIncrement,

            btnClose: cc.Button,
            btnContinue: cc.Button,

            btnPicks: [cc.Button],
            spriteResults: [cc.Sprite],
            cardSkeletons: [sp.Skeleton],

            sfNormal: cc.SpriteFrame,
            sfPicked: cc.SpriteFrame,
            sfMiss: cc.SpriteFrame,

            sfResultPicked: cc.SpriteFrame,
            sfResultMiss: cc.SpriteFrame,
            sfResultOpen: cc.SpriteFrame,
            sfResultOpening: cc.SpriteFrame,
        },

        onLoad: function () {
            cc.X2GameController.getInstance().setX2GameView(this);
            this.spritePicks = [];
            var self = this;
            this.btnPicks.forEach(function (btnPick) {
                self.spritePicks.push(btnPick.node.getComponent(cc.Sprite));
            });
        },

        //gọi sau khi tao ra -> de set so tien last win mang ra choi x2
        onEnable: function () {
            var baseValue = cc.X2GameController.getInstance().getBaseValue();
            var x2GameData = cc.X2GameController.getInstance().getX2GameData();

            //Kiem tra xem dang o buoc nao
            this.currentStep = x2GameData.Step;

            this.lbiLastWin.tweenValueto(baseValue);
            this.lbiX2.tweenValueto(baseValue * 2);
            //Bat nut dung
            this.btnClose.interactable = true;
            this.btnContinue.interactable = false;
        },

        //ket qua khi co se tra ve day
        onResultX2Game: function (data) {
            //Kiem tra co phai truong hop bam Finish ko
            if (data.Step === 0) {
                this.checkData(data);
            }

            var self = this;
            self.currentStep = data.Step;
            self.spritePicks[self.pickID].spriteFrame = null;
            self.spriteResults[self.pickID].spriteFrame = this.sfResultOpening;
            self.spriteResults[self.pickID].node.active = true;

            cc.AudioController.getInstance().playSound(cc.AudioTypes.OPEN_CARD);

            // neu thang thi show ket qua hieu ung thang
            if (data.RoundPrize > 0) {
                //Show hieu ung thang

                //Set anh gia tri thang cho vi tri Pick
                this.cardSkeletons[this.pickID].node.active = true;
                cc.director.getScheduler().schedule(function () {
                    self.cardSkeletons[self.pickID].node.active = false;
                    self.spriteResults[self.pickID].spriteFrame = this.sfResultPicked;
                    self.spritePicks[self.pickID].spriteFrame = this.sfPicked;

                    //Cap nhat lai gia tri thang
                    this.lbiLastWin.tweenValueto(data.RoundPrize);

                    self.checkData(data);

                    cc.AudioController.getInstance().playSound(cc.AudioTypes.X2_WIN);
                }, this, 0, 0, slotsConfig.TIME_ANIMATION_OPEN_CARD, false);
            } else {


                //Set anh gia tri thua cho vi tri Pick
                this.cardSkeletons[this.pickID].node.active = true;
                cc.director.getScheduler().schedule(function () {
                    self.cardSkeletons[self.pickID].node.active = false;
                    self.spriteResults[self.pickID].spriteFrame = this.sfResultMiss;
                    self.spritePicks[self.pickID].spriteFrame = this.sfMiss;

                    //Cap nhat lai gia tri thang
                    this.lbiLastWin.tweenValueto(0);

                    self.checkData(data);

                }, this, 0, 0, slotsConfig.TIME_ANIMATION_OPEN_CARD, false);
            }


        },

        checkData: function (data) {
            //Kiem tra xem phai lan cuoi -> ket thuc luon
            if (data.IsStop) {
                // neu thang thi show ket qua hieu ung thang
                if (data.RoundPrize > 0) {
                    //Show hieu ung thang

                    //Thang ca 4 lan
                    if (data.Step === 3) {
                        cc.PopupController.getInstance().showSlotsMessage(gameMessage.YOU_WIN_X2);

                        cc.director.getScheduler().schedule(function () {
                            cc.MainController.getInstance().destroyX2GameView();
                        }, this, 0, 0, 2, false);
                    } else {
                        //nguoi choi tu bam dung (Step = 0)
                        cc.MainController.getInstance().destroyX2GameView();
                    }
                } else {
                    this.lbiX2.tweenValueto(0);
                    cc.PopupController.getInstance().showSlotsMessage(gameMessage.YOU_LOSE_X2);

                    cc.director.getScheduler().schedule(function () {
                        cc.MainController.getInstance().destroyX2GameView();
                    }, this, 0, 0, 2, false);
                }
            } else {
                //set tiep gia tri x2
                this.lbiX2.tweenValueto(data.TotalPrize * 2);

                //bat lai 2 button
                this.btnClose.interactable = true;
                this.btnContinue.interactable = true;

            }
        },

        pickClicked: function (event, data) {
            cc.AudioController.getInstance().playSound(cc.AudioTypes.X2_CLICK);

            //luu lai ID vi tri Pick
            this.pickID = parseInt(data.toString());

            //ko cho bat cac nut
            this.btnClose.interactable = false;
            this.btnContinue.interactable = false;
            this.btnPicks.forEach(function (btnPick) {
                btnPick.interactable = false;
            });

            //call hub method
            cc.RoomController.getInstance().sendRequestOnHub(cc.MethodHubName.PLAY_X2_GAME);
        },

        closeClicked: function () {
            if (this.currentStep > 0) {
                cc.RoomController.getInstance().sendRequestOnHub(cc.MethodHubName.FINISH_X2_GAME);
            } else {
                cc.MainController.getInstance().destroyX2GameView();
            }
        },

        continueClicked: function () {
            //reset lai UI pick
            var self = this;
            this.spritePicks.forEach(function (spritePick) {
                spritePick.spriteFrame = self.sfNormal;
            });

            this.spriteResults[this.pickID].node.active = false;
            this.cardSkeletons[this.pickID].node.active = false;

            //Cho pick tiep
            this.btnPicks.forEach(function (btnPick) {
                btnPick.interactable = true;
            });

            //Tat nut choi tiep
            this.btnContinue.interactable = false;
        },
    });
}).call(this);
