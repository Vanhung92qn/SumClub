/**
 * Created by Nofear on 1/17/2019.
 */

(function () {
    cc.HoldToSpin = cc.Class({
        "extends": cc.Component,
        properties: {
            isStart: false,
        },

        onLoad: function () {
            this.holdStart = false;
            this.holdTime = 0;
            this.sendEventHold = false;

            this.node.on(cc.Node.EventType.TOUCH_START, this.TouchStart, this);
            //this.node.on(cc.Node.EventType.TOUCH_MOVE, this.TouchMove, this);
            this.node.on(cc.Node.EventType.TOUCH_END, this.TouchEnd, this);
            this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.TouchCancel, this);
        },

        startAuto: function () {
            this.isStart = true;
        },

        stopAuto: function () {
            this.isStart = false;
        },

        TouchStart: function () {
            this.holdStart = true;
            this.holdTime = 0;
            this.sendEventHold = false;
            //this.node.dispatchEvent(new cc.Event.EventCustom('done', true));
            //var sender = this.node.parent.getComponent('registerEvents');
            //sender.sendEvent('done');
        },

        TouchCancel: function () {
            this.holdStart = false;
            this.holdTime = 0;
            this.sendEventHold = false;
            //this.node.dispatchEvent(new cc.Event.EventCustom('done', true));
            //var sender = this.node.parent.getComponent('registerEvents');
            //sender.sendEvent('done');
        },


        TouchMove: function () {
            this.holdStart = false;
            this.holdTime = 0;
            this.sendEventHold = false;
            //this.node.dispatchEvent(new cc.Event.EventCustom('done', true));
            //var sender = this.node.parent.getComponent('registerEvents');
            //sender.sendEvent('done');
        },

        TouchEnd: function () {
            this.holdStart = false;
            this.holdTime = 0;
            this.sendEventHold = false;
            //this.node.dispatchEvent(new cc.Event.EventCustom('done', true));
            //var sender = this.node.parent.getComponent('registerEvents');
            //sender.sendEvent('done');
        },

        // called every frame, uncomment this function to activate update callback
        update: function (dt) {
            if (this.holdStart) {
                this.holdTime += dt;
                if (this.sendEventHold === false && this.holdTime > 15) {
                    this.sendEventHold = true;
                    this.eventHold();
                }
            }
        },

        eventHold: function () {
            this.isStart = !this.isStart;
        }
    });

}).call(this);