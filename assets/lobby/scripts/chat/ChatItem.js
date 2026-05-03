/**
 * Created by Nofear on 3/15/2019.
 */


(function () {
    cc.ChatItem = cc.Class({
        "extends": cc.Component,
        properties: {
            //nodeUser: cc.Node,
            //lbSID: cc.Label,
            //lbName: cc.Label,
            lbMessage: cc.RichText,
            //spriteVIP: cc.Sprite,

            //rtAdmin: cc.RichText,
        },

        onLoad: function () {
            this.gameAssets = cc.LobbyController.getInstance().getGameAssets();
        },

        updateItem: function(item, itemID) {
           // if (item.ad) {
               // this.rtAdmin.node.active = true;
                //this.nodeUser.active = false;

               // this.rtAdmin.string = this.formatChatUser(item);
           // } else {
                //this.nodeUser.active = true;
               // this.rtAdmin.node.active = false;

                //this.lbSID.string = cc.Config.getInstance().getServiceNameNoFormat(item.s);
				//this.hoithoai = item.c;
                //this.lbName.string = item.n + ': '+this.hoithoai;
				
                this.lbMessage.string = '<color=#FF8F00>' +item.n + ': </color>'+item.c;


                 //this.lbName.node.color = cc.Color.CYAN;
              //  if (this.spriteVIP !== null && item.v && item.v >= cc.Config.getInstance().getMinVipShowChat()) {
                 //   this.spriteVIP.spriteFrame =  this.gameAssets.chatVIPIcons[item.v - 1];
                //    this.spriteVIP.node.active = true;
              //  } else if (this.spriteVIP !== null) {
               //     this.spriteVIP.spriteFrame = null;
               //     this.spriteVIP.node.active = false;
               // }
           // }

            this.item = item;
            this.itemID = itemID;
        },


        formatChatUser: function (chatItem) {//
            //var hubName = cc.Config.getInstance().getServiceName(chatItem.s.toString());
            //chat cua admin
            if (chatItem.ad) {//
                return '<color=#FCE700>' + chatItem.n + ': </color>' + chatItem.c;
            } else {
                return '<color=#06EEFA>' + chatItem.n + ': </color>' + chatItem.c;
            }
        },
    });
}).call(this);
