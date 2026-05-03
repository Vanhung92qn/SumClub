/**
 * Created by Nofear on 3/15/2019.
 */

(function () {
    cc.TreasureBoss = cc.Class({
        "extends": cc.Component,
        properties: {

        },

        onLoad: function () {
            this.skeleton = this.node.getComponent(sp.Skeleton);
            this.idle();
        },

        onEnable: function () {
            cc.director.getCollisionManager().enabled = true;
            // cc.director.getCollisionManager().enabledDebugDraw = true;
        },

        onDisable: function () {
            // cc.director.getCollisionManager().enabled = false;
            // cc.director.getCollisionManager().enabledDebugDraw = false;
        },

        onCollisionEnter: function (data1, data2) {
            if (cc.TreasureController.getInstance().getBossHP() > 0) {
                var self = this;
                this.hit();
                //hit xong sau 3s -> quay lai idle
                setTimeout(function () {
                    self.idle();
                }, 300);
            } else {
                // this.dead();
            }
        },

        idle1: function () {
            this.skeleton.timeScale = 1;
            this.skeleton.clearTracks();
            this.skeleton.setToSetupPose();
            this.skeleton.setAnimation(2, 'idle1', true);
        },

        idle: function () {
            this.skeleton.timeScale = 1;
            this.skeleton.clearTracks();
            this.skeleton.setToSetupPose();
            this.skeleton.setAnimation(2, 'idle', true);
        },

        hit: function () {
            this.skeleton.timeScale = 1;
            this.skeleton.clearTracks();
            this.skeleton.setToSetupPose();
            this.skeleton.setAnimation(1, 'hit', false);
        },

        dead: function () {
            this.skeleton.timeScale = 1;
            this.skeleton.clearTracks();
            this.skeleton.setToSetupPose();
            this.skeleton.setAnimation(0, 'die', false);
        },
    });
}).call(this);
