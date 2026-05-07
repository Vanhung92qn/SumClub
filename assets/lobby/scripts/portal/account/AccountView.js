/**
 * Created by Nofear on 3/14/2019.
 */

(function () {
    cc.AccountView = cc.Class({
        "extends": cc.Component,
        properties: {
			nodeSoDienThoai: cc.Node,
            nodeProfile: cc.Node,
            nodeVIP: cc.Node,
            nodeSafePlus: cc.Node,
            nodeSecurity: cc.Node,
            nodeChangePass: cc.Node,
            nodeInbox: cc.Node,
			nodeKetSat: cc.Node,
			nodeDangxuat: cc.Node,
			
        },

        // use this for initialization
        onLoad: function () {
            cc.AccountController.getInstance().setAccountView(this);
            this.allTabNodes = [
                this.nodeProfile,
                this.nodeVIP,
                this.nodeSafePlus,
                this.nodeSecurity,
                this.nodeChangePass,
                this.nodeInbox,
                this.nodeKetSat,
                this.nodeDangxuat,
                this.nodeSoDienThoai,
            ];
            this.node.zIndex = cc.NoteDepth.POPUP_PORTAL;
            this.animation = this.node.getComponent(cc.Animation);
            // Tat het tab tu dau de tranh flicker khi onEnable switch tab
            for (var i = 0; i < this.allTabNodes.length; i++) {
                if (this.allTabNodes[i]) this.allTabNodes[i].active = false;
            }
            this.nodeTabActive = this.nodeProfile;
            this.currentTab = cc.AccountTab.PROFILE;
        },

        onEnable: function () {
            this.animation.play('openPopup');
            var startTab = cc.Tool.getInstance().getItem('@startTab');
            cc.Tool.getInstance().setItem('@startTab', null);
            if (!startTab || startTab === 'null' || startTab === 'undefined') {
                startTab = cc.AccountTab.PROFILE;
            }
            this.activeTab(startTab);
        },

        changeTabClicked: function (event, data) {
            if (data.toString() === this.currentTab) return;
            this.activeTab(data.toString());

            cc.DDNA.getInstance().uiInteraction(cc.DDNAUILocation.ACCOUNT_INFO, data.toString(), cc.DDNAUIType.BUTTON);
        },

        _getTabNode: function (tabName) {
            switch (tabName) {
                case cc.AccountTab.PROFILE:     return this.nodeProfile;
                case cc.AccountTab.VIP:         return this.nodeVIP;
                case cc.AccountTab.SAFE_PLUS:   return this.nodeSafePlus;
                case cc.AccountTab.SECURITY:    return this.nodeSecurity;
                case cc.AccountTab.CHANGE_PASS: return this.nodeChangePass;
                case cc.AccountTab.KET_SAT:     return this.nodeKetSat;
                case cc.AccountTab.DANG_XUAT:   return this.nodeDangxuat;
                case cc.AccountTab.REG_PHONE:   return this.nodeSoDienThoai;
                case cc.AccountTab.INBOX:       return this.nodeInbox;
                default:                        return this.nodeProfile;
            }
        },

        activeTab(tabName) {
            var nextNode = this._getTabNode(tabName);
            if (!nextNode) return;
            for (var i = 0; i < this.allTabNodes.length; i++) {
                if (this.allTabNodes[i]) this.allTabNodes[i].active = false;
            }
            nextNode.active = true;
            this.nodeTabActive = nextNode;
            this.currentTab = tabName;
        },
		  quickLogoutClicked: function () {
            if (this.isCardGame) {
                //thoat game
                cc.LobbyController.getInstance().destroyDynamicView(null);
            } else {
                cc.LobbyController.getInstance().showPopupLogout();
            }
            cc.DDNA.getInstance().uiInteraction(cc.DDNAUILocation.PORTAL, 'BACK', cc.DDNAUIType.BUTTON);
        },

        closeClicked: function () {
            //this.showRegister(false);
            this.animation.play('closePopup');
            var self = this;
            var delay = 0.12;
            cc.director.getScheduler().schedule(function () {
                self.animation.stop();
                cc.LobbyController.getInstance().destroyAccountView();
            }, this, 1, 0, delay, false);
        }
    });
}).call(this);
