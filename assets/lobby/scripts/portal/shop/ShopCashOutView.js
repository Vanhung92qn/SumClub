// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {

        nodeTopup: cc.Node,
        nodeBank: cc.Node,
        nodeMoMo: cc.Node,
        nodeTransfer:cc.Node,
        nodeTabTopup: cc.Node,
        nodeTabBank: cc.Node,
        nodeTabMomo: cc.Node,
        nodeTabTransfer: cc.Node,
        nodeBusy: cc.Node,
        audioClick: cc.AudioSource,
        audioClose: cc.AudioSource,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    onLoad: function () {
        //cc.ShopTab.MOMO cc.ShopTab.TOPUP
        cc.ShopCastOutControler.getInstance().setShopCastOutView(this);

        this.nodeTabActive = this.nodeBank;
        this.currentTab = cc.ShopTab.BANK;
        this.node.zIndex = cc.NoteDepth.POPUP_PORTAL;

        this.animation = this.node.getComponent(cc.Animation);

         

        this.nodeBank.active = true;
        this.nodeTopup.active = false;
        this.nodeMoMo.active = false;
        this.nodeTransfer.active = false;
        this.bankName = "";
        
        
      //  this.init();
        // this.nodeTabTopup.active = true;
        // this.nodeTabBank.active = true;
        // this.nodeTabMomo.active = true;
        // this.nodeTabTransfer.active = true;
    },
    start: function(){
        this.bankSelect = [];
    },
    onEnable: function () {

       // this.animationMenuCardType.node.scaleY = 0;
        //    this.animationMenuCardValue.node.scaleY = 0;

       this.animation.play('openPopup');
       
        var startTab = cc.Tool.getInstance().getItem('@startShopCastOutTab');
        var self = this;

        cc.director.getScheduler().schedule(function () {
            self.activeTopupTab(startTab);
        }, this, 0, 0, 0.3, false);
    },
    
    changeTabClicked: function (event, data) {
       if (data.toString() === this.currentTab) return;
          this.activeTopupTab(data.toString());
          this.audioClose.loop = false;
          this.audioClose.play();
        cc.DDNA.getInstance().uiInteraction(cc.DDNAUILocation.SHOP, data.toString(), cc.DDNAUIType.BUTTON);
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
    activeTopupTab(tabName, nickName) {
        if (nickName === undefined) {
            cc.Tool.getInstance().setItem('@nickNameAgency', '');
        } else {
            cc.Tool.getInstance().setItem('@nickNameAgency', nickName);
        }
        this.nodeTabActive.active = false;
        switch (tabName) {
            case cc.ShopTab.TOPUP:
                this.nodeTabActive = this.nodeTopup;
                break;
            case cc.ShopTab.BANK:
                this.nodeTabActive = this.nodeBank;
                break;
            
            case cc.ShopTab.MOMO:
                this.nodeTabActive = this.nodeMoMo;
                break;
           
            case cc.ShopTab.TRANSFER:
                this.nodeTabActive = this.nodeTransfer;
                break;

        }
        this.nodeTabActive.active = true;
        this.currentTab = tabName;
    },
    showShopBusy: function () {
        this.nodeBusy.active = true;
    },

    hideShopBusy: function () {
        if (this.nodeBusy)
            this.nodeBusy.active = false;
    },

    closeClicked: function () {
       // this.audioClose.loop = false;
       // this.audioClose.play();
        //this.showRegister(false);
        this.animation.play('closePopup');
        var self = this;
        var delay = 0.12;
        cc.director.getScheduler().schedule(function () {
            self.animation.stop();
            cc.LobbyController.getInstance().destroyShopCastOutView();
            this.audioClick.loop = false;
            this.audioClick.play();
        }, this, 1, 0, delay, false);
    }
    // update (dt) {},
});
