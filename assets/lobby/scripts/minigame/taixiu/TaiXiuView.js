/**
 * Created by Nofear on 6/7/2017.
 */

(function () {
    cc.TaiXiuView = cc.Class({
        "extends": cc.Component,
        properties: {
        },

        onLoad: function () {
            this.animation = this.node.getComponent(cc.Animation);

            //set zIndex
            this.node.zIndex = cc.Config.getInstance().getZINDEX();

            cc.TaiXiuController.getInstance().setTaiXiuView(this);

            if (cc.TaiXiuController.getInstance().connectHubTxAuthorize()) {
                cc.TaiXiuController.getInstance().sendRequestOnHub(cc.MethodHubName.ENTER_LOBBY);
            }
        },

        onEnable: function () {
            cc.TaiXiuController.getInstance().setIsOpen(true);
            var self = this;
            
            this.animation.play('openPopup');        
        },

        onDestroy: function () {
            cc.TaiXiuController.getInstance().setTaiXiuView(null);

            if (cc.sys.isNative) {
                cc.loader.releaseResDir('taixiu/prefabs');
                cc.loader.releaseResDir('taixiu/images');
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
            cc.TaiXiuController.getInstance().setIsOpen(false);
            cc.TaiXiuController.getInstance().reset();

            this.animation.play('closePopup');
            var self = this;
            var delay = 0.12;
            cc.director.getScheduler().schedule(function () {
                self.animation.stop();
                cc.LobbyController.getInstance().destroyDynamicView(cc.GameId.TAI_XIU);
            }, this, 1, 0, delay, false);
        }
    });
}).call(this);
