/**
 * Created by Nofear on 3/15/2019.
 */

(function () {
    cc.TreasureChestView = cc.Class({
        "extends": cc.Component,
        properties: {
            nodeChest: cc.Node,
            skeChest: sp.Skeleton,
            skeGoldenChest: sp.Skeleton,
        },

        onLoad: function () {
            cc.TreasureController.getInstance().setTreasureChestView(this);
            this.animation = this.node.getComponent(cc.Animation);
            this.btnChest = this.skeChest.node.getComponent(cc.Button);
            this.btnGoldenChest = this.skeGoldenChest.node.getComponent(cc.Button);
        },

        playFx: function (chestType, prize, carrot) {
            this.chestType = chestType;
            this.prize = prize;
            this.carrot = carrot;

            this.nodeChest.active = true;
            this.skeChest.node.active = false;
            this.skeGoldenChest.node.active = false;

            //chay animation chest
            switch (this.chestType) {
                case cc.TreasureChestType.CHEST:
                    this.skeChest.clearTracks();
                    this.skeChest.setToSetupPose();
                    this.skeChest.timeScale = 1;
                    this.skeChest.setAnimation(1, 'animation2', true);
                    this.skeChest.node.active = true;
                    this.ske = this.skeChest;
                    this.btnChest.interactable = true;
                    break;
                case cc.TreasureChestType.GOLDEN_CHEST:

                    this.skeGoldenChest.clearTracks();
                    this.skeGoldenChest.setToSetupPose();
                    this.skeGoldenChest.timeScale = 1;
                    this.skeGoldenChest.setAnimation(1, 'animation2', true);
                    this.skeGoldenChest.node.active = true;
                    this.ske = this.skeGoldenChest;
                    this.btnGoldenChest.interactable = true;
                    break;
            }

            this.animation.play('showChest');
        },

        openChestClicked: function () {
            var self = this;


            //chay animation chest
            switch (this.chestType) {
                case cc.TreasureChestType.CHEST:
                    this.skeChest.clearTracks();
                    this.skeChest.setToSetupPose();
                    this.skeChest.timeScale = 0.8;
                    this.skeChest.setAnimation(0, 'animation', false);
                    this.skeChest.node.active = true;
                    this.ske = this.skeChest;
                    this.btnChest.interactable = false;
                    break;
                case cc.TreasureChestType.GOLDEN_CHEST:

                    this.skeGoldenChest.clearTracks();
                    this.skeGoldenChest.setToSetupPose();
                    this.skeGoldenChest.timeScale = 0.8;
                    this.skeGoldenChest.setAnimation(0, 'animation', false);
                    this.skeGoldenChest.node.active = true;
                    this.ske = this.skeGoldenChest;
                    this.btnGoldenChest.interactable = false;
                    break;
            }

            var delay = 1500;
            //coin
            if (this.prize > 0) {
                setTimeout(function () {
                    cc.TreasureItemController.getInstance().createNode(
                        null,
                        cc.TreasureItemType.COIN,
                        self.prize, self.ske.node);
                }, delay);
                delay += 1500;
            }
            //carrot
            if (this.carrot > 0) {
                setTimeout(function () {
                    cc.TreasureItemController.getInstance().createNode(
                        null,
                        cc.TreasureItemType.CARROT,
                        self.carrot, self.ske.node);
                }, delay);
            }

            setTimeout(function () {
                cc.TreasureController.getInstance().addCarrot(self.carrot);
                cc.LobbyController.getInstance().refreshAccountInfo();

                //bat lai button SPIN
                cc.TreasureController.getInstance().activeButtonSpin();

                var treasureId = cc.TreasureController.getInstance().getTreasureId();

                //sau khi BOSS ruong 4, 8, 12 chet goi lai getInfo
                if (treasureId === 4 || treasureId === 8 || treasureId === 12) {
                    cc.TreasureController.getInstance().sendRequestOnHub(cc.MethodHubName.TREASURE_GET_CARROT_USER_INFO);
                    self.nodeChest.active = false;
                } else {
                    //neu nhan ruong thuong -> chi can tat effect
                    self.nodeChest.active = false;
                }

                cc.TreasureController.getInstance().increUIChest();

            }, 4400);
        },
    });
}).call(this);
