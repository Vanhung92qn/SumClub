/**
 * Created by Nofear on 6/7/2017.
 */

var portalConfig = require('PortalConfig');

(function () {
    cc.LobbyEffectView = cc.Class({
        "extends": cc.Component,
        properties: {
            prefabEffect: cc.Prefab,
        },

        onLoad: function () {
            cc.LobbyController.getInstance().setLobbyEffectView(this);
            this.node.parent.zIndex = cc.NoteDepth.PORTAL_JACKPOT_EFFECT;
            this.nodeEffect = null;
            // cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        },

        // onKeyDown: function (event) {
        //     switch(event.keyCode) {
        //         case cc.macro.KEY.a:
        //             cc.LobbyJackpotController.getInstance().getXJackpot();
        //             break;
        //     }
        // },

        showFxWinJackpot: function (user) {
            this.forceDestroyEffect();

            this.nodeEffect = cc.instantiate(this.prefabEffect);
            this.nodeEffect.parent = this.node;
            this.nodeEffect.setPosition(0, 0);
            this.nodeEffect.getComponent(cc.LobbyEffectItem).updateUser(this, user);
            this.animationEffect = this.nodeEffect.getComponent(cc.Animation);

            cc.director.getScheduler().schedule(this.destroyEffect, this, 0, 0, portalConfig.TIME_SHOW_EFFECT_JACKPOT, false);
        },

        forceDestroyEffect: function () {
            if (cc.isValid(this.nodeEffect)) {
                this.nodeEffect.destroy();
                this.animationEffect = null;
                this.nodeEffect = null;
                this.unscheduleAllCallbacks();
            }
        },

        destroyEffect: function () {
            if (this.animationEffect === null) return;
            this.animationEffect.play('fadeIn');
            var self = this;
            cc.director.getScheduler().schedule(function () {
                if (cc.isValid(self.nodeEffect)) {
                    self.nodeEffect.destroy();
                }
            }, this, 0, 0, 0.15, false);
        },
    });
}).call(this);
