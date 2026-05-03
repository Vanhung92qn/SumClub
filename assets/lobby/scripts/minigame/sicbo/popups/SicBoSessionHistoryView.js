/**
 * Sicbo session history strip view (lich su phien chay duoi cung).
 * Ported from TaiXiuSicboSessionHistoryView.
 */

(function () {
    cc.SicBoSessionHistoryView = cc.Class({
        "extends": cc.Component,
        properties: {
            spriteSides: [cc.Sprite],
            sfSides: [cc.SpriteFrame],
        },

        onLoad: function () {
            cc.SicBoController.getInstance().setSicBoSessionHistoryView(this);
        },

        onDestroy: function () {
            cc.SicBoController.getInstance().setSicBoSessionHistoryView(null);
        },

        updateSessionHistory: function (sicbogameHistory) {
            if (sicbogameHistory) {
                this.sicbogameHistory = sicbogameHistory;
                cc.SicBoController.getInstance().setGameHistory(sicbogameHistory);
                var self = this;
                var index = 0;
                sicbogameHistory.forEach(function (game) {
                    if (index >= self.spriteSides.length) return;
                    var sprite = self.spriteSides[index];
                    sprite.spriteFrame = self.sfSides[game.DiceSum > 10 ? 0 : 1];
                    index++;
                });
            }
        },

        sessionDetailClicked: function (event, customIdx) {
            var index = parseInt(customIdx, 10) || 0;
            if (this.sicbogameHistory && this.sicbogameHistory.length > index) {
                cc.SicBoController.getInstance().setDetailIndex(index);
                cc.SicBoController.getInstance().createSessionDetailView(0);
            }
        }
    });
}).call(this);
