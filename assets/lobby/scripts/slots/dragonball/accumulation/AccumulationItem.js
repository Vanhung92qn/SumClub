/**
 * Created by Nofear on 3/15/2019.
 */

(function () {
    cc.AccumulationItem = cc.Class({
        "extends": cc.Component,
        properties: {
            particleS: cc.ParticleSystem,
            particleTrail: cc.ParticleSystem,
        },

        playFx: function () {
            this.particleTrail.node.active = false;
            this.particleS.node.active = true;
            this.particleS.resetSystem();
        },

        moveTo: function (endPosition) {
            this.particleS.node.active = false;

            let height;
            //play particle sóng
            this.particleTrail.node.active = true;
            this.particleTrail.resetSystem();

            // var action = cc.moveTo(1, endPosition);
            // var height = Math.floor((Math.random() * 200) -100);
            let duration = 1;

            const ran = Math.floor((Math.random() * 2));
            let posX = this.node.x;

            if (posX > 0) {
                height = ran === 0 ? 50 : -50;
            } else {
                height = ran === 0 ? 100 : -100;
            }

            let action = cc.jumpTo(duration, endPosition, height, 1);

            let callback = new cc.CallFunc(this.moveFinished, null, this.node);

            // action.easing(cc.easeOut(3.0));
            this.node.runAction(new cc.Sequence(action, callback));
        },


        moveFinished: function (nodePower) {
            var item = nodePower.getComponent(cc.AccumulationItem);
            item.playFx();

            cc.director.getScheduler().schedule(function () {
                cc.AccumulationController.getInstance().putPowerToPool(nodePower);
            }, item, 0, 0, 1, false);

        }
    });
}).call(this);
