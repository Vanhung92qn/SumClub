
(function () {
    cc.PKHelpHandView = cc.Class({
        "extends": cc.Component,
        properties: {

        },

        onLoad: function () {
            this.animation = this.node.getComponent(cc.Animation);
            this.node.zIndex = cc.NoteDepth.POPUP_TAIXIU;
        },

        closeClicked: function () {
            cc.PKPopupController.getInstance().destroyHelpHandView();
        },

    });
}).call(this);
