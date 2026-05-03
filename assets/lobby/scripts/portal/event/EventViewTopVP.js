/**
 * Created by Welcome on 4/18/2019.
 */

var netConfig = require('NetConfig');

(function () {
    cc.EventView = cc.Class({
        "extends": cc.PopupBase,
        properties: {
            nodeBusy: cc.Node,

            //sprite icon
            spriteIcon: cc.Sprite,
        },

        onLoad: function () {
            if (this.spriteIcon)
                this.spriteIcon.spriteFrame = cc.LobbyController.getInstance().getGameAssets().icons[cc.Config.getInstance().getIndexIcon(cc.Config.getInstance().getServiceId())];

            this.animation = this.node.getComponent(cc.Animation);
            this.node.zIndex =  cc.NoteDepth.POPUP_EVENT;
            
        },

        start: function () {
            cc.EventTopVpController.getInstance().setEventView(this);
        },

        onEnable: function () {
            this.animation.play('openPopup');
        },

        onDestroy: function () {
            cc.EventTopVpController.getInstance().setEventView(null);
        },

        showEventBusy: function () {
            if (this.nodeBusy)
                this.nodeBusy.active = true;
        },

        hideEventBusy: function () {
            if (this.nodeBusy)
                this.nodeBusy.active = false;
        },

        closeClicked: function () {
            this.animation.play('closePopup');
            var self = this;
            var delay = 0.1;
            cc.director.getScheduler().schedule(function () {
                self.animation.stop();
                self.closeFinished();
            }, this, 1, 0, delay, false);
        },

        closeFinished: function () {
            this.node.destroy();
        },
    });
}).call(this);
