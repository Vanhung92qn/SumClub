
var slotsConfig = require('SlotsConfig');

(function () {
    cc.BonusGameStartView = cc.Class({
        "extends": cc.Component,
        properties: {

        },

        onEnable: function () {
            cc.director.getScheduler().schedule(function () {
                cc.BonusGameController.getInstance().changeView(cc.BonusGameState.PICK);
            }, this, 0, 0, slotsConfig.TIME_WAIT_AUTO_START_BONUS_GAME, false);
        },

        onDisable: function () {
            this.unscheduleAllCallbacks();
        },

        startClicked: function () {
            cc.BonusGameController.getInstance().changeView(cc.BonusGameState.PICK);
        },
    });
}).call(this);

