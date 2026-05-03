/**
 * Created by Nofear on 3/14/2019.
 */

(function () {
    cc.HistoryView = cc.Class({
        "extends": cc.Component,
        properties: {
            // nodeAll: cc.Node,
            nodeGame: cc.Node,
            nodeTopup: cc.Node,
            nodeRedeem: cc.Node,
            nodeTransfer: cc.Node,
            nodeReceive: cc.Node,
            nodeBank: cc.Node,
        },

        // use this for initialization
        onLoad: function () {
            cc.HistoryController.getInstance().setHistoryView(this);
            this.nodeTabActive = this.nodeBank;
            this.currentTab = cc.AccountTab.BANK;
            this.node.zIndex = cc.NoteDepth.POPUP_PORTAL;
            this.animation = this.node.getComponent(cc.Animation);
        },

        onEnable: function () {
            this.animation.play('openPopup');
            var startTab = cc.Tool.getInstance().getItem('@startHistoryTab');
            this.activeTab(startTab)
        },

        changeTabClicked: function (event, data) {
            if (data.toString() === this.currentTab) return;
            this.activeTab(data.toString());

            cc.DDNA.getInstance().uiInteraction(cc.DDNAUILocation.HISTORY, data.toString(), cc.DDNAUIType.BUTTON);
        },

        activeTab (tabName) {
            this.nodeTabActive.active = false;
            switch (tabName) {
                // case cc.HistoryTab.ALL:
                //     this.nodeTabActive = this.nodeAll;
                //     break;
                case cc.HistoryTab.GAME:
                    this.nodeTabActive = this.nodeGame;
                    break;
                case cc.HistoryTab.TOPUP:
                    this.nodeTabActive = this.nodeTopup;
                    break;
                case cc.HistoryTab.REDEEM_REWARD:
                    this.nodeTabActive = this.nodeRedeem;
                    break;
                case cc.HistoryTab.TRANSFER:
                    this.nodeTabActive = this.nodeTransfer;
                    break;
                case cc.HistoryTab.RECEIVE:
                    this.nodeTabActive = this.nodeReceive;
                    break;
                case cc.HistoryTab.BANK:
                    this.nodeTabActive = this.nodeBank;
                    break;
            }

            this.nodeTabActive.active = true;

            this.currentTab = tabName;
        },

        closeClicked: function () {
            //this.showRegister(false);
            this.animation.play('closePopup');
            var self = this;
            var delay = 0.12;
            cc.director.getScheduler().schedule(function () {
                self.animation.stop();
                cc.LobbyController.getInstance().destroyHistoryView();
            }, this, 1, 0, delay, false);
        }

    });
}).call(this);
