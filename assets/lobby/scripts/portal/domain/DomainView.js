/**
 * Created by Nofear on 6/7/2017.
 */

(function () {
    cc.DomainView = cc.Class({
        "extends": cc.Component,
        properties: {
            nodeInfo: cc.Node,
            lbInfo: cc.Label,
            lbTime: cc.Label,
        },

        onLoad: function () {
            cc.DomainController.getInstance().setDomainView(this);
            this.isTimer = false;
            this.timer = 20;

            this.node.zIndex = cc.NoteDepth.POPUP_SYSTEM;
        },

        update: function (dt) {
            if (this.isTimer) {
                if (this.timer > 0) {
                    this.timer -= dt;
                } else {
                    this.isTimer = false;
                    this.timer = 0;

                    this.redirectNewDomain();
                }

                this.lbTime.string = 'Hệ thống sẽ tự chuyển sau ' + Math.round(this.timer) + ' giây';
            }
        },

        checkErrorDomain: function () {
            if (cc.sys.isNative) return false;

            if (cc.Config.getInstance().checkErrorDomain()) {
                //hien popup thong bao
                this.nodeInfo.active = true;
                this.lbInfo.string = cc.Config.getInstance().getNewDomain().toUpperCase();
                this.isTimer = true;
                return true;
            } else {
                return false;
            }
        },

        redirectNewDomain: function () {
            window.location.replace('http://' + cc.Config.getInstance().getNewDomain() + '?access_token=' + cc.ServerConnector.getInstance().getToken());
        },

        redirectNowClicked: function () {
            this.isTimer = false;
            this.redirectNewDomain();
        }
    });
}).call(this);
