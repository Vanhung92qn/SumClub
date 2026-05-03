/**
 * Created by Nofear on 6/7/2017.
 */

(function () {
    cc.PKPopupView = cc.Class({
        "extends": cc.Component,
        properties: {
            prefabHelp: cc.Prefab,
            prefabHelpHand: cc.Prefab,
        },

        onLoad: function () {
            cc.PKPopupController.getInstance().setPKPopupView(this);
        },

        createHelpView: function () {
            this.nodeHelpView = this.createView(this.prefabHelp);
        },

        destroyHelpView: function () {
            if (this.nodeHelpView)
                this.nodeHelpView.destroy();
        },

        createHelpHandView: function () {
            this.nodeHelpHandView = this.createView(this.prefabHelpHand);
        },

        destroyHelpHandView: function () {
            if (this.nodeHelpHandView)
                this.nodeHelpHandView.destroy();
        },

        createView: function (prefab) {
            var nodeView = cc.instantiate(prefab);
            nodeView.parent = this.node;
            nodeView.setPosition(-this.node.x, -this.node.y);
            return nodeView;
        },
    });
}).call(this);
