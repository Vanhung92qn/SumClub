/**
 * Created by Nofear on 3/15/2019.
 */


(function () {
    cc.AQSlotsSessionDetailView = cc.Class({
        "extends": cc.SlotsSessionDetailViewBase,
        properties: {
            skeletonIcons: [sp.Skeleton],
        },

        showDetail: function() {
            var self = this;
            var i = 0;
            var data = cc.SlotsHistoryController.getInstance().getSessionDetailData();

            var list = cc.Tool.getInstance().convertStringArrayToIntArray(data.SlotsData);

            var skeletonDataIcons = cc.SpinController.getInstance().getIconView().skeletonDataIcons;

            list.forEach(function (index) {
                self.skeletonIcons[i].skeletonData = skeletonDataIcons[index - 1];
                i++;
            });

            this.lbSessionID.string = '#' + data.SpinID;
            this.lbTotalBet.string = cc.Tool.getInstance().formatNumber(data.TotalBetValue);
            this.lbTotalWin.string = cc.Tool.getInstance().formatNumber(data.TotalPrizeValue);

            // this.spriteBGRoom.spriteFrame = this.sfBGRooms[data.RoomID - 1];
        },
    });
}).call(this);
