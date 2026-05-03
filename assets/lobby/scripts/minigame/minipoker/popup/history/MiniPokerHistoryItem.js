/**
 * Created by Nofear on 3/15/2019.
 */


(function () {
    cc.MiniPokerHistoryItem = cc.Class({
        "extends": cc.Component,
        properties: {
            // sprite: cc.Sprite,

            lbSession: cc.Label,
            lbTime: cc.Label,
            lbBet: cc.Label,
            lbWin: cc.Label,

            nodeLayoutCard1: cc.Node,
            nodeLayoutCard2: cc.Node,
            nodeLayoutCard3: cc.Node,

            spriteCard1s: [cc.Sprite],
            spriteCard2s: [cc.Sprite],
            spriteCard3s: [cc.Sprite],

            //colorJackpot: cc.Color,
            //colorNormal: cc.Color,
        },

        onLoad: function () {
            this.sfCards = cc.MPSpinController.getInstance().getSFCards();
        },

        updateItem: function(item, itemID) {
            // this.sprite.enabled = itemID % 2 !== 0;

            this.lbSession.string = '#' + item.SpinID;
            this.lbTime.string = cc.Tool.getInstance().convertUTCTime(item.CreatedDate);
            this.lbBet.string = cc.Tool.getInstance().formatNumber(item.TotalBetValue);
            this.lbWin.string = cc.Tool.getInstance().formatNumber(item.TotalPrizeValue);

            /*
            //jackpot
            if (item.TotalPrizeValue >= item.BetValue * 5000) {
                this.lbWin.node.color = this.colorJackpot;
            } else {
                this.lbWin.node.color = this.colorNormal;
            }*/

            var listDataStr = item.SlotsData.split(';');
            var listData = [];
            listDataStr.forEach(function (data) {
                listData.push(data.split(','));
            });

            this.xPoker = listData.length;

            switch (this.xPoker) {
                case cc.MiniPokerX.X1:
                    this.nodeLayoutCard2.active = false;
                    this.nodeLayoutCard3.active = false;
                    this.node.height = 50;
                    for (var i = 0; i < 5; i++) {
                        this.spriteCard1s[i].spriteFrame = this.sfCards[parseInt(listData[0][i]) - 1];
                    }
                    break;
                case cc.MiniPokerX.X3:
                    this.nodeLayoutCard2.active = true;
                    this.nodeLayoutCard3.active = true;
                    this.node.height = 150;
                    for (var i = 0; i < 5; i++) {
                        this.spriteCard1s[i].spriteFrame = this.sfCards[parseInt(listData[0][i]) - 1];
                        this.spriteCard2s[i].spriteFrame = this.sfCards[parseInt(listData[1][i]) - 1];
                        this.spriteCard3s[i].spriteFrame = this.sfCards[parseInt(listData[2][i]) - 1];
                    }
                    break;
            }

            this.item = item;
            this.itemID = itemID;
        },
    });
}).call(this);
