/**
 * Created by Nofear on 3/15/2019.
 */

(function () {
    cc.CChipItem = cc.Class({
        "extends": cc.Component,
        properties: {
            spriteChip: cc.Sprite,
        },

        onLoad: function () {
            this.duration = 0.3;
        },

        moveTo: function (endPosition, duration) {
            if (this.node) {
                this.node.opacity = 255;
                var action = cc.moveTo(duration, endPosition);
                action.easing(cc.easeOut(1.0));

                var callback = cc.callFunc(this.moveFinished, null, this.node);

                this.node.runAction(cc.sequence(action, callback));
            }
        },

        setPosition: function (endPosition) {
            this.node.position = endPosition;
        },

        moveFinished: function (node) {
            node.opacity = 255;
        },
    });
}).call(this);
