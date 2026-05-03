/**
 * Created by Nobita on 01/09/2022.
 */

var taiXiuMd5Config = require('SicBoConfig');

(function () {
    cc.SicBoResultView = cc.Class({
        "extends": cc.Component,
        properties: {
            nodeDiceBox: cc.Node,
            skeBoxBase: sp.Skeleton,
            skeLid: sp.Skeleton,
            //skeDiceBoxJounce: sp.Skeleton,
            spDice1: cc.Sprite,
            spDice2: cc.Sprite,
            spDice3: cc.Sprite,
            spDices: [cc.SpriteFrame],
        },

        onLoad: function () {
            this.controller = cc.SicBoController.getInstance();
            this.controller.setSicBoResultView(this);

            this.listBetSide = [];
            for (let i = 1; i <= 52; i++) {
                this.listBetSide.push(i);
            }
        },

        onDestroy: function () {
            cc.SicBoController.getInstance().setSicBoResultView(null);
        },

        onShowResult: function (data) {
            this.setDicesResult(data);

            let result = data.Result;
            let resDice1 = parseInt(result.Dice1);
            let resDice2 = parseInt(result.Dice2);
            let resDice3 = parseInt(result.Dice3);
            let resDiceSum = resDice1 + resDice2 + resDice3;

            let arrResult = [];

            //get win BAO
            if (resDice1 == resDice2 && resDice1 == resDice3) {
                arrResult.push(cc.SicBoGateBaoRandom);
                arrResult.push(cc.SicBoGateBao[resDice1]);
            }
            else {
                arrResult.push(resDiceSum > 10 ? cc.SicBoGateTai : cc.SicBoGateXiu);
                arrResult.push(resDiceSum % 2 == 0 ? cc.SicBoGateChan : cc.SicBoGateLe);

                //get win DOI
                if (resDice1 == resDice2 || resDice1 == resDice3) {
                    arrResult.push(cc.SicBoGateDoi[resDice1])
                } else if (resDice2 == resDice3) {
                    arrResult.push(cc.SicBoGateDoi[resDice2])
                }
            }

            //get win TONG 
            if (resDiceSum > 3 && resDiceSum < 18) {
                arrResult.push(cc.SicBoGateTong[resDiceSum]);
            }

            //get win CAP
            const arrDices = [resDice1, resDice2, resDice3];
            arrDices.sort();

            const cap1 = this.getCapWin(arrDices[0], arrDices[1]);
            cap1 ? arrResult.push(cap1) : '';
            const cap2 = this.getCapWin(arrDices[0], arrDices[2]);
            cap2 ? arrResult.push(cap2) : '';
            const cap3 = this.getCapWin(arrDices[1], arrDices[2]);
            cap3 ? arrResult.push(cap3) : '';

            //get win DON
            arrResult.push(cc.SicBoGateDon[resDice1]);
            arrResult.push(cc.SicBoGateDon[resDice2]);
            arrResult.push(cc.SicBoGateDon[resDice3]);

            // console.log('Side win:', arrResult);

            arrResult.map(side => this.controller.playAnimationWin(side));

            let listWin = arrResult;
            let listLose = [];
            this.listBetSide.map(side => {
                if (!listWin.includes(side)) {
                    listLose.push(side);
                }
            });

            if (!cc.game.isPaused()) {
                //Thu chip cua thua
                listLose.map(gateLose => {
                    this.controller.getChipsLose(gateLose);
                });

                cc.director.getScheduler().schedule(function () {
                    //Tra chip
                    listWin.map(gateWin => {
                        this.controller.refundChips(gateWin);
                    }, this);

                }, this, 0, 0, 1, false);

                cc.director.getScheduler().schedule(function () {
                    let result = this.controller.getWinResult();
                    if (result) {
                        this.controller.winResult(result);
                    }

                    let vipResult = this.controller.getWinVipResult();
                    if (vipResult) {
                        this.controller.winResultVip(vipResult);
                    }
                    let totalWinResult = this.controller.getTotalWinResult();
                    if (totalWinResult) {
                        this.controller.updateTotalUserWin(totalWinResult);
                    }
                }, this, 0, 0, 3.5, false);
            }
        },

        getCapWin: function (dice1, dice2) {
            const num = dice1 * 10 + dice2;

            return cc.SicBoGateCap[num];
        },

        setDicesResult: function (result) {
            this.spDice1.spriteFrame = this.spDices[result.Result.Dice1 - 1];
            this.spDice2.spriteFrame = this.spDices[result.Result.Dice2 - 1];
            this.spDice3.spriteFrame = this.spDices[result.Result.Dice3 - 1];
        },
    });
}).call(this);
