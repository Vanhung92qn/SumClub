/**
 * Created by Nofear on 3/14/2019.
 */

(function () {
    cc.ShopTopupView = cc.Class({
        "extends": cc.Component,
        properties: {
            nodeCard: cc.Node,
            nodeBank: cc.Node,
            nodeMoMo: cc.Node,
            nodeSMS: cc.Node,
            nodeLoan: cc.Node,
            nodeUSDT: cc.Node,
            nodeTabCard: cc.Node,
            nodeTabLoanNoBank: cc.Node, //tab Loan khi ko co NH
            nodeTabLoanHaveBank: cc.Node, //tab Loan co Bank
            nodeTabBank: cc.Node,

            nodeTransfer: cc.Node,
            nodeRedeemReward: cc.Node,

            nodeBusy: cc.Node,

            lbCardBonus: cc.Label,
            nodeViettelPay: cc.Node,
            nodeCodePay: cc.Node,
            audioClick: cc.AudioSource,
        },

        // use this for initialization
        onLoad: function () {
            cc.ShopController.getInstance().setShopTopupView(this);
            this.nodeTabActive = this.nodeCard;
            this.currentTab = cc.ShopTab.TOPUP;
            this.node.zIndex = cc.NoteDepth.POPUP_PORTAL;
            this.animation = this.node.getComponent(cc.Animation);

            this.nodeTabCard.active = true;
            this.nodeTabLoanNoBank.active = false;
            this.nodeTabLoanHaveBank.active = false;
            this.nodeTabBank.active = true;
            this.nodeTransfer.active = false;
            this.nodeRedeemReward.active = false;
            this.nodeViettelPay.active = false;
            this.nodeCodePay.active = false;
            this.nodeUSDT.active = false;

            // if (cc.Config.getInstance().getServiceId() === cc.ServiceId.BLOCK_BUSTER_2
            //     || cc.Config.getInstance().getServiceId() === cc.ServiceId.BLOCK_BUSTER_3) {
            //     this.nodeTabBank.active = true;
            //     this.nodeTabLoanNoBank.active = false;
            //     this.nodeTabLoanHaveBank.active = true;
            // } else {
            //     this.nodeTabBank.active = false;
            //     this.nodeTabLoanNoBank.active = true;
            //     this.nodeTabLoanHaveBank.active = false;
            // }
        },

        // onEnable: function () {
        //     this.animation.play('openPopup');
        //     var startTab = cc.Tool.getInstance().getItem('@startShopTab');
        //     var self = this;
        //     cc.director.getScheduler().schedule(function () {
        //         self.activeTopupTab(startTab);
        //     }, this, 0, 0, 0.3, false);

        //     this.getTotalCardBonus();
        // },
        onEnable: function () {
            this.animation.play('openPopup');
            
            // Đặt tab khởi tạo là CODEPAY
            var startTab = cc.ShopTab.CODEPAY; 
        
            var self = this;
            cc.director.getScheduler().schedule(function () {
                self.activeTopupTab(startTab);
            }, this, 0, 0, 0.3, false);
        
            this.getTotalCardBonus();
        },

        changeTabClicked: function (event, data) {
            if (data.toString() === this.currentTab) return;
            this.activeTopupTab(data.toString());
            this.audioClick.loop = false;
            this.audioClick.play();
            cc.DDNA.getInstance().uiInteraction(cc.DDNAUILocation.SHOP, data.toString(), cc.DDNAUIType.BUTTON);
        },

        activeTopupTab(tabName, nickName) {
            if (nickName === undefined) {
                cc.Tool.getInstance().setItem('@nickNameAgency', '');
            } else {
                cc.Tool.getInstance().setItem('@nickNameAgency', nickName);
            }

            this.nodeTabActive.active = false;
            switch (tabName) {
                case cc.ShopTab.TOPUP:
                    this.nodeTabActive = this.nodeCard;
                    break;
                case cc.ShopTab.BANK:
                    this.nodeTabActive = this.nodeBank;
                    break;
                case cc.ShopTab.LOAN:
                    this.nodeTabActive = this.nodeLoan;
                    break;
                case cc.ShopTab.MOMO:
                    this.nodeTabActive = this.nodeMoMo;
                    break;
                case cc.ShopTab.SMS:
                    this.nodeTabActive = this.nodeSMS;
                    break;
                case cc.ShopTab.TRANSFER:
                    this.nodeTabActive = this.nodeTransfer;
                    break;
                case cc.ShopTab.REDEEM_REWARD:
                    this.nodeTabActive = this.nodeRedeemReward;
                    break;
                case cc.ShopTab.VIETTEL_PAY:
                    this.nodeTabActive = this.nodeViettelPay;
                    break;
                case cc.ShopTab.CODEPAY:
                    this.nodeTabActive = this.nodeCodePay;
                    break;
                case cc.ShopTab.USDT:
                    this.nodeTabActive = this.nodeUSDT;
                    break;
            }
            this.nodeTabActive.active = true;

            this.currentTab = tabName;
        },

        getTotalCardBonus: function () {
            var getTotalCardBonusCommand = new cc.GetTotalCardBonusCommand;
            getTotalCardBonusCommand.execute(this);
        },
		 clicklichsugiaodich: function () {
            if (cc.LoginController.getInstance().checkLogin()) {
                cc.LobbyController.getInstance().createHistoryView(cc.HistoryTab.BANK);
                cc.DDNA.getInstance().uiInteraction(cc.DDNAUILocation.PORTAL, 'SETTING_HISTORY', cc.DDNAUIType.BUTTON);
                this.audioClick.loop = false;
                this.audioClick.play(); 
            }
        },
		 clicklichsunapthe: function () {
            if (cc.LoginController.getInstance().checkLogin()) {
                cc.LobbyController.getInstance().createHistoryView(cc.HistoryTab.TOPUP);
                cc.DDNA.getInstance().uiInteraction(cc.DDNAUILocation.PORTAL, 'SETTING_HISTORY', cc.DDNAUIType.BUTTON);
                this.audioClick.loop = false;
                this.audioClick.play();
            }
        },

        onGetTotalCardBonusResponse: function (obj) {
            if (this.lbCardBonus) {
                this.lbCardBonus.string = obj.TotalCard;
                if (this.totalCard !== undefined) {
                    //refresh lai list card khi so the cao khuyen mai tư 1 -> 0
                    if (this.totalCard === 1 && obj.TotalCard === 0) {
                        cc.TopupController.getInstance().refreshListCard();
                    }
                    this.totalCard = obj.TotalCard;
                } else {
                    //lan dau tien chua co -> set du lieu
                    this.totalCard = obj.TotalCard;
                }
            }
        },
		 tienaoclick: function () {
                cc.PopupController.getInstance().showMessage('Tính năng sẽ sớm ra mắt');
        },

        showShopBusy: function () {
            this.nodeBusy.active = true;
        },

        hideShopBusy: function () {
            if (this.nodeBusy)
                this.nodeBusy.active = false;
        },

        closeClicked: function () {
            //this.showRegister(false);
            this.animation.play('closePopup');
            var self = this;
            var delay = 0.12;
            cc.director.getScheduler().schedule(function () {
                self.animation.stop();
                cc.LobbyController.getInstance().destroyShopTopupView();
                this.audioClick.loop = false;
                this.audioClick.play();
            }, this, 1, 0, delay, false);
        }

    });
}).call(this);
