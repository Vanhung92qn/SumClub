/**
 * Created by Nofear on 1/17/2019.
 */

(function () {
    cc.FollowNode = cc.Class({
        "extends": cc.Component,
        properties: {
            nodeTarget: cc.Node,
        },

        onLoad: function () {
            this.updateTimer = 0;
            this.updateInterval = 0.01;
            this.lastPosTarget = this.nodeTarget.position;
        },

        update: function (dt) {
            this.updateTimer += dt;
            if (this.updateTimer < this.updateInterval) return; // we don't need to do the math every frame
            this.updateTimer = 0;

            if (this.lastPosTarget !== this.nodeTarget.position) {
               var spaceX = this.nodeTarget.x - this.lastPosTarget.x;
                var spaceY = this.nodeTarget.y - this.lastPosTarget.y;

               this.node.x += spaceX;
                this.node.y += spaceY;

               //set lai vi tri cuoi
                this.lastPosTarget = this.nodeTarget.position;
            }
        },
    });

}).call(this);