/**
 * Created by Nofear on 3/14/2019.
 */

var netConfig = require('NetConfig');

(function () {
    cc.PolicyView = cc.Class({
        "extends": cc.Component,
        properties: {
            nodeRule: cc.Node,
            nodeRuleKV: cc.Node,
        },

        onLoad: function () {
            //#KingViet
            if (cc.Config.getInstance().getDomainVK().includes(netConfig.HOST)) {
                this.nodeRule.active = false;
                this.nodeRuleKV.active = true;
            } else {
                this.nodeRule.active = true;
                this.nodeRuleKV.active = false;
            }
            this.animation = this.node.getComponent(cc.Animation);
        },

        onEnable: function () {
            this.animation.play('openPopup');
        },

        //Click
        backClicked: function () {
            //this.showRegister(false);
            this.animation.play('closePopup');
            var self = this;
            var delay = 0.12;
            cc.director.getScheduler().schedule(function () {
                self.animation.stop();
                self.node.active = false;
            }, this, 1, 0, delay, false);
        },
    });
}).call(this);
