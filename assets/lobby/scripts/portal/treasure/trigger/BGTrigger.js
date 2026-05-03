/**
 * Created by Nofear on 3/15/2019.
 */


(function () {
    cc.BGTrigger = cc.Class({
        "extends": cc.Component,
        properties: {

        },

        onLoad: function() {
            this.space = 4220; //khoang cach giua cac BG
        },

        // use this for initialization
        onEnable: function () {
            cc.director.getCollisionManager().enabled = true;
            // cc.director.getCollisionManager().enabledDebugDraw = true;
        },

        onDisable: function () {
            // cc.director.getCollisionManager().enabled = false;
            // cc.director.getCollisionManager().enabledDebugDraw = false;
        },

        onCollisionEnter: function (other, self) {
            self.node.x += this.space;
        }
    });
}).call(this);
