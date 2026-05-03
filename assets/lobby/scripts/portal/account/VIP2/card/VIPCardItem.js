/**
 * Created by Nofear on 3/15/2019.
 */

(function () {
    cc.VIPCardItem = cc.Class({
        "extends": cc.Component,
        properties: {
            spriteIcon: cc.Sprite,
            lbTitle: cc.Label,
            lbVP: cc.Label,
            lbRewards: [cc.Label],

            progress: cc.ProgressBar,
            lbProgress: cc.Label,

            nodeClaim: cc.Node,
        },

        onLoad: function () {
            this.spriteBG = this.node.getComponent(cc.Sprite);
            this.btnClaim = this.nodeClaim.getComponent(cc.Button);
            this.vipAssets = cc.AccountController.getInstance().getVipAssets();
        },

        updateIndex: function (itemID) {
            if (itemID % 2 === 0) {
                this.spriteBG.spriteFrame = this.vipAssets.sfBgs[0];
            } else {
                this.spriteBG.spriteFrame = this.vipAssets.sfBgs[1];
            }
        },

        updateItem: function (item, cardStatus) {
            // var loginResponse = cc.LoginController.getInstance().getLoginResponse();

            var countCardBonus = item.CardVpPeriodBonus; //so thẻ đã nhận

            this.lbTitle.string = 'Khuyến mại 25% thẻ cào';

            if (countCardBonus > 0) {
                for (var i = 0; i < this.lbRewards.length; i++) {
                    this.lbRewards[i].string = countCardBonus + ' thẻ cào';
                }
            } else {
                for (var i = 0; i < this.lbRewards.length; i++) {
                    this.lbRewards[i].string = countCardBonus + ' thẻ cào';
                }
                // for (var i = 0; i < this.lbRewards.length; i++) {
                //     this.lbRewards[i].string = 'Chưa đủ điều kiện';
                // }
            }


            this.nodeClaim.active = true;

            switch (cardStatus) {
                case  cc.VIPCardStatus.VALID_NOT_RECEIVED: //the dang tich luy (chua nhan)
                    var vpStr = cc.Tool.getInstance().formatNumber(item.PointAcc) + '/' + cc.Tool.getInstance().formatNumber(item.CardVpPeriod) + ' VP';
                    // var progress = item.Percent / 100;
                    // var percentProgress = item.Percent;

                    var progress = Math.min(item.PointAcc / item.CardVpPeriod, 1);
                    var percentProgress = Math.min(Math.floor(progress * 100), 100);

                    this.btnClaim.interactable = false;
                    break;
                case  cc.VIPCardStatus.RECEIVED: //da nhan
                    var vpStr = '1.000/1.000' + ' VP';
                    var progress = 1;
                    var percentProgress = 100;
                    this.btnClaim.interactable = false;
                    break;
                case  cc.VIPCardStatus.NOT_YET_RECEIVED_TIME: //dang cho de nhan
                    var vpStr = cc.Tool.getInstance().formatNumber(item.CardVpPeriod) + '/' + cc.Tool.getInstance().formatNumber(item.CardVpPeriod) + ' VP';
                    var progress = 1;
                    var percentProgress = 100;
                    this.btnClaim.interactable = true;
                    break;

            }

            this.progress.progress = progress;
            this.lbProgress.string = percentProgress + '%';
            this.lbVP.string = vpStr;

            this.item = item;
        },

        onVIPCardBonusReceiveResponse: function (info) {
            cc.PopupController.getInstance().hideBusy();
            cc.PopupController.getInstance().showMessage(info.Message);
            cc.VIPController.getInstance().getCardInfo();
        },

        //click
        claimClicked: function () {
            // cc.LobbyController.getInstance().destroyAccountView();
            // cc.LobbyController.getInstance().createShopView(cc.ShopTab.TOPUP);
            cc.PopupController.getInstance().showBusy();
            var VIPCardBonusReceiveCommand = new cc.VIPCardBonusReceiveCommand;
            VIPCardBonusReceiveCommand.execute(this);
        },

    });
}).call(this);
