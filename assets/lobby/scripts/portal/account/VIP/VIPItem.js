/**
 * Created by Nofear on 3/15/2019.
 */

// var VIPMaps = require('VIPMaps');

(function () {
    cc.VIPItem = cc.Class({
        "extends": cc.Component,
        properties: {
            spriteIcon: cc.Sprite,
            lbRank: cc.Label,
            lbVipPoint: cc.Label,
            lbReward: cc.Label,
            lbReceive: cc.Label,
            // nodeMarkClaim: cc.Node,
            nodeClaim: cc.Node,

            sfBgs: [cc.SpriteFrame]
        },

        onLoad: function () {
            this.spriteBG = this.node.getComponent(cc.Sprite);
        },

        initItem: function (index, item, currentVP) {
            // var loginResponse = cc.LoginController.getInstance().getLoginResponse();

            if (index % 2 === 0) {
                this.spriteBG.spriteFrame = this.sfBgs[0];
            } else {
                this.spriteBG.spriteFrame = this.sfBgs[1];
            }

            //luu lai item
            this.item = item;
            //set icon UI tuong ung
            this.spriteIcon.spriteFrame = cc.AccountController.getInstance().getIcon(item.RankID);
            //set rank name
            this.lbRank.string = item.RankName;
            //set vipPoint
            this.lbVipPoint.string = cc.Tool.getInstance().formatNumber(item.VipPoint);
            //set reward
            this.lbReward.string = cc.Tool.getInstance().formatNumber(item.RefundAmount);

            this.reward = item.RefundAmount; //luu lai reward

            //Check xem co the nhan phan thuong nao?
            //bo qua rank ban dau
            if (item.RankID === 5) {
                this.lbReceive.string = '-';
                this.nodeClaim.active = false;
                // this.nodeMarkClaim.active = true;
            } else {
                //co the nhan duoc
                if (currentVP >= item.VipPoint) {
                    //da nhan
                    if (item.RedeemStatus === cc.VIPRedeemStatus.RECEIVED) {
                        this.lbReceive.string = 'Đã nhận';
                        this.nodeClaim.active = false;
                        // this.nodeMarkClaim.active = true;
                        //chua nhan
                    } else {
                        this.nodeClaim.active = true;
                        this.nodeClaim.getComponent(cc.Button).interactable = true;
                        // this.nodeMarkClaim.active = false; //da nhan chua
                    }
                } else {
                    //chua du VP
                    this.nodeClaim.active = true;
                    this.nodeClaim.getComponent(cc.Button).interactable = false;
                    // this.nodeMarkClaim.active = false;
                }
            }
        },

        onChangeVPToGiftResponse: function (response) {
            cc.PopupController.getInstance().showMessage(response.Message);

            this.nodeClaim.active = false;
            this.nodeClaim.getComponent(cc.Button).interactable = false;
            this.lbReceive.string = 'Đã nhận';
            // this.nodeMarkClaim.active = true; //da nhan chua
            this.item.RedeemStatus = cc.VIPRedeemStatus.RECEIVED;

            cc.LobbyController.getInstance().refreshAccountInfo();

            cc.DDNA.getInstance().claimVIP(this.reward);
        },

        //click
        claimClicked: function () {
            var changeVPToGiftCommand = new cc.ChangeVPToGiftCommand;
            changeVPToGiftCommand.execute(this);
        }
    });
}).call(this);
