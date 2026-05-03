
var slotsConfig = require('SlotsConfig');

(function () {
    cc.BonusGameResultView = cc.Class({
        "extends": cc.Component,
        properties: {
            lbResult: cc.Label,
        },

        onEnable: function () {
            this.bonusResponse = cc.BonusGameController.getInstance().getData();
            //Moi lan pick xong update totalWin
            cc.BonusGameController.getInstance().updateTotalWin(this.bonusResponse.PrizeValue);
            this.lbResult.string = cc.Tool.getInstance().formatNumber(this.bonusResponse.PrizeValue);

            cc.BonusGameController.getInstance().stopTimer();

            cc.director.getScheduler().schedule(function () {
                cc.SpinController.getInstance().updateTotalWinFromBonus(this.bonusResponse.PrizeValue);
                cc.MainController.getInstance().destroyBonusGameView();
            }, this, 0, 0, slotsConfig.TIME_WAIT_AUTO_CLOSE_BONUS_GAME, false);
        },

        onDisable: function () {
            this.unscheduleAllCallbacks();
        },

        closeClicked: function () {

            cc.SpinController.getInstance().updateTotalWinFromBonus(this.bonusResponse.PrizeValue);
            cc.MainController.getInstance().destroyBonusGameView();
        },
    });
}).call(this);

