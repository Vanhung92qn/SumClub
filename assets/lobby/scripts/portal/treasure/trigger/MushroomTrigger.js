/**
 * Created by Nofear on 3/15/2019.
 */


(function () {
    cc.MushroomTrigger = cc.Class({
        "extends": cc.Component,
        properties: {
            spriteItem: cc.Sprite,
        },

        onLoad: function() {
            this.spaceMR = 125; //khoang cach giua cac MR
            this.totalMR = 50;

            this.sprite = this.node.getComponent(cc.Sprite);

            this.treasureImage = cc.TreasureController.getInstance().getTreasureImage();
            this.sprite.spriteFrame = this.treasureImage.sfMushrooms[0];

            this.isSetValue = false;
            // this.isEnabled = false;
        },

        // use this for initialization
        onEnable: function () {
            cc.director.getCollisionManager().enabled = true;
            // cc.director.getCollisionManager().enabledDebugDraw = true;

            this.randomItem();
            cc.TreasureController.getInstance().hardResetMushroom();

            // console.log('onEnable randomItem');
        },

        onDisable: function () {
            // cc.director.getCollisionManager().enabled = false;
            // cc.director.getCollisionManager().enabledDebugDraw = false;
        },

        randomItem: function () {
            //nếu đã set giá trị cuối rồi -> ko cần random nữa
            if (this.isSetValue) return;

            // console.log('randomItem: ' + this.node.name);

            const ran = Math.floor(Math.random() * 100) + 1; //1->100
            if (ran < 10) {
                this.showItemDemo(cc.TreasureItemType.CARROT);
            } else if (ran < 40) {
                this.showItemDemo(cc.TreasureItemType.COIN);
            } else {
                //ko hien
                this.hideItemDemo();
            }
        },

        hardResetItemDemo: function () {
            // console.log('hardResetItemDemo: ' + this.node.name);
            this.isSetValue = false;
            this.hideItemDemo()
        },

        resetItemDemo: function () {
            // console.log('resetItemDemo: ' + this.node.name);
            if (this.isSetValue) {
                this.isSetValue = false;
                this.hideItemDemo()
            }
        },

        setItemDemo: function (itemType) {
            // console.log('setItemDemo: ' + this.node.name);
            this.isSetValue = true; //đánh dấu đã set giá trị cuối
            this.showItemDemo(itemType);
        },

        showItemDemo: function (itemType) {
            if (itemType === cc.TreasureItemType.NOTHING) {
                this.spriteItem.node.active = false;
            } else {
                if (this.treasureImage === undefined) {
                    this.treasureImage = cc.TreasureController.getInstance().getTreasureImage();
                }

                switch (itemType) {
                    case cc.TreasureItemType.CARROT:
                        this.spriteItem.spriteFrame = this.treasureImage.sfItems[0];
                        break;
                    case cc.TreasureItemType.COIN:
                        this.spriteItem.spriteFrame = this.treasureImage.sfItems[1];
                        break;
                    case cc.TreasureItemType.CHEST:
                        this.spriteItem.spriteFrame = this.treasureImage.sfItems[2];
                        break;
                    case cc.TreasureItemType.GOLDEN_CHEST:
                        this.spriteItem.spriteFrame = this.treasureImage.sfItems[3];
                        break;
                }

                this.spriteItem.node.active = true;
            }
        },

        hideItemDemo: function () {
            this.spriteItem.node.active = false;
        },

        onCollisionEnter: function (other, self) {
            if (other.node.name === 'bunny') {
                this.sprite.spriteFrame = this.treasureImage.sfMushrooms[2];
                // if (this.isEnabled) {
                //     this.isEnabled = false;
                //     this.hideItemDemo();
                // }
                // console.log('bunny onCollisionEnter: ' + this.node.name);
            } else {
                self.node.x += (this.spaceMR * this.totalMR);
                this.sprite.spriteFrame = this.treasureImage.sfMushrooms[0];
                //nấm set lại vị trí -> random lại
                this.randomItem();
            }
        },

        onCollisionExit: function (other, self) {
            if (other.node.name === 'bunny') {
                this.sprite.spriteFrame = this.treasureImage.sfMushrooms[1];
            }
        }
    });
}).call(this);
