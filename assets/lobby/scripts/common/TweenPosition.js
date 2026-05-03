/**
 * Created by Nofear on 9/12/2017.
 */

(function () {
    cc.TweenPosition = cc.Class({
        "extends": cc.Component,
        properties: {
            space: 129.2
        },

        onLoad: function () {
            this.move = false;
            this.space = 129.2;
            this.speed = 1000;
        },

        update: function (dt) {
            if (this.move) {
                this.node.x += (dt * this.speed);
                if (this.node.x >= (this.rootPos + (this.space * this.step))) {
                    if(this.endPosition !== null){
                        this.node.x = this.endPosition;
                    }
                    this.move = false;
                }
            }
        },

        stop: function () {
            this.move = false;
        },

        moveTo: function (step, endPosition) {
            this.rootPos = this.node.x;
            this.step = step;
            if (endPosition !== undefined) {
                this.endPosition = endPosition;
            }
            else {
                this.endPosition = null;
            }
            this.move = true;
        }
    });
}).call(this);