cc.Class({
    extends: cc.Component,

    properties: {
        nodeChonRutTien: cc.Node, // menu chon loai rut

        nodeBank: cc.Node,        // Rut bank
        nodeMoMo: cc.Node,        // Rut Vi Dien Tu
        nodeTopup: cc.Node,       // Doi The Cao
        nodeUSDT: cc.Node,        // Rut USDT
        nodeTransfer: cc.Node,    // Chuyen Tien User

        nodeBusy: cc.Node,
        audioClick: cc.AudioSource,
        audioClose: cc.AudioSource,
    },

    onLoad: function () {
        cc.ShopCastOutControler.getInstance().setShopCastOutView(this);
        this.node.zIndex = cc.NoteDepth.POPUP_PORTAL;
        this.animation = this.node.getComponent(cc.Animation);

        this.nodeBank.active = false;
        this.nodeMoMo.active = false;
        this.nodeTopup.active = false;
        if (this.nodeUSDT) this.nodeUSDT.active = false;
        this.nodeTransfer.active = false;
        this.nodeChonRutTien.active = true;

        this.nodeTabActive = this.nodeChonRutTien;
        this.currentTab = 'MENU';
    },

    onEnable: function () {
        this.animation.play('openPopup');
        var startTab = cc.Tool.getInstance().getItem('@startShopCastOutTab');
        cc.Tool.getInstance().setItem('@startShopCastOutTab', null);
        if (startTab && startTab !== 'MENU' && startTab !== 'null') {
            this.activeTopupTab(startTab);
        } else {
            this.showChonRutTien();
        }
    },

    // Hien menu chon loai rut, an cac tab con
    showChonRutTien: function () {
        if (this.nodeTabActive) this.nodeTabActive.active = false;
        this.nodeChonRutTien.active = true;
        this.nodeTabActive = this.nodeChonRutTien;
        this.currentTab = 'MENU';
    },

    activeTopupTab: function (tabName) {
        this.nodeTabActive.active = false;
        switch (tabName) {
            case 'BANK':
                this.nodeTabActive = this.nodeBank;
                break;
            case 'MOMO':
                this.nodeTabActive = this.nodeMoMo;
                break;
            case 'TOPUP':
                this.nodeTabActive = this.nodeTopup;
                break;
            case 'USDT':
                this.nodeTabActive = this.nodeUSDT;
                break;
            case 'TRANSFER':
                this.nodeTabActive = this.nodeTransfer;
                break;
        }
        this.nodeTabActive.active = true;
        this.currentTab = tabName;
        this.audioClose.loop = false;
        this.audioClose.play();
    },

    // Click cac icon tren menu chon rut tien
    rutBankClicked: function () {
        this.activeTopupTab('BANK');
    },

    rutViDienTuClicked: function () {
        this.activeTopupTab('MOMO');
    },

    doiTheCaoClicked: function () {
        this.activeTopupTab('TOPUP');
    },

    rutUSDTClicked: function () {
        this.activeTopupTab('USDT');
    },

    chuyenTienUserClicked: function () {
        this.activeTopupTab('TRANSFER');
    },

    // Nut Back tu tab con quay ve menu
    backToMenuClicked: function () {
        this.showChonRutTien();
        this.audioClose.loop = false;
        this.audioClose.play();
    },

    clicklichsugiaodich: function () {
        if (cc.LoginController.getInstance().checkLogin()) {
            cc.LobbyController.getInstance().createHistoryView(cc.HistoryTab.BANK);
            cc.DDNA.getInstance().uiInteraction(cc.DDNAUILocation.PORTAL, 'SETTING_HISTORY', cc.DDNAUIType.BUTTON);
            this.audioClose.loop = false;
            this.audioClose.play();
        }
    },

    clicklichsutranfer: function () {
        if (cc.LoginController.getInstance().checkLogin()) {
            cc.LobbyController.getInstance().createHistoryView(cc.HistoryTab.RECEIVE);
            cc.DDNA.getInstance().uiInteraction(cc.DDNAUILocation.PORTAL, 'SETTING_HISTORY', cc.DDNAUIType.BUTTON);
            this.audioClose.loop = false;
            this.audioClose.play();
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
            cc.LobbyController.getInstance().destroyShopCastOutView();
            self.audioClick.loop = false;
            self.audioClick.play();
        }, this, 1, 0, 0.12, false);
    }
});
