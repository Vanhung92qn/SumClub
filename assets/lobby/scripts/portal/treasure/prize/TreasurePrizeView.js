/**
 * Created by Nofear on 3/15/2019.
 */


(function () {
    cc.TreasurePrizeView = cc.Class({
        "extends": cc.Component,
        properties: {
            nodePrize: cc.Node,

            lbCoin: cc.Label,
            spriteItem: cc.Sprite,
            lbCarrot: cc.Label,

            nodeAdd1: cc.Node,
            nodeAdd2: cc.Node,
        },

        onLoad: function() {
            this.treasureImage = cc.TreasureController.getInstance().getTreasureImage();
        },

        onEnable: function () {
            // var treasureGetCarrotGiftCommand = new cc.TreasureGetCarrotGiftCommand;
            // treasureGetCarrotGiftCommand.execute(this);
        },

        // onTreasureGetCarrotGiftResponse: function (response) {
        //
        // },

        hidePrize: function () {
            this.node.active = false;
        },

        initPrize: function (prize, indexPrizeSelect) {
            // {
            //     "TreasureID": 4,
            //     "PrizeValue": 500000,
            //     "CarrotValue": 10,
            //     "Tile": 10000,
            //     "BloodMonster": 2000
            // }

            this.nodeAdd1.active = false;
            this.nodeAdd2.active = false;

            this.lbCoin.node.parent.active = false;
            this.spriteItem.node.parent.active = false;
            this.lbCarrot.node.parent.active = false;

            if (prize === null) {
                if (indexPrizeSelect) {
                    //neu da pick phan thuong -> ko chay animation loop
                    this.spriteItem.node.getComponent(cc.Animation).stop('prizeLoop');
                    //set phan thuong da pick
                    this.spriteItem.spriteFrame = this.treasureImage.sfGifts[indexPrizeSelect];
                }
            } else {
                //Kho bau 4 + 8
                if (prize.TreasureID === 4 || prize.TreasureID === 8) {
                    this.nodeAdd2.active = true;
                    this.lbCoin.node.parent.active = true;
                    this.lbCarrot.node.parent.active = true;

                    this.lbCoin.string = cc.Tool.getInstance().formatNumber(prize.PrizeValue);
                    this.lbCarrot.string = cc.Tool.getInstance().formatNumber(prize.CarrotValue);
                } else {
                    //Kho bau so 12 (phai chon item)
                    this.nodeAdd1.active = true;
                    this.lbCoin.node.parent.active = true;

                    this.spriteItem.node.parent.active = true;
                    if (indexPrizeSelect !== undefined) {
                        //neu da pick phan thuong -> ko chay animation loop
                        this.spriteItem.node.getComponent(cc.Animation).stop('prizeLoop');
                        //set phan thuong da pick
                        this.spriteItem.spriteFrame = this.treasureImage.sfGifts[indexPrizeSelect];
                    } else {
                        //neu chua pick -? chay animation Loop prize
                        this.spriteItem.node.getComponent(cc.Animation).play('prizeLoop');
                    }

                    this.lbCoin.string = cc.Tool.getInstance().formatNumber(prize.PrizeValue);
                }
            }
        },

    });
}).call(this);
