(function () {
    cc.LodeHelpView = cc.Class({
        "extends": cc.PopupBase,
        properties: {},

        onLoad: function () {
            this.node.parent = cc.find('Canvas');
            this.animation = this.node.getComponent(cc.Animation);
            this.node.zIndex = cc.NoteDepth.POPUP_TAIXIU;
        },

        closeFinished: function () {
            cc.LodePopupController.getInstance().destroyHelpView();
            this.node.removeFromParent();
        },
    });
}).call(this);