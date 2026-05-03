/**
 * Created by Nofear on 3/15/2019.
 */


(function () {
    cc.TaiXiuTopItem = cc.Class({
        "extends": cc.Component,
        properties: {
            // nodeBG: cc.Node,

            lbRank: cc.Label,
            //lbSID: cc.Label,
            lbNickName: cc.Label,
            lbTotalWin: cc.Label,
            rankSprite1: cc.Sprite,
            rankSprite2: cc.Sprite,
            rankSprite3: cc.Sprite,
			thuongtop1: cc.Node,
			thuongtop2: cc.Node,
			thuongtop3: cc.Node,
			thuongtop4: cc.Node,
			thuongtop5: cc.Node,
			thuongtop6: cc.Node,
			thuongtoplast: cc.Node,
			//thuongtop4: cc.Node,
			//thuongtop5: cc.Node,
			//thuongtop6: cc.Node,
            fontRegurlar: cc.Font,
            fontBold: cc.Font,
        },

        updateItem: function (item, itemID) {
            // this.nodeBG.active = itemID % 2 !== 0;
            var color = cc.Color.WHITE;
            if (itemID < 6) {
                this.lbRank.node.active = false;
                this.lbNickName.font = this.fontBold;
                //this.lbTotalWin.font = this.fontBold;
                if (itemID == 0) {
                    this.rankSprite1.node.active = true;
					this.thuongtop1.active = true;
					this.thuongtop2.active = false;
					this.thuongtop3.active = false;
					this.thuongtop4.active = false;
					this.thuongtop5.active = false;
					this.thuongtop6.active = false;
					this.thuongtoplast.active = false;
                    this.rankSprite2.node.active = false;
                    this.rankSprite3.node.active = false;
                    this.lbNickName.node.color = color.fromHEX("#FF0000");
                   // this.lbTotalWin.node.color = color.fromHEX("#EA21E4");
                } else if (itemID == 1) {
					this.thuongtop1.active = false;
					this.thuongtop2.active = true;
					this.thuongtop3.active = false;
					this.thuongtop4.active = false;
					this.thuongtop5.active = false;
					this.thuongtop6.active = false;
					this.thuongtoplast.active = false;
                    this.rankSprite1.node.active = false;
                    this.rankSprite2.node.active = true;
                    this.rankSprite3.node.active = false;
                    this.lbNickName.node.color = color.fromHEX("#FFFF00");
                   // this.lbTotalWin.node.color = color.fromHEX("#27C7F4");
                } else if (itemID == 2) {
					this.thuongtop1.active = false;
					this.thuongtop2.active = false;
					this.thuongtop3.active = true;
					this.thuongtop4.active = false;
					this.thuongtop5.active = false;
					this.thuongtop6.active = false;
					this.thuongtoplast.active = false;
                    this.rankSprite1.node.active = false;
                    this.rankSprite2.node.active = false;
                    this.rankSprite3.node.active = true;
                    this.lbNickName.node.color = color.fromHEX("#5BF513");
                   // this.lbTotalWin.node.color = color.fromHEX("#27C7F4");
                }else if (itemID == 3) {
					this.thuongtop1.active = false;
					this.thuongtop2.active = false;
					this.thuongtop3.active = false;
					this.thuongtop4.active = true;
					this.thuongtop5.active = false;
					 this.lbRank.string = itemID + 1;
                this.lbRank.node.active = true;
					this.thuongtop6.active = false;
					this.thuongtoplast.active = false;
                    this.rankSprite1.node.active = false;
                    this.rankSprite2.node.active = false;
                    this.rankSprite3.node.active = false;
                    this.lbNickName.node.color = color.fromHEX("#0178F8");
                   // this.lbTotalWin.node.color = color.fromHEX("#27C7F4");
                }else if (itemID == 4) {
					this.thuongtop1.active = false;
					this.thuongtop2.active = false;
					this.thuongtop3.active = false;
					this.thuongtop4.active = false;
					this.thuongtop5.active = true;
					 this.lbRank.string = itemID + 1;
                this.lbRank.node.active = true;
					this.thuongtop6.active = false;
					this.thuongtoplast.active = false;
                    this.rankSprite1.node.active = false;
                    this.rankSprite2.node.active = false;
                    this.rankSprite3.node.active = false;
                    this.lbNickName.node.color = color.fromHEX("#FF800B");
                   // this.lbTotalWin.node.color = color.fromHEX("#27C7F4");
                }else {
					this.thuongtop1.active = false;
					this.thuongtop2.active = false;
					this.thuongtop3.active = false;
					this.thuongtop4.active = false;
					this.thuongtop5.active = false;
					this.thuongtop6.active = true;
					 this.lbRank.string = itemID + 1;
                this.lbRank.node.active = true;
					this.thuongtoplast.active = false;
                    this.rankSprite1.node.active = false;
                    this.rankSprite2.node.active = false;
                    this.rankSprite3.node.active = false;
                    this.lbNickName.node.color = color.fromHEX("#5E4BA8");
                   // this.lbTotalWin.node.color = color.fromHEX("#27C7F4");
                }
            } else {
               // this.lbNickName.node.color = cc.Color.WHITE;
               // this.lbTotalWin.node.color = color.fromHEX("#FF9800");
               // this.lbNickName.font = this.fontRegurlar;
                //this.lbTotalWin.font = this.fontRegurlar;
				this.thuongtoplast.active = true;
				this.thuongtop4.active = false;
				this.thuongtop5.active = false;
				this.thuongtop6.active = false;
				this.thuongtop1.active = false;
				this.thuongtop2.active = false;
				this.thuongtop3.active = false;
                this.lbRank.string = itemID + 1;
                this.lbRank.node.active = true;
                this.rankSprite1.node.active = false;
                this.rankSprite2.node.active = false;
                this.rankSprite3.node.active = false;
            }
            //this.lbSID.string = cc.Config.getInstance().getServiceNameNoFormat(item.ServiceID);
            this.lbNickName.string = item.UserName;
            this.lbTotalWin.string = cc.Tool.getInstance().formatNumber(item.Award);

            this.item = item;
            this.itemID = itemID;
        },
    });
}).call(this);