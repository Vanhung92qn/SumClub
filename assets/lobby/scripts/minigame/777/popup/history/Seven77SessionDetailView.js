/**
 * Created by Nofear on 3/15/2019.
 */


(function () {
    cc.Seven77SessionDetailView = cc.Class({
        "extends": cc.Component,
        properties: {
            lbSessionID: cc.Label,
            lbTotalWin: cc.Label,

            spriteIcons: [cc.Sprite]
        },

        onLoad: function () {
            this.animation = this.node.getComponent(cc.Animation);
        },

        onEnable: function() {
            this.showDetail();
            this.animation.play('openPopup');
        },

        showDetail: function() {
            var self = this;
            var i = 0;
            var data = cc.Seven77HistoryController.getInstance().getSessionDetailData();
            // console.log(data.SlotsData);
            var list = cc.Tool.getInstance().convertStringArrayToIntArray(data.SlotsData);
            var spriteDatas = cc.Seven77SpinController.getInstance().getSpriteIcons();
            list.forEach(function (index) {
                self.spriteIcons[i].spriteFrame = spriteDatas[index - 1];
                i++;
            });
            this.lbSessionID.string = 'Phiên: #' + data.SpinID;
            this.lbTotalWin.string = cc.Tool.getInstance().formatNumber(data.TotalPrizeValue) + ' ' + cc.Config.getInstance().currency();
        },

        backClicked: function () {
            this.animation.play('closePopup');
            var self = this;
            var delay = 0.12;
            cc.director.getScheduler().schedule(function () {
                self.animation.stop();
                self.node.destroy();
            }, this, 1, 0, delay, false);
        },
    });
}).call(this);
