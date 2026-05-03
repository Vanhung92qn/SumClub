/**
 * Created by Nofear on 6/7/2017.
 */

(function () {
    cc.TaiXiuSieuTocView = cc.Class({
        "extends": cc.Component,
        properties: {
        },

        onLoad: function () {
            this.animation = this.node.getComponent(cc.Animation);

            //set zIndex
            this.node.zIndex = cc.Config.getInstance().getZINDEX();

            cc.TaiXiuSieuTocController.getInstance().setTaiXiuSieuTocView(this);

            if (cc.TaiXiuSieuTocController.getInstance().connectHubTxAuthorize()) {
                cc.TaiXiuSieuTocController.getInstance().sendRequestOnHub(cc.MethodHubName.ENTER_LOBBY);
            }
        },

        onEnable: function () {
            cc.TaiXiuSieuTocController.getInstance().setIsOpen(true);
            var self = this;
            
            this.animation.play('openPopup');        
        },

        onDestroy: function () {
            cc.TaiXiuSieuTocController.getInstance().setTaiXiuSieuTocView(null);

            if (cc.sys.isNative) {
                cc.loader.releaseResDir('taixiusieutoc/prefabs');
                cc.loader.releaseResDir('taixiusieutoc/images');
            }
            cc.PopupController.getInstance().hideBusy();
        },

        resetPositionTX: function () {
            // console.log('this.node.y: ' + this.node.y);
            if (this.node.y < 40) {
                this.node.y = 50;
            }        
        },

        closeClicked: function () {
            cc.TaiXiuSieuTocController.getInstance().setIsOpen(false);
            cc.TaiXiuSieuTocController.getInstance().reset();

            this.animation.play('closePopup');
            var self = this;
            var delay = 0.12;
            cc.director.getScheduler().schedule(function () {
                self.animation.stop();
                cc.LobbyController.getInstance().destroyDynamicView(cc.GameId.TAI_XIU_SIEU_TOC);
            }, this, 1, 0, delay, false);
        }
    });
}).call(this);
