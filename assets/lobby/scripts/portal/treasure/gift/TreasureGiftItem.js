/**
 * Created by Nofear on 3/15/2019.
 */


(function () {
    cc.TreasureGiftItem = cc.Class({
        "extends": cc.Component,
        properties: {
            spriteIcon: cc.Sprite,
            spriteLogo: cc.Sprite,

            lbTitle: cc.Label, //ten kho bau
            lbPrize: cc.Label, //giai thuong
            levelProgress: cc.ProgressBar,
        },

        onLoad: function() {
            this.treasureImage = cc.TreasureController.getInstance().getTreasureImage();

            this.spriteLogo.spriteFrame =  cc.LobbyController.getInstance().getGameAssets().icons[cc.Config.getInstance().getIndexIcon(cc.Config.getInstance().getServiceId())];


            this.giftView = cc.TreasureController.getInstance().getGiftView();
        },

        updatePack: function(pack, maxHP) {
            if (this.treasureImage === undefined) {
                this.treasureImage = cc.TreasureController.getInstance().getTreasureImage();
            }

            this.spriteIcon.spriteFrame = this.treasureImage.sfGifts[pack.GiftID - 1];

            this.lbTitle.string = pack.Description.toUpperCase();
            this.lbPrize.string = cc.Tool.getInstance().formatNumber(pack.PrizeValue);

            var progress = 0.1 + (pack.BloodMonster / maxHP);

            this.levelProgress.progress = progress;

            this.pack = pack;
        },

        chooseGiftClicked: function () {
            this.giftView.showPopupConfirm(this.pack, this);
        }
    });
}).call(this);
