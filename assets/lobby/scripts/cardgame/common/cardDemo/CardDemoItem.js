/**
 * Created by Nofear on 3/15/2019.
 */

(function () {
    cc.CardDemoItem = cc.Class({
        "extends": cc.Component,
        properties: {

        },

        onLoad: function () {
            this.duration = 0.3;
        },

        moveTo: function (endPosition) {
            this.node.opacity = 100;
            var action = cc.moveTo(this.duration, endPosition);

            var rotateTo = cc.rotateBy(this.duration, 3600);

            action.easing(cc.easeOut(1.0));
            rotateTo.easing(cc.easeOut(1.0));

            var callback = cc.callFunc(this.moveFinished, null, this.node);

            this.node.runAction(cc.sequence(action, callback));
            this.node.runAction(rotateTo);
        },

        setPosition: function (position) {
            this.node.position = position;
        },

        moveFinished: function (node) {
            node.opacity = 255;
        },
    });
}).call(this);
