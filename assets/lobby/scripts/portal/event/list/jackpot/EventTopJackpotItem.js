/**
 * Created by Nofear on 3/15/2019.
 */


(function () {
    cc.EventTopJackpotItem = cc.Class({
        "extends": cc.Component,
        properties: {
            sprite: cc.Sprite,
            lbNo: cc.Label,
            lbNickName: cc.Label,
            lbGame: cc.Label,
            lbRoom: cc.Label,
            lbTime: cc.Label,
            lbPrize: cc.Label,
        },

        updateItem: function(item, itemID) {
            this.sprite.enabled = itemID % 2 === 0;

            this.lbNo.string = itemID + 1;
            this.lbNickName.string = item.NickName;

            this.lbGame.string = cc.Config.getInstance().getGameName(item.GameID);
            this.lbRoom.string = cc.Tool.getInstance().formatNumber(item.RoomName);
            this.lbTime.string = cc.Tool.getInstance().convertUTCTime(item.FinishDate);
            this.lbPrize.string = cc.Tool.getInstance().formatNumber(item.Value);

            this.item = item;
            this.itemID = itemID;
        },
    });
}).call(this);
