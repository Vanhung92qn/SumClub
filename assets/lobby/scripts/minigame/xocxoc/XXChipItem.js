/**
 * Created by Nofear on 3/15/2019.
 */

(function () {
    cc.XXChipItem = cc.Class({
        "extends": cc.Component,
        properties: {
            spriteChip: cc.Sprite,
        },

        onLoad: function () {
            this.duration = 0.3;
            this.betIndex = -1;

            //vi tri cua player dat chip
            this.playerId = 0;
            this.position = null;
        },
        setChip: function (chipIndex) {
            this.chipIndex = chipIndex;
            this.spriteChip.spriteFrame = cc.XXController.getInstance().getChips()[chipIndex];
        },

        moveTo: function (endPosition) {
            this.node.opacity = 100;
            var action = cc.moveTo(this.duration, endPosition);
            action.easing(cc.easeOut(1.0));

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
                let fadeOut = cc.fadeOut();
                this.node.runAction(cc.sequence(action, fadeOut, callback));
            }
        },

        moveFinished: function (node) {
            node.opacity = 255;
        },

        moveToEndFinished: function (node) {
            // node.stopAllActions();
            try {
                setTimeout(function () {
                    cc.XXController.getInstance().putToPool(node);
                }.bind(this), 500);
            } catch (e) {
            }


        }
    });
}).call(this);
