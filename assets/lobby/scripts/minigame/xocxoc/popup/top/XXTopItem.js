/**
 * Created by Nofear on 3/15/2019.
 */


(function () {
    cc.XXTopItem = cc.Class({
        "extends": cc.Component,
        properties: {
            // sprite: cc.Sprite,

            lbRank: cc.Label,
            lbSID: cc.Label,
            lbNickName: cc.Label,
            lbTotalWin: cc.Label,
            spriteTop: cc.Sprite,
            spTop: [cc.SpriteFrame]
        },

        updateItem: function(item, itemID) {
            // this.sprite.enabled = itemID % 2 !== 0;
            if(itemID < 3) {
                this.lbRank.node.active = false;
                this.spriteTop.node.active = true;
                this.spriteTop.spriteFrame = this.spTop[itemID];
            }else {
                this.lbRank.node.active = true;
                this.spriteTop.node.active = false;
                this.lbRank.string = itemID + 1;
            }

            this.lbSID.string = cc.Config.getInstance().getServiceNameNoFormat(item.ServiceID);
            this.lbNickName.string = item.DisplayName;
            this.lbTotalWin.string = cc.Tool.getInstance().formatNumber(item.Award);

            this.item = item;
            this.itemID = itemID;
        },
    });
}).call(this);
