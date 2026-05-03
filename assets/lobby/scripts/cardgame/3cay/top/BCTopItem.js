/**
 * Created by Nofear on 3/15/2019.
 */


(function () {
    cc.BCTopItem = cc.Class({
        "extends": cc.Component,
        properties: {
            // iconRank: cc.Sprite,
            lbRank: cc.Label,
            lbSID: cc.Label,
            lbNickName: cc.Label,
            lbTotalWin: cc.Label,
            // avatarTop: cc.Avatar,
            // spTop: [cc.SpriteFrame]
        },

        updateItem: function(item, itemID) {
            //this.sprite.enabled = itemID % 2 !== 0;
            // if(itemID == 0) {
            //     this.iconRank.spriteFrame = this.spTop[0];
            // }
            // if(itemID == 1) {
            //     this.iconRank.spriteFrame = this.spTop[1];
            // }
            // if(itemID == 2) {
            //     this.iconRank.spriteFrame = this.spTop[2];
            // }
            // this.iconRank.spriteFrame.setOriginalSize(cc.v2(37, 37));
            // if(itemID < 3) {
            //     this.lbRank.node.active = false;
            //     this.iconRank.node.active = true;
            // }else {
            //     this.lbRank.node.active = true;
            //     this.iconRank.node.active = false;
            //     this.lbRank.string = itemID + 1;
            // }
            // let avatar = (item.Avatar > 0) ? item.Avatar : 1;
            // this.avatarTop.setAvatar(cc.AccountController.getInstance().getAvatarImage(avatar));

            this.lbRank.string = itemID + 1;
            this.lbSID.string = "";
            this.lbNickName.string = item.DisplayName;
            this.lbTotalWin.string = cc.Tool.getInstance().formatNumber(item.Award);

            this.item = item;
            this.itemID = itemID;
        },
    });
}).call(this);
