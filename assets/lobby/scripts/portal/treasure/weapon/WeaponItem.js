/**
 * Created by Nofear on 3/15/2019.
 */

(function () {
    cc.WeaponItem = cc.Class({
        "extends": cc.Component,
        properties: {
            sprite: cc.Sprite,
            particleS: cc.ParticleSystem,
            particleTrail: cc.ParticleSystem,
        },

        // use this for initialization
        onEnable: function () {
            cc.director.getCollisionManager().enabled = true;
            // cc.director.getCollisionManager().enabledDebugDraw = true;
        },

        onDisable: function () {
            // cc.director.getCollisionManager().enabled = false;
            // cc.director.getCollisionManager().enabledDebugDraw = false;
        },

        onCollisionEnter: function (other, self) {
            cc.TreasureController.getInstance().createNodeHP();
            cc.WeaponController.getInstance().putToPool(self.node);
            this.node.stopAction(this.currentAction);
        },

        playFx: function () {
            this.particleTrail.node.active = false;
            this.particleS.node.active = true;
            this.particleS.resetSystem();
        },

        moveTo: function (endPosition) {
            if (this.treasureImage === undefined) {
                this.treasureImage = cc.TreasureController.getInstance().getTreasureImage();
            }

            this.sprite.spriteFrame = this.treasureImage.sfWeapons[cc.TreasureController.getInstance().getSymbol() - 1];
            // this.particleS.node.active = false;

            //play particle sóng
            // this.particleTrail.node.active = true;
            // this.particleTrail.resetSystem();

            // var action = cc.moveTo(1, endPosition);
            var height = Math.floor(Math.random() * 100) ; //20 -> (20 + 30)
            let duration = 0.5;

            let action = cc.jumpTo(duration, endPosition, height, 1);
            var actionBy = cc.rotateBy(1, 360);

            let callback = new cc.CallFunc(this.moveFinished, null, this.node);
            let callbackBy = new cc.CallFunc(this.rotateFinished, null, this.node);

            // action.easing(cc.easeIn(3.0));
            this.currentAction = this.node.runAction(new cc.Sequence(action, callback));
            this.node.runAction(new cc.Sequence(actionBy, callbackBy));
        },

        rotateFinished: function () {

        },

        moveFinished: function (node) {
            // var item = node.getComponent(cc.WeaponItem);
            // item.playFx();
            // cc.WeaponController.getInstance().putToPool(node);
        }
    });
}).call(this);
