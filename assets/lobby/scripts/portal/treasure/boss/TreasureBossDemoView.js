/**
 * Created by Nofear on 3/15/2019.
 */

(function () {
    cc.TreasureBossDemoView = cc.Class({
        "extends": cc.Component,
        properties: {
            nodeBoss: [cc.Node],
        },

        onLoad: function () {
            cc.TreasureController.getInstance().setTreasureBossDemoView(this);
            this.pos1 = cc.v2(853, -218);
            this.pos2 = cc.v2(-63, -228);
        },

        showBossDemo: function (index) {
            this.nodeB = this.nodeBoss[index];
            this.nodeB.active = true;
            var skeleton = this.nodeB.getComponent(sp.Skeleton);
            skeleton.timeScale = 1;
            skeleton.clearTracks();
            skeleton.setToSetupPose();
            skeleton.setAnimation(2, 'idle', true);

            this.nodeB.position = this.pos1;

            let action = cc.jumpTo(1, this.pos2, 100, 1);
            let callback = new cc.CallFunc(this.moveFinished, null, this.nodeB);

            // action.easing(cc.easeOut(1.0));
            // action.easing(cc.expoOut(3.0));
            // action.easing(cc.easeExponentialOut(0.5)); //siêu nhanh -> chậm
            action.easing(cc.easeQuarticActionIn(0.5)); //rất nhanh -> chậm
            // action.easing(cc.easeSineIn(3)); //chậm -> nhanh

            this.action = this.nodeB.runAction(new cc.Sequence(action, callback));
        },

        hideBossDemo: function () {
            if (this.nodeB) {
                this.nodeB.active = false;
            }
        },

        moveFinished: function (node) {

        },
    });
}).call(this);
