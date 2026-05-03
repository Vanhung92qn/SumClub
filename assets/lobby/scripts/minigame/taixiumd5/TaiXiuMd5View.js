/**
 * Created by Nofear on 6/7/2017.
 */

(function () {
    cc.TaiXiuMd5View = cc.Class({
        "extends": cc.Component,
        properties: {
        },

        onLoad: function () {
            this.animation = this.node.getComponent(cc.Animation);

            //set zIndex
            this.node.zIndex = cc.Config.getInstance().getZINDEX();

            cc.TaiXiuMd5Controller.getInstance().setTaiXiuMd5View(this);

            if (cc.TaiXiuMd5Controller.getInstance().connectHubTxMd5Authorize()) {
                cc.TaiXiuMd5Controller.getInstance().sendRequestOnHub(cc.MethodHubName.ENTER_LOBBY);
            }
        },

        onEnable: function () {
            cc.TaiXiuMd5Controller.getInstance().setIsOpen(true);
            var self = this;
            
            this.animation.play('openPopup');        
        },

        onDestroy: function () {
            cc.TaiXiuMd5Controller.getInstance().setTaiXiuMd5View(null);

            if (cc.sys.isNative) {
                cc.loader.releaseResDir('taixiumd5/prefabs');
                cc.loader.releaseResDir('taixiumd5/images');
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
            cc.TaiXiuMd5Controller.getInstance().setIsOpen(false);
            cc.TaiXiuMd5Controller.getInstance().reset();

            this.animation.play('closePopup');
            var self = this;
            var delay = 0.12;
            cc.director.getScheduler().schedule(function () {
                self.animation.stop();
                cc.LobbyController.getInstance().destroyDynamicView(cc.GameId.TAI_XIU_MD5);
            }, this, 1, 0, delay, false);
        }
    });
}).call(this);
