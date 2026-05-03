/**
 * Created by Nofear on 3/15/2019.
 */


(function () {
    cc.TreasureGiftView = cc.Class({
        "extends": cc.Component,
        properties: {
            itemTemplate: cc.Node,
            nodeParent: cc.Node,

            nodePopupConfirm: cc.Node,
            spritePopupLogo: cc.Sprite,
            spritePopupIcon: cc.Sprite,
            lbPopupTitle: cc.Label,
            lbPopupItem: cc.Label,
            lbPopupPrize: cc.Label,
            lbPopupPrizeInGame: cc.Label,
            lbLevel: cc.Label,
            lvProgress: cc.ProgressBar,
        },

        onLoad: function() {
            cc.TreasureController.getInstance().setGiftView(this);

            this.node.zIndex = cc.NoteDepth.POPUP_PORTAL;
            this.animation = this.node.getComponent(cc.Animation);
            this.animationPopup = this.nodePopupConfirm.getComponent(cc.Animation);

            this.responsePack = null;
        },

        onEnable: function () {
            this.animation.play('openPopup');

            if (this.responsePack === null) {
                var delay = 0.12;
                var self = this;
                cc.director.getScheduler().schedule(function () {
                    self.refreshPack();
                }, this, 1, 0, delay, false);
            }
        },

        refreshPack: function () {
            this.nodeParent.removeAllChildren();
            var treasureGetCarrotGiftCommand = new cc.TreasureGetCarrotGiftCommand;
            treasureGetCarrotGiftCommand.execute(this);
        },

        createGiftItem: function (pack, maxHP) {
            var node = cc.instantiate(this.itemTemplate);
            node.getComponent(cc.TreasureGiftItem).updatePack(pack, maxHP);
            this.nodeParent.addChild(node);
        },

        showPopupConfirm: function (pack, controller) {
            this.package = pack;

            this.spritePopupLogo.spriteFrame = controller.spriteLogo.spriteFrame;
            this.spritePopupIcon.spriteFrame = controller.spriteIcon.spriteFrame;

            this.lbPopupTitle.string = 'KHO BÁU SỐ ' + pack.GiftID;
            this.lbPopupItem.string = controller.lbTitle.string;
            this.lbPopupPrize.string = controller.lbPrize.string;
            this.lvProgress.progress = controller.levelProgress.progress;

            this.lbLevel.string = 'ĐỘ KHÓ: ' + cc.Tool.getInstance().formatNumber(pack.BloodMonster);

            this.lbPopupPrizeInGame.string = cc.Tool.getInstance().formatNumber(
                cc.TreasureController.getInstance().getTreasureInfoResponse().CarrotTreasurePrize.PrizeValue
            );

            this.nodePopupConfirm.active = true;
            this.animationPopup.play('openPopup');
        },

        closePopupConfirm: function () {
            this.animationPopup.play('closePopup');
            var self = this;
            var delay = 0.12;
            cc.director.getScheduler().schedule(function () {
                self.animation.stop();
                self.nodePopupConfirm.active = false;
            }, this, 1, 0, delay, false);
        },

        onTreasureGetCarrotGiftResponse: function (response) {
            var self = this;
            var list = response.List;

            var maxHP = 0;

            list.forEach(function (pack) {
                if (pack.BloodMonster > maxHP) {
                    maxHP = pack.BloodMonster;
                }
            });

            list.forEach(function (pack) {
                self.createGiftItem(pack, maxHP);
            });
        },

        onTreasureCarrotUserGiftChooseResponse: function (response) {
            // {"ResponseCode":1,"Carrot":1000,"Balance":9957776280}

            // //set lai phan thuong da pick o bang PRIZE
            // cc.TreasureController.getInstance().initPrize(null, this.package.GiftID - 1);
            //
            // //thong bao
            // cc.PopupController.getInstance().showMessage(response.Message);
            //
            // //hien thi boss
            // cc.TreasureController.getInstance().showBoss();

            cc.TreasureController.getInstance().sendRequestOnHub(cc.MethodHubName.TREASURE_GET_CARROT_USER_INFO);

            //tat popup chon kho bau
            cc.LobbyController.getInstance().destroyTreasureGiftView();
        },

        confirmClicked: function () {
            var treasureCarrotUserGiftChooseCommand = new cc.TreasureCarrotUserGiftChooseCommand;
            treasureCarrotUserGiftChooseCommand.execute(this);



            this.closePopupConfirm();
        },

        cancelClicked: function () {

            this.closePopupConfirm();
        },

        closeClicked: function () {
            //this.showRegister(false);
            this.animation.play('closePopup');
            var self = this;
            var delay = 0.12;
            cc.director.getScheduler().schedule(function () {
                self.animation.stop();
                cc.LobbyController.getInstance().destroyTreasureGiftView();
            }, this, 1, 0, delay, false);
        },

    });
}).call(this);
