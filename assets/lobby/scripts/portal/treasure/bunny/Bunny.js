/**
 * Created by Nofear on 3/15/2019.
 */

(function () {
    cc.Bunny = cc.Class({
        "extends": cc.Component,
        properties: {
            particleSmall: cc.ParticleSystem,
            particleBig: cc.ParticleSystem,
        },

        onLoad: function () {
            this.skeBunny = this.node.getComponent(sp.Skeleton);
            this.idle();

            this.rootPos = this.node.position;
        },

        idle: function () {
            if (this.skeBunny === undefined) {
                this.skeBunny = this.node.getComponent(sp.Skeleton);
            }

            this.skeBunny.timeScale = 1;
            this.skeBunny.clearTracks();
            this.skeBunny.setToSetupPose();
            this.skeBunny.setAnimation(0, 'idle', true);

            if (this.particleSmall) {
                this.particleSmall.stopSystem();
            }

            if (this.particleBig) {
                this.particleBig.stopSystem();
            }
        },

        idleBoss: function () {
            if (this.skeBunny === undefined) {
                this.skeBunny = this.node.getComponent(sp.Skeleton);
            }


            this.skeBunny.timeScale = 1;
            this.skeBunny.clearTracks();
            this.skeBunny.setToSetupPose();
            this.skeBunny.setAnimation(1, 'idle_boss', true);
        },

        jump: function(step, multi, jumpSpace, secondPerJump) {
            this.skeBunny.timeScale = 1;
            this.step = step;
            this.multi = multi;
            this.jumpSpace = jumpSpace;
            this.duration = secondPerJump;

            this.moveTo();
        },

        kick: function () {
            this.skeBunny.timeScale = 2;
            this.skeBunny.clearTracks();
            this.skeBunny.setToSetupPose();
            this.skeBunny.setAnimation(0, 'kick', false);
        },

        win: function () {
            this.skeBunny.timeScale = 1;
            this.skeBunny.clearTracks();
            this.skeBunny.setToSetupPose();
            this.skeBunny.setAnimation(0, 'win', true);
        },

        moveTo: function () {
            this.node.position = this.rootPos;

            if (this.action && this.action.target !== null) {
                this.node.stopAction(this.action);
            }

            this.skeBunny.clearTracks();
            this.skeBunny.setToSetupPose();

            if (this.multi >= 15) {
                this.skeBunny.setAnimation(3, 'jump1', false);
            } else if (this.multi >= 12) {
                this.skeBunny.setAnimation(3, 'jump1', false);
            } else if (this.multi >= 5) {
                this.skeBunny.setAnimation(3, 'jump1', false);
            } else {
                this.skeBunny.setAnimation(2, 'jump0', false);
            }

            var endPosition = cc.v2(this.node.x + this.jumpSpace, this.node.y);
            this.rootPos = endPosition;

            let action = cc.jumpTo(this.duration, endPosition, 100, 1);
            let callback = new cc.CallFunc(this.moveFinished, null, this.node);

            // action.easing(cc.easeOut(1.0));
            // action.easing(cc.expoOut(3.0));
            // action.easing(cc.easeExponentialOut(0.5)); //siêu nhanh -> chậm
            // action.easing(cc.easeQuarticActionOut(0.5)); //rất nhanh -> chậm
            action.easing(cc.easeSineOut(3)); //nhanh -> chậm

            if (this.particleSmall && (this.multi > 1 && this.multi < 10)) {
                this.particleSmall.node.active = true;
                this.particleSmall.resetSystem();
            } else if (this.particleBig && this.multi >= 10) {
                this.particleBig.node.active = true;
                this.particleBig.resetSystem();
            }

            this.action = this.node.runAction(new cc.Sequence(action, callback));
        },


        moveFinished: function (node) {
            var bunny = node.getComponent(cc.Bunny);
            bunny.idle();

            // bunny.step--;
            // if (bunny.step > 0) {
            //     bunny.moveTo();
            // } else {
            //     bunny.idle();
            // }
        }
    });
}).call(this);
