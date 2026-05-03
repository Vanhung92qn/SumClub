/**
 * Created by Nofear on 1/14/2019.
 */

(function () {
    cc.AutoMoveToLeftOrRight = cc.Class({
        "extends": cc.Component,
        properties: {

        },

        onLoad: function() {
            this.posMax = new cc.Vec2(-74, 0);
            this.posMin = new cc.Vec2(-1230, 0);
            this.pos = new cc.Vec2(0, 0);
            this.duration = 0.2;

            this.centerX = -640;
            this.centerY = -360;

            this.minX = -958;
            this.maxX = -158;
            this.maxY = 30;
            this.minY = -194;

            this.action = null;
        },

        onEnable: function () {
            this.autoMove();
        },

        autoMove: function () {
            if (this.action !== null) {
                this.node.stopAction(this.action);
            }

            if (this.node.x >= this.centerX) {
                this.posMax.y = this.node.y;
                this.action = cc.moveTo(this.duration, this.posMax);
            } else {
                this.posMin.y = this.node.y;
                this.action = cc.moveTo(this.duration, this.posMin);
            }
            this.action.easing(cc.easeOut(3.0));
            this.node.runAction(this.action);
        },
        
        autoMoveIn: function () {
            /*
            if (this.node.x > this.centerX && this.node.y > this.centerY) {
                //topright
                this.pos.x = this.maxX;
                this.pos.y = this.maxY;
                var action = cc.moveTo(this.duration, this.pos);
            } else if (this.node.x > this.centerX && this.node.y < this.centerY) {
                this.pos.x = this.maxX;
                this.pos.y = this.minY;
                var action = cc.moveTo(this.duration, this.pos);
            } else if (this.node.x > this.centerX && this.node.y < this.centerY) {
                this.pos.x = this.minX;
                this.pos.y = this.minY;
                var action = cc.moveTo(this.duration, this.pos);
            } else {
                this.pos.x = this.minX;
                this.pos.y = this.maxY;
                var action = cc.moveTo(this.duration, this.pos);
            }*/
            if (this.action !== null) {
                this.node.stopAction(this.action);
            }

            this.pos.x = this.centerX;
            this.pos.y = this.centerY;
            this.action = cc.moveTo(this.duration, this.pos);

            this.action.easing(cc.easeOut(3.0));
            this.node.runAction(this.action);
        },

        callbackCloseMINI: function () {
            this.autoMove();
        }
    });
}).call(this);
