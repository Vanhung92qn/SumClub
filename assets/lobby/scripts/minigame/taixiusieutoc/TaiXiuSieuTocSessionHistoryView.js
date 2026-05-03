/**
 * Input dat cuoc
 */

(function () {
    cc.TaiXiuSieuTocSessionHistoryView = cc.Class({
        "extends": cc.Component,
        properties: {
            spriteSides:[cc.Sprite],
            sfSides: [cc.SpriteFrame],
        },

        onLoad: function () {
            cc.TaiXiuSieuTocController.getInstance().setTaiXiuSieuTocSessionHistoryView(this);
        },

        onDestroy: function () {
            cc.TaiXiuSieuTocController.getInstance().setTaiXiuSieuTocSessionHistoryView(null);
        },

        updateSessionHistory: function (gameHistory) {
            if (gameHistory) {
                this.gameHistory = gameHistory;
                cc.TaiXiuSieuTocController.getInstance().setGameHistory(gameHistory);
                var self = this;
                var index = 0;
                gameHistory.forEach(function (game) {
                    var sprite = self.spriteSides[index];
                    sprite.spriteFrame = self.sfSides[game.DiceSum > 10 ? 0 : 1];
                    //sprite.node.getComponent(cc.Button).clickEvents[0].customEventData = index;
                    index++;
                });
            }
        },

        //Chi tiet 1 phien
        sessionDetailClicked: function (event, index) {
			var index = 0;
            if (this.gameHistory && this.gameHistory.length > index) {
                cc.TaiXiuSieuTocController.getInstance().setDetailIndex(index);
                cc.TaiXiuSieuTocMainController.getInstance().createSessionDetailView(0);
            }
        }
    });
}).call(this);
