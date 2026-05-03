/**
 * Created by Nofear on 3/15/2019.
 */


(function () {
    cc.TKSlotsSessionDetailView = cc.Class({
        "extends": cc.SlotsSessionDetailViewBase,
        properties: {
            skeletonIcons: [sp.Skeleton],
            spriteBGRoom: cc.Sprite,
            sfBGRooms: [cc.SpriteFrame],
        },

        showDetail: function() {
            var self = this;
            var i = 0;
            var data = cc.SlotsHistoryController.getInstance().getSessionDetailData();

            var list = cc.Tool.getInstance().convertStringArrayToIntArray(data.SlotsData);

            switch (data.RoomID) {
                case 1:
                    var skeletonDataIcons = cc.SpinController.getInstance().getIconView().skeletonDataIcons;
                    break;
                case 2:
                    var skeletonDataIcons = cc.SpinController.getInstance().getIconView().skeletonDataIcons2;
                    break;
                case 3:
                    var skeletonDataIcons = cc.SpinController.getInstance().getIconView().skeletonDataIcons3;
                    break;
                case 4:
                    var skeletonDataIcons = cc.SpinController.getInstance().getIconView().skeletonDataIcons3;
                    break;
            }
            list.forEach(function (index) {
                self.skeletonIcons[i].skeletonData = skeletonDataIcons[index - 1];
                i++;
            });

            this.lbSessionID.string = '#' + data.SpinID;
            this.lbTotalBet.string = cc.Tool.getInstance().formatNumber(data.TotalBetValue);
            this.lbTotalWin.string = cc.Tool.getInstance().formatNumber(data.TotalPrizeValue);

            this.spriteBGRoom.spriteFrame = this.sfBGRooms[data.RoomID - 1];
        },
    });
}).call(this);
