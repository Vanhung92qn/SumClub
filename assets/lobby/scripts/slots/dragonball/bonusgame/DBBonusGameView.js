/**
 * Created by Nofear on 3/26/2019.
 */

var slotsConfig = require('SlotsConfig');

(function () {
    cc.DBBonusGameView = cc.Class({
        "extends": cc.Component,
        properties: {
            nodeStart: cc.Node,

            nodeBonus: cc.Node,
            nodePick: cc.Node,
            nodeMulti: cc.Node,
            nodeResult: cc.Node,

            lbTime: cc.Label,
            lbiWin: cc.LabelIncrement,

            btnQuickPlay: cc.Button,
        },

        onLoad: function () {
            //Khoi tao
            cc.BonusGameController.getInstance().setBonusGameView(this);
            this.timer = 0;
            this.isTimer = false;
            this.isCallAutoBonus = false;
        },

        update: function (dt) {
            if (this.isTimer) {
                this.timer += dt;
                this.lbTime.string = 'Tự đông chơi Bonus Game sau ' + Math.round(slotsConfig.TIME_WAIT_AUTO_FINISH_BONUS_GAME - this.timer) + 's';


                if (this.timer >= slotsConfig.TIME_WAIT_AUTO_FINISH_BONUS_GAME) {
                    if (cc.BonusGameController.getInstance().getBonusGameState() !== cc.BonusGameState.MULTI) {
                        //danh dau de phan biet chủ động gọi
                        this.isCallAutoBonus = true;
                        cc.RoomController.getInstance().sendRequestOnHub(cc.MethodHubName.PLAY_BONUS, 20, 1);
                    } else {
                        //chuyen sang man result luon
                        cc.BonusGameController.getInstance().changeView(cc.BonusGameState.RESULT);
                    }

                    this.stopTimer();
                }
            }
        },

        onEnable: function () {
            //lay data cu
            var bonusResponse = cc.BonusGameController.getInstance().getData();
            var currentStep = bonusResponse.CurrentStep;
            var position = bonusResponse.Position;
            var bonusData = bonusResponse.BonusData;
            var totalWin = 0;

            //Luu lai currentStep
            cc.BonusGameController.getInstance().setCurrentStep(currentStep);

            //Xem dang o step nao?
            if (currentStep < 1) {
                //chua choi
                this.changeView(cc.BonusGameState.START);
            } else {
                //da choi ròi
                //Kiem tra da chon o vi tri nao
                var posStr = position.substring(0, position.length - 1); //cat dau , o cuoi
                var pickPos = cc.Tool.getInstance().convertStringArrayToIntArray(posStr);
                var index = 0;
                pickPos.forEach(function (pos) {
                    //Tinh so tien dang thang
                    totalWin += bonusData[index].PrizeValue;
                    index++;
                });

                this.changeView(cc.BonusGameState.PICK);
            }

            //tinh toan lay so so tien dang thang cu
            cc.BonusGameController.getInstance().updateTotalWin(totalWin);
        },

        resetTimer: function () {
            this.timer = 0;
        },

        startTimer: function () {
            this.isTimer = true;
        },

        stopTimer: function () {
            this.isTimer = false;
        },

        changeView: function (bonusGameState) {

            switch (bonusGameState) {
                case cc.BonusGameState.START:
                    this.nodePick.active = false;
                    this.nodeMulti.active = false;
                    this.nodeResult.active = false;
                    this.nodeBonus.active = false;

                    this.nodeStart.active = true;
                    break;
                case cc.BonusGameState.PICK:
                    this.nodeStart.active = false;
                    this.nodeMulti.active = false;
                    this.nodeResult.active = false;

                    this.nodeBonus.active = true;
                    this.nodePick.active = true;
                    break;
                case cc.BonusGameState.MULTI:
                    this.nodeStart.active = false;
                    this.nodePick.active = false;
                    this.nodeResult.active = false;

                    this.nodeBonus.active = true;
                    this.nodeMulti.active = true;
                    break;
                case cc.BonusGameState.RESULT:
                    this.nodeStart.active = false;

                    this.nodeBonus.active = true;
                    this.nodeResult.active = true;
                    break;
            }
        },

        activeButtonQuickPlay: function (enable) {
            this.btnQuickPlay.interactable = enable;
        },

        updateTotalWin: function (totalWin) {
            this.lbiWin.tweenValueto(totalWin);
        },


        //goi khi finish bonus game
        onPlayBonusFinishResponse: function (balance) {
            //update lại balanceUI
            cc.BalanceController.getInstance().updateRealBalance(balance);
            cc.BalanceController.getInstance().updateBalance(balance);

            if (this.isCallAutoBonus) {
                cc.BonusGameController.getInstance().changeView(cc.BonusGameState.RESULT);
            } else {
                cc.director.getScheduler().schedule(function () {
                    cc.BonusGameController.getInstance().changeView(cc.BonusGameState.MULTI);
                }, this, 0, 0, slotsConfig.TIME_WAIT_LAST_STEP, false);
            }
        },

        quickPlayClicked: function () {
            if (cc.BonusGameController.getInstance().getBonusGameState() !== cc.BonusGameState.MULTI) {
                //danh dau de phan biet chủ động gọi
                this.isCallAutoBonus = true;
                //dung timer
                cc.RoomController.getInstance().sendRequestOnHub(cc.MethodHubName.PLAY_BONUS, 20, 1);
            } else {
                //chuyen sang man result luon
                cc.BonusGameController.getInstance().changeView(cc.BonusGameState.RESULT);
            }
            this.stopTimer();
        },
    });
}).call(this);
