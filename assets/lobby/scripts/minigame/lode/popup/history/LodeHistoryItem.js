(function () {
    cc.LodeHistoryItem = cc.Class({
        "extends": cc.Component,
        properties: {
            // sprite: cc.Sprite,
            lbSession: cc.Label,
            lbTime: cc.Label,
            lbTypeBet: cc.Label,
            lbNumberChoose: cc.Label,
            lbTotalBet: cc.Label,
            lbWin: cc.Label,
        },

        updateItem: function (item, itemID) {
            // this.sprite.enabled = itemID % 2 !== 0;
            this.lbSession.string = '#' + item.SessionID;
            this.lbTime.string = cc.Tool.getInstance().convertUTCTime(item.CreatedDate);
            this.lbTypeBet.string = item.GateName;
            this.lbNumberChoose.string = item.BetData;

            this.lbTotalBet.string = cc.Tool.getInstance().formatNumber(item.TotalBetValue);
            this.lbWin.string = cc.Tool.getInstance().formatNumber(item.TotalAwardValue);

            this.item = item;
            this.itemID = itemID;
        },
    });
}).call(this);
