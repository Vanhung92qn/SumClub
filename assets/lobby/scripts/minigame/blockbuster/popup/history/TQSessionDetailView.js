/**
 * Created by Nofear on 3/15/2019.
 */


(function () {
    cc.TQSessionDetailView = cc.Class({
        "extends": cc.Component,
        properties: {
            lbSessionID: cc.Label,
            lbTotalWin: cc.Label,

            spriteIcons: [cc.Sprite],
            skeletonIcons: [sp.Skeleton],
            kernelIcons: [cc.Sprite],
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
            var data = cc.TQHistoryController.getInstance().getSessionDetailData();
            // console.log(data.SlotsData);
            var list = cc.Tool.getInstance().convertStringArrayToIntArray(data.SlotsData);
            var kernelData = cc.Tool.getInstance().convertStringArrayToIntArray(data.KernelData);

            var sfIcons = cc.TQSpinController.getInstance().getSFIcons();
            var skeletonDataIcons = cc.TQSpinController.getInstance().getSkeletonDataIcons();

            list.forEach(function (iconId) {
                if (iconId <= 4) {
                    self.skeletonIcons[i].node.active = true;
                    self.spriteIcons[i].node.active = false;
                    self.skeletonIcons[i].skeletonData = skeletonDataIcons[iconId - 1];
                } else {
                    self.skeletonIcons[i].node.active = false
                    self.spriteIcons[i].node.active = true;
                    self.spriteIcons[i].spriteFrame = sfIcons[iconId - 1];
                }
                i++;
            });

            for (var i = 0; i < 2; i++) {
                this.kernelIcons[i].spriteFrame = sfIcons[kernelData[i] - 1];
            }

            this.lbSessionID.string = 'Phiên: #' + data.SpinId;
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
