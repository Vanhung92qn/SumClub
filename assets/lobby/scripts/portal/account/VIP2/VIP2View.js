/**
 * Created by Nofear on 3/15/2019.
 */

var netConfig = require('NetConfig');

(function () {
    cc.VIP2View = cc.Class({
        "extends": cc.Component,
        properties: {
            nodePolicy: cc.Node,
            groupNodeVip: [cc.Node],
            listView: cc.VIP2ListView,

            lbLevelVip: cc.Label,
            lbVipPointNext: cc.Label,
            lbTotalVipPoint: cc.Label,
            lbCurrentVipPoint: cc.Label,
        },

        onLoad: function () {
            cc.VIPController.getInstance().setVIP2View(this);

            this.getVIPInfo();
            // if (cc.Config.getInstance().getDomainVK().includes(netConfig.HOST)) {
            //     this.getVIPInfo();
            // } else {
            //     this.getVIPInfo();
            //     this.getCardInfo();
            //     this.getLoanInfo();
            // }
            this.animation = this.node.getComponent(cc.Animation);
        },

        onEnable: function () {
            this.animation.play('openPopup');
        },

        getVIPInfo: function () {
            var getVIPInfoCommand = new cc.GetVIPInfoCommand;
            getVIPInfoCommand.execute(this);
        },

        getCardInfo: function () {
            var getVIPCardBonusCommand = new cc.GetVIPCardBonusCommand;
            getVIPCardBonusCommand.execute(this);
        },

        getLoanInfo: function () {
            var getVIPLoanInfoCommand = new cc.GetVIPLoanInfoCommand;
            getVIPLoanInfoCommand.execute(this);
        },

        onGetVIPInfoResponse: function (response) {
            var list = response.ListReWard;
            var nextLevel = 0;
            if (list !== null && list.length > 0) {
                this.listView.resetListVip();
                this.listView.initializeVip(list, response.VP);            
                for (var i = 1; i < list.length; i++) {
                    if (response.VP >= list[i].VipPoint) {
                        this.groupNodeVip[i - 1].getComponent(cc.Button).interactable = true;
                        nextLevel = i;   
                    }
                }            
                var vpNext = list[nextLevel + 1];
                if (vpNext !== null) {            
                    this.lbLevelVip.string = this.getVipRank(vpNext.RankID - 1);
                    this.lbVipPointNext.string = vpNext.VipPoint;
                }
            }
            this.lbTotalVipPoint.string = response.VP;
            this.lbCurrentVipPoint.string = response.VP;
        },

        onGetVIPCardBonusResponse: function (response) {
            this.listView.resetListCard();
            this.listView.initializeCard(response);
        },

        onGetVIPLoanInfoResponse: function (response) {
            this.listView.resetListLoan();
            this.listView.initializeLoan(response);
        },

        policyClicked: function () {
            this.nodePolicy.active = true;
        },

        //Click
        backClicked: function () {
            //this.showRegister(false);
            this.animation.play('closePopup');
            var self = this;
            var delay = 0.12;
            cc.director.getScheduler().schedule(function () {
                self.animation.stop();
                self.node.active = false;
            }, this, 1, 0, delay, false);
        },

        getVipRank: function(rankID) {
            switch (rankID) {
                case 2:
                    return "VIP2";                
                case 3:
                    return "VIP3";
                case 4:
                    return "VIP4";
                case 5:
                    return "VIP5";
                case 6:
                    return "VIP6";
                case 7:
                    return "VIP7";
                case 8:
                    return "VIP8";
                case 9:
                    return "VIP9";
                case 10:
                    return "VIP10";
                case 11:
                    return "VIP11";
                case 12:
                    return "VIP12";
                case 13:
                    return "VIP13";
                case 14:
                    return "VIP14";
                case 15:
                    return "VIP15";
                default:
                    return "VIP1";
            }
        },
    });
}).call(this);
