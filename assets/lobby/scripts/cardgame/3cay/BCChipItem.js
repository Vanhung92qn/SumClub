/**
 * Created by Nofear on 3/15/2019.
 */

(function () {
    cc.BCChipItem = cc.Class({
        "extends": cc.Component,
        properties: {
            spriteChip: cc.Sprite,
        },

        onLoad: function () {
            this.duration = 0.5;
            this.betIndex = -1;

            //vi tri cua player dat chip
            this.playerId = 0;
        },

        setChip: function (chipIndex) {
            this.chipIndex = chipIndex;
            this.spriteChip.spriteFrame = cc.BCController.getInstance().getChips()[chipIndex];
        },

        moveTo: function (endPosition) {
            this.node.opacity = 200;
            var action = cc.moveTo(this.duration, endPosition);
            action.easing(cc.easeIn(0.3));

            var callback = cc.callFunc(this.moveFinished, null, this.node);

            this.node.runAction(cc.sequence(action, callback));
        },

        setPosition: function (endPosition) {
            this.node.position = endPosition;
        },

        moveToEnd: function (endPosition) {
            if (this.node) {
                this.node.opacity = 100;

                var action = cc.moveTo(0.5, endPosition);
                action.easing(cc.easeOut(1.0));

                var callback = cc.callFunc(this.moveToEndFinished, null, this.node);

                this.node.runAction(cc.sequence(action, callback));
            }
        },

        moveFinished: function (node) {
            node.opacity = 255;
            node.destroy();
        },

        moveToEndFinished: function (node) {
            // node.stopAllActions();
            cc.BCController.getInstance().putToPool(node);
        }
    });
}).call(this);
