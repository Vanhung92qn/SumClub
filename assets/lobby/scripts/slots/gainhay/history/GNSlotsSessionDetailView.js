/**
 * Created by Nofear on 3/15/2019.
 */


(function () {
    cc.GNSlotsSessionDetailView = cc.Class({
        "extends": cc.SlotsSessionDetailViewBase,
        properties: {
            spriteIcons: [cc.Sprite],
        },

        showDetail: function() {
            var self = this;
            var i = 0;
            var data = cc.SlotsHistoryController.getInstance().getSessionDetailData();

            var list = cc.Tool.getInstance().convertStringArrayToIntArray(data.SlotsData);
            var icons = cc.SpinController.getInstance().getIconView().icons;
            list.forEach(function (index) {
                self.spriteIcons[i].spriteFrame = icons[index - 1];
                i++;
            });

            this.lbSessionID.string = '#' + data.SpinID;
            this.lbTotalBet.string = cc.Tool.getInstance().formatNumber(data.TotalBetValue);
            this.lbTotalWin.string = cc.Tool.getInstance().formatNumber(data.TotalPrizeValue);
        },
    });
}).call(this);
