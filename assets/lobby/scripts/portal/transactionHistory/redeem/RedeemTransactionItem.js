/**
 * Created by Nofear on 3/15/2019.
 */


(function () {
    cc.RedeemTransactionItem = cc.Class({
        "extends": cc.Component,
        properties: {
            lbTime: cc.Label,
            lbCardType: cc.Label, //Loai the
            lbCardValue: cc.Label, //Menh gia
            lbValue: cc.Label, //B Doi
            lbState: cc.Label, //Trang Thai

            nodeButtonOpen: cc.Node,
            nodeButtonCancel: cc.Node,
        },

        onLoad: function () {
            // this.sprite = this.node.getComponent(cc.Sprite);

            this.lbValue.node.color = cc.Color.YELLOW;
            this.lbCardValue.node.color = cc.Color.YELLOW;
        },

        updateItem: function(item, itemID) {
            // this.sprite.enabled = itemID % 2 === 0;
            this.lbTime.string = cc.Tool.getInstance().convertUTCTime(item.BuyDate);
            this.lbCardType.string = cc.Config.getInstance().getCardTypeByCode(item.TelOperatorCode);
            this.lbCardValue.string = cc.Tool.getInstance().formatNumber(item.CardValue);
            this.lbValue.string = cc.Tool.getInstance().formatNumber(item.BitExchange);
            this.lbState.string = item.StatusStr;

            switch (item.Status.toString()) {
                case cc.RedeemState.SUCCESS:
                    this.nodeButtonOpen.active = true;
                    this.nodeButtonCancel.active = false;
                    break;
                case cc.RedeemState.PENDING:
                    this.nodeButtonOpen.active = false;
                    this.nodeButtonCancel.active = true;
                    break;
                case cc.RedeemState.CANCEL:
                    this.nodeButtonOpen.active = false;
                    this.nodeButtonCancel.active = false;
                    break;
            }

            this.item = item;
            this.itemID = itemID;
        },

        onCancelCardResponse: function (response) {
            cc.PopupController.getInstance().hideBusy();
            cc.PopupController.getInstance().showMessage(response.Message);
            //refresh lại list
            cc.HistoryController.getInstance().refreshRedeemTransactionList();
        },

        onCancelCardResponseError: function (response) {
            cc.PopupController.getInstance().hideBusy();
            cc.PopupController.getInstance().showMessageError(response.Message, response.ResponseCode);
        },

        openInboxClicked: function () {
            cc.LobbyController.getInstance().createAccountView(cc.AccountTab.INBOX);
        },

        //huy doi the
        cancelClicked: function () {
            cc.PopupController.getInstance().showBusy();
            var cancelCardCommand = new cc.CancelCardCommand;
            cancelCardCommand.execute(this, this.item.UserCardSwapID);
        },
    });
}).call(this);
