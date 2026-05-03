/**
 * Created by Nofear on 3/15/2019.
 */


(function () {
    cc.EventTopBalanceItem = cc.Class({
        "extends": cc.Component,
        properties: {
            sprite: cc.Sprite,
            lbNo: cc.Label,
            lbNickName: cc.Label,
            lbBalance: cc.Label,
            lbPrize: cc.Label,
        },

        updateItem: function(item, itemID) {
            this.sprite.enabled = itemID % 2 === 0;

            this.lbNo.string = itemID + 1;
            this.lbNickName.string = item.NickName === null ? 'null' : item.NickName;

            this.lbBalance.string = cc.Tool.getInstance().formatNumber(item.Balance);
            this.lbPrize.string = cc.Tool.getInstance().formatNumber(item.RewardValue);

            this.item = item;
            this.itemID = itemID;

            // {
            //     "NickName": "kut0tt0",
            //     "GameID": 4,
            //     "RoomName": 5000,
            //     "FinishDate": "2018-12-19T09:20:55.803",
            //     "Value": 100000
            // }
        },
    });
}).call(this);
