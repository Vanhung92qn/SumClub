/**
 * Created by Nofear on 3/15/2019.
 */


(function () {
    cc.AgencyItem = cc.Class({
        "extends": cc.Component,
        properties: {
            lbNo: cc.Label,
            lbName: cc.Label,
            lbNickName: cc.Label,
            richTextPhoneNumber: cc.Node,
            lbArea: cc.Label,
            lineItem: cc.Sprite,
            btnTransfer: cc.Node,        
            btnZalo: cc.Node,
            btnTelegram: cc.Node,
            btnFb: cc.Node,
        },

        onLoad: function () {
            // this.sprite = this.node.getComponent(cc.Sprite);
        },

        updateItem: function(item, itemID, total) {
            // this.sprite.enabled = itemID % 2 === 0;
            this.lbNo.string = itemID + 1;
            this.lbName.string = item.FullName;
            this.lbPhoneNumber = null;
            if (this.richTextPhoneNumber !== null)
            this.lbPhoneNumber = this.richTextPhoneNumber.getComponent(cc.RichText);

            if (item.DisplayName)
                this.lbNickName.string = item.DisplayName;
            else
                this.lbNickName.node.active = false;

            if (this.lbPhoneNumber) {
                if (item.PhoneDisplay) {
                    var phone = item.PhoneDisplay.replace(" ", "");
                    phone = phone.replace("+", "<br/>");
                    this.lbPhoneNumber.string = phone;
                } else
                    this.lbPhoneNumber.node.active = false;
            }

            if (this.lbArea) {
                if (item.AreaName)
                    this.lbArea.string = item.AreaName;
                else
                    this.lbArea.node.active = false;
            }

            if (this.btnFb) {
                if (item.FBLink) {
                    this.btnFb.active = true;
                } else {
                    this.btnFb.active = false;
                }
            }

            if (this.btnZalo) {
                if (item.ZaloLink) {
                    this.btnZalo.active = true;
                } else {
                    this.btnZalo.active = false;
                }
            }

            if (this.btnTelegram) {
                if (item.TelegramLink) {
                    this.btnTelegram.active = true;
                } else {
                    this.btnTelegram.active = false;
                }
            }


            this.item = item;
            this.itemID = itemID;
            this.lineItem.node.active = itemID < total -1;
        },

        openFBClicked: function () {
            if (this.item !== null && this.item.FBLink) {
                cc.sys.openURL(this.item.FBLink);
            }
        },

        openZaloClicked: function () {
            if (this.item !== null && this.item.ZaloLink) {
                cc.sys.openURL(this.item.ZaloLink);
            }
        },

        transferClicked: function () {
            if (this.item !== null && this.item.DisplayName) {                
                cc.TransferController.getInstance().bindNickName(this.item.DisplayName);
            }
        },

        tradeClicked: function () {
            if (this.item !== null && this.item.DisplayName) {
                cc.LobbyController.getInstance().createShopView(cc.ShopTab.TRANSFER);
                var self = this;
                cc.director.getScheduler().schedule(function () {
                    cc.ShopController.getInstance().activeTopupTab(cc.ShopTab.TRANSFER, self.item.DisplayName);
                }, this, 0, 0, 0.5, false);            
            }
        },

        openTelegramClicked: function () {
            if (this.item !== null && this.item.TelegramLink) {
                cc.sys.openURL(this.item.TelegramLink);
            }
        },
    });
}).call(this);

