/**
 * Created by Nofear on 3/15/2019.
 */

(function () {
    cc.CardFoldDemoItem = cc.Class({
        "extends": cc.Component,
        properties: {

        },

        onLoad: function () {
            this.duration = 0.3;
        },

        moveTo: function (endPosition) {
            this.node.opacity = 255;
            this.node.scale = 0.6;

            var moveTo = cc.moveTo(this.duration, endPosition);

            var rotateTo = cc.rotateBy(this.duration, 360);
            var fadeTo = cc.fadeTo(this.duration, 0);
            var scaleTo = cc.scaleTo(this.duration, 0.3);

            moveTo.easing(cc.easeOut(1.0));
            rotateTo.easing(cc.easeOut(1.0));
            fadeTo.easing(cc.easeOut(1.0));
            scaleTo.easing(cc.easeOut(1.0));

            var callback = cc.callFunc(this.moveFinished, null, this.node);

            this.node.runAction(rotateTo);
            this.node.runAction(fadeTo);
            this.node.runAction(scaleTo);
            this.node.runAction(cc.sequence(moveTo, callback));
        },

        setPosition: function (position) {
            this.node.position = position;
        },

        moveFinished: function (node) {
            node.opacity = 0;
        },
    });
}).call(this);
