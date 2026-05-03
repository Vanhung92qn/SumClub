/**
 * Created by Nofear on 6/7/2017.
 */

(function () {
    cc.PopupViewBase = cc.Class({
        "extends": cc.Component,
        properties: {
            prefabBetLines: cc.Prefab,
            prefabHelp: cc.Prefab,
            prefabHistory: cc.Prefab,
            prefabTop: cc.Prefab,
            prefabSessionDetail: cc.Prefab,
        },

        createSessionDetailView: function () {
            this.nodeSessionDetailView = this.createView(this.prefabSessionDetail);
        },

        destroySessionDetailView: function () {
            if (this.nodeSessionDetailView)
                this.nodeSessionDetailView.destroy();
        },

        createBetLinesView: function () {
            this.nodeBetLinesView = this.createView(this.prefabBetLines);
        },

        destroyBetLinesView: function () {
            if (this.nodeBetLinesView)
                this.nodeBetLinesView.destroy();
        },

        createTopView: function () {
            this.nodeTopView = this.createView(this.prefabTop);
        },

        destroyTopView: function () {
            if (this.nodeTopView)
                this.nodeTopView.destroy();
        },

        createHelpView: function () {
            this.nodeHelpView = this.createView(this.prefabHelp);
        },

        destroyHelpView: function () {
            if (this.nodeHelpView)
                this.nodeHelpView.destroy();
        },

        createHistoryView: function () {
            this.nodeHistoryView = this.createView(this.prefabHistory);
        },

        destroyHistoryView: function () {
            if (this.nodeHistoryView)
                this.nodeHistoryView.destroy();
        },

        createView: function (prefab) {
            var nodeView = cc.instantiate(prefab);
            nodeView.parent = this.node;
            nodeView.setPosition(-this.node.x, -this.node.y);
            return nodeView;
        },
    });
}).call(this);
