/**
 * Created by Nofear on 1/17/2019.
 */

(function () {
    cc.TreasureAutoSpin = cc.Class({
        "extends": cc.Component,
        properties: {

        },

        onLoad: function () {
            this.holdStart = false;
            this.holdTime = 0;
            this.sendEventHold = false;

            this.node.on(cc.Node.EventType.TOUCH_START, this.TouchStart, this);
            this.node.on(cc.Node.EventType.TOUCH_END, this.TouchEnd, this);
            this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.TouchCancel, this);

            this.isActive = true; //mac dinh la true
        },

        TouchStart: function () {
            this.holdStart = true;
            this.holdTime = 0;
            this.sendEventHold = false;
        },

        TouchCancel: function () {
            this.holdStart = false;
            this.holdTime = 0;
            this.sendEventHold = false;
        },

        TouchEnd: function () {
            this.holdStart = false;
            this.holdTime = 0;
            this.sendEventHold = false;
        },

        update: function (dt) {
            if (this.isActive && this.holdStart) {
                this.holdTime += dt;
                if (this.sendEventHold === false && this.holdTime > 1) {
                    this.sendEventHold = true;
                    this.eventHold();
                }
            }
        },

        eventHold: function () {
            //call function active auto spin
            cc.TreasureController.getInstance().activeAutoSpin();
        }
    });

}).call(this);