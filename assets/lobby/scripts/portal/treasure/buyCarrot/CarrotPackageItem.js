/**
 * Created by Nofear on 3/15/2019.
 */


(function () {
    cc.CarrotPackageItem = cc.Class({
        "extends": cc.Component,
        properties: {
            spriteBG: cc.Sprite,
            spriteIcon: cc.Sprite,

            lbRemaining: cc.Label, //duoc mua sau

            lbCarrot: cc.Label,
            lbPrice: cc.Label,
        },

        onLoad: function() {
            this.treasureImage = cc.TreasureController.getInstance().getTreasureImage();

            this.spriteIcon.spriteFrame =  cc.LobbyController.getInstance().getGameAssets().icons[cc.Config.getInstance().getIndexIcon(cc.Config.getInstance().getServiceId())];

            this.button = this.node.getComponent(cc.Button);

            this.buyCarrotView = cc.TreasureController.getInstance().getBuyCarrotView();
        },

        update: function (dt) {
            if (this.isTimer) {
                this.timer -= dt;
                this.updateTimer += dt;

                if (this.updateTimer >= this.updateInterval) {
                    if (this.timer > 0) {
                        this.lbRemaining.string = cc.Tool.getInstance().convertSecondToTime(Math.round(this.timer));
                    } else {
                        this.timer = 0;
                        this.isTimer = false;
                        // this.activatePackage();
                        cc.TreasureController.getInstance().getBuyCarrotView().refreshPack();
                    }
                    this.updateTimer = 0;
                }
            }
        },


        startTimer: function (remaining) {
            this.timer = 0;
            this.updateTimer = 0;
            this.updateInterval = 1;

            this.timer = remaining;
            this.lbRemaining.string = cc.Tool.getInstance().convertSecondToTime(Math.round(this.timer));

            this.isTimer = true;
            this.lbRemaining.node.parent.active = true;
        },

        activatePackage: function () {
            this.lbRemaining.node.parent.active = false;
        },

        updatePack: function(pack, buyInTime) {
            if (this.treasureImage === undefined) {
                this.treasureImage = cc.TreasureController.getInstance().getTreasureImage();
            }

            if (this.button === undefined) {
                this.button = this.node.getComponent(cc.Button);
            }

            this.lbCarrot.string = cc.Tool.getInstance().formatNumber(pack.Quantity);
            this.lbPrice.string = cc.Tool.getInstance().formatNumber(pack.Price);

            //dupc phep mua
            if (pack.Status === 1) {
                this.spriteBG.spriteFrame = this.treasureImage.sfPacks[pack.PackageID - 1];
                this.lbRemaining.node.parent.active = false;
                this.button.interactable = true;
                this.isTimer = false;
            } else {
                //ko duoc mua
                this.spriteBG.spriteFrame = this.treasureImage.sfPackDisables[pack.PackageID - 1];
                this.button.interactable = false;
                this.startTimer(buyInTime);
            }

            this.pack = pack;
        },

        buyCarrotClicked: function () {
            this.buyCarrotView.showPopupConfirm(this.pack);
        }
    });
}).call(this);
