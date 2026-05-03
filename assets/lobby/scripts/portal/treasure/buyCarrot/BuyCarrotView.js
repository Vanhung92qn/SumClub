/**
 * Created by Nofear on 3/15/2019.
 */


(function () {
    cc.BuyCarrotView = cc.Class({
        "extends": cc.Component,
        properties: {
            itemTemplate: cc.Node,
            nodeParent: cc.Node,

            nodePopupConfirm: cc.Node,
            lbContent: cc.Label,
        },

        onLoad: function() {
            cc.TreasureController.getInstance().setBuyCarrotView(this);

            this.node.zIndex = cc.NoteDepth.POPUP_PORTAL;
            this.animation = this.node.getComponent(cc.Animation);
            this.animationPopup = this.nodePopupConfirm.getComponent(cc.Animation);

            this.responsePack = null;
        },

        onEnable: function () {
            this.animation.play('openPopup');

            if (this.responsePack === null) {
                this.refreshPack();
            }
        },

        refreshPack: function () {
            this.nodeParent.removeAllChildren();
            var treasureGetCarrotBuyPackageCommand = new cc.TreasureGetCarrotBuyPackageCommand;
            treasureGetCarrotBuyPackageCommand.execute(this);
        },

        createDailyBonusItem: function (pack, buyInTime) {
            var node = cc.instantiate(this.itemTemplate);
            node.getComponent(cc.CarrotPackageItem).updatePack(pack, buyInTime);
            this.nodeParent.addChild(node);
        },

        showPopupConfirm: function (pack) {
            this.package = pack;

            this.lbContent.string = 'BẠN MUỐN MUA GÓI ' + cc.Tool.getInstance().formatNumber(pack.Quantity)
            + ' CÀ RỐT\nVỚI GIÁ ' + cc.Tool.getInstance().formatNumber(pack.Price);

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

        onTreasureGetCarrotBuyPackageResponse: function (response) {
            var self = this;
            var list = response.List;
            list.forEach(function (pack) {
                self.createDailyBonusItem(pack, response.BuyInTime);
            });
        },

        onTreasureBuyCarrotResponse: function (response) {
            // {"ResponseCode":1,"Carrot":1000,"Balance":9957776280}
            cc.TreasureController.getInstance().updateCarrot(response.Carrot);

            //thong bao
            cc.PopupController.getInstance().showMessage('Mua cà rốt thành công.');

            this.refreshPack();

            cc.LobbyController.getInstance().refreshAccountInfo();

            cc.DDNA.getInstance().logEventTreasureBuy(this.package.Price, this.package.Quantity, cc.DDNARewardType.CARROT);
            // cc.DDNA.getInstance().buyCarrot(this.package.Price, this.package.Quantity);
        },

        confirmBuyClicked: function () {
            var treasureBuyCarrotCommand = new cc.TreasureBuyCarrotCommand;
            treasureBuyCarrotCommand.execute(this);

            this.closePopupConfirm();
        },

        cancelBuyClicked: function () {

            this.closePopupConfirm();
        },

        closeClicked: function () {
            //this.showRegister(false);
            this.animation.play('closePopup');
            var self = this;
            var delay = 0.12;
            cc.director.getScheduler().schedule(function () {
                self.animation.stop();
                cc.LobbyController.getInstance().destroyBuyCarrotView();
            }, this, 1, 0, delay, false);
        },

    });
}).call(this);
