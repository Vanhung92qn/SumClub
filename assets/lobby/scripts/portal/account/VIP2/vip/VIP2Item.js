/**
 * Created by Nofear on 3/15/2019.
 */

(function () {
    cc.VIP2Item = cc.Class({
        "extends": cc.Component,
        properties: {
            lbTitle: cc.Label,
            lbThuong: cc.Label,
            lbRewards: [cc.Label],

            //progress: cc.ProgressBar,
            lbCurrentVP: cc.Label,

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

        updateItem: function (item, currentVP) {
            // var loginResponse = cc.LoginController.getInstance().getLoginResponse();

            var vip = item.RankID;
            var reward = item.RefundAmount;

            this.reward = item.RefundAmount; //luu lai reward

            var nextVP = item.VipPoint;

            // if (nextVP === 0) {
            //     var progress = 1;
            //     var percentProgress = 100;
            // } else {
            //     progress = Math.min(currentVP / nextVP, 1);
            //     percentProgress = Math.min(Math.floor(progress * 100), 100);
            // }

            // var vpStr = cc.Tool.getInstance().formatNumber(Math.min(currentVP, nextVP))
            //     + '/' + cc.Tool.getInstance().formatNumber(nextVP) + ' VP'; //???

            this.lbTitle.string = 'VIP ' + vip;

            //this.progress.progress = progress;

            this.lbCurrentVP.string = cc.Tool.getInstance().formatNumber(nextVP);
            this.lbThuong.string = cc.Tool.getInstance().formatNumber(reward);

            //set icon UI tuong ung
            //this.spriteIcon.spriteFrame = cc.AccountController.getInstance().getIcon(item.RankID);

            // if (item.RankID === 5) {
            //     this.nodeClaim.active = false;
            //     this.btnClaim.interactable = false;
            // } else {
                if (item.RedeemStatus === cc.VIPRedeemStatus.RECEIVED) {
                    this.nodeClaim.active = true;
                    for (var i = 0; i < this.lbRewards.length; i++) {
                        this.lbRewards[i].string = 'Đã nhận';
                    }
                    this.btnClaim.interactable = false;
                } else {
                    //hien thi nut nhan
                    if (currentVP >= nextVP) {
                        this.nodeClaim.active = true;
                        for (var i = 0; i < this.lbRewards.length; i++) {
                            this.lbRewards[i].string = "Nhận";
                        }
                        this.btnClaim.interactable = true;
                    }
                    //chua dat yeu cau -> tat nut nhan
                    else {
                        this.nodeClaim.active = true;
                        for (var i = 0; i < this.lbRewards.length; i++) {
                            this.lbRewards[i].string = "Nhận";
                        }
                        this.btnClaim.interactable = false;
                    }
                }
            // }


            this.item = item;
        },

        onChangeVPToGifResponse: function (response) {
            cc.PopupController.getInstance().hideBusy();
            cc.PopupController.getInstance().showMessage(response.Message);

            this.nodeClaim.active = true;
            for (var i = 0; i < this.lbRewards.length; i++) {
                this.lbRewards[i].string = 'Đã nhận';
            }
            this.nodeClaim.getComponent(cc.Button).interactable = false;

            cc.LobbyController.getInstance().refreshAccountInfo();
            cc.VIPController.getInstance().getVIPInfo(); //lay lai thong tin VIP

            cc.DDNA.getInstance().claimVIP(this.reward);
        },

        //click
        claimClicked: function () {
            cc.PopupController.getInstance().showBusy();
            var ChangeVPToGifCommand = new cc.ChangeVPToGifCommand;
            ChangeVPToGifCommand.execute(this, this.item.RankID);
        },
    });
}).call(this);
