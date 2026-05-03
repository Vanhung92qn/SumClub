

(function () {
    cc.SummonDragonView = cc.Class({
        "extends": cc.Component,
        properties: {
            lbNameLost: cc.Label,
            lbPrizeLost: cc.LabelIncrement,
            skeletonDragonLost: sp.Skeleton,

            lbNameWin: cc.Label,
            lbPrizeWin: cc.LabelIncrement,
            skeletonDragonWin: sp.Skeleton,
        },

        onLoad: function () {
            //1 con set ve 0, 2 con win = 310, lost = -310

            this.node.zIndex =  cc.NoteDepth.SUMMON_DRAGON;

            var winnerResult = cc.TaiXiuController.getInstance().getEventWinnerResult();

            //goi duoc rong thang
            if (winnerResult.IsSummonDragonLost && winnerResult.IsSummonDragonWin) {
                this.skeletonDragonWin.node.active = true;
                this.skeletonDragonWin.node.x = 310;
                this.skeletonDragonWin.setAnimation(0, 'animation', true);
                this.lbNameWin.string = winnerResult.NickNameWin;
                this.lbPrizeWin.tweenValue(0, winnerResult.PrizeValueWin);

                this.skeletonDragonLost.node.active = true;
                this.skeletonDragonLost.node.x = -310;
                this.skeletonDragonLost.setAnimation(1, 'animation', true);
                this.lbNameLost.string = winnerResult.NickNameLost;
                this.lbPrizeLost.tweenValue(0, winnerResult.PrizeValueLost);

            }
            else if (winnerResult && winnerResult.IsSummonDragonWin) {
                this.skeletonDragonWin.node.active = true;
                this.skeletonDragonLost.node.active = false;
                this.skeletonDragonWin.node.x = 0;
                this.skeletonDragonWin.setAnimation(0, 'animation', true);
                this.lbNameWin.string = winnerResult.NickNameWin;
                this.lbPrizeWin.tweenValue(0, winnerResult.PrizeValueWin);
            }
            else if (winnerResult && winnerResult.IsSummonDragonLost) {
                this.skeletonDragonLost.node.active = true;
                this.skeletonDragonWin.node.active = false;
                this.skeletonDragonLost.node.x = 0;
                this.skeletonDragonLost.setAnimation(1, 'animation', true);
                this.lbNameLost.string = winnerResult.NickNameLost;
                this.lbPrizeLost.tweenValue(0, winnerResult.PrizeValueLost);
            }

            var self = this;
            cc.director.getScheduler().schedule(function () {
                self.node.destroy();
            }, this, 0, 0, 10, false);
        },

        destroyClicked: function () {
            this.unscheduleAllCallbacks();
            this.node.destroy();
        },
    });
}).call(this);
