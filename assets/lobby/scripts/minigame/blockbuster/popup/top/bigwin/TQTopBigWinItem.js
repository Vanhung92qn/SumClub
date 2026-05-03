/**
 * Created by Nofear on 3/15/2019.
 */


(function () {
    cc.TQTopBigWinItem = cc.Class({
        "extends": cc.Component,
        properties: {
            // sprite: cc.Sprite,

            lbSessionID: cc.Label,
            lbTime: cc.Label,
            lbSID: cc.Label,
            lbNickName: cc.Label,
            lbRoom: cc.Label,
            lbWin: cc.Label,
            lbDesc: cc.Label,

            //bigWinColor: cc.Color,
        },

        updateItem: function(item, itemID) {
            // this.sprite.enabled = itemID % 2 !== 0;
            this.lbSessionID.string = itemID + 1;
            this.lbTime.string = cc.Tool.getInstance().convertUTCTime(item.CreatedDate);
            this.lbSID.string = cc.Config.getInstance().getServiceNameNoFormat(item.ServiceID);
            this.lbNickName.string = item.UserName;
            this.lbRoom.string = cc.Tool.getInstance().formatNumber(item.RoomValue);
            this.lbWin.string = cc.Tool.getInstance().formatNumber(item.PrizeValue);
            this.lbDesc.string = 'THẮNG LỚN';

            this.item = item;
            this.itemID = itemID;
        },
    });
}).call(this);
