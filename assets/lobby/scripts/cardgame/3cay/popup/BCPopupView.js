/**
 * Created by Nofear on 6/7/2017.
 */

(function () {
    cc.BCPopupView = cc.Class({
        "extends": cc.PopupViewBase,
        properties: {
            popupAsk: cc.Node,
            nodeBuy: cc.Node,
            nodeSell: cc.Node,
            nodeBuyResult: cc.Node
        },

        onLoad: function () {
            cc.BCPopupController.getInstance().setBCPopupView(this);
            this.isOpenPopup = false;
        },
        // hien thi popup ket qua mua chuong
        showBuyResult: function (str) {
            this.onOpenPopup();
            this.nodeBuyResult.active = true;
            this.nodeBuy.active = false;
            this.nodeSell.active  = false;
            let msg = this.nodeBuyResult.getChildByName('lbResult').getComponent(cc.RichText);
            msg.string = str;
        },
        // swith node
        swithNodeAskSell: function (enable) {
            this.nodeBuy.active = enable;
            this.nodeSell.active = !enable;
        },
        // Hien thi popup hoi ban chuong
        onShowSellOwner: function () {
            this.onOpenPopup();
            this.popupAsk.getComponent(cc.Animation).play('openPopup');
            this.swithNodeAskSell(false);
            this.nodeBuyResult.active = false;
        },
        // Hien thi popup hoi ban mua chuong
        onShowBuyOwner: function (nickName, time) {
            this.onOpenPopup();

            let lbNickName = this.nodeBuy.getChildByName('lbAsk').getComponent(cc.RichText);
            lbNickName.string = nickName + " muốn bán Chương";
            let lbCountDown = this.nodeBuy.getChildByName('lbTime').getComponent(cc.Label);
            lbCountDown.string = time+"s";

            let sequenceCountTime = cc.sequence([
                cc.delayTime(1),
                cc.callFunc(function () {
                        lbCountDown.string = --time+"s";
                        if(time == 0) {
                            this.onClosePopup();
                        }
                    }.bind(this)
                )]).repeat(time);

            this.node.runAction(sequenceCountTime);


            this.swithNodeAskSell(true);

            this.nodeBuyResult.active = false;
        },
        // Click ban chuong
        onSellOwnerClick: function () {
            this.onClosePopup();
            cc.BCController.getInstance().sendRequestOnHub(cc.MethodHubName.SELL_OWNER, true);
        },
        // Click huy ban chuong
        onCancelSellOwnerClick: function () {
            this.onClosePopup();
            cc.BCController.getInstance().sendRequestOnHub(cc.MethodHubName.SELL_OWNER, false);
        },
        // Click mua chuong
        onBuyOwnerClick: function () {
            this.onClosePopup();
            cc.BCController.getInstance().sendRequestOnHub(cc.MethodHubName.BUY_OWNER);
        },
        // Dong popup
        onClosePopup: function () {
            this.isOpenPopup = false;
            this.popupAsk.getComponent(cc.Animation).play('closePopup');
            this.popupAsk.active = false;
        },
        // Mo popup
        onOpenPopup: function () {
            this.isOpenPopup = true;
            this.popupAsk.active = true;
            this.popupAsk.getComponent(cc.Animation).play('openPopup');
        }

    });
}).call(this);
