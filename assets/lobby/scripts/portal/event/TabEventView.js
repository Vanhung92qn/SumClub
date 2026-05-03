/**
 * Created by Welcome on 4/18/2019.
 */

(function () {
    cc.TabEventView = cc.Class({
        "extends": cc.Component,
        properties: {
            btnRule: cc.Button,
            btnTop: cc.Button,

            nodeRule: cc.Node,
            nodeTop: cc.Node,
        },

        onEnable: function () {
            this.btnRule.interactable = true;
            this.btnTop.interactable = false;

            this.nodeRule.active = false;
            this.nodeTop.active = true;

            var self = this;
            var delay = 0.5;
            cc.director.getScheduler().schedule(function () {
                self.getTopEvent();
            }, this, 1, 0, delay, false);
        },

        getTopEvent: function () {
            //base
        },

        onGetTopEventResponse: function (response) {
            //base
        },

        openTopTab: function () {
            this.btnRule.interactable = true;
            this.btnTop.interactable = false;

            this.nodeRule.active = false;
            this.nodeTop.active = true;
        },

        openRuleTab: function () {
            this.btnRule.interactable = false;
            this.btnTop.interactable = true;

            this.nodeRule.active = true;
            this.nodeTop.active = false;
        },

        ruleClicked: function () {
            this.openRuleTab();
        },

        topFinished: function () {
            this.openTopTab();
        },
    });
}).call(this);
