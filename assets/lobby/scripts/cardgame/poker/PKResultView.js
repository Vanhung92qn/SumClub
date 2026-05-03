/**
 * Created by Welcome on 5/28/2019.
 */

(function () {
    cc.PKResultView = cc.Class({
        "extends": cc.Component,
        properties: {
            nodeResult: cc.Node,
        },

        onLoad: function () {
            this.animationResult = this.nodeResult.getComponent(sp.Skeleton);
            cc.PKController.getInstance().setPKResultView(this);

            this.currentState = -1;

            // var self = this;
            // setTimeout(function () {
            //     self.showResult(cc.PKHand.ROYAL_FLUSH);
            // }, 6000);
        },

        reset: function () {

        },

        showResult: function (hand) {
            this.nodeResult.active = true;
            var animName = cc.PKController.getInstance().getAnimNameByHand(hand);
            var animIndex = cc.PKController.getInstance().getAnimIndexByHand(hand);
            this.animationResult.clearTracks();
            this.animationResult.setToSetupPose();
            this.animationResult.setAnimation(animIndex, animName, true);

            //sau 2s tu tat
        },

        hideResult: function () {
            this.nodeResult.active = false;
        },
    });
}).call(this);
