/**
 * Created by Nofear on 3/14/2019.
 */

(function () {
    cc.ShopTopupView = cc.Class({
        "extends": cc.Component,
        properties: {
            nodeChonNapTien: cc.Node, // menu chon loai nap

            nodeCodePay: cc.Node,     // Nap ngan hang (CODEPAY)
            nodeMoMo: cc.Node,        // Nap vi dien tu (momoView)
            nodeCard: cc.Node,        // Nap the dien thoai (topupView)
            nodeGiftcode: cc.Node,    // Nap giftcode
            nodeUSDT: cc.Node,        // Nap tien ao (TienAOUSDT)

            nodeBusy: cc.Node,
            lbCardBonus: cc.Label,
            audioClick: cc.AudioSource,
        },

        onLoad: function () {
            cc.ShopController.getInstance().setShopTopupView(this);
            this.node.zIndex = cc.NoteDepth.POPUP_PORTAL;
            this.animation = this.node.getComponent(cc.Animation);

            this.nodeCodePay.active = false;
            this.nodeMoMo.active = false;
            this.nodeCard.active = false;
            this.nodeGiftcode.active = false;
            this.nodeUSDT.active = false;
            this.nodeChonNapTien.active = true;

            this.nodeTabActive = this.nodeChonNapTien;
            this.currentTab = 'MENU';
        },

        onEnable: function () {
            this.animation.play('openPopup');
            this.showChonNapTien();
        },

        // Hien menu chon loai nap, an cac tab con
        showChonNapTien: function () {
            if (this.nodeTabActive) this.nodeTabActive.active = false;
            this.nodeChonNapTien.active = true;
            this.nodeTabActive = this.nodeChonNapTien;
            this.currentTab = 'MENU';
        },

        activeTopupTab: function (tabName) {
            this.nodeTabActive.active = false;
            switch (tabName) {
                case 'CODEPAY':
                    this.nodeTabActive = this.nodeCodePay;
                    break;
                case 'MOMO':
                    this.nodeTabActive = this.nodeMoMo;
                    break;
                case 'TOPUP':
                    this.nodeTabActive = this.nodeCard;
                    break;
                case 'GIFTCODE':
                    this.nodeTabActive = this.nodeGiftcode;
                    break;
                case 'USDT':
                    this.nodeTabActive = this.nodeUSDT;
                    break;
            }
            this.nodeTabActive.active = true;
            this.currentTab = tabName;
            this.audioClick.loop = false;
            this.audioClick.play();
        },

        // Click cac icon tren menu chon nap tien
        napNganHangClicked: function () {
            this.activeTopupTab('CODEPAY');
        },

        napViDienTuClicked: function () {
            this.activeTopupTab('MOMO');
        },

        napTheDienThoaiClicked: function () {
            this.activeTopupTab('TOPUP');
        },

        napGiftcodeClicked: function () {
            this.activeTopupTab('GIFTCODE');
        },

        napTienAoClicked: function () {
            this.activeTopupTab('USDT');
        },

        // Nut Back tu tab con quay ve menu
        backToMenuClicked: function () {
            this.showChonNapTien();
            this.audioClick.loop = false;
            this.audioClick.play();
        },

        getTotalCardBonus: function () {
            var getTotalCardBonusCommand = new cc.GetTotalCardBonusCommand;
            getTotalCardBonusCommand.execute(this);
        },

        onGetTotalCardBonusResponse: function (obj) {
            if (this.lbCardBonus) {
                this.lbCardBonus.string = obj.TotalCard;
                if (this.totalCard !== undefined) {
                    if (this.totalCard === 1 && obj.TotalCard === 0) {
                        cc.TopupController.getInstance().refreshListCard();
                    }
                }
                this.totalCard = obj.TotalCard;
            }
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

        showShopBusy: function () {
            this.nodeBusy.active = true;
        },

        hideShopBusy: function () {
            if (this.nodeBusy) this.nodeBusy.active = false;
        },

        closeClicked: function () {
            this.animation.play('closePopup');
            var self = this;
            cc.director.getScheduler().schedule(function () {
                self.animation.stop();
                cc.LobbyController.getInstance().destroyShopTopupView();
                self.audioClick.loop = false;
                self.audioClick.play();
            }, this, 1, 0, 0.12, false);
        }
    });
}).call(this);
